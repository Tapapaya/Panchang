// Sun-derived daily windows — all fully computable from sunrise/sunset.
// Times from panchang-ts arrive as Date objects whose UTC fields encode local
// wall-clock time for the chosen timezone (the app formats with getUTC*).

export interface Window {
  start: Date;
  end: Date;
}

function addMinutes(d: Date, mins: number): Date {
  return new Date(d.getTime() + mins * 60_000);
}

/** Brahma muhurta — the 48-minute window ending 48 min before sunrise. */
export function brahmaMuhurta(sunrise: Date): Window {
  return { start: addMinutes(sunrise, -96), end: addMinutes(sunrise, -48) };
}

/** Sandhya (dusk) window — 24 min around sunset, the diya/aarti time. */
export function sandhya(sunset: Date): Window {
  return { start: addMinutes(sunset, -24), end: addMinutes(sunset, 24) };
}

/**
 * Fraction of daylight elapsed for "now".
 * `nowLocal` must be expressed in the same UTC-encoded local convention as
 * sunrise/sunset. Returns null outside daylight hours.
 */
export function daylightProgress(sunrise: Date, sunset: Date, nowLocal: Date): number | null {
  const t = nowLocal.getTime();
  const a = sunrise.getTime();
  const b = sunset.getTime();
  if (t < a || t > b || b <= a) return null;
  return (t - a) / (b - a);
}

/** Builds a UTC-encoded "local now" for an IANA timezone, matching panchang-ts's convention. */
export function localNowFor(tzName: string, now: Date = new Date()): Date {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: tzName,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  });
  const parts = Object.fromEntries(fmt.formatToParts(now).map(p => [p.type, p.value]));
  return new Date(Date.UTC(
    Number(parts.year), Number(parts.month) - 1, Number(parts.day),
    Number(parts.hour === '24' ? '0' : parts.hour), Number(parts.minute), Number(parts.second),
  ));
}

export function formatWindow(w: Window): string {
  return `${fmt(w.start)} – ${fmt(w.end)}`;
}

export function fmt(d: Date): string {
  const h = d.getUTCHours();
  const m = d.getUTCMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}
