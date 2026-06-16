import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

if (__DEV__ && (!supabaseUrl || !supabaseAnonKey)) {
  console.warn('[Supabase] EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_ANON_KEY not set. Backend features disabled.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    // No session persistence needed for v1 — anonymous users only
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

// Convenience: returns true when env vars are configured
export const isSupabaseConfigured = () => Boolean(supabaseUrl && supabaseAnonKey);

// Typed RPC wrapper — supabase-js rpc() generic inference is unreliable for custom functions.
// This keeps the call sites clean while preserving type safety via the Database types.
export async function rpcUpsertUser(args: {
  p_id: string;
  p_city_id: string;
  p_expo_push_token: string | null;
}): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase as any).rpc('upsert_user', args);
}
