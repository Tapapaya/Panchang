import { computeRules } from '../RulesEngine';
import type { DayContent } from '../../types/content';

// Helper — minimal tithi shape
const tithi = (name: string, paksha: 'Shukla' | 'Krishna' = 'Shukla') => ({ name, paksha });

describe('computeRules — tithi baseline', () => {
  it('allows haircut/nailcut/non-veg on an unrestricted tithi + vara', () => {
    // Shukla Pratipada + Budhawara (Wednesday) — both allow everything
    const rules = computeRules({
      tithi: tithi('Pratipada', 'Shukla'),
      varaName: 'Budhawara',
      masaName: 'Vaishakha',
      dayContent: null,
    });
    expect(rules.haircut).toBe(true);
    expect(rules.nailcut).toBe(true);
    expect(rules.nonVeg).toBe(true);
  });

  it('blocks haircut/nailcut/non-veg on Ekadashi', () => {
    const rules = computeRules({
      tithi: tithi('Ekadashi', 'Shukla'),
      varaName: 'Budhawara',
      masaName: 'Vaishakha',
      dayContent: null,
    });
    expect(rules.haircut).toBe(false);
    expect(rules.nailcut).toBe(false);
    expect(rules.nonVeg).toBe(false);
  });

  it('blocks haircut/nailcut/non-veg on Purnima (full moon)', () => {
    const rules = computeRules({
      tithi: tithi('Purnima', 'Shukla'),
      varaName: 'Shukrawara',
      masaName: 'Vaishakha',
      dayContent: null,
    });
    expect(rules.haircut).toBe(false);
    expect(rules.nailcut).toBe(false);
    expect(rules.nonVeg).toBe(false);
  });

  it('blocks haircut/nailcut/non-veg on Amavasya (new moon)', () => {
    const rules = computeRules({
      tithi: tithi('Amavasya', 'Krishna'),
      varaName: 'Shukrawara',
      masaName: 'Vaishakha',
      dayContent: null,
    });
    expect(rules.haircut).toBe(false);
    expect(rules.nailcut).toBe(false);
    expect(rules.nonVeg).toBe(false);
  });
});

describe('computeRules — vara more-restrictive rule', () => {
  it('blocks haircut/nailcut when vara is Sunday even if tithi allows it', () => {
    // Shukla Pratipada (all allowed) + Raviwara (Sunday — no haircut/nailcut)
    const rules = computeRules({
      tithi: tithi('Pratipada', 'Shukla'),
      varaName: 'Raviwara',
      masaName: 'Vaishakha',
      dayContent: null,
    });
    expect(rules.haircut).toBe(false);
    expect(rules.nailcut).toBe(false);
    expect(rules.nonVeg).toBe(true); // Sunday allows non-veg
  });

  it('accepts English weekday name as fallback lookup', () => {
    const rules = computeRules({
      tithi: tithi('Pratipada', 'Shukla'),
      varaName: 'Saturday',
      masaName: 'Vaishakha',
      dayContent: null,
    });
    expect(rules.haircut).toBe(false); // Shaniwara blocks haircut
    expect(rules.nailcut).toBe(false);
    expect(rules.nonVeg).toBe(true);  // Saturday allows non-veg
  });
});

describe('computeRules — masa rule (non-veg only)', () => {
  it('blocks non-veg in Shravana month even on a normally allowed tithi+vara', () => {
    const rules = computeRules({
      tithi: tithi('Pratipada', 'Shukla'),
      varaName: 'Budhawara',
      masaName: 'Shravana',
      dayContent: null,
    });
    expect(rules.nonVeg).toBe(false);
    expect(rules.haircut).toBe(true); // masa rule doesn't touch haircut
    expect(rules.nailcut).toBe(true);
  });

  it('blocks non-veg in Kartika month', () => {
    const rules = computeRules({
      tithi: tithi('Pratipada', 'Shukla'),
      varaName: 'Budhawara',
      masaName: 'Kartika',
      dayContent: null,
    });
    expect(rules.nonVeg).toBe(false);
  });
});

describe('computeRules — content override (highest priority)', () => {
  it('uses content override when override_rules is true, ignoring tithi+vara restrictions', () => {
    const overrideContent: Partial<DayContent> = {
      hair_nail_non_veg: {
        override_rules: true,
        haircut: true,  // override says allowed even if tithi says no
        nailcut: true,
        non_veg: false,
        notes: 'Special day rule',
      },
    };
    // Ekadashi + Monday (non-veg blocked) — override says haircut OK
    const rules = computeRules({
      tithi: tithi('Ekadashi', 'Shukla'),
      varaName: 'Somawara',
      masaName: 'Vaishakha',
      dayContent: overrideContent as DayContent,
    });
    expect(rules.haircut).toBe(true);
    expect(rules.nailcut).toBe(true);
    expect(rules.nonVeg).toBe(false);
    expect(rules.reason).toBe('Special day rule');
  });

  it('does NOT use content rules when override_rules is false', () => {
    const contentNoOverride: Partial<DayContent> = {
      hair_nail_non_veg: {
        override_rules: false,
        haircut: true,
        nailcut: true,
        non_veg: true,
        notes: '',
      },
    };
    // Ekadashi should still block everything
    const rules = computeRules({
      tithi: tithi('Ekadashi', 'Shukla'),
      varaName: 'Budhawara',
      masaName: 'Vaishakha',
      dayContent: contentNoOverride as DayContent,
    });
    expect(rules.haircut).toBe(false);
    expect(rules.nonVeg).toBe(false);
  });
});

describe('computeRules — special period', () => {
  it('blocks haircut/nailcut/non-veg during pitrupaksha', () => {
    // Wednesday + Shukla Pratipada — normally all allowed
    const rules = computeRules({
      tithi: tithi('Pratipada', 'Shukla'),
      varaName: 'Budhawara',
      masaName: 'Bhadrapada',
      dayContent: null,
      specialPeriod: 'pitrupaksha',
    });
    expect(rules.haircut).toBe(false);
    expect(rules.nailcut).toBe(false);
    expect(rules.nonVeg).toBe(false);
  });

  it('blocks non-veg during navratri', () => {
    const rules = computeRules({
      tithi: tithi('Pratipada', 'Shukla'),
      varaName: 'Budhawara',
      masaName: 'Ashwina',
      dayContent: null,
      specialPeriod: 'navratri',
    });
    expect(rules.nonVeg).toBe(false);
  });

  it('ignores unknown special period gracefully', () => {
    const rules = computeRules({
      tithi: tithi('Pratipada', 'Shukla'),
      varaName: 'Budhawara',
      masaName: 'Vaishakha',
      dayContent: null,
      specialPeriod: 'unknown-period-xyz',
    });
    expect(rules.haircut).toBe(true);
    expect(rules.nonVeg).toBe(true);
  });
});
