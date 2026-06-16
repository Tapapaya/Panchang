// Local one-time seeding script — no Edge Function timeout constraints.
// Run: node scripts/seed-festival-schedule.mjs [year]
//
// Requires: EXPO_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars.
// Get service role key from: Supabase Dashboard > Settings > API > service_role

import { getDailyPanchang } from 'panchang-ts';
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

// Load .env from app/.env
const envPath = new URL('../app/.env', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const envLines = readFileSync(envPath, 'utf8').split('\n');
const env = {};
for (const line of envLines) {
  const m = line.match(/^([^#=]+)=(.+)$/);
  if (m) env[m[1].trim()] = m[2].trim();
}

const supabaseUrl = env['EXPO_PUBLIC_SUPABASE_URL'];
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing EXPO_PUBLIC_SUPABASE_URL (from app/.env) or SUPABASE_SERVICE_ROLE_KEY (env var)');
  console.error('Usage: SUPABASE_SERVICE_ROLE_KEY=<key> node scripts/seed-festival-schedule.mjs [year]');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);
const year = Number(process.argv[2]) || new Date().getFullYear();

const CITIES = [
  { id: 'mumbai',       lat: 19.076,   lon:  72.8777,   tzName: 'Asia/Kolkata' },
  { id: 'delhi',        lat: 28.7041,  lon:  77.1025,   tzName: 'Asia/Kolkata' },
  { id: 'bangalore',    lat: 12.9716,  lon:  77.5946,   tzName: 'Asia/Kolkata' },
  { id: 'kolkata',      lat: 22.5726,  lon:  88.3639,   tzName: 'Asia/Kolkata' },
  { id: 'chennai',      lat: 13.0827,  lon:  80.2707,   tzName: 'Asia/Kolkata' },
  { id: 'hyderabad',    lat: 17.385,   lon:  78.4867,   tzName: 'Asia/Kolkata' },
  { id: 'ahmedabad',    lat: 23.0225,  lon:  72.5714,   tzName: 'Asia/Kolkata' },
  { id: 'pune',         lat: 18.5204,  lon:  73.8567,   tzName: 'Asia/Kolkata' },
  { id: 'new-york',     lat: 40.7128,  lon: -74.006,    tzName: 'America/New_York' },
  { id: 'los-angeles',  lat: 34.0522,  lon: -118.2437,  tzName: 'America/Los_Angeles' },
  { id: 'chicago',      lat: 41.8781,  lon: -87.6298,   tzName: 'America/Chicago' },
  { id: 'houston',      lat: 29.7604,  lon: -95.3698,   tzName: 'America/Chicago' },
  { id: 'san-francisco',lat: 37.7749,  lon: -122.4194,  tzName: 'America/Los_Angeles' },
  { id: 'london',       lat: 51.5074,  lon:  -0.1278,   tzName: 'Europe/London' },
  { id: 'leicester',    lat: 52.6369,  lon:  -1.1398,   tzName: 'Europe/London' },
  { id: 'toronto',      lat: 43.6532,  lon: -79.3832,   tzName: 'America/Toronto' },
  { id: 'vancouver',    lat: 49.2827,  lon: -123.1207,  tzName: 'America/Vancouver' },
  { id: 'sydney',       lat: -33.8688, lon:  151.2093,  tzName: 'Australia/Sydney' },
  { id: 'melbourne',    lat: -37.8136, lon:  144.9631,  tzName: 'Australia/Melbourne' },
  { id: 'singapore',    lat:  1.3521,  lon:  103.8198,  tzName: 'Asia/Singapore' },
  { id: 'dubai',        lat: 25.2048,  lon:   55.2708,  tzName: 'Asia/Dubai' },
];

const NOTABLE = [
  { number:  4, paksha: 'Krishna', key: 'krishna-chaturthi-sankashti', name: 'Sankashti Chaturthi', alarm: 'sunrise' },
  { number: 11, paksha: 'Shukla',  key: 'shukla-ekadashi',             name: 'Shukla Ekadashi',     alarm: 'brahma_muhurta', d1: true },
  { number: 13, paksha: 'Shukla',  key: 'shukla-trayodashi',           name: 'Pradosha (Shukla)',   alarm: 'pradosha' },
  { number: 15, paksha: 'Shukla',  key: 'purnima',                     name: 'Purnima',             alarm: 'sunrise', d1: true },
  { number: 11, paksha: 'Krishna', key: 'krishna-ekadashi',            name: 'Krishna Ekadashi',   alarm: 'brahma_muhurta', d1: true },
  { number: 13, paksha: 'Krishna', key: 'krishna-trayodashi',          name: 'Pradosha (Krishna)', alarm: 'pradosha' },
  { number: 15, paksha: 'Krishna', key: 'amavasya',                    name: 'Amavasya',           alarm: 'sunrise', d1: true },
  { number: 30, paksha: 'either',  key: 'amavasya',                    name: 'Amavasya',           alarm: 'sunrise', d1: true },
];

function findRule(number, paksha) {
  return NOTABLE.find(r => r.number === number && (r.paksha === paksha || r.paksha === 'either'));
}

function toISO(d) { return d.toISOString().slice(0, 10); }

function addDays(d, n) {
  const r = new Date(d); r.setUTCDate(r.getUTCDate() + n); return r;
}

function alarmUtc(panchang, alarmType, fallback) {
  const sr = panchang.sunrise instanceof Date ? panchang.sunrise : null;
  const ss = panchang.sunset  instanceof Date ? panchang.sunset  : null;
  if (alarmType === 'brahma_muhurta' && sr) return new Date(sr.getTime() - 96 * 60 * 1000).toISOString();
  if (alarmType === 'sunrise' && sr) return sr.toISOString();
  if (alarmType === 'pradosha' && ss) return new Date(ss.getTime() - 45 * 60 * 1000).toISOString();
  const d = new Date(fallback); d.setUTCHours(6, 0, 0, 0); return d.toISOString();
}

const CHUNK = 500;

async function upsertChunk(rows) {
  const { error } = await supabase
    .from('festival_schedule')
    .upsert(rows, { onConflict: 'city_id,event_date,tithi_key', ignoreDuplicates: false });
  if (error) throw new Error(error.message);
}

console.log(`Seeding festival_schedule for ${year} (${CITIES.length} cities × 365 days)...`);

let totalRows = 0;
let pending = [];

for (const city of CITIES) {
  process.stdout.write(`  ${city.id}...`);
  let cityRows = 0;
  let current = new Date(Date.UTC(year, 0, 1));
  const end = new Date(Date.UTC(year + 1, 0, 1));

  while (current < end) {
    try {
      const p = getDailyPanchang(
        current,
        { latitude: city.lat, longitude: city.lon },
        { timezone: city.tzName },
      );
      if (p) {
        const tithiList = p.tithis ?? [];
        const t = tithiList.find(x => x.isActiveAtSunrise) ?? tithiList[0];
        const rule = t ? findRule(t.number, t.paksha) : undefined;
        if (rule) {
          const eventDate = toISO(current);
          const nw = { day_of: eventDate, alarm_type: rule.alarm, alarm_utc: alarmUtc(p, rule.alarm, current) };
          if (rule.d1) nw.d_minus_1 = toISO(addDays(current, -1));
          pending.push({ city_id: city.id, event_date: eventDate, tithi_key: rule.key, festival_name: rule.name, notification_window: nw });
          cityRows++;

          if (pending.length >= CHUNK) {
            await upsertChunk(pending);
            totalRows += pending.length;
            pending = [];
          }
        }
      }
    } catch (e) {
      // ignore individual day errors
    }
    current = addDays(current, 1);
  }
  console.log(` ${cityRows} rows`);
}

if (pending.length) {
  await upsertChunk(pending);
  totalRows += pending.length;
}

console.log(`\nDone. Total rows upserted: ${totalRows}`);
