// Moon rashi (sidereal moon sign) derived from the current nakshatra + pada.
// Each nakshatra spans 13°20′ (4 padas of 3°20′); each rashi spans 30° = 9 padas.
// rashiIndex = floor((nakshatraIndex * 4 + (pada - 1)) / 9)
//
// Chandrashtama: when the transiting Moon occupies the 8th rashi from a person's
// janma rashi, the ~2.25 days are traditionally considered draining for that rashi
// — a widely-observed, fully computable rule (no fabricated horoscope content).

import { RASHIS, type Rashi } from '../constants/rashis';

// Order must match sidereal zodiac; keys match panchang-ts language:'en' output.
export const NAKSHATRA_ORDER: string[] = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishtha', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati',
];

export function moonRashiFromNakshatra(nakshatraName: string, pada: number): Rashi | null {
  const nakIndex = NAKSHATRA_ORDER.indexOf(nakshatraName);
  if (nakIndex === -1 || pada < 1 || pada > 4) return null;
  const absPada = nakIndex * 4 + (pada - 1); // 0..107
  const rashiIndex = Math.floor(absPada / 9); // 0..11
  return RASHIS[rashiIndex] ?? null;
}

export interface MoonTransit {
  moonRashi: Rashi;
  /** True when moon occupies the 8th sign from the user's janma rashi. */
  isChandrashtama: boolean;
  /** True when moon is in the user's own rashi (janma rashi transit — a good day for reflection). */
  isJanmaRashi: boolean;
}

export function getMoonTransit(
  nakshatraName: string,
  pada: number,
  userRashiSlug?: string | null,
): MoonTransit | null {
  const moonRashi = moonRashiFromNakshatra(nakshatraName, pada);
  if (!moonRashi) return null;

  let isChandrashtama = false;
  let isJanmaRashi = false;
  if (userRashiSlug) {
    const userIndex = RASHIS.findIndex(r => r.slug === userRashiSlug);
    const moonIndex = RASHIS.findIndex(r => r.slug === moonRashi.slug);
    if (userIndex !== -1) {
      isChandrashtama = moonIndex === (userIndex + 7) % 12;
      isJanmaRashi = moonIndex === userIndex;
    }
  }
  return { moonRashi, isChandrashtama, isJanmaRashi };
}
