# MyCult — Public website

**Purpose:** Spec for the public site at **`https://www.my-cult.com`** (and apex `https://my-cult.com`).  
This surface is the **marketing home**, **App Store / TestFlight support URL**, and the **HTTPS host for Supabase Auth redirects** (confirm email, password recovery) plus **join / identify** links used by the mobile app.

**Related:** [Style guide](./style-guide.md), [Technical PRD](./technical-prd.md), [QR join](./qr-join-mobile-integration.md), [Member identify QR](./member-identify-qr.md), mobile `apps/mobile/TESTFLIGHT.md`.

**Canonical origin:** `https://www.my-cult.com`  
**Scheme (app):** `mycult://`  
**Bundle / package:** `com.mycult.app`

---

## 1. Goals

1. **Marketing** — Explain MyCult to consumers and businesses; drive app install and vendor interest.
2. **Auth bridge** — Complete email flows that start in the mobile app (confirm signup, reset password) when the user opens a link from SMTP mail.
3. **Deep-link host** — Serve stable HTTPS URLs for join (`/join?v=`) and identify (`/identify?v=&t=`) that open the app or a graceful web fallback.
4. **Trust / compliance** — Privacy, terms, support contact for App Store Connect and Sri Lanka users.
5. **Not in v1** — Full consumer web wallet, cashier PWA, or operator SaaS (those stay in existing apps / operator web).

---

## 2. Audience and entry points

| Audience | Arrives via | Needs |
|----------|-------------|--------|
| Consumer | Ads, App Store, email, QR | Install app, confirm email, reset password, open join link |
| Prospective vendor | Landing CTAs, sales | Contact / waitlist, link to operator product later |
| Existing member | SMTP links, shared QR | Auth callback pages that work on mobile Safari / Chrome |

---

## 3. Information architecture (routes)

### 3.1 Marketing

| Path | Role | Notes |
|------|------|--------|
| `/` | Home / hero | Brand-first; one primary CTA (Get the app); secondary CTA (For businesses) |
| `/consumers` | Consumer value | Loyalty wallet, QR join, Cultpoints — short, scannable |
| `/businesses` | B2B pitch | Cashier + programmes; lead form or `mailto:` / Calendly |
| `/download` | Store badges | App Store + Play (or “coming soon”); TestFlight note if needed |
| `/support` | Help & contact | Required for store listings; FAQ + email |
| `/privacy` | Privacy policy | App Store / legal |
| `/terms` | Terms of use | App + site |

### 3.2 Auth (Supabase + SMTP)

These pages must exist on the **same origin** configured as Supabase **Site URL** / **Redirect URLs**.

| Path | Role | Trigger |
|------|------|---------|
| `/auth/callback` | Exchange auth code / hash for session; then route user | Confirm signup, magic link, OAuth (if added later) |
| `/auth/confirm` | Friendly “email confirmed” landing | After successful confirm; CTA: Open MyCult / Sign in in app |
| `/auth/reset-password` | Set new password (logged-in recovery session) | User clicked **Reset password** in email |
| `/auth/reset-requested` | “Check your email” | Optional UX after requesting reset from web |
| `/auth/error` | Generic auth failure | Expired/invalid link |

**Mobile deep-link preference:** After a successful callback, prefer opening `mycult://auth` (or `/` in-app) when possible; always show a web fallback with clear next steps.

### 3.3 Product link hosts (already referenced in mobile)

| Path | Role | Behaviour |
|------|------|-----------|
| `/join` | Vendor join QR / link (`?v={vendor_id}`) | Try Universal Link / intent to app; else “Open in MyCult” + short explanation |
| `/identify` | Member identify QR (`?v=` & `t=`) | Prefer app open; web may show “Show this to staff in the MyCult app” — do **not** expose tokens in UI logs |

Exact query keys: see [member-identify-qr.md](./member-identify-qr.md) and join parsers in `apps/mobile/lib/join/`.

### 3.4 Redirects

| From | To |
|------|-----|
| `https://my-cult.com/*` | `https://www.my-cult.com/*` (301) |
| `/login`, `/signin` | `/download` or `/auth/callback` as appropriate — prefer `/download` for humans |
| `/app` | `/download` |

