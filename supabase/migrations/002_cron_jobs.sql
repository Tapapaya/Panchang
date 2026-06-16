-- Panchang cron jobs
-- Run in Supabase SQL Editor: https://supabase.com/dashboard/project/lpthjgfxnovzdkjfjcni/sql
--
-- pg_cron and pg_net are pre-enabled on all Supabase projects.
-- pg_net lets SQL make outbound HTTP calls — used here to invoke Edge Functions.

-- ─── Notify dispatch: every 15 minutes ───────────────────────────────────────
-- Queries festival_schedule rows whose alarm_utc falls within ±15 min of now,
-- sends push notifications via Expo Push API, marks rows dispatched.

SELECT cron.schedule(
  'panchang-notify-dispatch',       -- job name (must be unique)
  '*/15 * * * *',                   -- every 15 minutes, 24/7
  $$
    SELECT net.http_post(
      url     := 'https://lpthjgfxnovzdkjfjcni.supabase.co/functions/v1/notify-dispatch',
      headers := jsonb_build_object(
        'Content-Type',  'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwdGhqZ2Z4bm92emRramZqY25pIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTUxNDM5MCwiZXhwIjoyMDk3MDkwMzkwfQ.0w5Etm55qkaD7RG9YadSnKvbG5yG52qr3Wuu_wHhAgU'
      ),
      body    := '{}'::jsonb
    );
  $$
);

-- ─── Annual precompute: 1 Jan each year, one city per minute ─────────────────
-- Staggers 21 cities across 21 minutes to stay within the 10s Edge Function
-- timeout on the free tier. Each invocation processes 1 city × 365 days.
-- If you upgrade to a paid plan (150s timeout), you can collapse these into one.

DO $$
DECLARE
  cities TEXT[] := ARRAY[
    'mumbai','delhi','bangalore','kolkata','chennai','hyderabad',
    'ahmedabad','pune','new-york','los-angeles','chicago','houston',
    'san-francisco','london','leicester','toronto','vancouver',
    'sydney','melbourne','singapore','dubai'
  ];
  city TEXT;
  i    INT := 0;
  next_year TEXT;
BEGIN
  FOREACH city IN ARRAY cities LOOP
    next_year := EXTRACT(YEAR FROM now())::TEXT;  -- cron fires on Jan 1 of the target year

    PERFORM cron.schedule(
      'panchang-precompute-' || city,
      i || ' 1 1 1 *',   -- Jan 1 at 01:00, 01:01, 01:02, … 01:20 UTC
      format(
        $q$
          SELECT net.http_post(
            url     := 'https://lpthjgfxnovzdkjfjcni.supabase.co/functions/v1/precompute-schedule',
            headers := jsonb_build_object(
              'Content-Type',  'application/json',
              'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwdGhqZ2Z4bm92emRramZqY25pIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTUxNDM5MCwiZXhwIjoyMDk3MDkwMzkwfQ.0w5Etm55qkaD7RG9YadSnKvbG5yG52qr3Wuu_wHhAgU'
            ),
            body := jsonb_build_object('year', %s::int, 'city_id', %L)
          );
        $q$,
        next_year,
        city
      )
    );

    i := i + 1;
  END LOOP;
END;
$$;

-- ─── Verify jobs were created ─────────────────────────────────────────────────
SELECT jobname, schedule, active
FROM cron.job
WHERE jobname LIKE 'panchang-%'
ORDER BY jobname;
