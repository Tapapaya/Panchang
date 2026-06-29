/**
 * ISO 8601 week number. Week 1 = the week containing the first Thursday
 * of the year; weeks start on Monday.
 *
 * This matches the spec in design doc §Rashifal JSON schema which keys
 * entries by `week: getISOWeek(today)`.
 */
export function getISOWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7; // Sunday (0) → 7 so weeks start Monday
  d.setUTCDate(d.getUTCDate() + 4 - dayNum); // shift to nearest Thursday
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}
