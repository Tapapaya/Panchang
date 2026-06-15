// TypeScript interfaces for the Panchang content layer JSON files.
// These mirror the JSON shapes in content/days/, content/shlokas/, etc.

export interface WordMeaning {
  word: string;
  meaning: string;
}

export interface Verse {
  verse_number?: string;
  verse_name?: string;
  name?: string;
  day?: string;
  mantra?: string;
  color?: string;
  deity?: string;
  significance?: string;
  sanskrit?: string;
  iast?: string;
  meaning?: string;
  body_part?: string;
  protection?: string;
}

export interface Shloka {
  id: string;
  name: string;
  purpose?: string;
  when_to_chant?: string;
  sanskrit: string;
  iast: string;
  english_meaning: string;
  word_meanings?: WordMeaning[] | Record<string, string>;
  how_to_perform?: string;
  how_to_offer?: string;
  notes?: string;
  verses?: Verse[];
  steps?: Array<{ step: number; mantra?: string; action?: string; meaning?: string }>;
  mudra?: string;
  timing?: string;
  direction?: string;
  [key: string]: unknown;
}

export interface ShlokasFile {
  id?: string;
  name?: string;
  category?: string;
  deity?: string;
  purpose?: string;
  shlokas: Shloka[];
}

export interface DayContentShloka {
  ref: string;
  shloka_id: string;
  context?: string;
}

export interface HairNailRules {
  override_rules: boolean;
  haircut: boolean;
  nailcut: boolean;
  non_veg: boolean;
  notes: string;
}

export interface DayContent {
  key: string;
  type: 'observance' | 'festival' | 'regular';
  tithi?: string;
  alternate_names?: string[];
  deity?: string;
  significance?: {
    title: string;
    summary: string;
    [key: string]: unknown;
  };
  vrat_guide?: {
    fast_type: string;
    key_practice: string;
    [key: string]: unknown;
  };
  shlokas?: DayContentShloka[];
  dos_and_donts?: {
    dos: string[];
    donts: string[];
  };
  hair_nail_non_veg?: HairNailRules;
  moonrise?: {
    importance?: string;
    display_prominence?: string;
    note?: string;
  };
  [key: string]: unknown;
}

export interface Alarm {
  time_type:
    | 'fixed_time'
    | 'relative_to_sunrise'
    | 'relative_to_sunset'
    | 'moonrise'
    | 'brahma_muhurta'
    | 'pradosha'
    | 'midnight';
  offset_minutes?: number;
  fixed_time?: string;
  repeat_daily?: boolean;
  label: string;
  body: string;
}

export interface SankalpStep {
  step: number;
  title: string;
  description: string;
  duration_minutes?: number;
  day?: string;
}

export interface SankalpMaterial {
  item: string;
  quantity?: string;
  substitutes?: string[];
  essential?: boolean;
  notes?: string;
}

export interface SankalpTemplate {
  template_id: string;
  vrat_name: string;
  deity: string;
  recurrence: 'once' | 'weekly' | 'monthly_tithi' | 'yearly_festival';
  tithi?: string;
  masa?: string;
  duration_days?: number;
  suggested_repeat_count?: number;
  steps: SankalpStep[];
  alarms: Alarm[];
  materials?: SankalpMaterial[];
  forgiveness_mantra_id?: string;
  [key: string]: unknown;
}

// ─── City ──────────────────────────────────────────────────────────────────

export interface City {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export const CITY_LIST: City[] = [
  // India
  { id: 'mumbai', name: 'Mumbai', country: 'India', lat: 19.076, lon: 72.8777 },
  { id: 'delhi', name: 'New Delhi', country: 'India', lat: 28.7041, lon: 77.1025 },
  { id: 'bangalore', name: 'Bangalore', country: 'India', lat: 12.9716, lon: 77.5946 },
  { id: 'kolkata', name: 'Kolkata', country: 'India', lat: 22.5726, lon: 88.3639 },
  { id: 'chennai', name: 'Chennai', country: 'India', lat: 13.0827, lon: 80.2707 },
  { id: 'hyderabad', name: 'Hyderabad', country: 'India', lat: 17.385, lon: 78.4867 },
  { id: 'ahmedabad', name: 'Ahmedabad', country: 'India', lat: 23.0225, lon: 72.5714 },
  { id: 'pune', name: 'Pune', country: 'India', lat: 18.5204, lon: 73.8567 },
  // USA
  { id: 'new-york', name: 'New York', country: 'USA', lat: 40.7128, lon: -74.006 },
  { id: 'los-angeles', name: 'Los Angeles', country: 'USA', lat: 34.0522, lon: -118.2437 },
  { id: 'chicago', name: 'Chicago', country: 'USA', lat: 41.8781, lon: -87.6298 },
  { id: 'houston', name: 'Houston', country: 'USA', lat: 29.7604, lon: -95.3698 },
  { id: 'san-francisco', name: 'San Francisco', country: 'USA', lat: 37.7749, lon: -122.4194 },
  // UK
  { id: 'london', name: 'London', country: 'UK', lat: 51.5074, lon: -0.1278 },
  { id: 'leicester', name: 'Leicester', country: 'UK', lat: 52.6369, lon: -1.1398 },
  // Canada
  { id: 'toronto', name: 'Toronto', country: 'Canada', lat: 43.6532, lon: -79.3832 },
  { id: 'vancouver', name: 'Vancouver', country: 'Canada', lat: 49.2827, lon: -123.1207 },
  // Australia
  { id: 'sydney', name: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093 },
  { id: 'melbourne', name: 'Melbourne', country: 'Australia', lat: -37.8136, lon: 144.9631 },
  // Others
  { id: 'singapore', name: 'Singapore', country: 'Singapore', lat: 1.3521, lon: 103.8198 },
  { id: 'dubai', name: 'Dubai', country: 'UAE', lat: 25.2048, lon: 55.2708 },
];

// ─── Rules ─────────────────────────────────────────────────────────────────

export interface DayRules {
  haircut: boolean;
  nailcut: boolean;
  nonVeg: boolean;
  reason?: string;
}
