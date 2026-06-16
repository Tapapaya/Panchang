import { useRouter } from 'expo-router';
import { CityPickerScreen } from '../screens/CityPickerScreen';
import { useApp } from '../src/context/AppContext';
import type { City } from '../src/types/content';

export default function CityPickerRoute() {
  const router = useRouter();
  const { setCity } = useApp();

  function handleCityPicked(city: City) {
    setCity(city);
    router.replace('/(tabs)');
  }

  return <CityPickerScreen onCityPicked={handleCityPicked} />;
}
