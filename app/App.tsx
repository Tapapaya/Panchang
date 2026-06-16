import { useEffect, useRef, useState } from 'react';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { AppState, type AppStateStatus } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CityPickerScreen } from './screens/CityPickerScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { TodayScreen } from './screens/TodayScreen';
import { registerForPushNotifications } from './src/lib/pushNotifications';
import type { City } from './src/types/content';
import { CITY_KEY, ONBOARDING_KEY } from './src/types/profile';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // undefined = loading; false = not done; true = done
  const [onboardingDone, setOnboardingDone] = useState<boolean | undefined>(undefined);
  // undefined = loading; null = not set; City = ready
  const [city, setCity] = useState<City | null | undefined>(undefined);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(ONBOARDING_KEY),
      AsyncStorage.getItem(CITY_KEY),
    ])
      .then(([ob, cityRaw]) => {
        setOnboardingDone(ob === '1');
        setCity(cityRaw ? (JSON.parse(cityRaw) as City) : null);
      })
      .catch(() => {
        setOnboardingDone(false);
        setCity(null);
      });
  }, []);

  useEffect(() => {
    if (!city) return;
    registerForPushNotifications(city.id);
    const sub = AppState.addEventListener('change', (nextState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextState === 'active') {
        registerForPushNotifications(city.id);
      }
      appState.current = nextState;
    });
    return () => sub.remove();
  }, [city]);

  useEffect(() => {
    const ready = (fontsLoaded || fontError) && onboardingDone !== undefined && city !== undefined;
    if (ready) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError, onboardingDone, city]);

  if ((!fontsLoaded && !fontError) || onboardingDone === undefined || city === undefined) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {!onboardingDone ? (
        <OnboardingScreen onComplete={() => setOnboardingDone(true)} />
      ) : city === null ? (
        <CityPickerScreen onCityPicked={setCity} />
      ) : (
        <TodayScreen city={city} />
      )}
    </SafeAreaProvider>
  );
}
