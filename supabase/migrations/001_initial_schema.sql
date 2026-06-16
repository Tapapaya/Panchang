-- Panchang v1 initial schema
-- Run via: supabase db push  (or paste into Supabase SQL editor)

-- ─── Enable pgcrypto for gen_random_uuid() ────────────────────────────────
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ─── users ────────────────────────────────────────────────────────────────
CREATE TABLE public.users (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  expo_push_token  TEXT,
  city_id          TEXT NOT NULL,          -- matches CITY_LIST[].id
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_active      TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Users can only read/update their own row (identified by Supabase anon session
-- or, for v1 anonymous flow, by the UUID stored in AsyncStorage on the device).
-- For now we use a service-role-only insert pattern: the app calls an RPC to
-- upsert, and the RPC runs as SECURITY DEFINER.
CREATE POLICY "users: read own" ON public.users
  FOR SELECT USING (true);  -- relaxed for v1 anonymous; tighten with auth.uid() in v2

CREATE POLICY "users: update own" ON public.users
  FOR UPDATE USING (true);

-- ─── user_preferences ─────────────────────────────────────────────────────
CREATE TABLE public.user_preferences (
  user_id              UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  masa_system          TEXT NOT NULL DEFAULT 'amanta'
                         CHECK (masa_system IN ('amanta', 'purnimanta')),
  regional_tradition   TEXT NOT NULL DEFAULT 'general',
  observed_vratas      TEXT[] NOT NULL DEFAULT '{}',
  preferred_deity      TEXT,
  gotra                TEXT,
  notifications_enabled BOOLEAN NOT NULL DEFAULT true
);

ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "preferences: read own" ON public.user_preferences FOR SELECT USING (true);
CREATE POLICY "preferences: upsert own" ON public.user_preferences FOR ALL USING (true);

-- ─── vrat_completions ─────────────────────────────────────────────────────
CREATE TABLE public.vrat_completions (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  template_id    TEXT NOT NULL,   -- SankalpTemplate.template_id
  tithi_key      TEXT NOT NULL,   -- ContentLoader key e.g. 'shukla-ekadashi'
  observed_date  DATE NOT NULL,
  city_id        TEXT NOT NULL,
  notes          TEXT,
  completed_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, template_id, observed_date)
);

ALTER TABLE public.vrat_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "completions: read own" ON public.vrat_completions FOR SELECT USING (true);
CREATE POLICY "completions: insert own" ON public.vrat_completions FOR INSERT WITH CHECK (true);
CREATE POLICY "completions: update own" ON public.vrat_completions FOR UPDATE USING (true);

-- ─── festival_schedule ────────────────────────────────────────────────────
-- Pre-computed by precompute-schedule Edge Function once per year.
CREATE TABLE public.festival_schedule (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id             TEXT NOT NULL,
  event_date          DATE NOT NULL,
  tithi_key           TEXT NOT NULL,
  festival_name       TEXT,
  notification_window JSONB NOT NULL,
  -- { d_minus_2, d_minus_1, day_of, alarm_type, alarm_utc }
  dispatched_at       TIMESTAMPTZ,   -- set after notify-dispatch fires this row
  UNIQUE (city_id, event_date, tithi_key)
);

CREATE INDEX festival_schedule_dispatch_idx
  ON public.festival_schedule (city_id, (notification_window->>'alarm_utc'))
  WHERE dispatched_at IS NULL;

-- festival_schedule is written only by service-role (Edge Functions).
-- It is readable by all for client-side "upcoming events" display.
ALTER TABLE public.festival_schedule ENABLE ROW LEVEL SECURITY;
CREATE POLICY "schedule: public read" ON public.festival_schedule FOR SELECT USING (true);

-- ─── community_counters ───────────────────────────────────────────────────
CREATE TABLE public.community_counters (
  city_id        TEXT NOT NULL,
  tithi_key      TEXT NOT NULL,
  event_date     DATE NOT NULL,
  observer_count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (city_id, tithi_key, event_date)
);

ALTER TABLE public.community_counters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "counters: public read" ON public.community_counters FOR SELECT USING (true);

-- Increment-only via a SECURITY DEFINER function to avoid direct UPDATE from client
CREATE OR REPLACE FUNCTION public.increment_community_counter(
  p_city_id   TEXT,
  p_tithi_key TEXT,
  p_event_date DATE
) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.community_counters (city_id, tithi_key, event_date, observer_count)
  VALUES (p_city_id, p_tithi_key, p_event_date, 1)
  ON CONFLICT (city_id, tithi_key, event_date)
  DO UPDATE SET observer_count = community_counters.observer_count + 1;
END;
$$;

-- ─── RPC: upsert_user ─────────────────────────────────────────────────────
-- Called from app on first launch and on push token refresh.
-- Returns the user id so the app can store it in AsyncStorage.
CREATE OR REPLACE FUNCTION public.upsert_user(
  p_id              UUID,
  p_city_id         TEXT,
  p_expo_push_token TEXT DEFAULT NULL
) RETURNS UUID
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.users (id, city_id, expo_push_token, last_active)
  VALUES (p_id, p_city_id, p_expo_push_token, now())
  ON CONFLICT (id) DO UPDATE SET
    city_id          = EXCLUDED.city_id,
    expo_push_token  = COALESCE(EXCLUDED.expo_push_token, users.expo_push_token),
    last_active      = now();

  -- Ensure a default preferences row exists
  INSERT INTO public.user_preferences (user_id)
  VALUES (p_id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN p_id;
END;
$$;
