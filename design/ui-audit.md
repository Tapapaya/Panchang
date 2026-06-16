# Panchang UI Audit
Generated: 2026-06-15 | Auditor: ui-designer agent

---

## What's working well

- **Color palette** — The block-* palette (cream, lilac, mint, coral, lime, pink, navy) is warm and differentiated. Each card reads its own identity immediately.
- **Typographic hierarchy** — eyebrow (10px uppercase) → headline (22px) → body (14px) is clear. The displayXl (42px) tithi name on the hero card earns its prominence.
- **Step badges in VratGuideSheet** — Ink-circle badge with coral text is a strong design anchor. Numbers on colored backgrounds pop.
- **Navy break-fast card** — Coral sheet + navy card = highest contrast moment in the app. Signals "next action" before a word is read.
- **Copy** — "You'll hear from us only when there's something worth knowing. See you tomorrow." — editorial-grade, earns trust.
- **Greeting header** — Two-line left column (brand + greeting) paired with date + deity on the right creates a morning ritual feel.

---

## Issues & improvements

### 1. BentoCard press feedback — opacity only, no kinetic feel
**Severity: High**
Current `opacity: 0.88` on press is barely perceptible and gives no sense of depth or spring. Cards feel like they're on a printed page, not interactive surfaces.
**Fix:** Spring scale (0.97) + opacity (0.92) on `PressIn` / bounce-back on `PressOut` using `Animated.spring`.

### 2. BottomSheet — flat against backdrop
**Severity: Medium**
The sheet lifts on top of content but has zero elevation. On colored sheets (coral, lilac) it reads as a continuation of the background rather than a lifted surface.
**Fix:** Add `shadowColor #000 / offset(0,-4) / opacity 0.12 / radius 16 / elevation 12` to the sheet container.

### 3. VratGuideSheet — step rhythm too tight + breakFastCard corners inconsistent
**Severity: Medium**
- Steps are `gap: Spacing.sm` (12px) inside `inner` — correct at the grid level but all children share the same gap, making eyebrow / title / steps feel equally weighted.
- `breakFastCard` has `borderRadius: Radius.md` (8px) while all cards are `Radius.lg` (20px). Inconsistent corner language.
- `significance` text at `opacity: 0.75` is slightly dim for the amount of reading it requires.
**Fix:** explicit `marginBottom` on step rows, bump border radius to `Radius.lg`, increase opacity to 0.82.

### 4. NotificationPromptCard — ghost button feels like plain text
**Severity: Medium**
"Not now" is a `Pressable` with no visual boundary. Touch target is minimal (just padding). On mobile it's hard to distinguish from decorative copy.
**Fix:** Light bordered pill variant matching the primary button height. Adds affordance without weight.

### 5. Missing design tokens
**Severity: Low-Medium**
- No `label` token for button labels / badge text (currently inline `fontFamily: 'Inter_600SemiBold'`).
- No `Shadows` object — shadow values are magic numbers scattered per component.
**Fix:** Add both to `design.ts`.

### 6. ExplainerSheet divider — low contrast on colored backgrounds
**Severity: Low**
`Colors.hairline` (#e6e6e6) over `blockLilac` (#c5b0f4) is only ~1.8:1 contrast. The divider is nearly invisible.
**Fix:** Use `Colors.ink` at `opacity: 0.12` instead of `hairline` for adaptive contrast.

### 7. Accessibility
- `→` arrow has no `accessibilityLabel` on the Pressable
- `Type.caption` at 9px fails WCAG 2.1 AA (min 11px for normal weight). Only used as decorative metadata — acceptable but noted.
- Step badges in VratGuideSheet are decorative (beside readable text), so 24×24 is fine.

---

## Token gaps
| Missing | Proposed value |
|---------|----------------|
| `Type.label` | Inter_600SemiBold 12px/16px ls 0.4 |
| `Shadows.card` | offset(0,2) opacity 0.08 radius 8 elevation 4 |
| `Shadows.sheet` | offset(0,-4) opacity 0.12 radius 16 elevation 12 |

---

## Component state coverage

| Component | Default | Pressed | Confirmed | Empty |
|-----------|---------|---------|-----------|-------|
| BentoCard (static) | ✅ | — | — | — |
| BentoCard (tappable) | ✅ | ⚠️ opacity only | — | — |
| VratGuideSheet | ✅ | — | — | ⚠️ no guidelines handled |
| ExplainerSheet | ✅ | — | — | ✅ hides if no explanation |
| NotificationPromptCard | ✅ | ⚠️ opacity only | ✅ | — |

---

## Priority build order (UI pass)
1. BentoCard spring animation — most-felt, highest delight delta
2. design.ts tokens — unblocks everything else
3. BottomSheet shadow — depth and polish
4. VratGuideSheet rhythm + consistency
5. NotificationPromptCard ghost button
6. ExplainerSheet divider contrast fix
