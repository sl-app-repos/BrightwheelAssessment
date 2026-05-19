# BrightStart AI Front Desk — Application Summary

**Little Sprouts Learning Center** (fictional) · Brightwheel technical assessment prototype · v0.1.0

---

## What we built

BrightStart AI Front Desk is a **client-only** Next.js web app that simulates an AI-powered front desk for a childcare center. Guardians ask questions in a chat interface and receive answers drawn from an editable **family handbook**. Center operators monitor activity, edit handbook content as the source of truth, review low-confidence or sensitive questions, and act on **question trends** with draft reminders and handbook improvements.

The product runs entirely in the browser: **no backend, no authentication, no LLM, and no external APIs** for Q&A. Logic is deterministic (keyword intent matching + handbook text). State persists in `localStorage` under `brightstart-front-desk-v3`. The design favors predictable demos, operator control over content, and trust signaling on the operator side while keeping the guardian experience simple.

---

## Two experiences, one app

| Role | Purpose |
|------|---------|
| **Guardian Front Desk** | Quick-question chips, chat UI, and plain-text answers (no confidence badges or escalation UI in chat). |
| **Operator Control Center** | Metrics, recent questions, needs-review queue, nine editable handbook sections, guardian question trends, and static trust rules. |

Navigation uses a Brightwheel-style sidebar with URL hashes `#guardian` and `#operator`. The app shell provides responsive layout (desktop sidebar, mobile drawer), shared page title alignment, skip link, and branded favicon.

---

## How answers work

1. A guardian submits a question (chip or typed text).
2. **Intent matching** scores keywords against nine handbook topics (hours, illness, medication, pickup, nutrition, tuition, tours, behavior, special needs).
3. The **answer engine** pulls up to three paragraphs from the matched handbook section, applies confidence framing (high / medium / low), and applies **trust rules** (escalation for billing disputes and allergies, sensitive-topic footers, needs-review for low confidence).
4. Each question is logged with full metadata for operators; chat stores the same entry on assistant messages.
5. When operators edit the handbook, **all historical Q&A is regenerated** so guardian chat and operator lists stay in sync with current handbook text.

Rule-based **suggested improvements** hint at handbook gaps in the needs-review queue.

---

## Operator highlights

- **Activity** — Today’s metrics (questions, confident answers, needs review, escalated), recent questions, and needs-review list with suggested improvements.
- **Handbook** — Nine `PolicyCard` editors; “improve handbook” from trends or review flows opens the right section in edit mode.
- **Guardian Question Trends** — Surfaces recurring topics (e.g. holiday hours, meals, illness) from question history; operators can draft proactive reminders/updates or append handbook guidance (“mark as sent” logs intent only—no real messaging).
- **Trust rules** — Documents how confidence and sensitivity drive status and escalation.

Seeded question history and proactive updates ensure the trends tab is demo-ready on first load even before live guardian chat.

---

## Technology

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4, Inter font, custom design tokens |
| State | React Context (`useAppStore`) — handbook, questions, messages, proactive updates |
| Domain | `answerEngine`, `intentMatcher`, `trustRules`, `questionTrends`, `proactiveMessages`, `storage` |
| Persistence | `localStorage` with validation, legacy migration (`parent` → `guardian`), trend demo merge |

---

## Explicitly out of scope

Real auth or multi-tenant centers; production SMS/email/push; LLM/RAG; server sync; real child/family PII; Brightwheel product APIs; automated handbook versioning or audit logs.

---

## Run and deploy

```bash
npm install && npm run dev   # http://localhost:3000 (LAN: http://<your-ip>:3000)
npm run build && npm start   # production
```

Deployable to Vercel with default Next.js settings and no required environment variables.

---

## Prototype notice

All handbook content and conversations are fictional. Data stays in the browser only and must not be used for real PHI.

For setup details see [README.md](./README.md). For full architecture, data models, and extension roadmap see [TECHNICAL_DESIGN.md](./TECHNICAL_DESIGN.md).
