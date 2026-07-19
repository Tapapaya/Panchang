import { useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from '../src/context/AppContext';

export default function Index() {
  const router = useRouter();
  const { isLoading, onboardingDone, city } = useApp();

  useEffect(() => {
    if (isLoading) return;
    // Onboarding sets name + city together; missing city means an incomplete setup.
    if (!onboardingDone || !city) {
      router.replace('/onboarding');
    } else {
      router.replace('/(tabs)');
    }
  }, [isLoading, onboardingDone, city]);

  return <View style={{ flex: 1, backgroundColor: '#F2F2F4' }} />;
}
