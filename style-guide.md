# MyCult — Style Guide

Visual standards, **brand guidelines**, and **preferred design technology** for digital products (consumer app, cashier app, vendor web). Use this document for UI implementation, marketing assets, and partner co-branding.

**Related:** [Technical PRD](./technical-prd.md), [Operator web app](./operator-web-app.md).

---

## 1. Brand guidelines

### 1.1 Positioning and promise

- **What we are:** A loyalty platform that helps businesses reward regulars and, over time, participate in a broader **coalition** network—without sacrificing clarity or trust at the point of sale.
- **Design implication:** Interfaces should feel **dependable and fast** (especially cashier flows), **warm** where consumers celebrate earns, and **professional** where operators configure programs.

### 1.2 Voice and tone

| Context | Tone | Example direction |
|---------|------|-------------------|
| **Consumer** | Confident, friendly, concise | Short sentences; celebrate wins with restraint (Magnolia Script only for moments, not every screen). |
| **Cashier / in-store** | Direct, error-forward | State what happened and the next step; avoid playful copy on failures. |
| **Operator (B2B)** | Professional, precise | Use plain language for rules and numbers; define jargon once (e.g. “earn rate”). |
| **Legal / consent** | Neutral, readable | No marketing fluff; link to full policy where required. |

**Principles:** Respect the user’s time; prefer **active voice**; avoid sarcasm, hype, or cult imagery that undermines trust in financial-adjacent flows.

### 1.3 Naming and trademark

- **Product name:** **MyCult** — capital **M**, capital **C** in product UI and marketing.
- **Do not** alter spelling for puns in product chrome; marketing campaigns may use wordplay only when brand team approves.
- **Feature names** (e.g. program names, tier names) should be translatable and not rely on English-only idioms when Sinhala/Tamil UI is planned.

### 1.4 Logo and wordmark

- **Primary palette for lockups:** Forest (`#143630`) for wordmark or container; Ember (`#FF4F20`) for accent marks or small highlights as defined in master brand files.
- **Clear space:** Maintain padding at least equal to the height of the “M” cap in the wordmark around the logo on digital surfaces.
- **Minimum size:** Wordmark legible on mobile headers; if scaling down hurts legibility, use a **logomark** variant (when available) rather than squashing full wordmark.
- **Don’t:** Stretch, rotate, add drop shadows for “effect,” place on busy photography without a scrim, or recolour outside approved tokens without brand review.

### 1.5 Colour as brand (summary)

Forest, Ember, and Mist (see §2) are the **digital brand anchors**. Extended palettes for print or campaigns must be harmonised with these three so apps and web remain recognisably MyCult.

### 1.6 Imagery and illustration

- Prefer **real contexts** (cafés, retail, neighbourhoods) that resonate with Sri Lanka rollout; avoid generic “global stock” that contradicts local feel.
- **People:** Representative diversity; natural light; consent for identifiable faces in marketing.
- **Abstraction:** Simple geometric illustrations may supplement photography; keep Ember/Forest/Mist alignment.

### 1.7 Partner and vendor co-branding

- **Hierarchy:** Partner’s logo **first** for their owned channels; MyCult badge or “Powered by MyCult” as secondary, per partnership agreement.
- **Card surfaces:** Consumer wallet cards may show **vendor art** inside a frame that preserves MyCult UI legibility (contrast, tap targets).
- **Don’t** imply endorsement by unrelated brands; keep coalition visuals aggregate unless legal approves cross-promotion.

### 1.8 Brand don’ts (quick list)

- Do not use low-contrast gray-on-gray for primary actions (see §4).
- Do not set long body copy in **Magnolia Script**.
- Do not introduce **non-system** modals for core flows if an in-app pattern exists (product decision; align with mobile guidelines).
- Do not mix competing neon accents outside Ember without design review.

---

## 2. Brand colors

| Token | Hex | RGB | Role |
|--------|-----|-----|------|
| **Forest** | `#143630` | `rgb(20, 54, 48)` | Primary brand, surfaces, primary text on light backgrounds, navigation, key UI chrome |
| **Ember** | `#FF4F20` | `rgb(255, 79, 32)` | Accent, CTAs, highlights, badges, active states, links on neutral backgrounds |
| **Mist** | `#D9D9D9` | `rgb(217, 217, 217)` | Dividers, disabled states, subtle fills, secondary borders, neutral scaffolding |