---

## 4. Supabase Auth configuration (must match this site)

Dashboard → **Authentication** → **URL Configuration**:

| Setting | Value |
|---------|--------|
| **Site URL** | `https://www.my-cult.com` |
| **Redirect URLs** | `https://www.my-cult.com/**` |
| | `https://www.my-cult.com/auth/callback` |
| | `https://www.my-cult.com/auth/reset-password` |
| | `mycult://**` |
| | `mycult://auth` |

**Email templates** (SMTP):

| Template | `redirectTo` / link target |
|----------|----------------------------|
| Confirm signup | `{{ .ConfirmationURL }}` → lands on Site URL / callback → then `/auth/confirm` |
| Reset password | `{{ .ConfirmationURL }}` → `/auth/reset-password` (or callback then redirect) |
| Magic link (if enabled) | Same callback host |

**Custom SMTP:** Required for production (see project Auth → SMTP). Sender e.g. `noreply@my-cult.com` after domain verification.

**App changes (follow-up):** Mobile `signUp` / `resetPasswordForEmail` should pass:

```text
emailRedirectTo: https://www.my-cult.com/auth/callback
```

(or a dedicated reset URL). Until then, Site URL alone still receives default links.

---

## 5. Auth page behaviour (implementation contract)

### 5.1 `/auth/callback`

1. Parse Supabase redirect (`code` PKCE query and/or `#access_token` hash — support both).
2. Establish session via `@supabase/ssr` or `exchangeCodeForSession`.
3. Branch:
   - **Recovery** type → redirect to `/auth/reset-password`
   - **Signup / invite / magiclink** → `/auth/confirm`
   - Failure → `/auth/error?reason=…`
4. Never leave long-lived tokens in the visible address bar; strip hash after exchange.

### 5.2 `/auth/reset-password`

1. Require an active recovery session; if missing, show “Link expired — request a new reset.”
2. Form: new password + confirm (min 8 chars, match mobile rules).
3. `supabase.auth.updateUser({ password })`.
4. Success copy: “Password updated. Open the MyCult app and sign in.”
5. Optional: `signOut()` on web after success so the session isn’t left on a shared browser.

### 5.3 `/auth/confirm`

- “You’re verified.”  
- Primary: **Open MyCult** (`mycult://auth` + store badges).  
- Secondary: link to `/download`.

### 5.4 Forgot password (web entry, optional v1.1)

- Page `/auth/forgot-password`: email field → `resetPasswordForEmail` with `redirectTo: https://www.my-cult.com/auth/callback`.
- Mobile can later deep-link here or call the same API in-app.

---

## 6. Content guide

Use this section to write and review all public-site copy. Visual rules stay in [style-guide.md](./style-guide.md); this section owns **words**, **structure**, and **approved phrases**.

### 6.1 Voice and principles

| Surface | Tone | Do | Don’t |
|---------|------|-----|--------|
| Marketing (home, consumers, businesses) | Confident, friendly, concise | Short sentences; one idea per block | Hype, sarcasm, fake urgency (“Act now!!”) |
| Auth & system pages | Direct, calm, error-forward | Say what happened + next step | Blame the user; joke about failed logins |
| Support / FAQ | Helpful, plain | Steps in order; link to email | Walls of jargon |
| Privacy / Terms | Neutral, readable | Precise obligations | Marketing fluff inside legal pages |
| B2B | Professional, precise | Define terms once (e.g. “earn rate”) | Buzzword stacks (“synergy”, “disrupt”) |

**Principles (from brand):** active voice; respect time; no cult imagery that undermines trust in money-adjacent loyalty flows.

**Product name:** always **MyCult** (capital M, capital C). Never “My Cult”, “mycult” in user-facing sentences (URLs/slugs excepted).

**Locale (v1):** English (Sri Lanka–friendly). Avoid idioms that don’t travel; plan Sinhala/Tamil later without rewriting meaning.

### 6.2 Glossary (use consistently)

