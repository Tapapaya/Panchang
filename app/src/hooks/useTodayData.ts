import { useMemo } from 'react';
import { getTodayPanchang } from '../lib/PanchangService';
import { getTithiKey, loadDayContent, getPrimaryShlokaForDay } from '../lib/ContentLoader';
import { computeRules } from '../lib/RulesEngine';
import { NAKSHATRA_MEANINGS, YOGA_MEANINGS, VARA_DEITIES } from '../lib/panchangLookups';
import type { City } from '../types/content';

// Static educational explainers for the panchang elements (element-level, not
// fabricated per-day predictions — those would require editorial content).
export const ELEMENT_EXPLAINERS = {
  nakshatra:
    'The nakshatra is the lunar mansion — one of 27 star-fields the Moon passes through each sidereal month, spending about a day in each. It colours the day\'s quality in the Vedic calendar and is the basis of many muhurta (timing) decisions.',
  yoga:
    'Yoga in the panchang is one of 27 values computed from the combined longitudes of the Sun and Moon. Each yoga carries a traditional quality — some favour effort and new starts, others suggest restraint.',
  rahuKalam:
    'Rahu Kalam is a ~90-minute window each day ruled by Rahu, the Moon\'s north node. Tradition avoids starting new ventures, journeys or agreements during it; ongoing work is unaffected. Its position depends on the weekday and the day\'s sunrise and sunset.',
  tithi:
    'The tithi is the lunar day — the time the Moon takes to move 12° ahead of the Sun. Thirty tithis make a lunar month across the bright (Shukla) and dark (Krishna) fortnights. Festivals and vrats are fixed by tithi, which is why their English dates shift each year.',
  brahmaMuhurta:
    'Brahma muhurta is the 48-minute window ending 48 minutes before sunrise — held to be the most sattvic time of day, ideal for meditation, japa and study.',
} as const;

export interface TodayData {
  gregorian: { dayName: string; date: string };
  vikramSamvat: { year: number; masa: string; paksha: 'Shukla' | 'Krishna' };
  tithi: { name: string; number: number; paksha: 'Shukla' | 'Krishna'; endTime?: string };
  nakshatra: { name: string; meaning: string; pada: number; endTime?: string };
  yoga: { name: string; meaning: string; endTime?: string };
  vara: { name: string; englishName: string; deity: string };
  sunrise: string;
  sunset: string;
  moonrise: string | null;
  /** Raw UTC-encoded local Dates for window computations. */
  sun: { sunrise: Date; sunset: Date };
  rahuKalam?: { start: string; end: string };
  vrat?: { name: string; significance?: string };
  shloka?: { name: string; context: string; sanskrit: string; iast: string; meaning: string };
  doToday: string[];
  avoidToday: string[];
}

function formatTime(d: Date | null | undefined): string | undefined {
  if (!d) return undefined;
  const h = d.getUTCHours();
  const m = d.getUTCMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}

export function useTodayData(city: City, date: Date = new Date()): TodayData | null {
  return useMemo(() => {
    const panchangDay = getTodayPanchang(city, date);
    if (!panchangDay) return null;

    const { raw, primaryTithi, sunriseStr, sunsetStr, moonriseStr, masaName, vikramSamvat } = panchangDay;
    const isAdhika = panchangDay.isAdhika;

    const primaryNakshatra = raw.nakshatras.find(n => n.isActiveAtSunrise) ?? raw.nakshatras[0];
    const primaryYoga = raw.yogas.find(y => y.isActiveAtSunrise) ?? raw.yogas[0];

    const tithiKey = getTithiKey(primaryTithi, masaName, isAdhika);
    const dayContent = loadDayContent(tithiKey);
    const shloka = getPrimaryShlokaForDay(dayContent);

    const rules = computeRules({
      tithi: primaryTithi,
      varaName: raw.vara.name,
      masaName,
      dayContent,
    });

    const dos: string[] = dayContent?.dos_and_donts?.dos ?? buildDoList();
    const avoids: string[] = dayContent?.dos_and_donts?.donts ?? buildAvoidList(rules);

    const festival = raw.festivals[0];
    const vrat = festival
      ? { name: festival.name, significance: festival.description ?? '' }
      : dayContent?.vrat_guide
      ? { name: dayContent.significance?.title ?? tithiKey, significance: dayContent.vrat_guide.key_practice }
      : undefined;

    return {
      gregorian: {
        dayName: raw.vara.englishName,
        date: date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }),
      },
      vikramSamvat: {
        year: vikramSamvat,
        masa: masaName,
        paksha: primaryTithi.paksha as 'Shukla' | 'Krishna',
      },
      tithi: {
        name: primaryTithi.name,
        number: primaryTithi.number,
        paksha: primaryTithi.paksha as 'Shukla' | 'Krishna',
        endTime: formatTime(primaryTithi.endTime ?? undefined),
      },
      nakshatra: {
        name: primaryNakshatra.name,
        meaning: NAKSHATRA_MEANINGS[primaryNakshatra.name] ?? '',
        pada: primaryNakshatra.pada,
        endTime: formatTime(primaryNakshatra.endTime ?? undefined),
      },
      yoga: {
        name: primaryYoga.name,
        meaning: YOGA_MEANINGS[primaryYoga.name] ?? '',
        endTime: formatTime(primaryYoga.endTime ?? undefined),
      },
      vara: {
        name: raw.vara.name,
        englishName: raw.vara.englishName,
        deity: VARA_DEITIES[raw.vara.name] ?? raw.vara.englishName,
      },
      sunrise: sunriseStr,
      sunset: sunsetStr,
      moonrise: moonriseStr,
      sun: { sunrise: raw.sunrise, sunset: raw.sunset },
      rahuKalam: {
        start: formatTime(raw.rahuKalam.start) ?? '',
        end: formatTime(raw.rahuKalam.end) ?? '',
      },
      vrat,
      shloka: shloka
        ? {
            name: shloka.name,
            context: shloka.purpose ?? shloka.when_to_chant ?? '',
            sanskrit: shloka.sanskrit,
            iast: shloka.iast,
            meaning: shloka.english_meaning,
          }
        : undefined,
      doToday: dos,
      avoidToday: avoids,
    };
  }, [city.id, date.toDateString()]);
}

function buildDoList(): string[] {
  return ['Begin the day with prayer', 'Light a diya at dusk'];
}

function buildAvoidList(rules: ReturnType<typeof computeRules>): string[] {
  const list: string[] = [];
  if (!rules.nonVeg) list.push('Non-vegetarian food');
  if (!rules.haircut) list.push('Haircut');
  if (!rules.nailcut) list.push('Nail cutting');
  return list.length > 0 ? list : ['No specific restrictions today'];
}
