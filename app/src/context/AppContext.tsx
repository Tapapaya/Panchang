import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CITY_KEY, ONBOARDING_KEY, PROFILE_KEY, type UserProfile } from '../types/profile';
import type { City } from '../types/content';

interface AppState {
  onboardingDone: boolean;
  city: City | null;
  profile: UserProfile | null;
  setOnboardingDone: (v: boolean) => void;
  setCity: (c: City | null) => void;
  setProfile: (p: UserProfile | null) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppState>({
  onboardingDone: false,
  city: null,
  profile: null,
  setOnboardingDone: () => {},
  setCity: () => {},
  setProfile: () => {},
  isLoading: true,
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [onboardingDone, setOnboardingDone] = useState(false);
  const [city, setCity] = useState<City | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(ONBOARDING_KEY),
      AsyncStorage.getItem(CITY_KEY),
      AsyncStorage.getItem(PROFILE_KEY),
    ])
      .then(([ob, cityRaw, profileRaw]) => {
        setOnboardingDone(ob === '1');
        setCity(cityRaw ? (JSON.parse(cityRaw) as City) : null);
        setProfile(profileRaw ? (JSON.parse(profileRaw) as UserProfile) : null);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AppContext.Provider
      value={{ onboardingDone, city, profile, setOnboardingDone, setCity, setProfile, isLoading }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
