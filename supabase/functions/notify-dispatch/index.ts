// Supabase Edge Function — daily cron dispatcher.
// Queries festival_schedule rows whose alarm_utc falls within the next dispatch window,
// groups tokens by message, batch-POSTs to Expo Push API, marks rows dispatched.
//
// Deploy:  supabase functions deploy notify-dispatch
// Trigger: pg_cron every 15 minutes OR a daily scheduled invoke

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// ─── Types ────────────────────────────────────────────────────────────────

interface NotificationWindow {
  d_minus_2?: string;
  d_minus_1?: string;
  day_of: string;
  alarm_type: string;
  alarm_utc: string;
}

interface ScheduleRow {
  id: string;
  city_id: string;
  event_date: string;
  tithi_key: string;
  festival_name: string | null;
  notification_window: NotificationWindow;
}

interface UserRow {
  expo_push_token: string | null;
  city_id: string;
}

interface ExpoPushMessage {
  to: string | string[];
  title: string;
  body: string;
  data?: Record<string, unknown>;
  sound?: 'default';
  channelId?: string;
}

interface ExpoPushTicket {
  status: 'ok' | 'error';
  id?: string;
  message?: string;
  details?: { error?: string };
}

// ─── Expo Push API ────────────────────────────────────────────────────────

const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';
const EXPO_PUSH_CHUNK = 100; // Expo limit per request

async function sendExpoPushMessages(messages: ExpoPushMessage[]): Promise<ExpoPushTicket[]> {
  const tickets: ExpoPushTicket[] = [];

  for (let i = 0; i < messages.length; i += EXPO_PUSH_CHUNK) {
    const chunk = messages.slice(i, i + EXPO_PUSH_CHUNK);
    const res = await fetch(EXPO_PUSH_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chunk),
    });

    if (!res.ok) {
      console.error('[notify-dispatch] Expo Push API error:', res.status, await res.text());
      // Push non-blocking error tickets so we still mark rows dispatched
      chunk.forEach(() => tickets.push({ status: 'error', message: `HTTP ${res.status}` }));
      continue;
    }

    const { data }: { data: ExpoPushTicket[] } = await res.json();
    tickets.push(...data);
  }

  return tickets;
}

// ─── Message builders ─────────────────────────────────────────────────────

function buildDayOfMessage(row: ScheduleRow, tokens: string[]): ExpoPushMessage {
  const name = row.festival_name ?? row.tithi_key;
  const alarmLabel: Record<string, string> = {
    brahma_muhurta: 'Brahma Muhurta',
    sunrise:        'Sunrise',
    pradosha:       'Pradosha',
  };
  const timeLabel = alarmLabel[row.notification_window.alarm_type] ?? 'Now';

  return {
    to:        tokens,
    title:     name,
    body:      `Today is ${name}. ${timeLabel} is the auspicious time to observe.`,
    data:      { tithi_key: row.tithi_key, event_date: row.event_date, city_id: row.city_id },
    sound:     'default',
    channelId: 'panchang',
  };
}

function buildReminderMessage(
  row: ScheduleRow,
  tokens: string[],
  daysAhead: 1 | 2,
): ExpoPushMessage {
  const name = row.festival_name ?? row.tithi_key;
  const label = daysAhead === 1 ? 'tomorrow' : 'in 2 days';
  return {
    to:        tokens,
    title:     `${name} ${label}`,
    body:      `Reminder: ${name} is ${label}. Plan your observance.`,
    data:      { tithi_key: row.tithi_key, event_date: row.event_date, city_id: row.city_id },
    channelId: 'panchang',
  };
}

// ─── Main handler ─────────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const now = new Date();
  // Dispatch window: alarm_utc between (now - 15min) and (now + 15min) to tolerate cron drift
  const windowStart = new Date(now.getTime() - 15 * 60 * 1000).toISOString();
  const windowEnd   = new Date(now.getTime() + 15 * 60 * 1000).toISOString();
  const todayUtc    = now.toISOString().slice(0, 10);

  console.log(`[notify-dispatch] Window: ${windowStart} → ${windowEnd}`);

  // 1. Fetch undispatched schedule rows in this window
  const { data: scheduleRows, error: scheduleErr } = await supabase
    .from('festival_schedule')
    .select('id, city_id, event_date, tithi_key, festival_name, notification_window')
    .is('dispatched_at', null)
    .gte("notification_window->>'alarm_utc'", windowStart)
    .lte("notification_window->>'alarm_utc'", windowEnd);

  if (scheduleErr) {
    console.error('[notify-dispatch] Schedule fetch error:', scheduleErr);
    return new Response(JSON.stringify({ error: scheduleErr.message }), { status: 500 });
  }

  if (!scheduleRows || scheduleRows.length === 0) {
    console.log('[notify-dispatch] No rows to dispatch');
    return new Response(JSON.stringify({ ok: true, dispatched: 0 }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  console.log(`[notify-dispatch] Processing ${scheduleRows.length} schedule rows`);

  const rows = scheduleRows as ScheduleRow[];
  const messages: ExpoPushMessage[] = [];
  const dispatchedIds: string[] = [];

  for (const row of rows) {
    const nw = row.notification_window;

    // Collect all user tokens for this city
    const { data: users, error: usersErr } = await supabase
      .from('users')
      .select('expo_push_token, city_id')
      .eq('city_id', row.city_id)
      .not('expo_push_token', 'is', null);

    if (usersErr) {
      console.error(`[notify-dispatch] Users fetch error for ${row.city_id}:`, usersErr);
      continue;
    }

    const tokens = (users as UserRow[])
      .map((u) => u.expo_push_token!)
      .filter((t) => t.startsWith('ExponentPushToken[') || t.startsWith('ExpoPushToken['));

    if (tokens.length === 0) {
      // No tokens — still mark dispatched so we don't reprocess
      dispatchedIds.push(row.id);
      continue;
    }

    // Determine which message type: day-of, d-1, or d-2
    if (nw.d_minus_2 === todayUtc) {
      messages.push(buildReminderMessage(row, tokens, 2));
    } else if (nw.d_minus_1 === todayUtc) {
      messages.push(buildReminderMessage(row, tokens, 1));
    } else {
      // Default: day-of alarm
      messages.push(buildDayOfMessage(row, tokens));
    }

    dispatchedIds.push(row.id);
  }

  // 2. Send to Expo Push API
  let sentCount = 0;
  if (messages.length > 0) {
    const tickets = await sendExpoPushMessages(messages);
    sentCount = tickets.filter((t) => t.status === 'ok').length;
    console.log(`[notify-dispatch] Sent ${sentCount}/${tickets.length} messages`);

    // Log any Expo-side errors
    tickets.forEach((t, i) => {
      if (t.status === 'error') {
        console.warn(`[notify-dispatch] Ticket ${i} error:`, t.message, t.details);
      }
    });
  }

  // 3. Mark rows dispatched (even if Expo errored — avoid retry spam)
  if (dispatchedIds.length > 0) {
    const { error: updateErr } = await supabase
      .from('festival_schedule')
      .update({ dispatched_at: now.toISOString() })
      .in('id', dispatchedIds);

    if (updateErr) {
      console.error('[notify-dispatch] Mark-dispatched error:', updateErr);
    }
  }

  return new Response(
    JSON.stringify({
      ok:         true,
      rows:       rows.length,
      dispatched: dispatchedIds.length,
      sent:       sentCount,
    }),
    { headers: { 'Content-Type': 'application/json' } },
  );
});
