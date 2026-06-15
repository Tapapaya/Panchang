import { useEffect, useState } from 'react';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CityPickerScreen } from './screens/CityPickerScreen';
import { TodayScreen } from './screens/TodayScreen';
import type { City } from './src/types/content';

const CITY_KEY = 'panchang:city';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // undefined = still loading from storage; null = not set (show picker); City = ready
  const [city, setCity] = useState<City | null | undefined>(undefined);

  useEffect(() => {
    AsyncStorage.getItem(CITY_KEY)
      .then(raw => {
        setCity(raw ? (JSON.parse(raw) as City) : null);
      })
      .catch(() => setCity(null));
  }, []);

  useEffect(() => {
    const ready = (fontsLoaded || fontError) && city !== undefined;
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, city]);

  // Fonts not loaded and city not resolved — keep splash visible
  if ((!fontsLoaded && !fontError) || city === undefined) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {city === null ? (
        <CityPickerScreen onCityPicked={setCity} />
      ) : (
        <TodayScreen city={city} />
      )}
    </SafeAreaProvider>
  );
}
