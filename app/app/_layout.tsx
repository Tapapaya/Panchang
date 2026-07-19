import { useEffect } from 'react';
import { Stack } from 'expo-router';
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/manrope';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider, useApp } from '../src/context/AppContext';
import { registerForPushNotifications } from '../src/lib/pushNotifications';

SplashScreen.preventAutoHideAsync();

// Runs inside AppProvider so it can read city from context.
// Fires registerForPushNotifications whenever city.id changes (initial load + city change).
function PushRegistrar() {
  const { city } = useApp();
  useEffect(() => {
    if (city) {
      registerForPushNotifications(city.id);
    }
  }, [city?.id]);
  return null;
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <AppProvider>
      <SafeAreaProvider>
        <PushRegistrar />
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider>
    </AppProvider>
  );
}
