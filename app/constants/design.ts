// Panchang Design System v3 — "Soft Data" light mode.
// Reference: rounded fintech-statistics aesthetic (dribbble/sendz) translated to light.
// Font: Manrope. Cards radius 24–28 on a muted gray canvas. Dark pill = active state.
// A small saturated data palette (sky/indigo/green/coral/lime/amber) drives rings,
// legend dots, and badges — never large surfaces.

export const Colors = {
  // ── Surfaces ─────────────────────────────────────────────────────────────
  canvas:      '#F2F2F4',   // page background — muted cool gray
  surface:     '#FFFFFF',   // card
  surfaceSoft: '#F6F6F8',   // inset chip / input / segmented track
  surfaceDim:  '#ECECEF',   // pressed state, skeleton

  // ── Ink ──────────────────────────────────────────────────────────────────
  ink:        '#17181A',    // primary text — near-black, not pure black
  inkMute:    '#84858C',    // secondary text
  inkFaint:   '#B9BAC2',    // placeholders, disabled
  inverseInk: '#FFFFFF',    // text on dark pill / ink surfaces

  // ── Dark pill (active segmented state, hero chips) ───────────────────────
  pill:       '#1E1F22',    // the dark rounded pill from the reference

  // ── Brand accent ─────────────────────────────────────────────────────────
  accent:     '#F4590D',    // saffron — CTAs, active tab, sacred highlights
  accentWash: '#FEEFE6',    // saffron tint for featured cards

  // ── Data palette (rings, legend dots, deity chips) ───────────────────────
  dataSky:    '#7EC4F0',
  dataIndigo: '#7D8CFB',
  dataGreen:  '#63BE7E',
  dataCoral:  '#FC7F6C',
  dataLime:   '#D3EC5C',
  dataAmber:  '#FFAE55',
  dataGray:   '#A9AAB1',

  // ── Washes for the data palette (chip/badge backgrounds) ─────────────────
  washSky:    '#E9F5FD',
  washIndigo: '#EDEFFE',
  washGreen:  '#E9F7EE',
  washCoral:  '#FEEEEB',
  washLime:   '#F5FBDC',
  washAmber:  '#FFF3E4',

  // ── Hairlines ────────────────────────────────────────────────────────────
  hairline:   '#E8E8EC',

  // ── Semantic ─────────────────────────────────────────────────────────────
  success:    '#3BA55D',
  error:      '#D9463E',
} as const;

export const Spacing = {
  xxs: 4,
  xs:  8,
  sm:  12,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
} as const;

export const Radius = {
  sm:   10,
  md:   16,
  chip: 18,
  card: 26,    // signature big-radius card from the reference
  pill: 999,
} as const;

// Manrope — geometric grotesque with softly rounded terminals.
// Weights loaded: 400, 500, 600, 700, 800.
// Devanagari text must NOT set fontFamily — the system font renders it.
export const Type = {
  // Hero numerals / tithi name — the one big moment per screen
  displayXl: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 38,
    lineHeight: 44,
    letterSpacing: -0.8,
  },
  display: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  // Screen title ("Statistics" in the reference)
  title: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 21,
    lineHeight: 28,
    letterSpacing: -0.3,
  },
  heading: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  // Legend rows, list values ("Home 36%")
  label: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 14,
    lineHeight: 20,
  },
  body: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 15,
    lineHeight: 23,
  },
  bodySm: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 13,
    lineHeight: 19,
  },
  // Muted small labels ("Debit Card") — sentence case, never uppercase
  caption: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    lineHeight: 16,
  },
  captionSm: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 11,
    lineHeight: 14,
  },
} as const;

export const Shadows = {
  // Barely-there ambient shadow — the reference relies on contrast, not depth
  card: {
    shadowColor: '#17181A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 14,
    elevation: 2,
  },
} as const;

// Deity → data-palette assignment, used for legend dots and chips
// across Stotras and Today screens. Keep stable — users learn the colors.
export const DeityColors: Record<string, { dot: string; wash: string }> = {
  Ganesha:  { dot: Colors.dataAmber,  wash: Colors.washAmber },
  Shiva:    { dot: Colors.dataIndigo, wash: Colors.washIndigo },
  Vishnu:   { dot: Colors.dataSky,    wash: Colors.washSky },
  Krishna:  { dot: Colors.dataSky,    wash: Colors.washSky },
  Rama:     { dot: Colors.dataSky,    wash: Colors.washSky },
  Devi:     { dot: Colors.dataCoral,  wash: Colors.washCoral },
  Lakshmi:  { dot: Colors.dataLime,   wash: Colors.washLime },
  Hanuman:  { dot: Colors.dataCoral,  wash: Colors.washCoral },
  Saraswati:{ dot: Colors.dataGreen,  wash: Colors.washGreen },
  Universal:{ dot: Colors.dataGray,   wash: Colors.surfaceSoft },
};

export function deityColor(deity: string): { dot: string; wash: string } {
  // Match on the first word so "Durga / Devi", "Krishna", "Vishnu / Universal" resolve
  for (const key of Object.keys(DeityColors)) {
    if (deity.toLowerCase().includes(key.toLowerCase())) return DeityColors[key];
  }
  if (/durga|kali|shakti|amba|gauri/i.test(deity)) return DeityColors.Devi;
  if (/surya|chandra|navagraha|ganga|tulasi|skanda|murugan|dattatreya|swami|guru|bhairav/i.test(deity)) {
    return { dot: Colors.dataGreen, wash: Colors.washGreen };
  }
  return DeityColors.Universal;
}
