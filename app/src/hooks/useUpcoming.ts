import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scanUpcoming, type UpcomingEvent } from '../lib/upcoming';
import type { City } from '../types/content';

// Scans ~21 days of panchang off the initial render and caches per city+day,
// so the computation runs at most once per day per city.

function todayKey(cityId: string): string {
  const d = new Date();
  return `panchang:upcoming:${cityId}:${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export function useUpcoming(city: City | null): { events: UpcomingEvent[]; loading: boolean } {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;
    let cancelled = false;
    const key = todayKey(city.id);

    (async () => {
      try {
        const cached = await AsyncStorage.getItem(key);
        if (cached && !cancelled) {
          setEvents(JSON.parse(cached) as UpcomingEvent[]);
          setLoading(false);
          return;
        }
      } catch {
        // cache miss/corrupt — fall through to compute
      }

      // Defer the CPU-bound scan so first paint isn't blocked
      setTimeout(() => {
        if (cancelled) return;
        const result = scanUpcoming(city);
        if (cancelled) return;
        setEvents(result);
        setLoading(false);
        AsyncStorage.setItem(key, JSON.stringify(result)).catch(() => {});
      }, 50);
    })();

    return () => {
      cancelled = true;
    };
  }, [city?.id]);

  return { events, loading };
}
