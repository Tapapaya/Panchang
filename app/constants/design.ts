// Design tokens rebuilt from DESIGN.md (Starbucks system → Panchang identity).
// Three surface levels: canvasWarm (screen bg) → canvas (card) → bandDark (feature band).
// Universal tracking rule: -0.01em. Weight shift creates hierarchy, not size shift.

export const Colors = {
  // ── Canvas hierarchy ────────────────────────────────────────────────────
  canvasWarm:    '#f2f0eb',   // DESIGN.md "Neutral Warm" — all screen backgrounds
  canvasCeramic: '#edebe9',   // DESIGN.md "Ceramic" — pressed states, zone separators
  canvas:        '#ffffff',   // DESIGN.md "White" — card surface on warm canvas
  bandDark:      '#1f1d3d',   // Feature band (Panchang equivalent of House Green)
  blockNavy:     '#1f1d3d',   // Alias — BentoCard 'navy' color

  // ── Ink ─────────────────────────────────────────────────────────────────
  ink:             'rgba(0,0,0,0.87)',   // DESIGN.md "Text Black" — adapts to bg warmth
  inkSoft:         'rgba(0,0,0,0.50)',   // DESIGN.md "Text Black Soft" — metadata, captions
  inverseInk:      '#ffffff',
  inverseInkSoft:  'rgba(255,255,255,0.65)', // Secondary text inside dark band surfaces

  // ── Legacy aliases ───────────────────────────────────────────────────────
  primary:       '#1a1a1a',
  onPrimary:     '#ffffff',
  inverseCanvas: '#1a1a1a',

  // ── Surfaces ─────────────────────────────────────────────────────────────
  surfaceSoft:  '#f5f4f1',
  hairline:     '#e7e7e7',   // DESIGN.md nutrition table hairline
  hairlineSoft: '#ede9e3',   // Softer warm divider (use hairline for high-contrast needs)
  hairlineDark: 'rgba(255,255,255,0.12)', // Dividers inside dark band

  // ── Bento block palette (Panchang identity) ──────────────────────────────
  blockLime:  '#dceeb1',
  blockLilac: '#c5b0f4',
  blockCream: '#f4ecd6',
  blockMint:  '#c8e6cd',
  blockPink:  '#efd4d4',
  blockCoral: '#f3c9b6',

  // ── Ceremony accent ──────────────────────────────────────────────────────
  // DESIGN.md: Gold reserved for festival / vrat ceremony moments only.
  accentGold:     '#cba258',
  accentGoldWash: '#faf6ee',
  accentMagenta:  '#ff3d8b',

  // ── Semantic ─────────────────────────────────────────────────────────────
  semanticSuccess: '#1ea64a',
  semanticError:   '#c82014',  // DESIGN.md "Red"
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
  // DESIGN.md §5 cards = 12px. Previous value was 20 — most visible single change.
  lg:   12,
  card: 12,
  xl:   24,
  pill: 50,   // DESIGN.md: ALL buttons 50px full-pill, no exceptions
  full: 9999,
} as const;

// Inter substitutes for SoDoSans (DESIGN.md §3 Note on Font Substitutes).
export const Type = {
  // 54px editorial hero — tithi name, the screen's ONE BIG MOMENT.
  displayHero: {
    fontFamily:    'Inter_700Bold',
    fontSize:      54,
    lineHeight:    58,
    letterSpacing: -1.5,
  },
  displayXl: {
    fontFamily:    'Inter_700Bold',
    fontSize:      40,
    lineHeight:    44,
    letterSpacing: -1.0,
  },
  displayLg: {
    fontFamily:    'Inter_700Bold',
    fontSize:      30,
    lineHeight:    36,
    letterSpacing: -0.6,
  },
  headline: {
    fontFamily:    'Inter_600SemiBold',
    fontSize:      22,
    lineHeight:    28,
    letterSpacing: -0.3,
  },
  subhead: {
    fontFamily:    'Inter_400Regular',
    fontSize:      18,
    lineHeight:    26,
    letterSpacing: -0.2,
  },
  cardTitle: {
    fontFamily:    'Inter_700Bold',
    fontSize:      17,
    lineHeight:    22,
    letterSpacing: -0.1,
  },
  bodyLg: {
    fontFamily:    'Inter_400Regular',
    fontSize:      16,
    lineHeight:    26,
    letterSpacing: -0.16,
  },
  body: {
    fontFamily:    'Inter_400Regular',
    fontSize:      14,
    lineHeight:    22,
    letterSpacing: -0.14,
  },
  bodySm: {
    fontFamily:    'Inter_400Regular',
    fontSize:      13,
    lineHeight:    20,
    letterSpacing: -0.13,
  },
  label: {
    fontFamily:    'Inter_600SemiBold',
    fontSize:      13,
    lineHeight:    18,
    letterSpacing: -0.13,
  },
  // DESIGN.md "letterSpacingLooser: 0.15em" for uppercase section labels
  eyebrow: {
    fontFamily:    'Inter_600SemiBold',
    fontSize:      10,
    lineHeight:    14,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
  },
  caption: {
    fontFamily:    'Inter_500Medium',
    fontSize:      9,
    lineHeight:    12,
    letterSpacing: 0.8,
    textTransform: 'uppercase' as const,
  },
} as const;

// DESIGN.md §6: Whisper-soft layered shadows. RN supports one shadow per View.
export const Shadows = {
  // Approximates: 0 0 0.5px rgba(0,0,0,0.14), 0 1px 1px rgba(0,0,0,0.24)
  card: {
    shadowColor:   '#000000',
    shadowOffset:  { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius:  2,
    elevation:     2,
  },
  // Approximates Starbucks nav triple-layer: 0.1 / 0.06 / 0.07
  sheet: {
    shadowColor:   '#000000',
    shadowOffset:  { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius:  16,
    elevation:     16,
  },
} as const;
