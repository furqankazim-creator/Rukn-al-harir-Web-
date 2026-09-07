# Rukn Al Harir API

Express backend for the Rukn Al Harir Technical Services website.

- **Public:** `POST /api/contact` — the form on the website's Contact page submits here (validated, rate-limited to 5/min per IP, stored in SQLite, and emailed to the business if SMTP is configured).
- **Admin CMS:** JWT-protected endpoints for managing services, gallery images, site settings, admin users, and viewing contact inquiries — consumed by the admin panel at `/admin` in the frontend app (sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from this `.env`).

## Setup

```bash
cd server
npm install
cp .env.example .env   # then fill in JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD, etc.
npm run dev
```

The API starts on `http://localhost:5000` by default (`PORT` in `.env`). On first run it auto-creates an admin user from `ADMIN_EMAIL` / `ADMIN_PASSWORD` if no users exist yet.

Point the frontend at it by setting `VITE_API_URL=http://localhost:5000` in the frontend's `.env` (see `.env.example` at the repo root).

Data is stored in a local SQLite file (`server/data/rukn.sqlite`) and uploaded gallery images in `server/uploads/gallery/` — both are gitignored.

## Endpoints

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/api/health` | — | health check |
| POST | `/api/contact` | — | rate-limited 5/min/IP |
| GET | `/api/gallery` | — | public, visible gallery images only — consumed by the About page |
| GET | `/api/settings` | — | public site settings — consumed by the Footer / maintenance banner |
| POST | `/api/admin/login` | — | returns `{ token, user }` |
| GET | `/api/admin/me` | Bearer | current admin |
| GET | `/api/admin/stats` | Bearer | dashboard counts |
| GET/POST | `/api/admin/services` | Bearer | |
| PATCH/DELETE | `/api/admin/services/:id` | Bearer | |
| GET/POST | `/api/admin/gallery` | Bearer | `POST` is `multipart/form-data`, field `image` (up to 10 files) |
| PATCH/DELETE | `/api/admin/gallery/:id` | Bearer | |
| POST | `/api/admin/gallery/reorder` | Bearer | body: `{ order: [{ id, position }] }` |
| GET/PATCH | `/api/admin/settings` | Bearer | key/value site settings |
| GET/POST | `/api/admin/users` | Bearer | |
| PATCH/DELETE | `/api/admin/users/:id` | Bearer | |
| GET | `/api/admin/contacts` | Bearer | contact form submissions |
| PATCH | `/api/admin/contacts/:id` | Bearer | body: `{ status: 'new'\|'read'\|'replied' }` |
| DELETE | `/api/admin/contacts/:id` | Bearer | |

Admin routes expect `Authorization: Bearer <token>` from `POST /api/admin/login`.

## Tests

```bash
npm test
```

Runs on Node's built-in test runner (`node --env-file=.env.test --test`) against an in-memory SQLite database (`.env.test` sets `DB_PATH=:memory:`) — never touches `data/rukn.sqlite`. Covers health, contact form (validation + rate limiting), admin auth (login, token gating), services CRUD, and the public gallery/settings endpoints.

## Deployment

Two options are included:

**Docker** — from the repo root:
```bash
docker compose up -d --build
```
Builds `server/Dockerfile` and persists `data/` and `uploads/` in named volumes so redeploys don't wipe the database or gallery images. Reads `server/.env` for config.

**PM2** (plain VPS, no Docker):
```bash
npm install -g pm2
cd server && npm ci --omit=dev
pm2 start ecosystem.config.cjs --env production
```

Either way, put a reverse proxy (Nginx/Caddy) in front for HTTPS, and set `CORS_ORIGINS` in `.env` to your real frontend domain(s) — the "allow any localhost port" behavior only applies when `NODE_ENV` isn't `production`.