| Term | Meaning | Avoid |
|------|---------|--------|
| **MyCult** | The product / platform | “the cult app”, “loyalty OS” |
| **Member** | Person collecting rewards | “user” on marketing pages when “member” fits |
| **Business / retailer / café** | Vendor on the platform | “merchant” in consumer copy (OK in B2B once defined) |
| **Wallet** | In-app list of loyalty cards | “portfolio”, “dashboard” on marketing |
| **Join** | Opt into a business’s programme via QR/link | “onboard”, “acquire” |
| **Earn** | Receive points after a purchase | “mine”, “grind” |
| **Cultpoints** | Platform / coalition points feature name (product) | Spelling variants (“Cult Points” in UI chrome — prefer one word **Cultpoints** unless brand lockup says otherwise) |
| **Cashier** | Staff awarding points in-store | “teller” |
| **Programme** | A business’s loyalty programme | US “program” on public site (LK/EN preference: **programme**) |

### 6.3 Words to avoid

- Fake scarcity or crypto slang  
- “Revolutionary”, “disruptive”, “seamless” (overused; prefer concrete benefit)  
- Exaggerated religious/cult jokes in body copy  
- Guarantees about rewards that vendors control (“always double points”)  
- Claiming bank/payment-license status MyCult does not have  

### 6.4 CTA label bank

| Intent | Preferred label | Alternatives |
|--------|-----------------|--------------|
| Install | **Get the app** | Download MyCult |
| Business interest | **For businesses** | Partner with MyCult |
| Open app from web | **Open MyCult** | Open in app |
| Confirm success | **Sign in to the app** | Continue in MyCult |
| Password | **Update password** | Save new password |
| Reset request | **Send reset link** | Email me a link |
| Support | **Email support** | Contact us |
| Legal | **Privacy**, **Terms** | — |

One primary Ember CTA per viewport; secondary is text link or quieter button.

### 6.5 SEO & social defaults

| Page | Title (≈60 chars) | Meta description (≈155 chars) |
|------|-------------------|-------------------------------|
| `/` | MyCult — Your loyalty, unified | One wallet for the places you love. Join programmes with a QR, earn at the till, keep rewards in MyCult. |
| `/consumers` | MyCult for members | Carry every loyalty card in one app. Join with a scan, earn points, show who you are in-store. |
| `/businesses` | MyCult for businesses | Reward regulars without another plastic card. Simple cashier awards and programmes built for Sri Lanka. |
| `/download` | Download MyCult | Get the MyCult app for iOS and Android. |
| `/support` | MyCult Support | Help with sign-in, email confirmation, password reset, and your account. |
| `/privacy` | Privacy Policy — MyCult | How MyCult collects, uses, and protects your information. |
| `/terms` | Terms of Use — MyCult | Terms for using the MyCult app and website. |
| `/auth/confirm` | Email confirmed — MyCult | Your email is verified. Open the MyCult app to sign in. |
| `/auth/reset-password` | Reset password — MyCult | Choose a new password for your MyCult account. |
| `/auth/error` | Link problem — MyCult | This link is invalid or expired. Request a new one or contact support. |
| `/join` | Join on MyCult | You’re joining a loyalty programme. Open MyCult to continue. |
| `/identify` | Member QR — MyCult | Open MyCult to show your member code to staff. |

**Open Graph:** title ≈ page title; description ≈ meta; image = Forest field + MyCult wordmark (no busy collage).

### 6.6 Global chrome copy

**Nav (marketing):** MyCult (home) · Members · Businesses · Download · Support  

**Footer:**

- Line: `© {year} MyCult`  
- Links: Privacy · Terms · Support  
- Optional: `support@my-cult.com`  
- No social icons until accounts exist  

**Cookie/analytics banner (if needed):** short, neutral — “We use limited analytics to improve the site. See Privacy.” + Accept / Reject. No dark patterns.

---

### 6.7 Page content — Home `/`

**Job:** Brand recognition + install. First viewport = brand, one headline, one supporting sentence, CTA group, one dominant visual (full-bleed). No stats strip, no card grid in hero.

