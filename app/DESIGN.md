# Panchang Design System v3 — "Soft Data"

**Reference:** rounded fintech-statistics aesthetic (soft cards, chunky rings, legend dots, pill controls) translated to **light mode**.
**Font:** Manrope (Google Fonts) · **Canvas:** `#F2F2F4` · **Cards:** `#FFFFFF` radius 26 · **Brand accent:** saffron `#F4590D`

---

## §1 — Philosophy

One muted gray page, very round white cards, near-black ink. Color lives only in
small data elements — ring segments, legend dots, chips, one pill badge — never on
large surfaces. Active states use a **dark pill** (`#1E1F22`, white text), exactly like
the reference's Month/Year segmented control. Numbers are the heroes: extra-bold,
tight tracking. Icons are thin outline (Ionicons `-outline` variants) only.

---

## §2 — Color

| Token | Hex | Usage |
|---|---|---|
| `canvas` | `#F2F2F4` | Page background |
| `surface` | `#FFFFFF` | Cards |
| `surfaceSoft` | `#F6F6F8` | Inset chips, inputs, segmented track |
| `surfaceDim` | `#ECECEF` | Pressed, skeleton |
| `ink` | `#17181A` | Primary text |
| `inkMute` | `#84858C` | Secondary text |
| `inkFaint` | `#B9BAC2` | Placeholder, disabled |
| `pill` | `#1E1F22` | Active segmented pill, dark chips |
| `accent` | `#F4590D` | Saffron — CTA, active tab, sacred highlight |
| `accentWash` | `#FEEFE6` | Featured card tint |
| `hairline` | `#E8E8EC` | Dividers |
| `success` / `error` | `#3BA55D` / `#D9463E` | Semantic |

**Data palette** (rings, dots, deity chips): `dataSky #7EC4F0`, `dataIndigo #7D8CFB`,
`dataGreen #63BE7E`, `dataCoral #FC7F6C`, `dataLime #D3EC5C`, `dataAmber #FFAE55`,
`dataGray #A9AAB1`. Each has a `wash*` background tint. The lime pill badge
(`dataLime` bg + ink text) marks the single most positive fact on a screen —
use at most once per screen.

**Deity color map** (stable, users learn it): Ganesha=amber, Shiva=indigo,
Vishnu/Krishna/Rama=sky, Devi/Durga/Kali/Hanuman=coral, Lakshmi=lime,
Saraswati=green, Universal=gray. Helper: `deityColor(deity)`.

---

## §3 — Typography (Manrope)

| Token | Weight | Size/Line | Usage |
|---|---|---|---|
| `displayXl` | 800 | 38/44, −0.8 | Tithi hero, big numerals |
| `display` | 800 | 30/36, −0.5 | Ring center %, section heroes |
| `title` | 700 | 21/28 | Screen title (centered header) |
| `heading` | 700 | 17/24 | Card titles |
| `label` | 700 | 14/20 | Legend rows, values, buttons |
| `body` | 500 | 15/23 | Prose |
| `bodySm` | 500 | 13/19 | Secondary prose |
| `caption` | 600 | 12/16 | Muted labels — sentence case, **never uppercase** |
| `captionSm` | 600 | 11/14 | Tiny meta |

**Devanagari rule:** Sanskrit text must NOT set `fontFamily` — the system font
renders Devanagari on iOS and Android; Manrope covers Latin only. Sanskrit sits at
19–21px with relaxed 1.6 line-height.

---

## §4 — Shape & Depth

- Card radius **26**, chips **18**, controls full-pill **999**.
- Card padding 20. Cards sit flush on canvas with a barely-there shadow
  (`opacity 0.05, radius 14`) — contrast does the work, not depth.
- Screen header: back/menu icons at edges, `title` centered (reference layout).

## §5 — Components

- **SegmentedPill** — `surfaceSoft` track, active option gets the dark `pill` with
  white text. Used for Month/Week toggles, deity filters.
- **ProgressRing** — SVG donut, stroke 12, round caps, segments separated by gaps
  (reference donut). Center holds a `display` value.
- **LegendRow** — 10px colored dot + `label` name + `label` value right-aligned.
- **Chip** — wash background + dot + caption text.
- **Badge (lime)** — `dataLime` pill, ink `label` text.
- **ListRow** — icon in a `surfaceSoft` squircle (radius 16), title + sub, chevron.
- **Tab bar** — white, no border, height 62, **icon-only** thin outline icons;
  active = ink color + 4px dot below; inactive = `inkFaint`.
- **Sheets** — full-width bottom sheets, radius 26 top corners, drag handle.

## §6 — Motion

- Press feedback: opacity 0.85 + scale 0.98, 120ms.
- Sheets: 260ms ease-out slide.
- No looping/pulsing animations except skeleton shimmer while loading.

## §7 — Voice

Sentence case everywhere (no ALL-CAPS labels). Numbers first, words second.
English UI with Sanskrit terms romanized inline; Devanagari reserved for
shloka text itself.
