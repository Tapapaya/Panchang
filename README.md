# Panchang

A Hindu calendar app for the diaspora — daily Panchang, a complete stotra library, moon-sign transits, and Vastu guidance. Everything is computed on-device; nothing is guessed.

![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-black)
![Expo](https://img.shields.io/badge/expo-SDK%2054-blue)
![React Native](https://img.shields.io/badge/react%20native-0.81-blue)
![TypeScript](https://img.shields.io/badge/typescript-5.9-blue)

---

## What is this?

Panchang (Sanskrit **पञ्चाङ्ग**, "five limbs") is the traditional Hindu almanac built from five elements — **Tithi** (lunar day), **Vara** (weekday), **Nakshatra** (lunar mansion), **Yoga** (Sun–Moon combination), and **Karana** (half-tithi). This app computes all of them astronomically for your city and timezone, and pairs them with a fully sourced devotional library.

**Design principle: no fabricated content.** Every number in the app is derived from real astronomical computation (`panchang-ts`), and every "personalised" feature (like the Chandrashtama alert) is a deterministic, traditional rule — not generated horoscope filler.

---

## Features

### Today
- **Tithi hero** — lunar day, paksha, masa, and Vikram Samvat year for your city
- **Daylight ring** — live % of daylight elapsed, sunrise/sunset/moonrise, and the computed **Brahma muhurta** window
- **Panchang elements** — Nakshatra (with pada and end time), Yoga, weekday deity, **Rahu Kalam** — each with a tap-through explainer of what it actually is
- **Vrat & festival detection** — engine-detected festivals plus tithi-derived observances, with an observance guide
- **Moon today** — the Moon's current rashi computed from nakshatra + pada, with a **Chandrashtama alert** when the Moon transits the 8th sign from your janma rashi (a real, fully computable Vedic rule)
- **Upcoming** — the next Ekadashis, Purnima, Amavasya, Sankashti and Pradosh dates plus named festivals, found by scanning the panchang engine forward 21 days (cached daily)
- **Daily shloka** and tithi-based do/avoid guidance

### Stotras
- **45+ compositions, verse by verse** — every verse carries its own Sanskrit, IAST transliteration, and English meaning, interleaved in a dedicated reader
- **About every composition** — origin, composer, and what it is chanted for; honest labeling when only key verses of a long work are included (e.g. "4 of 41 verses")
- Complete texts include the **Hanuman Chalisa** (all 40 chaupais + dohas), Rudrashtakam, Lingashtakam, Bilvashtakam, Nirvana Shatakam, Shiva Panchakshara, Ganesh Pancharatnam, Madhurashtakam, Govindashtakam, Mahalakshmi Ashtakam, Gurvashtakam, Navagraha Stotra, Sankat Mochan Hanumanashtak, and many more
- **Search + deity filter chips + favorites** (persisted locally)

### Vastu
- **Interactive Vastu Purusha Mandala** — a 3×3 direction grid (N/Kubera, NE/Ishana, SE/Agni, SW/Nirriti…) with per-zone deity, element, and recommended use
- **Room guides** — entrance, kitchen, bedroom, puja room, colours, and quick-reference essentials; each tip expands to show the Sanskrit term, the traditional reasoning, and its source text

### Profile
- Name, moon sign (drives the Chandrashtama alert), and city (drives all timings)
- 21 cities across India, USA, UK, Canada, Australia, Singapore, UAE — with IANA timezones and DST handled by the engine
- Push notification registration per city

---

## Design system — "Soft Data" (v3)

Light-mode translation of a rounded fintech-statistics aesthetic: muted gray canvas (`#F2F2F4`), white cards with radius 26, near-black ink, **Manrope** type with extra-bold numerals, thin outline icons, icon-only tab bar. Color appears only in small data elements — ring segments, legend dots, deity chips, and one lime badge per screen. Active states use a dark pill (`#1E1F22`). Full spec in [`app/DESIGN.md`](app/DESIGN.md), tokens in [`design/tokens.json`](design/tokens.json).

Deity color map (stable across the app): Ganesha=amber · Shiva=indigo · Vishnu/Krishna/Rama=sky · Devi/Hanuman=coral · Lakshmi=lime · Saraswati=green.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Expo SDK 54 + expo-router v6 (file-based routing) |
| Language | TypeScript 5.9, strict |
| Calendar engine | [`panchang-ts`](https://www.npmjs.com/package/panchang-ts) — tithi, nakshatra, yoga, sunrise/sunset, Rahu Kalam, festivals |
| New logic | `moonRashi.ts` (nakshatra+pada → rashi, Chandrashtama), `upcoming.ts` (21-day observance scanner), `sunWindows.ts` (Brahma muhurta, daylight progress) |
| UI | Custom kit (`Card`, `SegmentedPill`, `ProgressRing` on react-native-svg, `Chip`, `LegendRow`, `Sheet`) |
| State | React Context + AsyncStorage (local-first; no accounts) |
| Notifications | expo-notifications, city-scoped registration |
| Testing | Jest 29 + jest-expo — 42 tests incl. full 108-pada moon-rashi mapping |

## Project structure

```
app/
├── app/                      # expo-router routes
│   ├── _layout.tsx           # Root: fonts, AppProvider, PushRegistrar
│   ├── index.tsx             # Routing gate (onboarding vs tabs)
│   ├── onboarding.tsx        # 3-step: name → city → rashi
│   └── (tabs)/               # Today · Stotras · Vastu · Profile
├── components/ui/            # Kit.tsx, ProgressRing.tsx, Sheet.tsx
├── constants/design.ts       # Soft Data tokens (colors, type, radius, deity map)
├── src/
│   ├── data/stotras/         # Verse-structured library (6 files by deity)
│   ├── hooks/                # useTodayData, useUpcoming
│   ├── lib/                  # PanchangService, moonRashi, upcoming, sunWindows, rules
│   └── types/                # City list, profile
└── content/                  # Day-content JSON (daily shloka, vrat guides, rules)
```

## Getting started

```bash
git clone https://github.com/tapanmujumdar04-blip/Panchang.git
cd Panchang/app
npm install --legacy-peer-deps
npm start            # Expo dev server (i = iOS, a = Android)
npx jest             # run the test suite
npx tsc --noEmit     # typecheck
```

## What was deliberately removed

- **Weekly "rashifal" horoscope** — the previous version generated pseudo-random horoscope text from a seed. Replaced with the honest, computable **Moon transit + Chandrashtama** feature.
- **Birth date/time/place collection** — the app collected them but computed nothing from them. Gone until there's a real feature behind them.
- **Email field, dead `App.tsx` entry, mock panchang fallback** — the Today tab now shows a loading skeleton rather than fake data.

## License

MIT
