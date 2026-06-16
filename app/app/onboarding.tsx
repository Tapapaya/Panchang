import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { ONBOARDING_KEY } from '../src/types/profile';
import { useApp } from '../src/context/AppContext';

export default function OnboardingRoute() {
  const router = useRouter();
  const { setOnboardingDone } = useApp();

  async function handleComplete() {
    await AsyncStorage.setItem(ONBOARDING_KEY, '1');
    setOnboardingDone(true);
    router.replace('/city-picker');
  }

  return <OnboardingScreen onComplete={handleComplete} />;
}
