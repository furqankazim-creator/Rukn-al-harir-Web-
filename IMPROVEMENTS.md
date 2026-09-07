# Rukn Al Harir — Project Improvements

A record of everything built and changed across the frontend and the new backend, why it was done, and how to run it. Written as a reference for future work, not just a changelog.

---

## 1. Overview

| | |
|---|---|
| **Frontend** | React 19 + Vite, React Router 7, Framer Motion. Public marketing site + new `/admin` panel. |
| **Backend** | New — Express (Node.js) + SQLite (`better-sqlite3`), JWT auth. Lives in `server/`. |
| **Content source** | Company Profile PDF (`Company Profile Rukn AlHarir.pdf`) — used to source real photos, the logo, and copy for accuracy. |

---

## 2. Frontend

### 2.1 Gallery

- Added a `GalleryPreview` section component (masonry/mosaic grid, hover overlays) and iterated its placement per feedback: tried on Home, then moved to the About page as a full gallery block using all 10 site photos.
- Removed the old standalone `/gallery` route, page (`src/pages/Gallery.jsx`), its nav links (Navbar + Footer), and the unused `Gallery.css` — gallery now lives only inside About.
- Fixed a hover-clipping bug on the `ClientLogos` marquee: `overflow: hidden` on each scrolling row was cutting off the hover lift/shadow on logo cards. Fixed by giving the row extra vertical padding instead of resizing the cards.

### 2.2 Navbar

- Iterated on styling twice: first a "premium" glass/blur redesign, then — per explicit instruction — replaced with a simpler, flatter design ported from a reference `Navbar.css`/`Logo.jsx`/`Logo.css` the user provided, while **keeping the current nav tabs** (`Home / About / Services / Our Work / Contact`) rather than the reference project's tab list.
- Fixed a dead route: "Our Work" pointed to `/Work`, which didn't exist. Added a real `/work` route (renders the `Approach` page) so the link works.

### 2.3 Footer

- Removed a stray reddish glow (`.footer__glow`) and radial-gradient tint bleeding from the top-left corner.
- Synced the "Quick Links" list to exactly match the Navbar's current tabs/labels/routes (they had drifted — Footer said "Our Approach" → `/approach`, Navbar said "Our Work" → `/work`).

### 2.4 Logo

- Went through a few iterations:
  1. Cropped the **exact icon** (gear + wrench) directly out of the company profile PDF's cover page at full resolution, made the background transparent, and used it as `public/logomain.png` / `favicon-64.png`.
  2. Per instruction, swapped to a hand-coded inline SVG version (ported from a reference project) for a while.
  3. Reverted to the **exact profile-sourced image** (step 1) as the final version — wrapped in a small white circular badge in `Logo.jsx`/`Logo.css` so the icon (which has a black gear) stays legible on the navy navbar/footer background.

### 2.5 Hero section

- Removed the dark gradient overlay and color-grading `filter` that sat on top of the background video — it was requested to render exactly as provided, with no added shade/shadow.
- Wired up `bgPosterSrc` as an actual `<video poster>` (it was previously just a dead prop) and pointed it at a profile-sourced cover image instead of a generic Unsplash placeholder.
- Tried adding decorative prop images (tape measure, hard hat) floating over the hero video; removed after feedback that props-over-video looked cluttered, and relocated them instead to the static circular photo in the Home "About Snapshot" section, where they fit the company-profile cover-page aesthetic without competing with video motion.

### 2.6 Images sourced from the company profile

Extracted directly from the PDF (via PyMuPDF) and used in place of generic stock photos, matching each site page to the corresponding profile page:

| Site location | Image | Notes |
|---|---|---|
| Home hero poster | `images/photos/home-hero-cover.jpg` | Cover page — worker + Dubai skyline |
| About | `images/photos/about-team-branded.jpg` | Technician wearing an actual Rukn Al Harir-branded hi-vis vest — most authentic asset found |
| Services — Project Support card | `images/photos/services-review.jpg` | Real blueprint/hands-on-site photo (replaced a generic stock photo) |
| Approach — intro photo | `images/photos/approach-operational.jpg` | From the profile's "Operational Strength" page |
| Home — "Industries We Serve" background | `images/photos/contact-site-aerial.jpg` | Moved here after being removed from the Contact page per feedback |
| Services — "Industries & Engagement" background | `images/photos/services-engagement-bg.jpg` | Replaced an unrelated stock photo (a UK theatre building) |
| Home — About Snapshot props | `images/props/tape-measure.png`, `images/props/helmet.png` | Required re-extracting with proper alpha/soft-mask handling — the first extraction pass baked the transparent background in as solid black |
| Gallery (About page) | `images/gallery/gallery-01.png` … `gallery-10.png` | All 10 already matched the profile 1:1 |