### 2.1 Usage

- **Forest** anchors the interface: headers, tab bars, primary buttons (when paired with sufficient contrast for label color — see §4).
- **Ember** is high-energy: use for one primary action per screen; avoid large Ember fields of color behind small text without checking contrast.
- **Mist** supports structure; pair with Forest text or borders for hierarchy. Do not rely on Mist alone for critical affordances (low contrast for some users).

### 2.2 Suggested extensions (optional)

When you need more steps (e.g. hover, pressed), derive programmatically or add documented tokens later:

- Forest at **88% / 72%** opacity for overlays and scrims.
- Ember at **92%** for pressed CTAs; **12–16% Ember tint** on Forest for subtle “selected” rows.

---

## 3. Typography

### 3.1 Typefaces

| Font | Role | Notes |
|------|------|--------|
| **League Spartan** | UI, headings (functional), body, labels, numbers | Load via [Google Fonts](https://fonts.google.com/specimen/League+Spartan), [@expo-google-fonts/league-spartan](https://www.npmjs.com/package/@expo-google-fonts/league-spartan) on Expo, or self-host **WOFF2** on web. Weights **400 (Regular)**, **500 (Medium)**, **600 (SemiBold)**, **700 (Bold)**. |
| **Magnolia Script** | Display, wordmarks, celebratory moments, optional hero titles | Use sparingly — **never for long paragraphs or dense tables**. Pair with League Spartan for supporting text. |

### 3.2 Scale (League Spartan)

Use rem/sp equivalent in implementation; values are indicative for mobile-first UI.

| Level | Weight | Size (approx.) | Line height | Use |
|--------|--------|----------------|-------------|-----|
| Display | 700 | 28–32 px | 1.15 | Screen titles (functional), not script |
| Title1 | 600 | 22–24 px | 1.2 | Section headers |
| Title 2 | 600 | 18–20 px | 1.25 | Card titles |
| Body | 400 | 16 px | 1.5 | Primary reading |
| Body small | 400 | 14 px | 1.45 | Secondary copy, captions |
| Label | 500–600 | 12–13 px | 1.3 | Buttons, tabs, chips (uppercase optional; track +0.02em if uppercase) |
| Mono / tabular | 500 | 16 px | 1.3 | Points, balances, currency — use `font-variant-numeric: tabular-nums` where supported |

### 3.3 Magnolia Script — when to use

- Logo lockups, onboarding hero, **“You earned…”** celebration headers, limited marketing modules.
- **Max ~3–6 words** per script line; minimum size **~24 px** equivalent on mobile for legibility.
- Always pair with League Spartan body text for the same message if content is essential.

---

## 4. Accessibility — contrast

Targets: **WCAG 2.1 AA** for normal text (4.5:1), large text (3:1), and meaningful non-text UI.

| Combination | Typical use | Check |
|-------------|-------------|--------|
| League Spartan **body** on **#FFFFFF** | Cards, sheets | Ensure Forest text: Forest on white passes for body copy. |
| **White** text on **Forest** `#143630` | Primary buttons, nav | Verify in Figma or a contrast tool; adjust weight/size if needed. |
| **White** text on **Ember** `#FF4F20` | Primary CTA | Verify; Ember is bright — usually acceptable for large buttons; validate exact hex. |
| **Forest** on **Mist** `#D9D9D9` | Avoid for small text | Often **fails** for body size — use Forest on white or dark Forest bar with white text instead. |
| **Ember** on **Forest** | Links, chips on dark bars | Check contrast; may need lighter Ember tint or underline + weight for links. |

**Rule:** Run final screens through an automated contrast checker before release; do not ship gray-on-gray critical actions.

---

## 5. Motion and tone

- **Motion:** Short (200–300 ms), ease-out for entrances; respect reduced-motion OS settings (`prefers-reduced-motion` on web; `AccessibilityInfo` / Reanimated settings on native).
- **Tone:** Confident and clear (League Spartan); **celebration** moments may introduce Magnolia Script without overusing playfulness in transactional flows (cashier, refunds, errors).

---

## 6. Preferred design technology

These choices keep implementation aligned across surfaces. Deviations need a short tech-note (ADR or README) so tokens and patterns stay consistent.

### 6.1 Mobile — consumer and cashier (`apps/mobile`)

| Layer | Preferred choice | Notes |
|-------|------------------|--------|
| Runtime | **Expo** (SDK aligned with repo, e.g. **54**), **React Native**, **TypeScript** | Single codebase for iOS/Android; Expo Router for navigation. |
| Fonts | **`@expo-google-fonts/league-spartan`** + `expo-font`; Magnolia Script via bundled assets + `useFonts` | Match §3. |
| Styling | **`StyleSheet.create`** (or small design-token module shared across screens) | If Tailwind-style RN is adopted later, map utilities to the same hex/font tokens. |
| Images | **`expo-image`** | Caching and placeholders consistent with Expo guidance. |
| Icons | **`@expo/vector-icons`** | Pick one family per app (e.g. Ionicons) for visual consistency. |
| Backend client | **`@supabase/supabase-js`** + `react-native-url-polyfill` | No service role keys in the client. |

### 6.2 Web — operator / vendor dashboard (future `apps/operator-web` or similar)

| Layer | Preferred choice | Notes |
|-------|------------------|--------|
| Framework | **Next.js** (App Router) + **TypeScript** | SSR/SSG as needed for auth and SEO-light admin shells. |
| Styling | **Tailwind CSS** with **CSS variables** mirroring §6.4 tokens | Or equivalent token-first CSS; avoid one-off hex outside tokens file. |
| Components | **Radix UI** primitives + headless patterns, or **shadcn/ui**-style composition | Focus management and ARIA for tables, dialogs, and forms. |
| Data | **Supabase** (`@supabase/supabase-js` or `@supabase/ssr` for cookie sessions) | RLS enforced; admin mutations via RPC where required. |
| Icons | **Lucide** (or **Heroicons**) | Match metaphors with mobile where possible (wallet, location, user). |
| Charts | **Lightweight chart lib** (e.g. based on SVG/Canvas) with Forest/Ember series colours | Avoid default rainbow palettes. |

### 6.3 Cashier on web (optional, Phase-gated)

If a **PWA** cashier is required: prefer **Expo web** slice sharing components with mobile, **or** Next.js with the same token package as operator web—**not** a third styling system.

### 6.4 Design tokens and tooling

- **Source of truth:** This document + a `tokens` module (JSON/TS) exported to RN and CSS variables where practical.
- **Design files:** **Figma** with variables `forest`, `ember`, `mist`, and typography styles named to match §3.2.
- **Versioning:** Bump token major version when contrast-affecting colours change.

### 6.5 Animation libraries

- **React Native:** **react-native-reanimated** when complex gestures or shared transitions are required (add when needed; respect reduced motion).
- **Web:** CSS transitions first; **Motion** (Framer Motion) only where CSS is insufficient.

### 6.6 What to avoid without review

- Ad-hoc **inline styles** with magic numbers across large surfaces.
- **Multiple** icon families mixed on one screen.
- **CSS-in-JS** runtimes that complicate SSR and theming unless there is a clear payoff.
- **Non-TypeScript** UI code in new apps.

---

## 7. Implementation snippets

### 7.1 CSS custom properties (reference)

```css
:root {
  --color-forest: #143630;
  --color-ember: #ff4f20;
  --color-mist: #d9d9d9;
  --font-ui: "League Spartan", system-ui, sans-serif;
  --font-display: "Magnolia Script", cursive;
}

body {
  font-family: var(--font-ui);
  color: var(--color-forest);
}
```

### 7.2 Web font import (Google Fonts — League Spartan only)

Magnolia Script may not be on Google Fonts; use the licensed files from your type foundry and `@font-face` with **woff2** priority.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

---

## 8. Asset checklist

- [ ] League Spartan WOFF2 (or Google Fonts / Expo Google Fonts package) in all surfaces  
- [ ] Magnolia Script licensed files + `@font-face` or asset loading (weights as purchased)  
- [ ] Figma variables: `forest`, `ember`, `mist` + shared text styles  
- [ ] Shared **tokens** file consumed by mobile and web where both exist  
- [ ] Dark-mode policy (if applicable): document Forest/Ember/Mist roles or alternate tokens in a future revision  

---

*MyCult style guide — align with `docs/technical-prd.md` for product scope.*
