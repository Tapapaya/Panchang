export interface UserProfile {
  name: string;
  email: string;
  gender?: 'male' | 'female' | 'other';
  birthDate?: string;   // "DD/MM/YYYY"
  birthTime?: string;   // "HH:MM"
  birthPlace?: string;
  rashi?: string;       // moon sign slug, e.g. "mesha"
}

export const PROFILE_KEY = 'panchang:profile';
export const ONBOARDING_KEY = 'panchang:onboarding';
export const CITY_KEY = 'panchang:city';
