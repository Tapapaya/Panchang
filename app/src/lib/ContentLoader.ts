import { DAY_CONTENT, SHLOKAS, SANKALP_TEMPLATES } from '../../content';
import type { DayContent, Shloka, ShlokasFile, SankalpTemplate } from '../types/content';
import type { DailyTithiInfo } from 'panchang-ts';

// Maps tithi data from panchang-ts to a content key used in DAY_CONTENT.
// Also checks for an adhika (extra/leap month) prefix first when provided.
export function getTithiKey(
  tithi: Pick<DailyTithiInfo, 'name' | 'number' | 'paksha'>,
  masa?: string,
  isAdhika?: boolean,
): string {
  const name = tithi.name.toLowerCase();
  const paksha = tithi.paksha.toLowerCase();
  const num = tithi.number;

  // Adhika masa prefix check — caller should check adhika key first then fall back
  if (isAdhika && masa) {
    const adhikaKey = `adhika-${masa.toLowerCase()}`;
    if (DAY_CONTENT[adhikaKey]) return adhikaKey;
  }

  // Purnima (full moon) — tithi 15 of Shukla paksha
  if (num === 15 && paksha === 'shukla') return 'purnima';
  if (name.includes('purnima') || name.includes('pūrṇimā')) return 'purnima';

  // Amavasya (new moon) — last tithi of Krishna paksha; panchang-ts may return number 15 or 30
  if (name.includes('amavasya') || name.includes('amāvasyā')) return 'amavasya';
  if (paksha === 'krishna' && num === 15) return 'amavasya';

  // Ekadashi
  if (name.includes('ekadashi') || name.includes('ekādaśī') || num === 11) {
    return paksha === 'shukla' ? 'shukla-ekadashi' : 'krishna-ekadashi';
  }

  // Sankashti Chaturthi — 4th tithi of Krishna paksha
  if ((name.includes('chaturthi') || name.includes('caturthī') || num === 4) && paksha === 'krishna') {
    return 'krishna-chaturthi-sankashti';
  }

  // Pradosha — 13th tithi
  if (name.includes('trayodashi') || name.includes('trayodaśī') || num === 13) {
    return 'trayodashi-pradosha';
  }

  return 'regular-day-example';
}

export function loadDayContent(key: string): DayContent | null {
  return DAY_CONTENT[key] ?? null;
}

export function loadShlokas(fileId: string): ShlokasFile | null {
  return SHLOKAS[fileId] ?? null;
}

export function loadSankalpTemplate(templateId: string): SankalpTemplate | null {
  return SANKALP_TEMPLATES[templateId] ?? null;
}

// Returns the first shloka from the first shlokas[] reference in a DayContent.
// Falls back to the first Ganesh shloka if the day has no shlokas or the ref file is missing.
export function getPrimaryShlokaForDay(dayContent: DayContent | null): Shloka | null {
  const ref = dayContent?.shlokas?.[0];
  if (ref) {
    const file = loadShlokas(ref.ref);
    const shloka = file?.shlokas.find(s => s.id === ref.shloka_id);
    if (shloka) return shloka;
  }
  // Default: Vakratunda Ganesha shloka (shown on ordinary days)
  const ganeshFile = loadShlokas('ganesh-shlokas');
  return ganeshFile?.shlokas[0] ?? null;
}