| Element | Approved copy |
|---------|----------------|
| Brand | **MyCult** |
| Headline | Your loyalty, unified. |
| Supporting | One app for the cafés and shops you already love—join with a QR, earn at the till, keep it all in your wallet. |
| Primary CTA | Get the app |
| Secondary CTA | For businesses |
| Section 2 title | For members |
| Section 2 body | Carry every card in one wallet. Scan to join a programme, earn when you pay, and show who you are when staff ask. |
| Section 3 title | For businesses |
| Section 3 body | Reward regulars without printing another plastic card. Staff look up a member, enter the bill, and confirm—points land where they belong. |
| Section 4 title | How it works |
| Step 1 | **Join** — Scan the business QR or open their link. |
| Step 2 | **Earn** — Pay as usual; staff award points in MyCult. |
| Step 3 | **Return** — Keep balances in your wallet; show your member QR or phone when needed. |
| Section 5 title | Get MyCult |
| Section 5 body | Available on iOS and Android. |
| Imagery note | Real café/retail Sri Lanka context; Forest scrim if text overlays photo. |

---

### 6.8 Page content — `/consumers`

| Element | Approved copy |
|---------|----------------|
| H1 | Loyalty that travels with you |
| Lead | Stop juggling stamps and forgotten apps. MyCult keeps each business’s programme in one wallet. |
| Block A title | Join in seconds |
| Block A body | Scan a MyCult QR at the counter or open a join link. You’re in the programme—no extra plastic. |
| Block B title | Earn at the till |
| Block B body | Staff award points when you purchase. Balances show in your wallet when you’re signed in. |
| Block C title | Identify with confidence |
| Block C body | Show your in-app member QR or give your phone number so staff can find you quickly. |
| CTA | Get the app |

---

### 6.9 Page content — `/businesses`

| Element | Approved copy |
|---------|----------------|
| H1 | Reward regulars. Keep it simple at the counter. |
| Lead | MyCult helps cafés and retailers run a clear loyalty programme—without slowing the queue. |
| Block A title | Cashier-ready |
| Block A body | Look up a member by QR or phone, enter the bill amount, confirm the award. Built for speed and fewer mistakes. |
| Block B title | Your programme, their wallet |
| Block B body | Members keep your card in MyCult. You keep control of earn rules and staff access. |
| Block C title | Built for Sri Lanka rollout |
| Block C body | Phone-friendly identity, practical in-store flows, room to grow into broader coalition rewards later. |
| CTA primary | Talk to us |
| CTA form labels | Name · Business name · City · Email · Phone · Message |
| Form submit | Send message |
| Form success | Thanks—we’ll get back to you shortly. |
| Form error | Something went wrong. Email us at support@my-cult.com. |

---

### 6.10 Page content — `/download`

| Element | Approved copy |
|---------|----------------|
| H1 | Download MyCult |
| Body | Get the app to join programmes, earn points, and keep your wallet with you. |
| iOS button | Download on the App Store |
| Android button | Get it on Google Play |
| Pre-store fallback | MyCult is coming to the App Store and Google Play. Prefer TestFlight or a preview build? Email support@my-cult.com. |
| Hint | Already installed? Open MyCult |

---

### 6.11 Page content — `/support`

| Element | Approved copy |
|---------|----------------|
| H1 | Support |
| Intro | We’re here to help with the MyCult app and your account. |
| Contact | Email **support@my-cult.com** — we aim to reply within 2 business days. |
| FAQ1 Q | I signed up but can’t sign in |
| FAQ1 A | Check your email for a confirmation link from MyCult. Open it, then sign in with your email and password in the app. |
| FAQ2 Q | I didn’t get the confirmation email |
| FAQ2 A | Check spam/junk. Still missing? Email support with the address you used to register. |
| FAQ3 Q | How do I reset my password? |
| FAQ3 A | Use **Forgot password** in the app (or [reset on the web](/auth/forgot-password) when available). We’ll email a secure link. The link expires—request a new one if needed. |
| FAQ4 Q | How do I delete my account? |
| FAQ4 A | Email support@my-cult.com from your registered address with subject “Delete my account”. We’ll confirm and process your request. |
| FAQ5 Q | I’m a business—how do I join? |
| FAQ5 A | See [For businesses](/businesses) or email support with your business name and city. |

---

### 6.12 Auth microcopy

#### `/auth/confirm`

| Element | Copy |
|---------|------|
| Title | You’re verified |
| Body | Your email is confirmed. Open the MyCult app and sign in to continue. |
| Primary CTA | Open MyCult |
| Secondary | Download the app |

