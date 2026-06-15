import { getTodayPanchang } from '../PanchangService';
import type { City } from '../../types/content';

const MUMBAI: City = { id: 'mumbai', name: 'Mumbai', country: 'India', lat: 19.076, lon: 72.8777, tzName: 'Asia/Kolkata' };
const NEW_YORK: City = { id: 'new-york', name: 'New York', country: 'USA', lat: 40.7128, lon: -74.006, tzName: 'America/New_York' };

describe('getTodayPanchang', () => {
  it('returns a PanchangDay for Mumbai on a normal date', () => {
    const date = new Date('2026-06-15T06:00:00');
    const result = getTodayPanchang(MUMBAI, date);
    expect(result).not.toBeNull();
    expect(result?.primaryTithi).toBeDefined();
    expect(typeof result?.primaryTithi.name).toBe('string');
    expect(result?.primaryTithi.number).toBeGreaterThanOrEqual(1);
    expect(result?.primaryTithi.number).toBeLessThanOrEqual(15);
  });

  it('returns sunrise and sunset as HH:MM strings', () => {
    const date = new Date('2026-06-15T06:00:00');
    const result = getTodayPanchang(MUMBAI, date);
    expect(result?.sunriseStr).toMatch(/^\d{1,2}:\d{2}$/);
    expect(result?.sunsetStr).toMatch(/^\d{1,2}:\d{2}$/);
  });

  it('returns a PanchangDay for New York (different timezone)', () => {
    const date = new Date('2026-06-15T06:00:00');
    const result = getTodayPanchang(NEW_YORK, date);
    expect(result).not.toBeNull();
    expect(result?.masaName).toBeDefined();
    expect(result?.vikramSamvat).toBeGreaterThan(2000);
  });

  it('includes festivals array in the raw result', () => {
    const date = new Date('2026-06-15T06:00:00');
    const result = getTodayPanchang(MUMBAI, date);
    expect(Array.isArray(result?.raw.festivals)).toBe(true);
  });

  it('moonriseStr is null or a valid time string', () => {
    const date = new Date('2026-06-15T06:00:00');
    const result = getTodayPanchang(MUMBAI, date);
    if (result?.moonriseStr !== null) {
      expect(result?.moonriseStr).toMatch(/^\d{1,2}:\d{2}$/);
    }
  });
});
