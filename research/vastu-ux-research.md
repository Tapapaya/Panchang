# Vastu Tab — UX Research Document
**Panchang App | Research Date: June 2026**
**Prepared for: Developer + Content Writer**

---

## Table of Contents

1. [Competitor Research](#1-competitor-research)
2. [User Personas](#2-user-personas)
3. [User Journey Maps](#3-user-journey-maps)
4. [Information Architecture Research](#4-information-architecture-research)
5. [Tip Card Design Specification](#5-tip-card-design-specification)
6. [Content Depth Recommendation](#6-content-depth-recommendation)

---

## 1. Competitor Research

### 1.1 Competitor Landscape Overview

The Vastu app space is crowded with technically shallow, often poorly-localised apps aimed at the Indian domestic market. Very few serve English-first, diaspora users. This is a significant gap.

#### Apps Surveyed

| App | Platform | Rating | Primary Feature | Key Gap |
|-----|----------|--------|-----------------|---------|
| **Vastu Compass by AppliedVastu** | iOS/Android | 5.0 (4 ratings) | GPS compass + 32-zone Vastu grid, Vastu Purusha Mandala overlay | No content/tips; purely a compass tool; professional-grade, intimidating to casual users |
| **Vastu Compass Home Office Life** (Mango Technologies) | iOS | 2.9 (7 ratings) | Layout builder + item positioning, real-time compliance check | Wrong diagonal directions reported by users; "not sure if results are right"; needs floor plans and photos |
| **CheckMyVastu** (MahaVastu) | iOS/Android | Mixed | Shakti Chakra intuitive diagnosis, 16-location home check | 10-degree calibration errors; infrequently updated; repeated/old content; clunky UX |
| **Revaastu** (Revival Vastu) | iOS/Android | — | World's first "live Vastu" using camera pointing at directions | Niche; requires user to already understand directions; limited educational content |
| **Vaastu Wisdom** (Binary Web Solutions) | iOS | Positive | Tips + directional tools, English/Gujarati/Hindi | Dining and drawing zone content is duplicated (same content in two sections); limited depth |
| **Best Vastu Tips** (raj kumar) | iOS | Too few ratings | Tip list | No user base; no trust signals |
| **MahaVastu Remedies** | iOS | — | Remedy lookup | Remedy-focused without underlying education; assumes prior knowledge |
| **Vastu Shastra Tips in Hindi** | iOS | — | Hindi-language tips | Not accessible to English-primary diaspora users |
| **iTeach Vastu** | iOS | — | Educational | Learning-focused, not reference-oriented |

#### What Competitors Do Well
- Compass/direction detection is a universally popular interactive feature
- Room-by-room organisation is the most common navigation pattern
- Remedy-focused content (what to do if Vastu is wrong) has strong user demand
- AppliedVastu has built professional credibility (used by architects and Vastu consultants)

#### What Competitors Consistently Fail At

1. **No English-first, diaspora-friendly framing.** Almost all apps assume the user knows what "Brahmasthan" or "Vastu Purusha" means. No competitor provides the "what this means and why it matters" layer for a cultural outsider.

2. **Poor content quality / depth trade-off.** Apps are either (a) too shallow — a tip list with no explanation — or (b) too specialist — a professional compass tool with no onboarding for beginners.

3. **No Sanskrit with translation.** Apps either use Sanskrit terms without explanation, or strip them out entirely. Neither serves diaspora users who want the cultural reverence layer.

4. **No regional or hemispheric awareness.** No app acknowledges that Vastu rules shift for Southern Hemisphere (Australia, South Africa) users, or notes North vs. South Indian textual traditions.

5. **Trust problem.** Multiple apps have compass calibration complaints. Users say "I don't know if this is correct." Static content guides don't have this problem.

6. **No "why does this matter" framing.** Tips are presented as rules without connecting to the underlying principle (five elements, solar path, energy flow). Diaspora users — especially skeptical ones — disengage without the reasoning.

7. **Outdated design.** Most apps look like they were designed in 2013 and haven't been updated. The visual gap between Panchang and competitors can be significant with minimal effort.

#### Strategic Positioning for Panchang's Vastu Tab

The Panchang Vastu tab should position itself as:
- **The accessible reference** — not a calculator, not a tool, but a beautifully written, English-first guide
- **Reverence + reason** — every tip gives the Sanskrit term AND the plain-English reasoning
- **Diaspora-aware** — written for someone who grew up in the UK or US, whose parents mentioned Vastu, and who wants to take it seriously without feeling like they're studying for an exam

This is an unoccupied position in the market. No current app owns it.

---

## 2. User Personas

### Persona 1 — The Vastu Specialist / Practitioner

**Name:** Vikram Sharma  
**Age:** 48  
**Location:** Leicester, UK  
**Occupation:** Part-time Vastu consultant; architect by training  
**Background:** Born in Gujarat, moved to UK at age 22. Studied classical Vastu from his father, who was a temple architect. Has done 60+ home consultations. Reads Manasara and Mayamata texts in Sanskrit with commentary. Uses WhatsApp groups with other practitioners in India.

**Tech Savviness:** High — uses AutoCAD for floor plan work, has multiple compass apps, familiar with AppliedVastu tools. Downloads apps often, deletes most within a week.

**Current Tools:** AppliedVastu Compass (professional), custom Excel sheets for logging client homes, PDF excerpts of classical texts saved to Notes app.

**Goals with a Vastu app:**
- Quick reference during a client walkthrough — he doesn't want to look unprofessional scrolling through a book
- Cross-check his memory on a specific rule (e.g., "which padas are acceptable for south-facing main door?")
- Something he can show a client to build credibility ("look, this app also says...")
- Content accurate enough that it won't embarrass him if a client reads it

**Frustrations:**
- Apps that state rules incorrectly, or oversimplify to the point of being wrong
- No acknowledgment of textual variation (which shastra are they citing?)
- Sanskrit spelled incorrectly or with wrong diacritics
- Being lumped in with casual users — he wants depth available, not hidden

**Mental model of Vastu:** Energy physics. A system of mapping solar orientation, geomagnetic forces, and the five elements (*Pancha Bhuta*) onto built space. The Vastu Purusha Mandala is a diagnostic grid, not a superstition.

**What he'd use the tab for:**
- Client-facing reference — especially tip cards with Sanskrit terminology
- Refresher on rules he doesn't consult daily (staircase, colours)
- Possibly showing clients the app as a "take-home" resource after a consultation

**What would make him leave immediately:**
- An incorrect tip stated as fact (e.g., "north is the best direction for all main doors" without explaining pada)
- Claim that Vastu is a religion
- No way to see the Sanskrit basis for a rule
- Compass inaccuracy (not relevant here since it's static content — actually a point in our favour)

---

### Persona 2 — The Diaspora Homeowner

**Name:** Priya Mehta  
**Age:** 34  
**Location:** New Jersey, USA  
**Occupation:** Software engineer at a healthcare company  
**Background:** Born in New Jersey to parents from Rajasthan. Speaks English natively, understands conversational Hindi, knows a handful of religious words (puja, diya, aarti). Just closed on a 3-bedroom house with her husband Arjun (also Indian-American). Her mother called the day they got the keys and said: "Make sure the kitchen isn't in the northeast, and put the mandir in the right direction."

**Tech Savviness:** Very high — early adopter of wellness apps, uses Headspace, tracks sleep, reads Wirecutter before any purchase.

**Current Search Behaviour:**
- Googled "Vastu for new home" → overwhelmed by contradictory tip lists
- Watched two YouTube videos — one was in Hindi, one was too long
- Asked in a South Asian homeowners Facebook group — got 12 different answers
- Downloaded two apps; both looked "scammy" and were in Hindi

**Goals:**
- Understand the basics quickly — not become an expert
- Know the top 5 things to check before they start decorating
- Have something concrete to tell her mother that shows she took it seriously
- Share something with Arjun that doesn't feel "superstitious" — he's an engineer too

**Frustrations:**
- Information overload — every source says something slightly different
- Feels condescended to when content assumes she speaks Hindi or knows Sanskrit
- Tip lists with no explanations — she wants to understand the logic
- Apps that feel like "astrology scams" rather than cultural heritage
- Conflicting advice (some say north entrance is best, others say east)

**Mental model of Vastu:** "My parents care about it, and honestly there's probably something to the solar/environmental angle. I'm not sure I believe in the spiritual parts but I'm willing to try the practical ones. I just want a clear starting point."

**What she'd use the tab for:**
- Entry section first (her mother specifically mentioned the main door)
- Bedrooms section — she's about to buy a bed frame
- Quick check before any furniture purchase: "is this right?"
- Sharing specific tip cards with her mother or on WhatsApp

**What would make her leave immediately:**
- Walls of text with no visual structure
- Content that feels judgmental or prescriptive ("you MUST do this or face negativity")
- No explanation of why — just rules
- An app that feels like it requires her to already know Vastu to use it
- Content in Hindi or with Sanskrit-only terms

---

### Persona 3 — The Curious Skeptic

**Name:** James Patel  
**Age:** 29  
**Location:** London, UK  
**Occupation:** UX designer at a fintech startup  
**Background:** Father is Gujarati Hindu, mother is English. Grew up with one foot in each culture. Identifies as "culturally Hindu" — goes to mandir for Diwali and Navratri, but wouldn't say he believes in astrology. Recently got into biophilic design, minimalism, and sleep optimisation. Watched a documentary about Japanese architecture and wabi-sabi. Thinks Feng Shui is "kind of interesting from a design perspective."

**Tech Savviness:** Expert — builds apps for a living. Extremely attuned to UX quality, tone of voice, and visual hierarchy. Will notice if something feels like content marketing.

**Current Relationship to Vastu:** He's aware Vastu exists because of his father's family. He's curious whether there's something to it, but would be put off by anything that feels dogmatic, preachy, or religiously motivated.

**Goals:**
- Understand the design logic of Vastu — is it just good architecture?
- See if any Vastu tips align with what he already does (clutter-free spaces, good light, ventilation)
- Be able to reference it as "cultural design principles from the Vedic tradition" rather than "superstition my family believes"
- Maybe apply one or two tips to his flat without feeling silly

**Frustrations:**
- Framing that positions non-compliance as causing bad luck, health problems, etc.
- No acknowledgment of the scientific/architectural basis
- Tips that seem arbitrary with no reasoning
- Anything that reads like a religious injunction rather than a design principle

**Mental model of Vastu:** "Ancient Indian environmental design — probably captured real wisdom about solar orientation, cross-ventilation, and spatial psychology, wrapped in cosmological framing that made sense in its time. Like how feng shui principles about 'chi flow' are actually just good circulation design."

**What he'd use the tab for:**
- Reading the "why" on each tip — that's the hook for him
- Direction/colour guidance he can apply without structural changes
- Content he could share with a design-minded friend to explain Vastu
- Understanding the conceptual framework (the five elements, the Vastu Purusha Mandala) as a system

**What would make him leave immediately:**
- "Vastu dosh remedies" framing — anything about correcting negative energy with pyramids or crystals
- Tone that assumes religious belief
- Tips presented as commands without reasoning
- Visual design that feels like a 2010s astrology app

---

## 3. User Journey Maps

### Journey A — The Specialist Using the Tab as a Reference Tool

#### Stage 1: Discovers the App

**What they're doing:** A friend in his practitioners' WhatsApp group posts a screenshot of the Panchang daily panchang screen. Vikram is curious — he already uses a panchang app, but this one looks more polished.

**Thinking:** "Let me see if this is just the tithi/nakshatra stuff, or if there's anything useful."

**Feeling:** Mildly curious. Slightly skeptical — most Hindu apps disappoint him.

**What could go wrong:** He opens it, sees no Vastu tab, and doesn't look further. Or the app store listing doesn't mention Vastu.

**What would delight him:** The Vastu tab is visible in the bottom nav on the first launch — no discovery barrier.

---

#### Stage 2: Opens the Vastu Tab

**What they're doing:** Taps the Vastu tab. Scans the section list.

**Thinking:** "Okay — Entry, Rooms, Directions, Colours, Do's & Don'ts. That's a reasonable structure. Let me see if the content is serious."

**Feeling:** Testing. Evaluating. Looking for a reason to trust or dismiss.

**What could go wrong:** The first tip he sees is vague ("keep your entrance clean and positive") — he closes the tab. Or the first visible Sanskrit term is spelled wrong.

**What would delight him:** The section list is structured logically. The first tip he sees references *Vastu Purusha Mandala* and explains the 45-deity grid. He thinks: "This app actually knows what it's talking about."

---

#### Stage 3: Tries to Find Specific Information

**What they're doing:** He's consulting a client next week with a south-facing house. He navigates to Directions → South-facing to check the acceptable *padas*.

**Thinking:** "Can I actually find what I need quickly, or do I have to scroll through everything?"

**Feeling:** Impatient. He values his time.

**What could go wrong:** The Directions section only has generic "south is bad" content without the nuance about acceptable *padas* (Vitatha, Grihakshat). He's annoyed — oversimplification is worse than no information.

**What would delight him:** The tip card for "South-Facing Entry" has a collapsed summary ("South-facing entries have two acceptable entry points in Vastu") and an expanded view that names the *padas* — *Vitatha* and *Grihakshat* — with their Sanskrit meanings. He saves it to show a client.

---

#### Stage 4: Evaluates Depth

**What they're doing:** Opens three or four more tips across different sections. Checks if the Sanskrit is spelled correctly. Looks for any textual references.

**Thinking:** "Is this sourced from classical texts? Or is it someone's opinion presented as fact?"

**Feeling:** Critical. The bar to earn his endorsement is high.

**What could go wrong:** No indication of source tradition. Sanskrit terms are transliterated inconsistently. Tips contradict each other across sections.

**What would delight him:** A small "Source tradition" note in the expanded card view — even just "Classical Vastu Shastra (Manasara tradition)" or "Widely accepted across North and South Indian traditions." Consistent transliteration throughout. A tooltip or footer: "Vastu practice varies across regional traditions. Tips here reflect broadly agreed classical principles."

---

#### Stage 5: Decides If Useful for Clients

**What they're doing:** Considers whether he'd recommend this app to clients or use it during consultations.

**Thinking:** "Would I show this to a client? Would it help them or confuse them?"

**Feeling:** Cautiously positive — if the content is accurate enough.

**What could go wrong:** The tips are too simplistic for him to use professionally, but too complex for his clients. It falls into a gap.

**What would delight him:** The tip card design works at two levels — the collapsed summary is ideal for showing clients ("see, here's the rule"), and the expanded depth satisfies him. He recommends the app. He mentions it in his WhatsApp group.

---

### Journey B — The Homeowner Applying Vastu to Their New Home

#### Stage 1: Parent Mentions Vastu

**What they're doing:** Priya's mother calls. "Have you checked the Vastu? The main door is very important." Priya half-listens, says she'll look into it.

**Thinking:** "I should probably look this up. Mom won't let this go."

**Feeling:** Mildly guilty, mildly curious. Not motivated enough to do a deep dive yet.

**What could go wrong:** She forgets. The moment passes.

**What would delight her:** She's already using the Panchang app for the daily shloka. She notices the Vastu tab — it's right there.

---

#### Stage 2: Googles / Finds the App

**What they're doing:** She Googles "Vastu for new home." Gets overwhelmed. Remembers the Panchang app has a Vastu tab.

**Thinking:** "The app I already use probably has something. Let me check that first."

**Feeling:** Hopeful. She trusts the Panchang brand because the daily panchang screen felt well-made.

**What could go wrong:** She goes to a website instead and ends up with 50 contradictory tips from a property developer's blog. Defers the task indefinitely.

**What would delight her:** The Panchang Vastu tab loads cleanly, has a welcoming section intro that says something like: "New to Vastu? Start with Entry." A clear onboarding nudge.

---

#### Stage 3: Opens the Vastu Tab

**What they're doing:** Taps Entry. Reads the section intro. Starts browsing tip cards.

**Thinking:** "This actually makes sense. The main door faces east — and it says that's about getting morning sunlight. Okay, I understand that."

**Feeling:** Relieved. Engaged. This doesn't feel like a scam.

**What could go wrong:** The tip card says "Place metal nameplate on north or east door" with no explanation. She doesn't understand why. She moves on without absorbing it.

**What would delight her:** The tip card has a short "Why this matters" line: "Metal conducts earth's magnetic energy; on north/east doors, this amplifies the flow of *Vayu* (air element), associated with fresh opportunity." She thinks: "That's actually interesting."

---

#### Stage 4: Finds a Tip About the Main Door

**What they're doing:** She finds the tip about the main entrance facing direction. Realises she needs to check which direction her front door faces. Doesn't know how.

**Thinking:** "Okay, how do I figure out which direction my door faces? Do I need a compass?"

**Feeling:** Slightly stuck. But interested.

**What could go wrong:** The app gives no guidance on how to determine direction. She gives up. Or she tries to use her phone compass and doesn't know if she's holding it right.

**What would delight her:** A small contextual note on the Entry tip cards: "To check your entrance direction: stand inside your home facing your front door. Open the compass on your phone — that's the direction your entrance faces." Simple. Actionable. No separate app needed.

---

#### Stage 5: Tries to Apply the Tip

**What they're doing:** Figures out her front door faces north. Goes to the "North-Facing Entry" tip. Reads that north is associated with *Kuber*, the deity of wealth, and is considered auspicious. Feels reassured.

**Thinking:** "Oh good, we're fine. Now what else do I check?"

**Feeling:** Pleased. Motivated to check more things.

**What could go wrong:** She finds a tip about not having a toilet in the northeast — and realises her home's layout has the bathroom near the northeast. Now she's anxious. The app doesn't explain what to do about it, or whether this is serious or minor.

**What would delight her:** The "Do's & Don'ts" section has a clear severity framing: "Structural" (hard to change, consider before buying), "Correctable" (remedy without renovation), and "Easy fix" (placement/colour change). She can assess how worried to be.

---

#### Stage 6: Shares with Partner

**What they're doing:** Screenshots a tip card and sends it to Arjun. "Look, the app says our north entrance is actually the best one — associated with abundance."

**Thinking:** "He's going to think this is silly. But the explanation is actually logical."

**Feeling:** A little self-conscious, but also wanting to share the find.

**What could go wrong:** The screenshot looks cluttered or hard to read out of context. Arjun dismisses it.

**What would delight her:** The tip card looks clean as a screenshot — title, Sanskrit term (italic), one-line translation, a short plain-English explanation. It reads well without the app. Arjun says "Huh, that's actually interesting — like feng shui for Indian architecture."

---

## 4. Information Architecture Research

### 4.1 How People Actually Search for Vastu

Based on web research, the top search patterns are:

- "Vastu for new home" — room-level concerns, starting point
- "Vastu for bedroom direction" — single-room, specific questions
- "Vastu main door direction" — entry is the single most-searched topic
- "Vastu kitchen stove placement" — practical/actionable
- "Vastu colors for bedroom/living room" — very popular, easy to apply
- "Vastu checklist before buying home" — pre-purchase concern
- "Vastu tips for bathroom" — often checking what to avoid
- "Vastu for pooja room direction" — high search volume among practicing Hindus

**Insight:** Users think in rooms first, then in problems, then in directions. Nobody opens Vastu content looking for "the southeast zone." They open it looking for "my bedroom."

### 4.2 Optimal Primary Navigation Structure

**Recommended: Room-first navigation, with a Foundations layer and a Directions reference layer**

The planned structure (Entry | Rooms | Directions | Colours | Do's & Don'ts) is close to correct. Two refinements:

1. **"Rooms" is too vague as a label** — expand it into named room sections at the navigation level, or clearly label it as "Room by Room" with visible subsections on first tap.

2. **Add a "Foundations" intro section** (or fold into onboarding) explaining *Pancha Bhuta* (five elements) and the directional map — not as a required read, but as a "start here if you want context."

**Revised Navigation:**

```
Vastu Tab
├── Foundations              ← New: optional conceptual layer
│   ├── What is Vastu?
│   ├── The Five Elements (Pancha Bhuta)
│   └── Reading the Directions
├── Entry                    ← Highest search volume, start here
├── Room by Room
│   ├── Living Room
│   ├── Kitchen
│   ├── Master Bedroom
│   ├── Children's Room
│   ├── Puja Room (Mandir)
│   ├── Bathroom & Toilet
│   └── Study / Home Office
├── Directions               ← Keep; reorganise as "direction guide"
├── Colours                  ← Keep as-is
└── Do's & Don'ts            ← Keep; add severity tiers
```

**Why room-first:** Research confirms users search by room. The Rooms → subsection pattern mirrors how other home apps (Houzz, Apartment Therapy) organise content. Room-based structure is also more shareable ("I'm looking at the bedroom section" is a natural thing to say to a family member).

### 4.3 Content Hierarchy Within Each Section

Each section should follow this hierarchy:

```
Section Level
├── Section intro (2-3 sentences, plain English, why this room matters in Vastu)
└── Tip Cards (ordered: most universal first, most specific last)

Tip Card Level
├── COLLAPSED:
│   ├── Icon (element or direction symbol)
│   ├── Tip title (plain English, max 8 words)
│   ├── Sanskrit term (italic, with transliteration)
│   └── One-line summary
└── EXPANDED:
    ├── Full explanation (plain English, 3-5 sentences)
    ├── "Why this matters" (element/directional reasoning)
    ├── Sanskrit term + meaning
    └── "How to apply" (1-3 actionable steps)
```

### 4.4 Proposed Full Content Outline with Example Tips

#### FOUNDATIONS

**What is Vastu Shastra?**
Vastu Shastra (वास्तु शास्त्र) — *the science of dwelling* — is a system of architecture and spatial design from the Vedic tradition, formalised in texts like the Manasara (roughly 5th–7th century CE). It maps the flow of natural forces — sunlight, magnetic orientation, elemental energy — onto the design of built space. Not exclusively Hindu, not superstition: a framework for aligning how a space is designed with how natural energy moves through it.

**The Five Elements (Pancha Bhuta)**
- *Prithvi* (Earth) — Southwest; stability, weight, grounding
- *Jal* (Water) — Northeast; flow, abundance, clarity
- *Agni* (Fire) — Southeast; transformation, energy, heat
- *Vayu* (Air) — Northwest; movement, communication, breath
- *Akasha* (Space) — Centre (Brahmasthan); openness, potential, stillness

**Reading the Directions**
8 primary directions + centre = 9 zones. Each zone is governed by a deity in the *Vastu Purusha Mandala*, the 9×9 sacred grid that maps a cosmic being onto the floor plan of every building. The northeast is the "head" — most sacred, lightest energy. The southwest is the "feet" — grounded, heavy, structurally load-bearing.

---

#### SECTION: ENTRY (Dvara / द्वार)

**Section intro:** The main entrance is the home's mouth — the point where energy, guests, and opportunity enter. In Vastu, it's also the most discussed and studied element, with a 32-point system (*pada* grid) for precise placement. For practical purposes: east- and north-facing entries are broadly auspicious; south-facing requires care.

**Tips:**

1. **Best Directions for Your Main Door**
   *Sanskrit:* Dvara sthana (द्वार स्थान)
   *Summary:* East and north entries are broadly auspicious; south is cautioned against, but not forbidden.
   *Detail:* The classical texts identify specific "padas" (sub-segments of each wall) where an entrance is auspicious. East-facing entries at the Jayant or Mahendra pada invite prosperity; north-facing entries at Mukhya, Bhallat, or Soma are strongly auspicious (Kuber, deity of wealth, rules the north). South-facing homes are not disqualified — Vitatha and Grihakshat padas on the south wall are acceptable.
   *Why it matters:* Solar movement enters from the east in the morning; the home's energy "wakes up" with the sun. North-facing homes receive magnetic energy from the earth's northern magnetic pole.
   *How to apply:* Stand inside your home facing your front door. Open your phone compass — the direction shown is your entrance direction.

2. **The Main Door Should Be the Largest Door**
   *Sanskrit:* Pradhana dvara (प्रधान द्वार) — "the chief door"
   *Summary:* Your front door should be larger than any interior door in the home.
   *Detail:* In Vastu, the main door announces the home's hierarchy of space. A larger main door "invites" more energy and opportunity; a smaller main door relative to interior doors creates an energetic bottleneck.
   *Why it matters:* Practically, a commanding main entrance also signals security and social standing — aligned with how humans naturally read the importance of a threshold.
   *How to apply:* If your main door is smaller than a bedroom door, prioritise it in any renovation plan. A statement door surround or decorative treatment can also visually amplify a door that can't be replaced.

3. **Threshold Raised, Entrance Clean**
   *Sanskrit:* Dehliz (देहलीज़) — the threshold
   *Summary:* Keep the entrance elevated slightly, clean, and well-lit.
   *Detail:* A slightly raised threshold keeps dirt and water from flowing in (practical), and symbolically prevents outflow of *Lakshmi* (prosperity). Dirt, clutter, and dim lighting at an entrance create an "energetically heavy" entry zone. Broken tiles, peeling paint, or a squeaky door are considered Vastu defects.
   *Why it matters:* The entrance sets the experiential tone for everyone who enters. Environmental psychology research confirms that first impressions of a space are formed in 0.1 seconds — Vastu intuited this.
   *How to apply:* Check that your porch light works and is bright. Keep shoes inside a rack, not scattered. Replace broken light fixtures. Add a small doormat in an auspicious colour (green, yellow, or red — avoid black).

4. **Door Opens Clockwise (Inward and to the Right)**
   *Sanskrit:* Dakshinavarta (दक्षिणावर्त) — clockwise direction
   *Summary:* The front door should swing inward and open clockwise (to the right as you enter).
   *Detail:* A clockwise-opening door creates a welcoming arc as guests enter. Counter-clockwise or outward-opening main doors are considered inauspicious — they symbolically "push away" incoming energy.
   *Why it matters:* Dakshinavarta is the auspicious direction in Hindu ritual (circumambulation of temples, pradakshina, is always clockwise). Consistency between ritual and domestic space is an intentional Vastu principle.
   *How to apply:* Check whether your main door opens clockwise (hinges on the left as you face it from outside). If not, this is typically a retrofit — flag for the next renovation.

5. **Metal Nameplate for North/West Entries; Wood for East/South**
   *Sanskrit:* Pancha Bhuta correspondence (पंच भूत)
   *Summary:* Match your nameplate material to your door's directional element.
   *Detail:* North and west zones correspond to Vayu (air, metal element). Metal nameplates amplify the elemental energy of these directions. East and south zones correspond to Agni/Akasha (fire, wood), making wooden or terracotta nameplates more harmonious.
   *Why it matters:* Material choices in Vastu are expressions of elemental correspondence — the five elements each have material affinities (earth = clay, water = glass/reflective surfaces, fire = copper/brass, air = metal, space = open void).
   *How to apply:* For a north or west door: a brass or stainless steel nameplate. For an east or south door: engraved wood or copper.

6. **No Mirror Directly Facing the Main Door**
   *Sanskrit:* Mirrors should not face *Dvara* (द्वार)
   *Summary:* A mirror opposite the main entrance reflects incoming energy back out.
   *Detail:* This is one of the few tips shared by both Vastu and Feng Shui traditions. A mirror facing the front door is said to "repel" the flow of beneficial energy entering the home. In modern environmental psychology terms, a mirror at the entrance also creates spatial confusion — it visually doubles the threshold.
   *Why it matters:* The entrance is an energy-entry point. Reflection should amplify, not deflect. Mirrors on the side walls of an entrance hall are auspicious; directly opposite is the concern.
   *How to apply:* If you have a mirror facing your front door, move it to a side wall. If it's structural (a decorative wall feature), a plant or artwork in front of it partially mitigates the effect.

7. **Shoe Racks Away From the Entrance Threshold**
   *Sanskrit:* Paaduka (पादुका) — footwear
   *Summary:* Store shoes in a cupboard, not scattered at the main door or visible on entry.
   *Detail:* Footwear brings the energy of the outside world into the home — considered heavy, earthly energy (*Prithvi* that is burdened rather than grounded). Visible scattered shoes at an entrance are a Vastu "dosh" (defect) — they create clutter and block the clear entry of lighter energies.
   *Why it matters:* This is one of the most practically applicable Vastu principles — it aligns with hygiene, minimalism, and hospitality principles across multiple cultures.
   *How to apply:* Install a shoe rack or bench with storage inside a small entrance closet, or just inside the door but to the side. If space is tight, a covered shoe box works. Never leave shoes in a pile directly in front of the door.

8. **Threshold Decoration: Rangoli, Torana, and Natural Motifs**
   *Sanskrit:* Torana (तोरण) — a ceremonial door garland; Rangoli (रंगोली) — threshold art
   *Summary:* Decorating the entrance threshold with auspicious motifs invites positive energy.
   *Detail:* The *torana* — typically a garland of mango leaves, marigolds, or brass decorations — marks the threshold as sacred space. *Rangoli* at the doorstep, traditionally made with rice flour, is both visually welcoming and symbolically an invitation to *Lakshmi*. In diaspora homes, a brass Om plaque, a simple printed torana, or a decorative doormat with auspicious symbols serves the same function.
   *Why it matters:* The act of marking a threshold acknowledges that crossing it is a meaningful transition — from public to private, from the world into sanctuary. This is a universal human ritual.
   *How to apply:* Add a "welcome" element at your entrance: a small *diya* (oil lamp) holder, a potted plant in a terracotta pot, or a simple Om motif above the door frame.

---

#### SECTION: ROOM BY ROOM — Kitchen (Rasoi / रसोई)

**Section intro:** The kitchen is governed by *Agni* (fire). Its ideal location in the Vastu grid is the southeast — the zone ruled by the fire deity Agni — but the northwest is an acceptable alternative. The defining principle is that fire and water elements should not be adjacent to each other: keep the stove and sink separated.

**Tips:**

1. **Kitchen in the Southeast**
   *Sanskrit:* Agni kona (अग्नि कोण) — fire corner
   *Summary:* Place the kitchen in the southeast zone of your home. Northwest is the acceptable alternative.
   *Detail:* The southeast belongs to *Agni*, the fire element. Placing a kitchen here aligns the fire of cooking with the fire energy of the space — strengthening and stabilising the kitchen's function. A kitchen in the northeast is the most cautioned placement: that zone belongs to water (*Jal*), and fire in water's zone creates elemental conflict.
   *How to apply:* If you're choosing between rooms when configuring a new home, prioritise the SE zone for kitchen. In a flat where you can't move the kitchen, focus on internal arrangement.

2. **Cook Facing East**
   *Sanskrit:* Purva mukha (पूर्व मुख) — east-facing
   *Summary:* Arrange your kitchen so the person cooking faces east.
   *Detail:* East is the direction of the rising sun — associated with vitality, clarity, and positive beginning. Cooking while facing east aligns the cook with solar energy. In practical terms, east-facing kitchens also typically receive morning light, which correlates with documented benefits for mood and energy in environmental psychology.
   *How to apply:* Check which direction you face while using your stove. If it's west, consider whether the stove can be repositioned, or adjust where you stand for prep work.

3. **Separate Stove and Sink**
   *Sanskrit:* Agni-Jal vivad (अग्नि-जल विवाद) — fire-water conflict
   *Summary:* Never place the stove and sink on the same platform or directly adjacent.
   *Detail:* Fire (*Agni*) and water (*Jal*) are opposing elements. When they share a platform, elemental conflict is said to create disharmony in the household — manifesting as stress, digestive issues, or conflict. In modern kitchen design terms, this is also practically sound: water splashing near flame is a safety concern, and heat near the sink affects plumbing.
   *How to apply:* The sink should ideally be in the northeast section of the kitchen; the stove in the southeast. If this isn't possible, ensure a gap of at least 60cm between the two, ideally with a cutting board station or cabinet between them.

4. **Food Grains in the Southwest**
   *Sanskrit:* Prithvi kona (पृथ्वी कोण) — earth corner
   *Summary:* Store dry food, grains, and pantry staples in the southwest section of the kitchen.
   *Detail:* The southwest belongs to *Prithvi* (Earth) — the element of abundance, storage, and weight. Keeping food stores here aligns what nourishes us with the energy of abundance. Practically, the southwest wall in most homes is load-bearing and naturally more stable.
   *How to apply:* Designate your southwest kitchen cabinet for dry goods — rice, flour, lentils, cereals. Avoid storing cleaning chemicals or empty vessels here.

---

#### SECTION: ROOM BY ROOM — Master Bedroom (Sheyanagriha / शयनागृह)

**Section intro:** The master bedroom governs rest, relationships, and regeneration. Its ideal Vastu placement is the southwest — a zone of stability, earth energy, and the energetic weight that anchors a home. The bedroom must support the body's reset without the stimulating energies of fire or wind zones.

**Tips:**

1. **Master Bedroom in the Southwest**
   *Sanskrit:* Nairriti kona (नैर्ऋति कोण)
   *Summary:* The master bedroom belongs in the southwest zone of the home.
   *Detail:* The southwest is ruled by Nairiti (earth, ancestors) — heavy, stable, grounding energy. This makes it the ideal zone for the primary resting space. Couples who sleep in the northeast or east zones are sleeping in light, active energy zones that can disrupt rest. Children's and guest rooms work well in the northwest.
   *How to apply:* If your floor plan allows, assign the largest southwest bedroom as the master. If you live in a flat and can't change rooms, prioritise correcting internal bed placement.

2. **Head South or East While Sleeping**
   *Sanskrit:* Dakshina-shirsha (दक्षिण शिर्ष) — south-head placement
   *Summary:* Sleep with your head pointing south or east; never north.
   *Detail:* The earth is a giant magnet — its magnetic north pole pulls iron in our blood toward it. Sleeping with head pointing north means the body's iron-rich blood is being repelled from the head (toward the feet, away from the brain). Ancient Vastu and Ayurveda texts both caution against northward head placement for this reason. Modern research on sleep and magnetism doesn't conclusively confirm the mechanism, but the sleep hygiene implications of consistent orientation are documented.
   *Why it matters:* Head south is the most widely prescribed sleeping direction across Vastu traditions. Head east is considered good for students or those seeking wisdom. Head west is neutral. Head north is the one universal caution.
   *How to apply:* Find north using your phone compass. Arrange your bed so your head points to any direction except north.

3. **Bed Not Under a Beam**
   *Sanskrit:* Vitana (वितान) — ceiling beam
   *Summary:* Do not sleep with a structural beam running directly above your body.
   *Detail:* Beams create a "cutting" energy in Vastu — the downward weight of the beam presses into the space below, causing stress to those who sit or sleep beneath it. This is one of the most consistent tips across Vastu, Feng Shui, and modern interior design. Research in environmental psychology suggests people subconsciously perceive low horizontal elements overhead as threatening — contributing to poor sleep quality.
   *How to apply:* If you have a beam above your current bed position, move the bed out from under it. If the beam is unavoidable, consider a false ceiling panel or canopy between bed and beam.

4. **Dressing Table Mirror Must Not Reflect the Bed**
   *Sanskrit:* Darpaṇa (दर्पण) — mirror
   *Summary:* Position the dressing table so the mirror does not face the sleeping person.
   *Detail:* In Vastu, a mirror reflecting a sleeping person is considered a disturbance to the restful energy of the space — the mirror is "active" (it reflects, creating a duplicated presence), while sleep requires stillness. Practically, a mirror facing the bed can be startling upon night-time waking and is linked in some sleep studies to poorer sleep quality.
   *How to apply:* Place the dressing table on the north or east wall, turned so the mirror faces inward toward the wardrobe or a blank wall, not toward the bed. If the room is small, cover the mirror with a curtain at night.

---

#### SECTION: ROOM BY ROOM — Puja Room / Mandir (Devagriha / देवगृह)

**Section intro:** The puja room or home mandir is the spiritual heart of the house. Its placement follows the principle that the deity should occupy the purest energy zone — the northeast (*Ishan kona*), which in Vastu is the home's "head," governed by Lord Shiva (*Ishana*), and associated with divine light and water's clarity.

**Tips:**

1. **Puja Room in the Northeast**
   *Sanskrit:* Ishan kona (ईशान कोण) — Shiva's corner
   *Summary:* Place the home mandir or puja space in the northeast zone.
   *Detail:* Northeast is the most auspicious zone in the Vastu Mandala — the Vastu Purusha's head, governed by Ishana (Shiva). Morning sunlight reaches northeast rooms first, creating a naturally lit space for morning prayer. Water's elemental energy here (clarity, flow, abundance) is considered aligned with devotion.
   *How to apply:* If northeast placement isn't possible, the east or north wall of any room is acceptable. Avoid south for puja.

2. **Deities Face East or West; Devotee Faces East or North**
   *Sanskrit:* Pratima mukha (प्रतिमा मुख) — idol facing direction
   *Summary:* Position idols facing east or west; the devotee should face east or north while praying.
   *Detail:* In temple architecture, the deity faces the devotee across the sanctum. In home mandirs, east-facing idols receive morning light and allow the devotee to face east (toward the sunrise). West-facing idols are also acceptable — the devotee then faces west. The critical caution is against idols facing south, as south is associated with *Yama* (deity of death) in the Mandala.
   *How to apply:* Check which direction your idols face. Adjust the mandir orientation if needed. In small apartments, a shelf mandir can be turned without renovation.

3. **Never Below a Staircase or Adjacent to a Toilet**
   *Sanskrit:* Shuchitvam (शुचित्वम्) — ritual purity
   *Summary:* The puja room must not be under stairs, above a toilet, or sharing a wall with a bathroom.
   *Detail:* The concept of *shuchitvam* (ritual purity) governs the mandir's placement. Spaces below staircases experience traffic vibration and are energetically "heavy." Sharing a wall or ceiling/floor with a bathroom is considered a severe Vastu dosh — the purity-impurity contrast is a fundamental violation.
   *How to apply:* Audit your home plan: draw lines from the bathroom on each floor — the puja space should not share any wall with these. If it does, moving the mandir (even to a repurposed cabinet) may be the remedy.

---

#### SECTION: DIRECTIONS

**Section intro:** Each of the eight directions — plus the centre — governs a specific type of energy in Vastu. This section explains what each direction is associated with and which home functions it best supports. Use this as a planning reference when assigning rooms to spaces.

**Tips:**

1. **North — Zone of Wealth**
   *Sanskrit:* Kuber disha (कुबेर दिशा)
   *Summary:* The north is the domain of Kuber, deity of wealth. Strong for money storage, financial activity, home office.
   *Detail:* North-facing zones receive earth's magnetic energy flowing from the magnetic north. In the Vastu Purusha Mandala, the north is governed by Kuber — associated with treasure, abundance, and livelihood. Lockers, safes, financial documents, and workspaces for wealth-generating work are most auspicious when placed in the north.
   *How to apply:* Place your home safe or filing cabinet containing financial documents in the north zone of the room or home.

2. **Northeast — Zone of Divine Energy**
   *Sanskrit:* Ishan kona (ईशान कोण)
   *Summary:* The northeast is the home's most sacred zone — keep it open, light, and pure.
   *Detail:* Northeast receives the first light of day (east) and the magnetic draw from the north. The Vastu Purusha's head occupies this zone. It should be kept free of heavy furniture, toilets, kitchens, or structural weight. The ideal uses: puja room, open sitting area, meditation corner, water features (a small fountain here is auspicious).
   *How to apply:* Walk to the northeast corner of your home. What's there? Heavy storage = move it. Toilet = strong Vastu concern. Open space or puja shelf = ideal.

3. **Southeast — Zone of Fire**
   *Sanskrit:* Agni kona (अग्नि कोण)
   *Summary:* Southeast is fire's home — the kitchen and all fire-related appliances belong here.
   *Detail:* Agni, the fire deity, governs the southeast zone. This makes it the natural home for the kitchen, the stove, the home's electrical switchboard, and the generator or inverter. Placing water features or bathrooms here creates elemental conflict.
   *How to apply:* Confirm your kitchen is in or near the southeast. If the electrical switchboard is elsewhere, it isn't a crisis — but note it.

---

#### SECTION: COLOURS

**Section intro:** Colours in Vastu are not purely aesthetic — they carry elemental and directional associations that reinforce or counteract the natural energy of a space. The rule of thumb: lighter shades and earth tones are broadly safe; dark, saturated colours in large areas require care.

**Tips:**

1. **Living Room — Warm Neutrals and Soft Yellows**
   *Sanskrit:* Vata vastu (वात वास्तु) — the living zone
   *Summary:* Use cream, off-white, soft yellow, or peach in the living room.
   *Detail:* The living room is a social space — it should feel welcoming, expansive, and warm. These tones reflect natural light and encourage conversation. In Vastu terms, yellow is associated with *Vayu* (air) and movement; white carries the energy of clarity and welcome. Dark colours (deep red, navy, charcoal) in a living room compress the energy and are cautioned against.
   *How to apply:* If repainting: choose a warm off-white or butter yellow for the main wall. Accent colours (cushions, artwork) can be richer — saffron, terracotta, or gold.

2. **Master Bedroom — Muted Greens, Blues, or Earthy Browns**
   *Sanskrit:* Prithvi-toned palette (पृथ्वी वर्ण)
   *Summary:* Use sage, dusty blue, lavender, brown, or ivory in the bedroom — colours that promote rest.
   *Detail:* The bedroom requires Prithvi (earth) and Jal (water) tones — grounding and calming. Brown represents stability; green represents renewal; blue represents clarity and calm. These align with chromotherapy and sleep research: cool and muted tones reduce cortisol, encouraging the body toward rest. Avoid red or bright orange in bedrooms.
   *How to apply:* Sage or dusty green walls with brown or cream bedding is a Vastu-aligned and design-current combination. If you can't repaint, introduce these tones via curtains, bedding, and soft furnishings.

3. **Kitchen — Warm Reds, Oranges, or Yellow for SE; Greens for NW**
   *Sanskrit:* Agni varna (अग्नि वर्ण) — fire colours
   *Summary:* Match kitchen colour to its location: fire colours for SE kitchens, earth/air colours for NW.
   *Detail:* A southeast kitchen benefits from fire-amplifying colours: red, orange, terracotta, yellow. A northwest kitchen (in the air zone) benefits from greens, which introduce Prithvi (earth) energy to balance the movement-prone air zone. Avoid blue or black in kitchens — water and void colours suppress fire energy.
   *How to apply:* For SE kitchens: warm yellow walls or a red/terracotta backsplash. For NW kitchens: sage green or olive cabinetry, cream walls.

4. **Puja Room — White, Soft Yellow, or Light Blue**
   *Sanskrit:* Shanta varna (शांत वर्ण) — calm colours
   *Summary:* Use white, ivory, pale yellow, or very light blue in the puja space.
   *Detail:* These are the colours of sattvic (pure, calm, balanced) energy in the Hindu colour philosophy. White is associated with purity; pale yellow with wisdom and clarity; light blue with devotion and the divine sky. Avoid bright, stimulating colours (red, neon, dark purple) in puja spaces.
   *How to apply:* Paint the puja room or mandir alcove in soft white or pastel yellow. Brass, gold, and copper lamp and idol colours contrast beautifully with these backgrounds.

5. **Avoid Black in Large Quantities Throughout the Home**
   *Sanskrit:* Tamas varna (तामस वर्ण) — inertia colour
   *Summary:* Black absorbs light and is considered a tamasic (heavy, inert) colour in Vastu.
   *Detail:* Black is not forbidden — it can appear in accents, borders, and decorative elements. But large black walls, black ceilings, or predominantly dark rooms are cautioned against across Vastu traditions. Tamas in Indian philosophy refers to inertia, heaviness, and darkness — the opposite of the lightness and flow that Vastu seeks.
   *How to apply:* If you love dark aesthetics, use deep navy, forest green, or charcoal rather than pure black. Use them as accent walls, not whole-room palettes.

---

#### SECTION: DO'S AND DON'TS

**Severity Tiers:**
- [Structural] — Hard to change without renovation; check before buying a property
- [Correctable] — Can be addressed with furniture repositioning, colour change, or a remedy
- [Easy Fix] — Can be done today, no cost or minimal cost

**Tips:**

1. **Keep the Brahmasthan (Centre) Clear** [Structural / Correctable]
   *Sanskrit:* Brahmasthan (ब्रह्मस्थान) — the centre, Brahma's zone
   *Summary:* The geometric centre of the home should be open, uncluttered, and never enclosed by permanent walls.
   *Detail:* The Brahmasthan is where all directional energies converge — the "navel" of the home, ruled by Brahma (the creator). Building walls, toilets, or kitchens in the centre of a home is considered the most significant Vastu dosh. In apartment living, the centre is where furniture should be light and energy should circulate freely.
   *How to apply:* Identify the rough centre of your floor plan. Is there a wall, column, or enclosed room there? [Structural concern]. If it's open, ensure it isn't blocked by large furniture clusters or storage. Ideal: a small plant or open floor area.

2. **No Cactus or Thorny Plants Indoors** [Easy Fix]
   *Sanskrit:* Kantaka vruksha (कंटक वृक्ष) — thorny plant
   *Summary:* Thorny plants inside the home are considered inauspicious in Vastu.
   *Detail:* The thorns represent aggression and conflict energy. Cacti kept indoors, according to Vastu, may create tension in relationships. The one exception commonly cited is roses — their fragrance and beauty are considered to mitigate the thorns. Outdoors, thorny plants as a boundary are fine (and can even be used as protective barriers in some Vastu applications).
   *How to apply:* Move cacti and succulents with spines to outdoor spaces or a sunny windowsill facing out. Replace with indoor plants associated with positive energy: money plant (*Epipremnum aureum*), tulsi (*Ocimum tenuiflorum*), peace lily, or bamboo.

3. **Money Plant in the North or East** [Easy Fix]
   *Sanskrit:* Dhana vriksha (धन वृक्ष) — money/wealth plant
   *Summary:* Place money plants in north or east zones; avoid south and southeast.
   *Detail:* Money plants (pothos) are considered Vastu-auspicious — their trailing leaves and rapid growth symbolise abundance. Placement in the north (Kuber's zone, wealth) or east (solar energy) amplifies this. Placing them in the south (Yama's zone) or in direct sunlight drains their beneficial energy according to Vastu and also — practically — can kill them.
   *How to apply:* Place a trailing money plant on a north-facing shelf or windowsill, in a green or yellow pot.

4. **No Broken Items in the Home** [Easy Fix]
   *Sanskrit:* Bhagna vastu dosha (भग्न वास्तु दोष) — broken item defect
   *Summary:* Remove or repair any broken, cracked, or non-functional objects in the home.
   *Detail:* Broken clocks that have stopped, cracked mirrors, chipped idols, dead plants, non-functioning appliances — these are all considered Vastu dosh. The principle is that the home should express vitality and wholeness. Keeping broken things is "maintaining decay" rather than "welcoming renewal."
   *How to apply:* Walk through your home with this lens. Broken doorbell? Fix it this week. Dead plant? Remove or replace. Cracked mirror? Replace. Chipped idol? Perform ritual release (*visarjan*) and replace respectfully.

5. **Toilet in the West or Northwest; Never Northeast** [Structural]
   *Sanskrit:* Jala nishkramana (जल निष्क्रमण) — water exit zone
   *Summary:* Bathrooms and toilets belong in the west or northwest; northeast is the most cautioned location.
   *Detail:* Water exits (plumbing outflow) belong in low-energy zones — west (Varun, water deity, manages outflow naturally here) or northwest (Vayu, air, facilitates flow and release). The northeast is the most sacred zone — placing a toilet there is the most-cited Vastu dosh by practitioners. It conflicts elemental purity (water exit) with divine energy (Ishana's corner).
   *How to apply:* This is primarily a property-purchase check. When viewing a home: find the northeast corner and confirm there is no toilet there. For an existing home with NE toilet: this is a structural issue; remedies include using the bathroom as little as possible, keeping the door always closed and the space extremely clean, and adding a copper Vastu pyramid (a widely used remedy — though note this is a remedy, not a correction).

---

## 5. Tip Card Design Specification

### 5.1 The Problem: Two Users, One Card

The Specialist (Vikram) wants: Sanskrit terminology with correct transliteration, textual depth, source tradition, and enough detail to use professionally.

The Homeowner (Priya) wants: Plain English, a clear reason "why," one or two actionable steps, and something short enough to read while waiting for her coffee.

The Skeptic (James) wants: A conceptual hook, the design reasoning, and no supernatural framing.

A single card design must serve all three — through a collapsed/expanded state.

---

### 5.2 Collapsed Card (List View)

The collapsed card is a "ticket" — scannable in under 3 seconds.

```
┌─────────────────────────────────────────────────────────┐
│  [Element icon]   TIP TITLE IN PLAIN ENGLISH            │
│                   Sanskrit term in italics + (meaning)  │
│                   One-line summary sentence.            │
│                                                 [›]     │
└─────────────────────────────────────────────────────────┘
```

**Fields on collapsed card:**
- `icon` — Element symbol (fire, water, earth, air, space) or direction symbol (compass point). Simple, icon-font or SVG. Not decorative — functional. Tells the specialist at a glance what zone/element this tip concerns.
- `title` — Plain English, max 8 words. Imperative or descriptive. Examples: "Cook Facing East", "Bedroom in the Southwest", "No Mirror Facing the Front Door."
- `sanskrit_label` — The primary Sanskrit term, italicised. One term only (the most relevant). If a transliteration is long, just the term name is enough here.
- `sanskrit_meaning` — In parentheses, 3-4 words. Example: *(the fire corner)* or *(water exit zone)*.
- `summary` — One sentence. Describes what to do or what the rule is. 15 words maximum.
- `chevron` — Tap affordance. The card is clearly expandable.

**Visual design notes:**
- Card height: approximately 72px collapsed. No scrolling to see a full list.
- Background: light card on a slightly off-white section background. Low friction.
- Sanskrit term colour: muted gold or brown — distinct from the title colour.
- Icon: consistent size (24px), single colour, uses the app's elemental colour palette (defined elsewhere in the design system).

---

### 5.3 Expanded Card (Tapped State)

The expanded card is a reference entry — it can be read in 60-90 seconds.

```
┌─────────────────────────────────────────────────────────┐
│  [Element icon]   TIP TITLE IN PLAIN ENGLISH            │
│                   Sanskrit term in italics + (meaning)  │
│                   One-line summary sentence.            │
│  ─────────────────────────────────────────────────────  │
│  [FULL EXPLANATION — 3–5 sentences, plain English]      │
│                                                         │
│  WHY THIS MATTERS                                       │
│  [Elemental / directional / scientific reasoning]       │
│  [1–2 sentences connecting to five elements or solar/   │
│   magnetic principles]                                  │
│                                                         │
│  HOW TO APPLY                                           │
│  • Step 1                                               │
│  • Step 2                                               │
│  • Step 3 (if needed)                                   │
│                                                         │
│  SANSKRIT REFERENCE                                     │
│  Term: [Sanskrit in Devanagari script]                  │
│  Transliteration: [IAST or simplified phonetic]         │
│  Meaning: [full word-by-word translation]               │
│  Tradition: [e.g., "Classical / Manasara tradition"     │
│              "Widely agreed across traditions"          │
│              "More common in North Indian Vastu"]       │
│  ─────────────────────────────────────────────────────  │
│  [SAVE] [SHARE]                                         │
└─────────────────────────────────────────────────────────┘
```

---

### 5.4 Content JSON Schema

```json
{
  "tip": {
    "id": "entry-001",
    "section": "entry",
    "subsection": null,
    "title": "Best Directions for Your Main Door",
    "icon": "compass",
    "element": "space",
    "direction": ["north", "east"],
    "severity": null,
    "collapsed": {
      "sanskrit_term": "Dvara sthana",
      "sanskrit_devanagari": "द्वार स्थान",
      "sanskrit_meaning": "the place of the door",
      "summary": "East and north entries are broadly auspicious; south requires care."
    },
    "expanded": {
      "explanation": "The classical Vastu texts identify specific padas (sub-segments of each wall) where placing an entrance is auspicious. East-facing entries at Jayant or Mahendra pada invite prosperity; north-facing entries at Mukhya, Bhallat, or Soma are auspicious — Kuber, deity of wealth, rules the north. South-facing homes are not forbidden — Vitatha and Grihakshat padas are acceptable south-wall locations.",
      "why_it_matters": "Solar movement enters from the east in the morning; homes whose entrances face east naturally draw the first light. North-facing homes receive earth's magnetic energy from the northern magnetic pole.",
      "how_to_apply": [
        "Stand inside your home facing your front door.",
        "Open your phone compass — the direction shown is your entrance direction.",
        "Cross-reference with the direction guide in this tab."
      ],
      "sanskrit_reference": {
        "term": "Dvara sthana",
        "devanagari": "द्वार स्थान",
        "transliteration": "dvāra sthāna",
        "meaning": "dvāra = door/gate; sthāna = place/position",
        "tradition": "Classical Vastu Shastra; referenced in Manasara and widely agreed across regional traditions"
      }
    },
    "tags": ["main-door", "direction", "entry", "beginner-priority"],
    "hemisphere_note": null,
    "regional_note": null
  }
}
```

**Field definitions:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | string | Yes | Format: `{section}-{three-digit-number}` |
| `section` | enum | Yes | `entry`, `kitchen`, `bedroom`, `puja`, `living`, `bathroom`, `children`, `study`, `directions`, `colours`, `dos-donts`, `foundations` |
| `title` | string | Yes | Plain English, max 8 words |
| `icon` | enum | Yes | `fire`, `water`, `earth`, `air`, `space`, `compass`, `sun`, `moon` |
| `element` | enum | Yes | `fire`, `water`, `earth`, `air`, `space` |
| `direction` | array | No | Which directions the tip primarily concerns |
| `severity` | enum | No | `structural`, `correctable`, `easy-fix` — used in Do's & Don'ts section |
| `collapsed.sanskrit_term` | string | Yes | Single primary term |
| `collapsed.sanskrit_devanagari` | string | Yes | Devanagari script — do not omit |
| `collapsed.sanskrit_meaning` | string | Yes | 3-5 words |
| `collapsed.summary` | string | Yes | Max 15 words |
| `expanded.explanation` | string | Yes | 3-5 sentences, plain English |
| `expanded.why_it_matters` | string | Yes | 1-2 sentences, element/science reasoning |
| `expanded.how_to_apply` | array | Yes | 1-3 actionable bullets |
| `expanded.sanskrit_reference.tradition` | string | Yes | Source attribution — critical for specialist trust |
| `tags` | array | Yes | Used for filtering; include `beginner-priority` on top 10 tips |
| `hemisphere_note` | string | No | If the tip changes for Southern Hemisphere users |
| `regional_note` | string | No | If the tip varies North vs. South Indian tradition |

---

## 6. Content Depth Recommendation

### 6.1 Is 40 Tips Enough?

**For a casual user (Priya):** 40 tips is sufficient if the quality is high. A casual user won't read all 40 in one session — they'll browse the section most relevant to them (typically Entry or Bedroom) and read 5-8 tips. The feeling of "there's more here when I need it" is more important than total count.

**The real risk at 40 tips:** Uneven distribution. If Entry has 8 tips and Colours has 3, the Colours section feels empty. The minimum per section to feel non-empty to a casual user is **6 tips**. Below 5, a section reads like an afterthought.

**Recommended minimum breakdown:**
- Foundations: 3 conceptual cards (not counted as "tips" but necessary)
- Entry: 8 tips (highest demand — do not underfund)
- Kitchen: 6 tips
- Master Bedroom: 6 tips
- Puja Room: 5 tips
- Living Room: 5 tips
- Bathroom: 5 tips
- Children's / Study: 4 tips combined (or 3+3 if split)
- Directions: 9 tips (one per direction + centre)
- Colours: 6 tips
- Do's & Don'ts: 8 tips

**Total: ~65 tips** — this is the recommended minimum for a tab that feels substantive across all sections.

At 40 tips, spread across 10+ sections, no section reaches depth. The recommendation is to write 65 tips at launch and add 10-15 more tips per update cycle.

### 6.2 Minimum to Feel Useful to a Specialist

A specialist (Vikram) will test the app in two ways:

1. **Accuracy check:** He will read 5-10 tips on topics he knows well and check if they're correct. One wrong tip = he dismisses the app. Accuracy is binary for him.

2. **Depth check:** He will look for terminology depth, source tradition acknowledgment, and nuance (not just "south is bad" but "south-facing homes have acceptable padas — Vitatha, Grihakshat").

The specialist doesn't need more tips — he needs **better-written tips**. A 65-tip tab written to the depth spec in Section 5 (with Sanskrit reference + tradition attribution) will satisfy a specialist. A 200-tip tab of generic bullet points will not.

**The critical tip for specialist satisfaction:** Every expanded tip must have a `tradition` field citing which Vastu tradition the rule comes from, even if it's just "Classical / widely agreed." This signals rigor.

### 6.3 Should the App Acknowledge Regional Variation?

**Yes. This is a trust-building decision.**

Regional variation exists on two axes:

**Axis 1: North Indian (Nagara) vs. South Indian (Dravidian/Agama) traditions**
- The Manasara text is associated with South Indian tradition; the Brihat Samhita and Samarāṅgaṇasūtradhāra are more associated with North/Western Indian traditions.
- For practical home Vastu, the differences are minor — but some tips do vary. Example: some South Indian Vastu traditions place more emphasis on the 8 *ashtadala* sub-directions than North Indian traditions.
- **Recommendation:** Add a `regional_note` field to any tip where the recommendation differs. Write the tip to the "widely agreed" position, and note the variation in the expanded view.

**Axis 2: Northern Hemisphere vs. Southern Hemisphere**
- This is significant and affects diaspora users in Australia and South Africa.
- The core issue: in the Southern Hemisphere, the sun's path is reversed (north sky, not south sky). This reverses some directional conventions. Specifically:
  - North/south directions effectively swap in terms of solar energy meaning
  - Head-north sleeping (cautioned against in NH) becomes recommended in SH
  - The Vastu Purusha Mandala may need 90-degree rotation
- **Recommendation:** Add a banner or note in the Directions section: *"Note on the Southern Hemisphere: If you live in Australia, South Africa, or South America, some directional tips in this guide may need to be adapted. We recommend consulting a qualified Vastu practitioner for Southern Hemisphere-specific guidance."* This is honest, non-alarming, and builds trust.

**Recommendation format:**
- Don't build separate Southern Hemisphere content in v1 — it doubles the content requirement and most diaspora users are in UK/US/Canada (Northern Hemisphere).
- Add a `hemisphere_note` field to the JSON schema now so the content model is ready for v2.
- Add one global disclaimer banner visible in the Directions section.

### 6.4 Priority Order: The First 10 Tips to Write

If the builder has limited time and must launch with a minimum viable Vastu tab, write these 10 tips first. They cover the highest search volume topics, serve all three personas, and are the most universally agreed-upon classical Vastu rules:

| Priority | Tip | Section | Why First |
|----------|-----|---------|-----------|
| 1 | Best Directions for Your Main Door | Entry | Highest search volume. First question every diaspora user has. |
| 2 | Master Bedroom in the Southwest | Bedroom | Second most-searched topic. Critical for new homeowners. |
| 3 | Head South or East While Sleeping | Bedroom | Most actionable tip — no renovation needed. Shareable. |
| 4 | Keep Brahmasthan (Centre) Clear | Do's & Don'ts | Universal Vastu principle. Impresses specialists. Easy to check. |
| 5 | Kitchen in the Southeast | Kitchen | Third most-searched. Every new homeowner asks about kitchen placement. |
| 6 | Puja Room in the Northeast | Puja Room | High demand from practicing Hindus. High emotional resonance for diaspora. |
| 7 | The Five Elements (Pancha Bhuta) | Foundations | Conceptual anchor — referenced by every other tip. Unlocks the "why" for skeptics. |
| 8 | Toilet in the West/Northwest; Never Northeast | Do's & Don'ts | The single most-repeated caution in Vastu. Property-purchase critical. |
| 9 | No Mirror Facing the Main Door | Entry / Do's & Don'ts | Widely-known rule. Easy to apply. High shareability. |
| 10 | Cook Facing East | Kitchen | Specific, actionable, backed by both Vastu reasoning and solar logic. Works for skeptics. |

**Tips 11-20 (second priority):**
Separate stove and sink; North zone for wealth; Dressing table mirror off the bed; Money plant in north/east; No cactus indoors; Bedroom colours (muted greens and blues); Living room in warm neutrals; No broken items; Door opens clockwise; Threshold raised and clean.

---

## Appendix: Key Sanskrit Terms Reference (Content Writer Cheat Sheet)

| English | Sanskrit (Devanagari) | Transliteration | Root meaning |
|---------|----------------------|-----------------|--------------|
| Vastu Shastra | वास्तु शास्त्र | Vāstu Śāstra | "Science of dwelling" |
| Vastu Purusha Mandala | वास्तु पुरुष मंडल | Vāstu Puruṣa Maṇḍala | "Cosmic being grid of the dwelling" |
| Five elements | पंच भूत | Pañca Bhūta | "Five elemental states" |
| Earth | पृथ्वी | Pṛthvī | — |
| Water | जल | Jala | — |
| Fire | अग्नि | Agni | — |
| Air | वायु | Vāyu | — |
| Space / Ether | आकाश | Ākāśa | — |
| Northeast corner | ईशान कोण | Īśāna Koṇa | "Shiva's corner" |
| Southeast corner | अग्नि कोण | Agni Koṇa | "Fire corner" |
| Southwest corner | नैर्ऋति कोण | Nairṛti Koṇa | "Ancestors' corner" |
| Northwest corner | वायव्य कोण | Vāyavya Koṇa | "Wind corner" |
| Home centre | ब्रह्मस्थान | Brahmasthāna | "Brahma's place" |
| Main door | द्वार | Dvāra | — |
| Threshold | देहलीज़ | Dehlīz | — |
| Prayer room | देवगृह | Devagṛha | "God's house" |
| Kitchen | रसोई | Rasoī | — |
| Vastu defect | वास्तु दोष | Vāstu Doṣa | "Dwelling fault" |
| Spatial energy grid | पद | Pada | "Step/quarter-segment" |
| Auspicious | शुभ | Śubha | "Good, auspicious" |
| Inauspicious | अशुभ | Aśubha | "Not good" |

**Transliteration note for content writers:** Use simplified phonetic transliteration in tip cards (e.g., "Brahmasthan" not "Brahmasthāna") for readability. The `sanskrit_reference` block in the JSON can carry the IAST diacritics for specialist use.

---

*Research compiled from: App Store and Google Play competitor analysis (Vastu Compass by AppliedVastu, CheckMyVastu by MahaVastu, Revaastu, Vastu Compass Home Office Life by Mango Technologies, Vaastu Wisdom by Binary Web Solutions); web analysis of AppliedVastu, NoBroker, Livspace, Nestasia, UltraTech Cement Vastu guides, AnantVastu, Morphogenesis Architecture Vastu resources; Quora practitioner discussions; Wikipedia Vastu Shastra article; Southern Hemisphere Vastu (AppliedVastu, VastuVerma); and general Hindu diaspora identity research.*
