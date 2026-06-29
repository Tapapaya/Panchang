# TODOS

## TODO-1: Rashifal content (content/rashifal/)

**What:** Write `content/rashifal/{rashi}.json` for all 12 rashis (weeks 25, 26, 27 minimum = 36 entries) and replace `getRashiData()` in `app/(tabs)/index.tsx` with a real JSON loader using `getISOWeek()` as the key.

**Why:** The Rashifal card currently shows algorithmically generated placeholder text (seed-based pseudo-random). Users see content that was never written by a human.

**Context:** JSON schema is in DESIGN.md (rashifal section). `getRashiData()` and the static `headlines`/`bodies` arrays in `app/(tabs)/index.tsx:28–52` are temporary scaffolding to be replaced. The `getISOWeek()` utility in `src/lib/weekUtils.ts` is already the correct key function. Design doc calls for 52 weeks × 12 rashis = 624 entries at full coverage; ship current week + 2 ahead (36 entries) at v1.

**Depends on:** Nothing. Content can be authored independently.

---

## TODO-2: Editable birth details in Profile

**What:** Add inline editing for birth date, time, and place in the Profile tab (or a dedicated edit screen), so users don't have to sign out to correct a typo.

**Why:** The only way to change birth details is "Sign out & reset", which also clears rashi, city, and all saved preferences. This is too destructive for a simple correction.

**Context:** Birth details are read-only RowItems at `app/(tabs)/profile.tsx:298–313`. The field inputs already exist in `screens/OnboardingScreen.tsx`. Profile data key: `PROFILE_KEY` (AsyncStorage). Pattern: expand the BIRTH DETAILS section into an accordion (same pattern as Rashi and City) with `TextInput` fields pre-filled from `profile`.

**Depends on:** Nothing.