Also removed now-unused duplicate/generic images (`approach-trench.png`, `services-support.jpeg`, `about-site-walk.png`, `servicesimage.jpeg`) once their replacements were in place.

### 2.7 "Our Execution Model" (Approach page)

Full redesign from a cramped 7-column mini-timeline into an alternating zig-zag flow:

- Animated vertical spine that fills in on scroll.
- Steps alternate left/right of the spine, each in a glass-style card with a custom icon, a large faint "ghost number" watermark, and a hover lift/glow.
- Fixed a clipping bug where the ghost number (`top: -0.75rem`, i.e. positioned outside the card) was being cut off by the card's `overflow: hidden` — moved it inside the visible bounds.
- Collapses to a single-column left-aligned timeline on mobile.

### 2.8 Services page — "Industries & Engagement Models"

- Converted the two plain bullet lists into bordered glass-panel cards with numbered circular badges (previously small diamond dots that were vertically misaligned with the text).
- Added hover states per list item.
- Replaced the background image with a profile-sourced construction-site photo.

### 2.9 Admin Panel (new)

A full admin UI under `/admin` in the same React app (`src/admin/`), talking to the new backend:

- **Auth**: `/admin/login` (JWT stored in `localStorage`), `ProtectedRoute` guarding everything else.
- **`/admin`** — Dashboard: stat cards (inquiries, new inquiries, services, gallery images, admin users).
- **`/admin/contacts`** — Inquiries: list, expand to view full message, change status (new/read/replied), delete.
- **`/admin/services`** — create/edit/delete service categories.
- **`/admin/gallery`** — multi-file upload, caption/visibility edit, reorder (↑/↓), delete.
- **`/admin/settings`** — site title, primary color, footer text, maintenance mode.
- **`/admin/users`** — manage who can log into the admin panel.
- Shared UI: sidebar layout (`AdminLayout.jsx`), reusable `LoadingState` / `ErrorState` (with **Retry**) / `EmptyState` components, and a distinct `admin.css` design system (separate from the public site's neo-brutalist look).
- Login page has a show/hide password toggle, the real logo mark, and clearer copy.

### 2.10 Frontend↔backend connection bugs (root-caused and fixed)

These caused most of the "can't load" / CORS errors seen along the way:

1. **Missing root `.env`** — the project had no `.env` file, so `VITE_API_URL` was `undefined` and the app silently fell back to a hardcoded placeholder (`https://api.ruknalharir.com`), which doesn't exist. Created a real `.env` with `VITE_API_URL=http://localhost:5000`.
2. **Session vs. connectivity conflation** — if the backend was merely unreachable (not a bad login), the admin panel used to wipe the stored token and bounce to the login screen, indistinguishable from actually being logged out. `AuthContext` now only clears the session on a real `401`; a network failure instead shows a "Can't reach the API server" screen with a **Retry** button that re-checks without touching the session.
3. **CORS port mismatch** — Vite auto-picks a new port (5174, 5175, …) whenever 5173 is taken, which the backend's CORS allow-list didn't include, causing a silent, confusing CORS failure. Backend now accepts any `http://localhost:<port>` origin in development.
4. **Empty-array fallback bug** — `parsedOrigins || fallback` never fell back, because an empty array is truthy in JS. Fixed to check `.length` explicitly.

### 2.11 Bundle size / code-splitting

The production build had a single ~677KB main chunk (past Vite's 500KB warning threshold), because every route — public pages **and** the entire admin panel — was bundled into one file that every visitor downloaded on first load, regardless of which page they landed on.

- Converted every route element in `App.jsx` (`Home`, `About`, `Services`, `Approach`, `Contact`, and all seven `/admin/*` pages + `AdminLayout`) to `React.lazy()` dynamic imports, wrapped in a single `<Suspense>` around `<Routes>`. Added a minimal `RouteFallback.jsx` spinner for the (usually invisible) gap while a chunk downloads.
- Added `vite.config.js` (the project had none before) with a `manualChunks` function splitting heavy, rarely-changing vendor code into its own cacheable chunks: `vendor-react` (react/react-dom/react-router-dom), `vendor-motion` (framer-motion), `vendor-gsap` (gsap/@gsap/react). Note: this project runs on Vite 8's Rolldown bundler, whose `manualChunks` only accepts a **function**, not the object-map form standard Rollup also supports.
- Result: main app chunk dropped from **677KB → 22.8KB**; each admin page is now its own 3–4.5KB chunk that only loads when someone actually visits `/admin`; the chunk-size warning is gone entirely. Verified by building, serving the production build, and smoke-testing every route (public + admin login) in a real browser with zero console errors.

### 2.12 Admin CMS → public site wiring

Wired **Gallery** and **Settings** through to the public site — deliberately did **not** force-fit Services (see the note at the end of this section on why).

- New hooks `usePublicGallery(fallbackImages)` and `usePublicSettings(defaults)` (`src/hooks/`) fetch from the new public API endpoints (`GET /api/gallery`, `GET /api/settings`) and merge over the existing hardcoded defaults — they only *override* a default when the API actually returns non-empty data. An unreachable backend or a completely empty admin database is functionally identical to today's site: nothing regresses just because no one has touched the admin panel yet.
- About page gallery now calls `usePublicGallery` — upload images in `/admin/gallery` and they appear on the live site; leave it empty and the 10 original photos keep showing.
- Footer tagline (`.footer__tagline` and the bottom-bar copy) now reads `settings.footer_text` via `usePublicSettings`, falling back to the original hardcoded line.
- `maintenance_mode` now does something: a new `MaintenanceBanner` component (mounted in `Layout.jsx`) shows a slim red strip above the navbar when the admin toggles it on, and shifts the fixed navbar + page content down to make room (via a `has-maintenance-banner` class on `<html>`). Deliberately a **banner, not a full-page block** — a checkbox in the admin panel should never be able to silently take the entire public site offline.
- Verified the whole loop live: uploaded a real image via `/admin/gallery` → confirmed it appeared on `/about`; saved custom `footer_text` + enabled `maintenance_mode` via `/admin/settings` → confirmed the Footer text and banner updated on the public site immediately, then reverted both and confirmed the site fell straight back to its original defaults.

**Why Services was left alone:** the admin's `services` table is a generic `{ title, description, icon, position }` shape meant for a simple CRUD list. The actual public Services page (`src/pages/Services.jsx`) is a richly custom-designed layout — hand-illustrated icon blocks, structured bullet lists per service, photo panels — that doesn't map onto that shape. Wiring it up for real would mean either dumbing the public page down to fit the generic schema (a visible design regression) or redesigning the schema to match the real page structure (a project of its own). Rather than force either silently, this is flagged as a distinct follow-up rather than done half-way.

### 2.13 Frontend automated tests

Added Vitest + React Testing Library (`vite.config.js` `test` block, `src/test/setup.js` for jest-dom + `IntersectionObserver`/`ResizeObserver`/`matchMedia` polyfills jsdom doesn't provide — framer-motion's `whileInView` needs the first one). `npm test` runs 21 tests across 5 files:

- `getErrorMessage.test.js` — the connectivity-vs-server-error message logic.
- `usePublicGallery.test.jsx` / `usePublicSettings.test.jsx` — fallback-on-empty, fallback-on-failure, and override-on-real-data behavior (mocked `fetch`).
- `AuthContext.test.jsx` — the most fragile logic in the app: session restore on a valid token, clearing the session on a real 401, **keeping** the session and surfacing `connectionError` on a network failure, login, logout.
- `Contact.test.jsx` — client-side validation (empty fields, bad email format) blocks submission; a valid submission calls the API and shows the success state.

---

## 3. Backend (new)

Located in `server/` — Express API supporting the Contact form and a full admin CMS.

### 3.1 Stack

- **Express** — HTTP layer, `helmet` for security headers, `morgan` for dev logging.
- **better-sqlite3** — zero-config, file-based SQL database (`server/data/rukn.sqlite`).
- **JWT (`jsonwebtoken`) + `bcryptjs`** — admin authentication.
- **`multer`** — gallery image uploads, stored in `server/uploads/gallery/` and served statically at `/uploads/...`.
- **`nodemailer`** — optional SMTP email notification on new contact submissions (skipped gracefully if unconfigured).
- **`express-rate-limit`** — 5 requests/minute/IP on the contact form; a looser limit on admin login.
- **`express-validator`** — request validation, normalized into the same `{ message, errors: { field: [msg] } }` shape the frontend already expects.

### 3.2 Endpoints

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/api/health` | — | health check |
| POST | `/api/contact` | — | validated, rate-limited 5/min/IP, stores in DB, emails the business if SMTP is set |
| GET | `/api/gallery` | — | public, visible-only gallery images — consumed by the About page |
| GET | `/api/settings` | — | public site settings — consumed by the Footer / maintenance banner |
| POST | `/api/admin/login` | — | returns `{ token, user }` |
| GET | `/api/admin/me` | Bearer | current admin |
| GET | `/api/admin/stats` | Bearer | dashboard counts |
| GET/POST | `/api/admin/services` | Bearer | |
| PATCH/DELETE | `/api/admin/services/:id` | Bearer | |
| GET/POST | `/api/admin/gallery` | Bearer | `POST` is multipart, field `image` (up to 10 files) |
| PATCH/DELETE | `/api/admin/gallery/:id` | Bearer | |
| POST | `/api/admin/gallery/reorder` | Bearer | body: `{ order: [{ id, position }] }` |
| GET/PATCH | `/api/admin/settings` | Bearer | key/value site settings |
| GET/POST | `/api/admin/users` | Bearer | |
| PATCH/DELETE | `/api/admin/users/:id` | Bearer | |
| GET | `/api/admin/contacts` | Bearer | inquiry list |
| PATCH | `/api/admin/contacts/:id` | Bearer | body: `{ status: 'new'\|'read'\|'replied' }` |
| DELETE | `/api/admin/contacts/:id` | Bearer | |

### 3.3 Database schema

`users`, `contact_submissions`, `services`, `gallery`, `settings` — see `server/src/db/index.js` for exact columns. Auto-created on first run; an initial admin user is auto-seeded from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env` if no users exist yet (`server/src/db/seed.js`).

### 3.4 Structure

```
server/src/
  config/env.js       — env var loading/defaults
  db/                  — SQLite connection, schema, seed
  middleware/          — auth (JWT), rate limiters, validation, upload (multer), error handling
  controllers/         — one per resource (contact, auth, services, gallery, settings, users, contacts)
  routes/              — one per resource, mounted under /api in routes/index.js
  services/mailer.js   — nodemailer wrapper
  app.js               — Express app wiring (helmet, cors, static uploads, routes)
  index.js             — entry point
```

### 3.5 Contact form contract (matches the existing frontend exactly)

Request: `{ name, email, phone?, project_type?, message }` — `project_type` is one of `mep | civil | project_support | alternative_energy | other`.

Responses:
- `201` — `{ message, id }`
- `422` — `{ message, errors: { field: ["reason"] } }`
- `429` — `{ message: "Too many requests. Please try again in N seconds." }`

### 3.6 Automated tests

`server/test/` — 17 tests on Node's built-in test runner + `supertest`, run with `npm test` (`node --env-file=.env.test --test`). `.env.test` points `DB_PATH` at `:memory:` (the `db` module now reads `DB_PATH` from the environment instead of a hardcoded path — the one code change this required) so the suite never touches the real database. Covers: health/404, contact form (valid submission persisted, validation errors, rate limiting triggers a real 429), admin auth (correct/incorrect password, missing/invalid/valid bearer token), services CRUD end-to-end, and both public read-only endpoints.

One gotcha worth recording: Node's test runner auto-discovers *any* file under a directory literally named `test/`, not just `*.test.js` files — an early version of the shared test helper (`test/helpers/testApp.js`) got silently picked up and run as an empty "test file". Fixed by moving shared helpers to a sibling `server/test-support/` directory instead.

### 3.7 Deployment

Two paths, both documented in `server/README.md`:

- **Docker** — `server/Dockerfile` (node:20-alpine, compiles `better-sqlite3`'s native addon) + root `docker-compose.yml`, with named volumes for `data/` and `uploads/` so a rebuild/redeploy doesn't wipe the database or gallery images.
- **PM2** — `server/ecosystem.config.cjs` for a plain VPS without Docker.

Neither assumes a specific host (Render/Railway/a raw VPS/etc. all work) — whichever is used, put a reverse proxy in front for HTTPS and set `CORS_ORIGINS` to the real frontend domain in `.env` (the "allow any localhost port" dev convenience only applies when `NODE_ENV` isn't `production`).

---

## 4. Running it locally

```bash
# Terminal 1 — backend
cd server
npm install
cp .env.example .env   # set JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm run dev             # http://localhost:5000

# Terminal 2 — frontend
npm install
npm run dev              # http://localhost:5173
```

Root `.env` (frontend) needs:
```
VITE_API_URL=http://localhost:5000
```

Admin panel: `http://localhost:5173/admin/login`, using the `ADMIN_EMAIL`/`ADMIN_PASSWORD` from `server/.env`.

> Vite only reads `.env` at startup — restart `npm run dev` after creating or changing it.

---

## 5. Known follow-ups (not yet done)

Everything that was on this list — CMS wiring, automated tests, deployment config — is done as of §2.11–2.13 and §3.6–3.7. What's left:

- **Services CMS schema.** Deliberately left un-wired (§2.12) — the generic admin `services` table doesn't match the hand-designed public Services page. Redesigning the schema to fit (or redesigning the page to fit a generic schema) is a real scoped task of its own, not a quick wire-up.
- **SMTP credentials.** Contact form emails and admin notifications are still no-ops until real SMTP values are filled into `server/.env` — the code path is there (§3.1), just not configured with real credentials anywhere yet.
- **No CI.** Both test suites (`npm test` at the root, `npm test` in `server/`) run locally only; nothing runs them automatically on push.
