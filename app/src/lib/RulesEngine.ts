import { RULES } from '../../content';
import type { DayContent, DayRules } from '../types/content';
import type { DailyTithiInfo } from 'panchang-ts';

// ─── Internal rule shapes (mirror JSON structure) ──────────────────────────

interface TithiEntry {
  haircut: boolean;
  nailcut: boolean;
  non_veg: boolean;
  notes: string;
}

interface VaraEntry {
  english: string;
  haircut: boolean;
  nailcut: boolean;
  non_veg: boolean;
  notes: string;
}

interface MasaEntry {
  non_veg: boolean;
  non_veg_reason?: string;
}

interface PeriodEntry {
  haircut?: boolean;
  nailcut?: boolean;
  non_veg?: boolean;
  haircut_reason?: string;
  non_veg_reason?: string;
}

// ─── Params ────────────────────────────────────────────────────────────────

export interface ComputeRulesParams {
  tithi: Pick<DailyTithiInfo, 'name' | 'paksha'>;
  // vara.name from panchang-ts (Sanskrit e.g. "Raviwara") or English ("Sunday")
  varaName: string;
  // chandramasa.purnimantaName — checked against masa_rules
  masaName: string;
  dayContent: DayContent | null;
  // Optional special period key e.g. "pitrupaksha", "navratri"
  specialPeriod?: string | null;
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function tithiRuleKey(tithi: Pick<DailyTithiInfo, 'name' | 'paksha'>): string {
  const low = tithi.name.toLowerCase();
  if (low.includes('purnima') || low.includes('pūrṇimā')) return 'Purnima';
  if (low.includes('amavasya') || low.includes('amāvasyā')) return 'Amavasya';
  return `${tithi.paksha} ${tithi.name}`;
}

function lookupVaraEntry(varaName: string): VaraEntry | null {
  const vara = (RULES.vara as { vara: Record<string, VaraEntry> }).vara;
  if (vara[varaName]) return vara[varaName];
  // Fallback: match by English weekday name
  return Object.values(vara).find(v => v.english.toLowerCase() === varaName.toLowerCase()) ?? null;
}

// ─── Main export ───────────────────────────────────────────────────────────

/**
 * Priority (highest first):
 *   1. dayContent.hair_nail_non_veg when override_rules === true
 *   2. special_rules.special_periods[specialPeriod]
 *   3. special_rules.masa_rules[masaName]  (non_veg only)
 *   4. vara_rules.vara[varaName]           (more restrictive wins vs tithi)
 *   5. tithi_rules.tithis[tithiKey]        (baseline)
 */
export function computeRules(params: ComputeRulesParams): DayRules {
  const { tithi, varaName, masaName, dayContent, specialPeriod } = params;

  // 1. Content-level full override
  const hnv = dayContent?.hair_nail_non_veg;
  if (hnv?.override_rules) {
    return {
      haircut: hnv.haircut ?? false,
      nailcut: hnv.nailcut ?? false,
      nonVeg: hnv.non_veg ?? false,
      reason: hnv.notes || undefined,
    };
  }

  // 2. Tithi baseline
  const tithiMap = (RULES.tithi as { tithis: Record<string, TithiEntry> }).tithis;
  const tithiEntry = tithiMap[tithiRuleKey(tithi)];

  let haircut = tithiEntry?.haircut ?? true;
  let nailcut = tithiEntry?.nailcut ?? true;
  let nonVeg  = tithiEntry?.non_veg  ?? true;
  let reason  = tithiEntry?.notes || undefined;

  // 3. Vara — more restrictive wins (false beats true)
  const varaEntry = lookupVaraEntry(varaName);
  if (varaEntry) {
    if (!varaEntry.haircut) { haircut = false; reason = varaEntry.notes; }
    if (!varaEntry.nailcut) { nailcut = false; }
    if (!varaEntry.non_veg) { nonVeg  = false; }
  }

  // 4. Masa rule — non_veg only
  const masaMap = (RULES.special as { masa_rules?: Record<string, MasaEntry> }).masa_rules ?? {};
  const masaEntry = masaMap[masaName];
  if (masaEntry && !masaEntry.non_veg) {
    nonVeg = false;
    if (masaEntry.non_veg_reason) reason = masaEntry.non_veg_reason;
  }

  // 5. Special period — overrides haircut/nailcut/nonVeg when explicitly false
  if (specialPeriod) {
    const periods = (RULES.special as { special_periods?: Record<string, PeriodEntry> }).special_periods ?? {};
    const periodEntry = periods[specialPeriod];
    if (periodEntry) {
      if (periodEntry.non_veg === false) { nonVeg = false; if (periodEntry.non_veg_reason) reason = periodEntry.non_veg_reason; }
      if (periodEntry.haircut === false) { haircut = false; if (periodEntry.haircut_reason) reason = periodEntry.haircut_reason; }
      if (periodEntry.nailcut === false) { nailcut = false; }
    }
  }

  return { haircut, nailcut, nonVeg, reason: reason || undefined };
}
