import { useMemo } from 'react';
import { getTodayPanchang } from '../lib/PanchangService';
import { getTithiKey, loadDayContent, getPrimaryShlokaForDay } from '../lib/ContentLoader';
import { computeRules } from '../lib/RulesEngine';
import { NAKSHATRA_MEANINGS, YOGA_MEANINGS, VARA_DEITIES } from '../lib/panchangLookups';
import type { City } from '../types/content';
import type { TodayData } from '../../constants/mockData';

function formatTime(d: Date | null | undefined): string | undefined {
  if (!d) return undefined;
  const h = d.getUTCHours();
  const m = d.getUTCMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}

function formatGregorianDate(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function useTodayData(city: City, date: Date = new Date()): TodayData | null {
  return useMemo(() => {
    const panchangDay = getTodayPanchang(city, date);
    if (!panchangDay) return null;

    const { raw, primaryTithi, sunriseStr, sunsetStr, masaName, vikramSamvat, isAdhika } = panchangDay;

    // Primary nakshatra and yoga (active at sunrise, or first)
    const primaryNakshatra = raw.nakshatras.find(n => n.isActiveAtSunrise) ?? raw.nakshatras[0];
    const primaryYoga = raw.yogas.find(y => y.isActiveAtSunrise) ?? raw.yogas[0];

    // Content layer
    const tithiKey = getTithiKey(primaryTithi, masaName, isAdhika);
    const dayContent = loadDayContent(tithiKey);
    const shloka = getPrimaryShlokaForDay(dayContent);

    // Rules
    const rules = computeRules({
      tithi: primaryTithi,
      varaName: raw.vara.name,
      masaName,
      dayContent,
    });

    // Do / avoid from content; fall back to rules-derived list
    const dos: string[] = dayContent?.dos_and_donts?.dos ?? buildDoList(rules);
    const avoids: string[] = dayContent?.dos_and_donts?.donts ?? buildAvoidList(rules);

    // Vrat from festivals
    const festival = raw.festivals[0];
    const vrat = festival
      ? { name: festival.name, significance: festival.description ?? '' }
      : dayContent?.vrat_guide
      ? { name: dayContent.significance?.title ?? tithiKey, significance: dayContent.vrat_guide.key_practice }
      : undefined;

    return {
      gregorian: {
        dayName: raw.vara.englishName,
        dayNameHindi: raw.vara.name,
        date: formatGregorianDate(date),
      },
      vikramSamvat: {
        year: vikramSamvat,
        masaAmanta: masaName,
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
        : {
            name: '',
            context: '',
            sanskrit: '',
            iast: '',
            meaning: '',
          },
      doToday: dos,
      avoidToday: avoids,
    };
  }, [city.id, date.toDateString()]);
}

function buildDoList(rules: ReturnType<typeof computeRules>): string[] {
  const list: string[] = ['Begin the day with prayer', 'Light a diya at dusk'];
  if (!rules.haircut) list.push('Avoid haircut today');
  return list;
}

function buildAvoidList(rules: ReturnType<typeof computeRules>): string[] {
  const list: string[] = [];
  if (!rules.nonVeg) list.push('Non-vegetarian food');
  if (!rules.haircut) list.push('Haircut');
  if (!rules.nailcut) list.push('Nail cutting');
  return list.length > 0 ? list : ['No specific restrictions today'];
}
