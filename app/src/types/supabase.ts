// Auto-maintained database type definitions.
// Run `npx supabase gen types typescript --project-id YOUR_ID > src/types/supabase.ts`
// to regenerate from your live schema. Hand-written here for v1 bootstrap.

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          expo_push_token: string | null;
          city_id: string;
          created_at: string;
          last_active: string;
        };
        Insert: {
          id?: string;
          expo_push_token?: string | null;
          city_id: string;
          created_at?: string;
          last_active?: string;
        };
        Update: {
          id?: string;
          expo_push_token?: string | null;
          city_id?: string;
          last_active?: string;
        };
      };
      user_preferences: {
        Row: {
          user_id: string;
          masa_system: 'amanta' | 'purnimanta';
          regional_tradition: string;
          observed_vratas: string[];
          preferred_deity: string | null;
          gotra: string | null;
          notifications_enabled: boolean;
        };
        Insert: {
          user_id: string;
          masa_system?: 'amanta' | 'purnimanta';
          regional_tradition?: string;
          observed_vratas?: string[];
          preferred_deity?: string | null;
          gotra?: string | null;
          notifications_enabled?: boolean;
        };
        Update: {
          masa_system?: 'amanta' | 'purnimanta';
          regional_tradition?: string;
          observed_vratas?: string[];
          preferred_deity?: string | null;
          gotra?: string | null;
          notifications_enabled?: boolean;
        };
      };
      vrat_completions: {
        Row: {
          id: string;
          user_id: string;
          template_id: string;
          tithi_key: string;
          observed_date: string;
          city_id: string;
          notes: string | null;
          completed_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          template_id: string;
          tithi_key: string;
          observed_date: string;
          city_id: string;
          notes?: string | null;
        };
        Update: {
          notes?: string | null;
        };
      };
      festival_schedule: {
        Row: {
          id: string;
          city_id: string;
          event_date: string;
          tithi_key: string;
          festival_name: string | null;
          notification_window: NotificationWindow;
          dispatched_at: string | null;
        };
        Insert: {
          id?: string;
          city_id: string;
          event_date: string;
          tithi_key: string;
          festival_name?: string | null;
          notification_window: NotificationWindow;
        };
        Update: {
          dispatched_at?: string | null;
        };
      };
      community_counters: {
        Row: {
          city_id: string;
          tithi_key: string;
          event_date: string;
          observer_count: number;
        };
        Insert: {
          city_id: string;
          tithi_key: string;
          event_date: string;
          observer_count?: number;
        };
        Update: {
          observer_count?: number;
        };
      };
    };
    Functions: {
      increment_community_counter: {
        Args: { p_city_id: string; p_tithi_key: string; p_event_date: string };
        Returns: void;
      };
      upsert_user: {
        Args: { p_id: string; p_city_id: string; p_expo_push_token?: string | null };
        Returns: string;
      };
    };
  };
}

export interface NotificationWindow {
  d_minus_2?: string;   // ISO date string: send "2 days until" reminder
  d_minus_1?: string;   // ISO date string: send "tomorrow" reminder
  day_of: string;       // ISO date string of the event
  alarm_type: 'brahma_muhurta' | 'sunrise' | 'pradosha' | 'moonrise' | 'fixed';
  alarm_utc: string;    // ISO datetime (UTC) to fire the day-of alarm
}
