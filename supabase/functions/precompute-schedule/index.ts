// Supabase Edge Function — run once per year (or on-demand via cron).
// Computes panchang for all 21 cities × 365 days and upserts festival_schedule rows
// for tithis that match notable events (Ekadashi, Purnima, Amavasya, etc.).
//
// Deploy:  supabase functions deploy precompute-schedule
// Trigger: supabase functions invoke precompute-schedule --data '{"year":2025}'
//          OR via a pg_cron job on Jan 1 each year

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// panchang-ts ships CJS; esm.sh auto-wraps it
import { getDailyPanchang } from 'https://esm.sh/panchang-ts@4.3.1';

// ─── City registry (mirrors app/src/types/content.ts CITY_LIST) ───────────

const CITIES = [
  { id: 'mumbai',        name: 'Mumbai',        lat: 19.0760,  lon:  72.8777, tzName: 'Asia/Kolkata' },
  { id: 'delhi',         name: 'Delhi',         lat: 28.7041,  lon:  77.1025, tzName: 'Asia/Kolkata' },
  { id: 'bangalore',     name: 'Bangalore',     lat: 12.9716,  lon:  77.5946, tzName: 'Asia/Kolkata' },
  { id: 'chennai',       name: 'Chennai',       lat: 13.0827,  lon:  80.2707, tzName: 'Asia/Kolkata' },
  { id: 'kolkata',       name: 'Kolkata',       lat: 22.5726,  lon:  88.3639, tzName: 'Asia/Kolkata' },
  { id: 'hyderabad',     name: 'Hyderabad',     lat: 17.3850,  lon:  78.4867, tzName: 'Asia/Kolkata' },
  { id: 'ahmedabad',     name: 'Ahmedabad',     lat: 23.0225,  lon:  72.5714, tzName: 'Asia/Kolkata' },
  { id: 'pune',          name: 'Pune',          lat: 18.5204,  lon:  73.8567, tzName: 'Asia/Kolkata' },
  { id: 'new-york',      name: 'New York',      lat: 40.7128,  lon: -74.0060, tzName: 'America/New_York' },
  { id: 'chicago',       name: 'Chicago',       lat: 41.8781,  lon: -87.6298, tzName: 'America/Chicago' },
  { id: 'houston',       name: 'Houston',       lat: 29.7604,  lon: -95.3698, tzName: 'America/Chicago' },
  { id: 'san-jose',      name: 'San Jose',      lat: 37.3382,  lon: -121.8863,tzName: 'America/Los_Angeles' },
  { id: 'los-angeles',   name: 'Los Angeles',   lat: 34.0522,  lon: -118.2437,tzName: 'America/Los_Angeles' },
  { id: 'toronto',       name: 'Toronto',       lat: 43.6532,  lon: -79.3832, tzName: 'America/Toronto' },
  { id: 'london',        name: 'London',        lat: 51.5074,  lon:  -0.1278, tzName: 'Europe/London' },
  { id: 'dubai',         name: 'Dubai',         lat: 25.2048,  lon:  55.2708, tzName: 'Asia/Dubai' },
  { id: 'singapore',     name: 'Singapore',     lat:  1.3521,  lon: 103.8198, tzName: 'Asia/Singapore' },
  { id: 'sydney',        name: 'Sydney',        lat: -33.8688, lon: 151.2093, tzName: 'Australia/Sydney' },
  { id: 'auckland',      name: 'Auckland',      lat: -36.8509, lon: 174.7645, tzName: 'Pacific/Auckland' },
  { id: 'johannesburg',  name: 'Johannesburg',  lat: -26.2041, lon:  28.0473, tzName: 'Africa/Johannesburg' },
  { id: 'nairobi',       name: 'Nairobi',       lat:  -1.2921, lon:  36.8219, tzName: 'Africa/Nairobi' },
] as const;

// ─── Notable tithis to schedule ───────────────────────────────────────────
// panchang-ts uses tithi.number 1–15 for BOTH paksha, disambiguated by tithi.paksha.
// "Shukla" | "Krishna" (capitalised) as returned by the library.

interface TithiRule {
  number: number;
  paksha: 'Shukla' | 'Krishna' | 'either';
  key: string;
  name: string;
  alarm_type: 'brahma_muhurta' | 'sunrise' | 'pradosha';
  d_minus_1?: true;
}

const NOTABLE_TITHIS: TithiRule[] = [
  { number:  4, paksha: 'Krishna', key: 'krishna-chaturthi-sankashti', name: 'Sankashti Chaturthi',  alarm_type: 'sunrise' },
  { number: 11, paksha: 'Shukla',  key: 'shukla-ekadashi',             name: 'Shukla Ekadashi',       alarm_type: 'brahma_muhurta', d_minus_1: true },
  { number: 13, paksha: 'Shukla',  key: 'shukla-trayodashi',           name: 'Pradosha (Shukla)',     alarm_type: 'pradosha' },
  { number: 15, paksha: 'Shukla',  key: 'purnima',                     name: 'Purnima',               alarm_type: 'sunrise',        d_minus_1: true },
  { number: 11, paksha: 'Krishna', key: 'krishna-ekadashi',            name: 'Krishna Ekadashi',      alarm_type: 'brahma_muhurta', d_minus_1: true },
  { number: 13, paksha: 'Krishna', key: 'krishna-trayodashi',          name: 'Pradosha (Krishna)',    alarm_type: 'pradosha' },
  // Amavasya: panchang-ts may return number 15+Krishna or 30 depending on build
  { number: 15, paksha: 'Krishna', key: 'amavasya',                    name: 'Amavasya',              alarm_type: 'sunrise',        d_minus_1: true },
  { number: 30, paksha: 'either',  key: 'amavasya',                    name: 'Amavasya',              alarm_type: 'sunrise',        d_minus_1: true },
];

