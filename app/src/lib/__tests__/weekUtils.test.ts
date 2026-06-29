import { getISOWeek } from '../weekUtils';

describe('getISOWeek', () => {
  it('returns correct week for a mid-year date (2026-06-16 = week 25)', () => {
    expect(getISOWeek(new Date('2026-06-16'))).toBe(25);
  });

  it('Jan 1 2026 (Thursday) is ISO week 1', () => {
    // 2026-01-01 is a Thursday → belongs to week 1 of 2026
    expect(getISOWeek(new Date('2026-01-01'))).toBe(1);
  });

  it('Dec 31 2025 (Wednesday) is ISO week 1 of 2026', () => {
    // 2025-12-31 is a Wednesday; the week containing Thursday Jan 1 2026
    // starts Mon Dec 29 2025 → ISO week 1 of 2026
    expect(getISOWeek(new Date('2025-12-31'))).toBe(1);
  });

  it('Dec 28 2025 (Sunday) is ISO week 52 of 2025', () => {
    // Last proper week of 2025
    expect(getISOWeek(new Date('2025-12-28'))).toBe(52);
  });

  it('Jan 5 2015 (Monday) is ISO week 2 — year where Jan 1 is Thursday', () => {
    // 2015-01-01 = Thursday → week 1. Jan 5 (Monday) starts week 2.
    expect(getISOWeek(new Date('2015-01-05'))).toBe(2);
  });

  it('Dec 29 2014 (Monday) is ISO week 1 of 2015', () => {
    // Week containing Jan 1 2015 (Thursday) runs Dec 29 2014 – Jan 4 2015
    expect(getISOWeek(new Date('2014-12-29'))).toBe(1);
  });

  it('returns week 53 for Dec 31 2020 (Thursday)', () => {
    // 2020 has 53 ISO weeks; Dec 31 2020 is a Thursday → week 53
    expect(getISOWeek(new Date('2020-12-31'))).toBe(53);
  });

  it('result is always between 1 and 53', () => {
    // Spot-check 365 consecutive days
    const start = new Date('2026-01-01');
    for (let i = 0; i < 365; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      const w = getISOWeek(d);
      expect(w).toBeGreaterThanOrEqual(1);
      expect(w).toBeLessThanOrEqual(53);
    }
  });
});
