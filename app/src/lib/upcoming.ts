// Upcoming observances — scans forward day-by-day with the real panchang engine.
// No hardcoded festival dates: Ekadashi, Purnima, Amavasya, Sankashti and Pradosh
// are derived from tithi; named festivals come from panchang-ts itself.

import { getTodayPanchang } from './PanchangService';
import type { City } from '../types/content';

export type UpcomingKind =
  | 'ekadashi'
  | 'purnima'
  | 'amavasya'
  | 'sankashti'
  | 'pradosh'
  | 'festival';

export interface UpcomingEvent {
  iso: string;        // YYYY-MM-DD of the event's date
  dateLabel: string;  // "Mon 20 Jul"
  daysAway: number;   // 1 = tomorrow
  name: string;
  kind: UpcomingKind;
}

const DAY_MS = 86_400_000;

function dateLabel(d: Date): string {
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

function isoOf(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * Scan the next `horizon` days (default 21) and return up to `limit` events.
 * Synchronous and CPU-bound (~20 panchang computations) — call it deferred
 * (setTimeout / InteractionManager) and cache the result.
 */
export function scanUpcoming(city: City, from: Date = new Date(), horizon = 21, limit = 5): UpcomingEvent[] {
  const events: UpcomingEvent[] = [];

  for (let i = 1; i <= horizon && events.length < limit; i++) {
    const day = new Date(from.getTime() + i * DAY_MS);
    const p = getTodayPanchang(city, day);
    if (!p) continue;

    const seen = new Set<string>();
    const push = (name: string, kind: UpcomingKind) => {
      const key = `${kind}:${name}`;
      if (seen.has(key) || events.length >= limit) return;
      seen.add(key);
      events.push({ iso: isoOf(day), dateLabel: dateLabel(day), daysAway: i, name, kind });
    };

    // Named festivals from the engine take precedence
    for (const f of p.raw.festivals ?? []) {
      push(f.name, 'festival');
    }

    const num = p.primaryTithi.number;
    const paksha = p.primaryTithi.paksha.toLowerCase();
    if (num === 11) {
      push(paksha === 'shukla' ? 'Shukla Ekadashi' : 'Krishna Ekadashi', 'ekadashi');
    } else if (num === 15 && paksha === 'shukla') {
      push('Purnima', 'purnima');
    } else if ((num === 15 || num === 30) && paksha === 'krishna') {
      push('Amavasya', 'amavasya');
    } else if (num === 4 && paksha === 'krishna') {
      push('Sankashti Chaturthi', 'sankashti');
    } else if (num === 13) {
      push(paksha === 'shukla' ? 'Pradosh Vrat (Shukla)' : 'Pradosh Vrat (Krishna)', 'pradosh');
    }
  }

  return events;
}