function findTithiRule(number: number, paksha: string): TithiRule | undefined {
  return NOTABLE_TITHIS.find(
    r => r.number === number && (r.paksha === paksha || r.paksha === 'either')
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────

function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + n);
  return d;
}

function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Compute the UTC datetime for a given alarm type on a given panchang day. */
function resolveAlarmUtc(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  panchangData: any,
  alarmType: 'brahma_muhurta' | 'sunrise' | 'pradosha',
  fallbackDate: Date,
): string {
  try {
    const sunrise: Date | undefined = panchangData.sunrise instanceof Date ? panchangData.sunrise : undefined;
    const sunset:  Date | undefined = panchangData.sunset  instanceof Date ? panchangData.sunset  : undefined;

    if (alarmType === 'brahma_muhurta' && sunrise) {
      return new Date(sunrise.getTime() - 96 * 60 * 1000).toISOString();
    }
    if (alarmType === 'sunrise' && sunrise) {
      return sunrise.toISOString();
    }
    if (alarmType === 'pradosha' && sunset) {
      // Pradosha = 45 minutes before sunset
      return new Date(sunset.getTime() - 45 * 60 * 1000).toISOString();
    }
  } catch {
    // fall through
  }
  // Fallback: 6 AM UTC on event date
  const d = new Date(fallbackDate);
  d.setUTCHours(6, 0, 0, 0);
  return d.toISOString();
}

// ─── Main handler ─────────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
  // Only accept POST/GET from service role
  if (req.method !== 'POST' && req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  // Determine year to compute
  let body: Record<string, unknown> = {};
  try {
    body = await req.json().catch(() => ({}));
  } catch { /* GET request — use default year */ }
  const year = body?.year ? Number(body.year) : new Date().getUTCFullYear();
  // Optional: restrict to a single city to stay within the 10s free-tier timeout
  const cityFilter = body?.city_id as string | undefined;
  const citiesToProcess = cityFilter ? CITIES.filter(c => c.id === cityFilter) : CITIES;

  console.log(`[precompute-schedule] Computing ${year} for ${citiesToProcess.length} cities`);

  // Debug probe — returns sample panchang-ts output for 5 days
  if (body?.debug) {
    const probeCity = CITIES[0];
    const sample = [];
    for (let d = 0; d < 5; d++) {
      const date = addDays(new Date(Date.UTC(year, 0, 10 + d)), 0);
      try {
        const p = getDailyPanchang(
          date,
          { latitude: probeCity.lat, longitude: probeCity.lon },
          { timezone: probeCity.tzName },
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        sample.push({ date: toISODate(date), tithis: (p as any)?.tithis, sunrise: (p as any)?.sunrise?.toISOString() });
      } catch (e) {
        sample.push({ date: toISODate(date), error: String(e) });
      }
    }
    return new Response(JSON.stringify({ debug: true, sample }), { headers: { 'Content-Type': 'application/json' } });
  }

  const rows: object[] = [];
  const startDate = new Date(Date.UTC(year, 0, 1));
  const endDate   = new Date(Date.UTC(year + 1, 0, 1));

  for (const city of citiesToProcess) {
    let current = new Date(startDate);
    while (current < endDate) {
      try {
        const panchang = getDailyPanchang(
          current,
          { latitude: city.lat, longitude: city.lon },
          { timezone: city.tzName },
        );

        if (!panchang) { current = addDays(current, 1); continue; }

        // panchang-ts returns an array of tithis; use the one active at sunrise
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tithiList: any[] = (panchang as any).tithis ?? [];
        const primaryTithi = tithiList.find(t => t.isActiveAtSunrise) ?? tithiList[0];
        const tithiNum    = primaryTithi?.number;
        const tithiPaksha = primaryTithi?.paksha ?? '';
        const rule = tithiNum != null ? findTithiRule(tithiNum, tithiPaksha) : undefined;

        if (rule) {
          const eventDate = toISODate(current);
          const alarmUtc  = resolveAlarmUtc(panchang, rule.alarm_type, current);

          const notificationWindow: Record<string, string> = {
            day_of:     eventDate,
            alarm_type: rule.alarm_type,
            alarm_utc:  alarmUtc,
          };
          if (rule.d_minus_1) {
            notificationWindow.d_minus_1 = toISODate(addDays(current, -1));
          }

          rows.push({
            city_id:             city.id,
            event_date:          eventDate,
            tithi_key:           rule.key,
            festival_name:       rule.name,
            notification_window: notificationWindow,
          });
        }
      } catch (err) {
        console.error(`[precompute-schedule] Error for ${city.id} on ${toISODate(current)}:`, err);
      }

      current = addDays(current, 1);
    }
  }

  console.log(`[precompute-schedule] Upserting ${rows.length} rows`);

  // Batch upsert in chunks to stay under Supabase payload limits
  const CHUNK = 500;
  let upserted = 0;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const chunk = rows.slice(i, i + CHUNK);
    const { error } = await supabase
      .from('festival_schedule')
      .upsert(chunk, { onConflict: 'city_id,event_date,tithi_key', ignoreDuplicates: false });

    if (error) {
      console.error('[precompute-schedule] Upsert error:', error);
      return new Response(JSON.stringify({ error: error.message, upserted }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    upserted += chunk.length;
  }

  return new Response(
    JSON.stringify({ ok: true, year, cities: citiesToProcess.length, rows: upserted }),
    { headers: { 'Content-Type': 'application/json' } },
  );
});
