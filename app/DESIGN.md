# Panchang Design System v2

**Font:** Urbanist (Google Fonts)  
**Accent:** #FF660E (orange)  
**Background:** #F5F5F5 (light gray canvas) + #FFFFFF (white cards)  

---

## §1 — Philosophy

Clean, modern consumer-app aesthetic. White cards on a light gray page. One orange accent, used sparingly — only for CTAs, active states, and sacred-day highlights. No colored bento blocks. Hierarchy through typography weight, not surface hue.

---

## §2 — Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `Colors.canvas` | `#F5F5F5` | Screen / page background |
| `Colors.canvasWarm` | `#F5F5F5` | Alias for canvas — tab root backgrounds |
| `Colors.surface` | `#FFFFFF` | Card, input, sheet surfaces |
| `Colors.surfaceSoft` | `#F8F8F8` | Subtle inset surfaces (search bars, locked rows) |
| `Colors.surfaceDim` | `#EFEFEF` | Pressed / skeleton state |
| `Colors.bandDark` | `#1A1A1A` | Hero feature band (tithi, sunrise) |
| `Colors.accent` | `#FF660E` | Primary CTA, active tab, selected |
| `Colors.accentWash` | `#FFF0E8` | Vrat / sacred day card tint |
| `Colors.ink` | `#000000` | Primary text |
| `Colors.inkSoft` | `#A5A5A5` | Secondary / muted text, tab inactive |
| `Colors.inkFaint` | `rgba(0,0,0,0.35)` | Placeholder, ghost labels |
| `Colors.inverseInk` | `#FFFFFF` | Text on dark surfaces |
| `Colors.inverseInkSoft` | `rgba(255,255,255,0.65)` | Secondary text on dark |
| `Colors.hairline` | `#EBEBEB` | Dividers, borders |
| `Colors.hairlineSoft` | `#EBEBEB` | Alias for hairline — page header borders |
| `Colors.hairlineDark` | `rgba(255,255,255,0.12)` | Dividers on dark (bandDark) surfaces |
| `Colors.semanticSuccess` | `#1ea64a` | Success states, confirmations |
| `Colors.semanticError` | `#c82014` | Destructive actions, error states |

**Deprecated / do not use:** `blockLilac`, `blockCream`, `blockMint`, `blockCoral`, `blockLime`, `blockPink` — removed from Vastu tab, not for new UI. `accentGold`, `accentGoldWash`, `accentMagenta`, `canvasCeramic`, `inverseCanvas` — aliases pointing to canonical tokens above.

**Rule:** Orange touches only 3 things per screen — the active tab indicator, the primary CTA button, and at most one content highlight. Everything else is black, white, or gray.

---

## §3 — Typography

Font family: **Urbanist** (geometric sans-serif). Loaded weights: 400 Regular, 500 Medium, 600 SemiBold, 700 Bold.

| Token | Family | Size | Line-height | Weight |
|-------|--------|------|-------------|--------|
| `displayHero` | Bold | 52 | 56 | 700 |
| `displayXl` | Bold | 38 | 42 | 700 |
| `displayLg` | Bold | 28 | 34 | 700 |
| `headline` | SemiBold | 20 | 26 | 600 |
| `subhead` | Regular | 17 | 25 | 400 |
| `cardTitle` | SemiBold | 16 | 22 | 600 |
| `bodyLg` | Regular | 16 | 26 | 400 |
| `body` | Regular | 14 | 22 | 400 |
| `bodySm` | Regular | 13 | 20 | 400 |
| `label` | SemiBold | 14 | 18 | 600 |
| `eyebrow` | SemiBold | 11 | 14 | 600 | UPPERCASE |
| `caption` | Medium | 11 | 14 | 500 | UPPERCASE |

**Rule:** Use weight shifts (400 → 600 → 700) to create hierarchy, not size shifts.

**Devanagari note:** Sanskrit glyphs MUST NOT use `fontFamily`. The system font handles Devanagari on both iOS and Android — Urbanist only covers Latin.

---

## §4 — Card System

BentoCard has 4 variants:

| Variant | Background | Text | Usage |
|---------|-----------|------|-------|
| `white` (default) | `#FFFFFF` | `ink` | All general content cards |
| `dark` | `#1A1A1A` | `inverseInk` | Hero feature band, Tithi, Sunrise/Sunset |
| `featured` | `#FFF0E8` | `ink` | Vrat / sacred day — the one card with color |
| `soft` | `#F5F5F5` | `ink` | Do Today / Avoid — flush on canvas |

Cards are `borderRadius: 16`, padding `24px`, shadow `Shadows.card`.

---

## §5 — Spacing & Radius

**Scale:** 4 / 8 / 12 / 16 / 24 / 32 / 56 (4pt base)

**Radius:** 16px cards (rounder than v1), 50px pill for all buttons.

---

## §6 — Buttons

All buttons are full-pill (`borderRadius: 50`).

| Variant | Background | Text | Usage |
|---------|-----------|------|-------|
| Primary | `#FF660E` | `#FFFFFF` | Continue, Yes/Allow, Save |
| Ghost | transparent + `#EBEBEB` border | `#000000` | Skip, Not now |
| Destructive | `#c82014` | `#FFFFFF` | Sign out, Delete |

Press animation: `Animated.spring` scale 0.95 → 1.0.

---

## §7 — Bottom Tab Bar

- Background: `Colors.surface` (white)
- Border top: `Colors.hairline` 1px
- Active: `Colors.accent` icon + label; icon wrapped in orange pill
- Inactive: `Colors.inkSoft` (#A5A5A5)
- Label: Urbanist_600SemiBold 10px

---

## §8 — AI Slop Guard

Never: gradient backgrounds, 3-column icon grids, generic placeholder copy, decorative separators every section, drop shadows on text, colored text outside `ink` / `inkSoft` / `inverseInk` / `accent`.

Orange is load-bearing. More than 3 orange elements per screen means you're using it wrong.
