import { useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from '../src/context/AppContext';

export default function Index() {
  const router = useRouter();
  const { isLoading, onboardingDone, city } = useApp();

  useEffect(() => {
    if (isLoading) return;

    if (!onboardingDone) {
      router.replace('/onboarding');
    } else if (!city) {
      router.replace('/city-picker');
    } else {
      router.replace('/(tabs)');
    }
  }, [isLoading, onboardingDone, city]);

  return <View style={{ flex: 1 }} />;
}
