export interface UserProfile {
  name: string;
  /** Moon sign slug, e.g. "mesha" — drives the Chandrashtama alert. */
  rashi?: string;
}

export const PROFILE_KEY = 'panchang:profile';
export const ONBOARDING_KEY = 'panchang:onboarding';
export const CITY_KEY = 'panchang:city';
