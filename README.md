# Panchang

A Hindu calendar app for the diaspora — daily Panchang, Stotras, Rashifal, and Vastu guidance in your pocket.

![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-black)
![Expo](https://img.shields.io/badge/expo-SDK%2054-blue)
![React Native](https://img.shields.io/badge/react%20native-0.81-blue)
![TypeScript](https://img.shields.io/badge/typescript-5.9-blue)

---

## What is this?

Panchang is a React Native / Expo app built for Hindu families living outside India who want a simple, beautiful daily spiritual companion.

The name comes from the Sanskrit **पञ्चाङ्ग** — literally "five limbs" — the five elements of the traditional Hindu almanac that govern auspicious timing:

| Anga | Meaning |
|------|---------|
| **Tithi** | Lunar day |
| **Vara** | Day of the week |
| **Nakshatra** | Lunar mansion |
| **Yoga** | Auspicious combination |
| **Karana** | Half-day period |

---

## Features

### Today Tab
- Live Panchang for your city: Tithi, Nakshatra, Yoga, Vara, Karana
- Sunrise / Sunset times calculated for your location
- Today's festival, Ekadashi, or Vrat — with a guide on how to observe it
- Weekly Rashifal (horoscope) for your Moon Sign
- "Do Today" and "Avoid Today" guidance based on the current Tithi

### Stotras Tab
- 25+ complete Sanskrit prayers and stotras — fully end-to-end, not just opening verses
- Includes: Hanuman Chalisa (all 40 chaupais), Nirvana Shatakam, Lingashtakam, Bilvashtakam, Rudrashtakam, Mahalakshmi Ashtakam, Ganesh Pancharatnam, Saraswati Ashtakam, Tulasi Ashtakam, Shri Suktam (all 16 riks), Purusha Suktam, Saundarya Lahari, Shiv Mahimna Stotra, Madhura Ashtakam, Govinda Ashtakam, Aigiri Nandini, Kaal Bhairav Ashtakam, Kali Ashtakam, Argala Stotram, Bajrang Baan, and more
- IAST transliteration + English meaning for every verse
- Searchable by deity, occasion, or keyword

### Rashifal Tab
- Moon sign (Rashi) based weekly horoscope
- Set your Rashi in Profile; updated weekly using ISO 8601 week numbers

### Vastu Tab
- Room-by-room Vastu guidance
- Direction recommendations for furniture, deities, and energy flow

### Profile Tab
- Pick your city from a curated list across India, UK, US, Canada, and Australia
- Set your Moon Sign (Rashi) for personalized Rashifal
- Birth details storage (name, date, time, place of birth)
- Push notifications for festival reminders (linked to your city)

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | [Expo SDK 54](https://expo.dev) + [expo-router](https://expo.github.io/router) v6 |
| Language | TypeScript 5.9 |
| UI | React Native 0.81 + custom design system (`Urbanist` font, `#FF660E` accent) |
| State | React Context (`AppContext`) + AsyncStorage |
| Calendar engine | [`panchang-ts`](https://www.npmjs.com/package/panchang-ts) — Tithi, Nakshatra, Yoga, Karana, sunrise/sunset |
| Backend | Supabase (auth + future sync) |
| Notifications | `expo-notifications` — city-aware push registration |
| Testing | Jest 29 + `jest-expo` + `@testing-library/react-native` |
| Navigation | File-based routing via `expo-router` |

---

## Project Structure

```
app/
├── app/
│   ├── _layout.tsx          # Root layout — AppProvider + PushRegistrar
│   ├── (tabs)/
│   │   ├── index.tsx        # Today tab
│   │   ├── stotras.tsx      # Stotras tab (25+ complete prayers)
│   │   ├── vastu.tsx        # Vastu tab
│   │   └── profile.tsx      # Profile + settings
│   └── onboarding.tsx
├── components/
│   ├── BentoCard.tsx        # 4-variant card system (white/dark/featured/soft)
│   ├── BottomSheet.tsx
│   ├── NotificationPromptCard.tsx
│   └── sheets/
│       ├── ExplainerSheet.tsx
│       └── VratGuideSheet.tsx
├── constants/
│   └── design.ts            # Full design token system
├── screens/
│   ├── TodayScreen.tsx
│   ├── CityPickerScreen.tsx
│   └── OnboardingScreen.tsx
├── src/
│   ├── constants/
│   │   └── rashis.ts        # Canonical 12-rashi definitions (single source of truth)
│   ├── context/
│   │   └── AppContext.tsx   # City, profile, rashi state
│   ├── lib/
│   │   ├── weekUtils.ts     # ISO 8601 week number (for Rashifal JSON key)
│   │   └── __tests__/
│   │       └── weekUtils.test.ts
│   └── types/
│       ├── content.ts       # City list and content types
│       └── profile.ts       # Profile and storage key types
└── content/
    ├── shlokas/             # Shloka JSON (future use)
    ├── sankalp_templates/   # Vrat sankalp templates
    ├── festivals/           # Festival content
    └── rules/               # Tithi/vara rules
```

---

## Design System

The app uses a custom token-based design system documented in [`DESIGN.md`](app/DESIGN.md).

**Philosophy:** Clean, modern consumer-app aesthetic. White cards on light gray. One orange accent (`#FF660E`), used sparingly — only for CTAs, active states, and sacred-day highlights. Hierarchy through weight, not color.

**Typography:** [Urbanist](https://fonts.google.com/specimen/Urbanist) (Google Fonts). Sanskrit/Devanagari text uses the system font — Urbanist only covers Latin.

**Card variants:** `white` (default), `dark` (hero band), `featured` (Vrat/sacred day, orange wash), `soft` (flush on canvas).

---

## Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android emulator, or the [Expo Go](https://expo.dev/client) app

### Install

```bash
git clone https://github.com/yourusername/panchang.git
cd panchang/app
npm install
```

### Run

```bash
npm start          # Expo dev server
npm run ios        # iOS simulator
npm run android    # Android emulator
npm run web        # Web browser
```

### Test

```bash
cd app
npx jest
```

---

## Stotras Coverage

Every prayer in the Stotras tab is complete — full Sanskrit text, IAST transliteration, and English meaning. No stub entries.

| Stotra | Verses | Deity |
|--------|--------|-------|
| Hanuman Chalisa | 2 dohas + 40 chaupais + closing doha | Hanuman |
| Nirvana Shatakam | 6 | Shiva (Advaita) |
| Lingashtakam | 8 | Shiva |
| Bilvashtakam | 8 | Shiva |
| Rudrashtakam | 8 | Shiva |
| Shiv Mahimna Stotra | Selected from 41 | Shiva |
| Mahalakshmi Ashtakam | 8 | Lakshmi |
| Shri Suktam | 16 riks | Lakshmi |
| Ganesh Pancharatnam | 5 | Ganesha |
| Saraswati Ashtakam | 8 | Saraswati |
| Madhura Ashtakam | 8 | Krishna |
| Govinda Ashtakam | 8 | Krishna |
| Aigiri Nandini | 6 | Durga |
| Jai Ambe Gauri (Durga Aarti) | 12 | Durga |
| Argala Stotram | Key verses | Durga |
| Kaal Bhairav Ashtakam | 8 | Bhairava |
| Kali Ashtakam | 8 | Kali |
| Sankat Mochan Hanumanashtak | 8 | Hanuman |
| Bajrang Baan | Key chaupais | Hanuman |
| Vishnu Aarti (Om Jai Jagdish) | 8 | Vishnu |
| Saundarya Lahari | Selected from 100 | Devi |
| Gurvashtakam | 8 | Guru |
| Tulasi Ashtakam | 8 | Tulasi |
| Purusha Suktam | 10 of 16 | Universal |
| + Gayatri, Navagraha, Ganga, and more | — | — |

---

## Roadmap

See [`TODOS.md`](app/TODOS.md) for the current task list. Key items:

- [ ] **Rashifal content** — Write `content/rashifal/{rashi}.json` for all 12 rashis (weeks 25–27 minimum = 36 entries) and replace the current placeholder generator
- [ ] **Editable birth details** — Allow inline editing of birth date/time/place in Profile without requiring a full sign-out

---

## Contributing

This project is for personal and family use. PRs welcome for:
- Correcting Sanskrit or IAST errors
- Adding missing stotras or festivals
- City timezone data
- Rashifal content (JSON format documented in `DESIGN.md`)

---

## License

MIT
