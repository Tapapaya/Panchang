import { getDailyPanchang } from 'panchang-ts';
import type { DailyPanchangResult, DailyTithiInfo } from 'panchang-ts';
import type { City } from '../types/content';

export interface PanchangDay {
  raw: DailyPanchangResult;
  // Primary tithi (active at sunrise, or first in list)
  primaryTithi: DailyTithiInfo;
  // HH:MM strings in local time (use getUTC* on the raw Dates)
  sunriseStr: string;
  sunsetStr: string;
  moonriseStr: string | null;
  // Masa and samvat
  masaName: string;
  vikramSamvat: number;
  isAdhika: boolean;
}

function formatTime(d: Date): string {
  const h = d.getUTCHours();
  const m = d.getUTCMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}

export function getTodayPanchang(city: City, date: Date = new Date()): PanchangDay | null {
  // Device timezone: negate getTimezoneOffset() which returns minutes WEST of UTC.
  // e.g. IST (UTC+5:30): getTimezoneOffset() = -330 → timezone = 330 ✓
  // e.g. EST (UTC-5): getTimezoneOffset() = 300 → timezone = -300 ✓
  const timezone = -date.getTimezoneOffset();

  const result = getDailyPanchang(
    date,
    { latitude: city.lat, longitude: city.lon },
    { timezone, masaSystem: 'amanta', language: 'en', computeEndTimes: true },
  );

  if (!result) return null;

  const primaryTithi =
    result.tithis.find(t => t.isActiveAtSunrise) ?? result.tithis[0];

  return {
    raw: result,
    primaryTithi,
    sunriseStr: formatTime(result.sunrise),
    sunsetStr: formatTime(result.sunset),
    moonriseStr: result.moonrise ? formatTime(result.moonrise) : null,
    masaName: result.chandramasa.purnimantaName,
    vikramSamvat: result.samvat.vikramSamvat,
    isAdhika: result.chandramasa.isAdhika,
  };
}
