# TODOS

Both v1 TODOs were resolved by the v2 rebuild — not by building them, but by removing
the features that demanded them:

- ~~TODO-1: Rashifal JSON content~~ — the pseudo-random weekly rashifal was removed
  entirely. Replaced with the computable **Moon transit + Chandrashtama** feature
  (`src/lib/moonRashi.ts`), which needs no editorial content.
- ~~TODO-2: Editable birth details~~ — birth date/time/place collection was removed;
  nothing computed from them. Name is now edited inline in Profile.

## Open items

### TODO-3: Vrat guide depth
**What:** Expand `content/days/*.json` coverage so more tithi keys (Chaturthi, Pradosh,
Purnima, Amavasya variants per masa) have real dos/donts and vrat guides instead of the
regular-day fallback.
**Why:** The Today tab's vrat sheet currently shows generic observance basics when the
day-content JSON has no entry.

### TODO-4: Notification scheduling
**What:** Schedule local notifications from the upcoming-events scanner (e.g. "Ekadashi
tomorrow") instead of relying only on server push.
**Context:** `useUpcoming` already computes the events and caches them daily; wiring
`expo-notifications` scheduleNotificationAsync to the top event is straightforward.

### TODO-5: Karana display
**What:** panchang-ts exposes karanas; the Today tab shows 4 of the 5 panchang limbs.
Add Karana to the Panchang card for completeness.
