// Design tokens — Urbanist + #FF660E orange accent.
// Two surfaces: canvas (page #F5F5F5) and surface (card #FFFFFF).
// Single accent: orange. No bento block palette.

export const Colors = {
  // ── Page & card surfaces ────────────────────────────────────────────────
  canvas:      '#F5F5F5',   // screen / page background
  surface:     '#FFFFFF',   // elevated card surface
  surfaceDim:  '#EFEFEF',   // pressed / skeleton state

  // ── Feature band ────────────────────────────────────────────────────────
  bandDark:    '#1A1A1A',   // dark hero surface (tithi card, sunrise/sunset)

  // ── Accent ──────────────────────────────────────────────────────────────
  accent:      '#FF660E',   // orange — CTAs, active tab, selected states
  accentWash:  '#FFF0E8',   // light orange tint — vrat / sacred day cards

  // ── Ink ─────────────────────────────────────────────────────────────────
  ink:             '#000000',
  inkSoft:         '#A5A5A5',               // secondary / muted text
  inkFaint:        'rgba(0,0,0,0.35)',      // ghost labels, placeholders
  inverseInk:      '#FFFFFF',
  inverseInkSoft:  'rgba(255,255,255,0.65)',

  // ── Hairlines ───────────────────────────────────────────────────────────
  hairline:     '#EBEBEB',
  hairlineDark: 'rgba(255,255,255,0.12)',

  // ── Semantic ────────────────────────────────────────────────────────────
  semanticSuccess: '#1ea64a',
  semanticError:   '#c82014',

  // ── Backward-compat aliases ─────────────────────────────────────────────
  canvasWarm:     '#F5F5F5',
  canvasCeramic:  '#EFEFEF',
  blockNavy:      '#1A1A1A',
  surfaceSoft:    '#F8F8F8',
  // Subtle category tints — used for vastu room cards and shloka chips
  blockLilac:     '#EEECFF',  // soft periwinkle
  blockCream:     '#FFF8EE',  // warm sand
  blockMint:      '#EEFAF3',  // cool sage
  blockCoral:     '#FFF0E8',  // matches accentWash
  blockLime:      '#F4FAE8',  // soft lime
  blockPink:      '#FFEFF5',  // soft rose
  accentGold:     '#FF660E',
  accentGoldWash: '#FFF0E8',
  accentMagenta:  '#FF660E',
  hairlineSoft:   '#EBEBEB',
  inverseCanvas:  '#1A1A1A',
} as const;

export const Spacing = {
  hair: 1,
  xxs:  4,
  xs:   8,
  sm:   12,
  md:   16,
  lg:   24,
  xl:   32,
  xxl:  56,
} as const;

export const Radius = {
  xs:   2,
  sm:   4,
  md:   8,
  lg:   16,   // card radius — rounder than before
  card: 16,
  xl:   24,
  pill: 50,   // all buttons full-pill
  full: 9999,
} as const;

// Urbanist — geometric sans-serif from Google Fonts.
// Weights loaded: 400 Regular, 500 Medium, 600 SemiBold, 700 Bold.
export const Type = {
  // 52px editorial hero — tithi name, the ONE BIG MOMENT on screen.
  displayHero: {
    fontFamily:    'Urbanist_700Bold',
    fontSize:      52,
    lineHeight:    56,
    letterSpacing: -1.0,
  },
  displayXl: {
    fontFamily:    'Urbanist_700Bold',
    fontSize:      38,
    lineHeight:    42,
    letterSpacing: -0.6,
  },
  displayLg: {
    fontFamily:    'Urbanist_700Bold',
    fontSize:      28,
    lineHeight:    34,
    letterSpacing: -0.3,
  },
  headline: {
    fontFamily:    'Urbanist_600SemiBold',
    fontSize:      20,
    lineHeight:    26,
    letterSpacing: -0.2,
  },
  subhead: {
    fontFamily:    'Urbanist_400Regular',
    fontSize:      17,
    lineHeight:    25,
    letterSpacing: 0,
  },
  cardTitle: {
    fontFamily:    'Urbanist_600SemiBold',
    fontSize:      16,
    lineHeight:    22,
    letterSpacing: -0.1,
  },
  bodyLg: {
    fontFamily:    'Urbanist_400Regular',
    fontSize:      16,
    lineHeight:    26,
    letterSpacing: 0,
  },
  body: {
    fontFamily:    'Urbanist_400Regular',
    fontSize:      14,
    lineHeight:    22,
    letterSpacing: 0,
  },
  bodySm: {
    fontFamily:    'Urbanist_400Regular',
    fontSize:      13,
    lineHeight:    20,
    letterSpacing: 0,
  },
  label: {
    fontFamily:    'Urbanist_600SemiBold',
    fontSize:      14,
    lineHeight:    18,
    letterSpacing: 0.1,
  },
  // Uppercase section labels — wider tracking
  eyebrow: {
    fontFamily:    'Urbanist_600SemiBold',
    fontSize:      11,
    lineHeight:    14,
    letterSpacing: 1.0,
    textTransform: 'uppercase' as const,
  },
  caption: {
    fontFamily:    'Urbanist_500Medium',
    fontSize:      11,
    lineHeight:    14,
    letterSpacing: 0.4,
    textTransform: 'uppercase' as const,
  },
} as const;

// Whisper-soft shadows — white cards on gray canvas need very subtle lift.
export const Shadows = {
  card: {
    shadowColor:   '#000000',
    shadowOffset:  { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius:  4,
    elevation:     2,
  },
  sheet: {
    shadowColor:   '#000000',
    shadowOffset:  { width: 0, height: -4 },
    shadowOpacity: 0.10,
    shadowRadius:  16,
    elevation:     16,
  },
} as const;