#### `/auth/reset-password`

| Element | Copy |
|---------|------|
| Title | Choose a new password |
| Body | Use at least 8 characters. You’ll use this password to sign in to MyCult. |
| Label 1 | New password |
| Label 2 | Confirm password |
| CTA | Update password |
| Success title | Password updated |
| Success body | Open the MyCult app and sign in with your new password. |
| Expired title | This link has expired |
| Expired body | Request a new reset link from the app or the forgot-password page. |

#### `/auth/forgot-password` (P0/P1)

| Element | Copy |
|---------|------|
| Title | Forgot password |
| Body | Enter the email for your MyCult account. We’ll send a reset link. |
| Label | Email |
| CTA | Send reset link |
| Success | If an account exists for that email, we’ve sent a link. Check your inbox and spam folder. |

#### `/auth/reset-requested`

| Element | Copy |
|---------|------|
| Title | Check your email |
| Body | We sent a password reset link. It may take a few minutes to arrive. |

#### `/auth/error`

| Element | Copy |
|---------|------|
| Title | We couldn’t open that link |
| Body | It may have expired or already been used. Request a new email from the app, or contact support. |
| CTA | Back to support |
| Secondary | Get the app |

#### `/auth/callback`

No marketing copy—brief status only if UI is shown: **Signing you in…**

---

### 6.13 Join & identify fallback copy

#### `/join`

| Element | Copy |
|---------|------|
| Title | Join this programme on MyCult |
| Body | You’re one step from joining this business’s loyalty programme. Open the MyCult app to continue. |
| Primary CTA | Open MyCult |
| Secondary | Don’t have the app? Download |
| Missing `v` | This join link is incomplete. Ask the business for a new QR or link. |

#### `/identify`

| Element | Copy |
|---------|------|
| Title | Member code |
| Body | Open MyCult to show your member QR to staff. This page won’t display your code in the browser. |
| Primary CTA | Open MyCult |
| Do not | Print or show the raw `t` token in the page |

---

### 6.14 Transactional email copy (SMTP templates)

Keep Supabase variables. Tone: calm, branded, short.

**Confirm signup — subject:** Confirm your MyCult email  

**Confirm signup — body (outline):**

```text
Hi{{ if .Data.full_name }} {{ .Data.full_name }}{{ end }},

Confirm your email to finish creating your MyCult account.

Confirm email: {{ .ConfirmationURL }}

If you didn’t sign up, you can ignore this message.

— MyCult
```

**Reset password — subject:** Reset your MyCult password  

**Reset password — body (outline):**

```text
Hi,

We received a request to reset your MyCult password.

Reset password: {{ .ConfirmationURL }}

If you didn’t ask for this, you can ignore this email. The link will expire.

— MyCult
```

**Sender name:** MyCult · **From:** `noreply@my-cult.com` (or verified domain equivalent).

---

### 6.15 Privacy & Terms — content outline (legal draft input)

Not final counsel-approved text—structure for lawyers / ops to fill.

**Privacy (`/privacy`) must address:**

1. Who we are (MyCult / operating entity TBD)  
2. Data we collect (account email/phone/name, loyalty balances, device basics, support messages)  
3. How we use data (provide app, award points, security, support)  
4. Vendors / staff access (businesses see members in their programme as needed to operate loyalty)  
5. Processors (e.g. hosting, Supabase Auth, SMS/email providers)  
6. Retention & deletion requests  
7. Contact: support@my-cult.com  
8. Sri Lanka / cross-border processing notes as applicable  

**Terms (`/terms`) must address:**

1. Acceptance of terms  
2. Account responsibility  
3. Loyalty points rules controlled by each business; MyCult as platform  
4. Acceptable use  
5. App stores’ roles  
6. Limitation of liability (counsel)  
7. Changes to terms  
8. Contact  

Public site shows full pages; marketing pages only link—“By using MyCult you agree to our Terms” in footer optional, not in hero.

---

### 6.16 Content checklist before publish

