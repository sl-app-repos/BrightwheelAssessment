# BrightStart AI Front Desk

A proof-of-concept web app for a Brightwheel-style **AI Front Desk** technical assessment. Guardians get fast, handbook-backed answers; operators manage the family handbook as the source of truth and improve it over time.

**Center:** Little Sprouts Learning Center (fictional)

## Features

- **Guardian Front Desk** — Quick question chips, chat UI, and answer cards powered by the family handbook
- **Operator Control Center** — Metrics, **Guardian Question Trends** (category spikes, draft guardian reminders/updates, handbook improvements), 9 editable handbook sections (localStorage), recent questions, needs-review queue with suggested improvements, trust rules
- **Simulated AI** — Deterministic keyword intent matching and handbook template responses (no LLM or external APIs)

## Handbook sections

Hours & Holidays, Health & Illness, Medication Administration, Authorized Pickup & Custody, Meals & Nutrition, Tuition & Billing, Tours & Enrollment, Guidance & Discipline, and Special Needs & Circumstances.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Access from another device on your network

The dev server listens on all interfaces (`0.0.0.0`). From a phone or another computer on the same Wi‑Fi, use:

`http://<this-computer-ip>:3000`

(Find your IP with `ipconfig getifaddr en0` on macOS or `hostname -I` on Linux.)

If you still see **Unauthorized**, restart the dev server after pulling latest config, or add your host explicitly:

```bash
ALLOWED_DEV_ORIGINS=192.168.1.100 npm run dev
```

## Build

```bash
npm run build
npm start
```

## Deployment

Production builds deploy automatically on push to `main` via Vercel.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Use the default Next.js settings (no environment variables required).

Or use the Vercel CLI:

```bash
npx vercel
```

## Tradeoffs

| Choice | Why |
|--------|-----|
| Keyword intent matching | Reliable demos without API keys or latency |
| Handbook templates + editable sections | Trustworthy, center-specific answers; operators improve the handbook over time |
| `localStorage` v3 key | Includes seeded question history for trends demo; data is per-browser |
| Guardian Question Trends | Surfaces repeated topics so operators act before the next interruption; proactive updates logged client-side |
| Suggested improvements (rules-based) | Surfaces handbook gaps without ML or backend |
| Single-page tabs | Simpler POC; use `#guardian` / `#operator` in the URL for tab deep links |

## Prototype notice

No real child or family data is used. All handbook content and conversations are fictional and stored only in the browser.
