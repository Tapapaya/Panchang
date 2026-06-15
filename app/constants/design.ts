// Design tokens from figma/DESIGN.md
// Font: Inter substitutes for figmaSans (documented in DESIGN.md § Typography > Note on Font Substitutes)

export const Colors = {
  primary: '#000000',
  onPrimary: '#ffffff',
  ink: '#000000',
  canvas: '#ffffff',
  inverseCanvas: '#000000',
  inverseInk: '#ffffff',
  surfaceSoft: '#f7f7f5',
  hairline: '#e6e6e6',
  hairlineSoft: '#f1f1f1',
  blockLime: '#dceeb1',
  blockLilac: '#c5b0f4',
  blockCream: '#f4ecd6',
  blockMint: '#c8e6cd',
  blockPink: '#efd4d4',
  blockCoral: '#f3c9b6',
  blockNavy: '#1f1d3d',
  accentMagenta: '#ff3d8b',
  semanticSuccess: '#1ea64a',
} as const;

export const Spacing = {
  hair: 1,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const Radius = {
  xs: 2,
  sm: 6,
  md: 8,
  lg: 20,
  xl: 28,
  pill: 50,
  full: 9999,
} as const;

// Inter weight → figmaSans weight equivalents:
//   300  ≈ 320–330 (light body)
//   400  ≈ 340     (regular body)
//   500  ≈ 480     (medium — links, buttons)
//   600  ≈ 540     (semi-bold — headlines)
//   700  ≈ 700     (bold — card titles)
export const Type = {
  displayXl: {
    fontFamily: 'Inter_700Bold',
    fontSize: 42,
    lineHeight: 44,
    letterSpacing: -1.0,
  },
  displayLg: {
    fontFamily: 'Inter_700Bold',
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: -0.6,
  },
  headline: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 22,
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  subhead: {
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    lineHeight: 26,
    letterSpacing: -0.2,
  },
  cardTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: 0,
  },
  bodyLg: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.1,
  },
  body: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.1,
  },
  bodySm: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0,
  },
  eyebrow: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1.0,
    textTransform: 'uppercase' as const,
  },
  caption: {
    fontFamily: 'Inter_500Medium',
    fontSize: 9,
    lineHeight: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase' as const,
  },
} as const;