- [ ] Product name casing correct everywhere  
- [ ] One primary CTA per above-the-fold block  
- [ ] Auth pages have next step on every error state  
- [ ] Support email live and monitored  
- [ ] Privacy & Terms linked from footer and store listings  
- [ ] No placeholder “lorem” or “TBD” in production  
- [ ] SMTP subjects/bodies match §6.14 and redirect to this host  
- [ ] Meta titles/descriptions set per §6.5  

---

## 7. App Store / Play listing URLs

Use these live paths in store consoles and `TESTFLIGHT.md` checklist:

| Listing field | URL |
|---------------|-----|
| Marketing / website | `https://www.my-cult.com` |
| Support URL | `https://www.my-cult.com/support` |
| Privacy Policy | `https://www.my-cult.com/privacy` |

Support page must include a reachable email (e.g. `support@my-cult.com`) and short FAQ (sign-in, confirm email, delete account request).

---

## 8. Technical recommendations

| Concern | Recommendation |
|---------|----------------|
| Stack | **Next.js** (App Router) in monorepo e.g. `apps/public-web`, deployed on Vercel |
| Auth helpers | `@supabase/ssr` + anon key; no service role in the browser |
| Design | Tokens from style guide; no Inter/Roboto default; avoid purple/cream AI clichés |
| SEO | `sitemap.xml`, `robots.txt`, Open Graph image (Forest + wordmark) |
| Analytics | Privacy-friendly; document in Privacy policy |
| Universal Links | Apple Associated Domains + Android App Links for `/join`, `/identify`, `/auth/*` when app is live |
| Apex | Redirect `my-cult.com` → `www.my-cult.com` |

**Env (public web):**

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Optional: `NEXT_PUBLIC_APP_SCHEME=mycult`

---

## 9. Security and privacy

- Auth pages: HTTPS only; no caching of HTML with tokens (`Cache-Control: no-store` on `/auth/*`).
- Do not log identify tokens or recovery hashes.
- Rate-limit forgot-password endpoints if self-hosted actions are added.
- Privacy/Terms: cover account data, phone/email, loyalty balances, vendor staff access, retention, contact for deletion.
- SMTP: transactional only; marketing email is a separate consent flow (not v1).

---

## 10. Phased delivery

### P0 — Launch block (do first)

- [ ] Apex + www hosting with TLS  
- [ ] `/`, `/privacy`, `/terms`, `/support`, `/download`  
- [ ] `/auth/callback`, `/auth/confirm`, `/auth/reset-password`, `/auth/error`  
- [ ] Supabase Site URL + Redirect URLs + SMTP templates pointed at this host  
- [ ] Mobile `emailRedirectTo` / reset redirect updated to this host  

### P1 — Link hosts

- [ ] `/join` and `/identify` smart app banners / store fallback  
- [ ] Associated Domains / App Links  

### P2 — Marketing depth

- [ ] `/consumers`, `/businesses`, lead capture  
- [ ] Localised copy (EN first; Sinhala/Tamil later per product roadmap)  

---

## 11. Acceptance criteria

1. Confirm-signup email → user can verify and see `/auth/confirm` (or app open) without manual Supabase dashboard steps.  
2. Reset-password email → user can set a new password on `/auth/reset-password` and sign in on mobile.  
3. Expired link → `/auth/error` with recoverable next step (request new email / support).  
4. `/privacy` and `/support` load publicly without auth (store review).  
5. Visual language matches Forest / Ember / Mist and League Spartan per style guide.  
6. `www` and apex both work; preferred canonical is `www`.

---

## 12. Out of scope (explicit)

- Operator SaaS (see [operator-web-app.md](./operator-web-app.md))  
- Replacing the Expo auth UI for day-to-day sign-in  
- Hosting Cultpoints ledgers or staff RPCs on this site  
- Sending promotional email without a separate ESP + consent  

---

## 13. Open decisions

| Topic | Options | Default suggestion |
|-------|---------|-------------------|
| Lead form | Formspree / HubSpot / Supabase table | Simple form → email until CRM exists |
| App open UX | Universal Links vs button-only | Button + `mycult://` until Associated Domains shipped |
| Password reset entry | In-app only vs web `/auth/forgot-password` | Add web page in P0 for SMTP completeness |

---

**Document owner:** Product + eng  
**Last updated:** 2026-09-06 (content guide §6 added)
