export interface Rashi {
  slug: string;
  name: string;
  symbol: string;
  english: string;
}

export const RASHIS: Rashi[] = [
  { slug: 'mesha', name: 'Mesha', symbol: '♈', english: 'Aries' },
  { slug: 'vrishabha', name: 'Vrishabha', symbol: '♉', english: 'Taurus' },
  { slug: 'mithuna', name: 'Mithuna', symbol: '♊', english: 'Gemini' },
  { slug: 'karka', name: 'Karka', symbol: '♋', english: 'Cancer' },
  { slug: 'simha', name: 'Simha', symbol: '♌', english: 'Leo' },
  { slug: 'kanya', name: 'Kanya', symbol: '♍', english: 'Virgo' },
  { slug: 'tula', name: 'Tula', symbol: '♎', english: 'Libra' },
  { slug: 'vrishchika', name: 'Vrishchika', symbol: '♏', english: 'Scorpio' },
  { slug: 'dhanu', name: 'Dhanu', symbol: '♐', english: 'Sagittarius' },
  { slug: 'makara', name: 'Makara', symbol: '♑', english: 'Capricorn' },
  { slug: 'kumbha', name: 'Kumbha', symbol: '♒', english: 'Aquarius' },
  { slug: 'meena', name: 'Meena', symbol: '♓', english: 'Pisces' },
];
