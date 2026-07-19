import { moonRashiFromNakshatra, getMoonTransit, NAKSHATRA_ORDER } from '../moonRashi';

describe('moonRashiFromNakshatra', () => {
  // Each rashi spans exactly 9 padas (2¼ nakshatras).
  it('maps Ashwini pada 1 to Mesha (first rashi)', () => {
    expect(moonRashiFromNakshatra('Ashwini', 1)?.slug).toBe('mesha');
  });

  it('maps Krittika pada 1 to Mesha but pada 2 to Vrishabha (boundary)', () => {
    expect(moonRashiFromNakshatra('Krittika', 1)?.slug).toBe('mesha');
    expect(moonRashiFromNakshatra('Krittika', 2)?.slug).toBe('vrishabha');
  });

  it('maps Punarvasu pada 4 to Karka (boundary into Cancer)', () => {
    expect(moonRashiFromNakshatra('Punarvasu', 3)?.slug).toBe('mithuna');
    expect(moonRashiFromNakshatra('Punarvasu', 4)?.slug).toBe('karka');
  });

  it('maps Revati pada 4 to Meena (last pada of the zodiac)', () => {
    expect(moonRashiFromNakshatra('Revati', 4)?.slug).toBe('meena');
  });

  it('covers all 12 rashis across 108 padas, 9 padas each', () => {
    const counts = new Map<string, number>();
    for (const nak of NAKSHATRA_ORDER) {
      for (let pada = 1; pada <= 4; pada++) {
        const r = moonRashiFromNakshatra(nak, pada);
        expect(r).not.toBeNull();
        counts.set(r!.slug, (counts.get(r!.slug) ?? 0) + 1);
      }
    }
    expect(counts.size).toBe(12);
    for (const c of counts.values()) expect(c).toBe(9);
  });

  it('returns null for unknown nakshatra or invalid pada', () => {
    expect(moonRashiFromNakshatra('Nonexistent', 1)).toBeNull();
    expect(moonRashiFromNakshatra('Ashwini', 0)).toBeNull();
    expect(moonRashiFromNakshatra('Ashwini', 5)).toBeNull();
  });
});

describe('getMoonTransit', () => {
  it('flags Chandrashtama when moon is 8th from janma rashi', () => {
    // Moon in Ashwini (Mesha). 8th from Kanya (index 5) is Mesha (index 0): 5+7=12 → 0.
    const t = getMoonTransit('Ashwini', 1, 'kanya');
    expect(t?.moonRashi.slug).toBe('mesha');
    expect(t?.isChandrashtama).toBe(true);
    expect(t?.isJanmaRashi).toBe(false);
  });

  it('flags janma rashi transit when moon is in own sign', () => {
    const t = getMoonTransit('Ashwini', 2, 'mesha');
    expect(t?.isJanmaRashi).toBe(true);
    expect(t?.isChandrashtama).toBe(false);
  });

  it('handles missing user rashi', () => {
    const t = getMoonTransit('Rohini', 1, null);
    expect(t?.moonRashi.slug).toBe('vrishabha');
    expect(t?.isChandrashtama).toBe(false);
  });
});
