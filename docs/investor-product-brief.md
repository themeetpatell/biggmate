# BiggMate Product Brief (Investor-Focused)

## 1) Snapshot
- **What it is:** AI-guided cofounder matching + execution workspace to take ideas from framing to launch.
- **Who it serves:** Founders, operators, and independent experts looking to form teams and ship MVPs.
- **Core jobs:** Match with complementary cofounders, validate ideas fast, build and track MVPs, manage work and clients.
- **Current build:** React 18 + Vite SPA with Redux state, Tailwind UI, service worker/PWA hooks, Docker + Nginx deployment-ready.

## 2) Problem
- Founders struggle to find complementary partners and validate ideas quickly.
- Early teams lack structured sprint tooling and transparent collaboration workflows.
- Talent wants project-based work but lacks a trusted, high-signal marketplace.

## 3) Solution & Product Pillars
- **Cofounder Matching:** Rich entrepreneur profiles, AI-guided matching on skills and roles, pitch-first connection flow.
- **Idea Sprint Workspace:** Guided tabs for framing, validation, feature matrix, MVP development/testing, feedback board, demo kit.
- **Skills Marketplace:** Offer services, showcase portfolios, manage clients, set availability and rates.
- **Execution OS:** Project boards, team workspace, equity framework templates, launch prep playbooks, meeting and decision logs.
- **Investor Readiness:** Pitch-back system, presentation/demo kit repository, iteration roadmap, performance telemetry hooks.

## 4) User Journeys Supported in Code
- Create detailed founder profile → get matched → send/receive pitch-back offers → start a sprint.
- Run guided idea framing/validation → map pain points and features → prioritize MVP scope → build/test → gather feedback.
- Offer or hire skills with packaged services → track client projects → manage availability/rates.
- Prepare investor materials (decks, demos) and track roadmap milestones.

## 5) Product Surface (from current UI)
- **Tabs:** Idea Framing, Idea Validation, Feature Matrix, MVP Development, MVP Testing, Feedback Board, Demo Kit.
- **Feature Matrix:** Pain point mapping, severity/frequency scoring, prioritization.
- **Validation:** Scores for problem/solution/market with live sliders and overall scoring.
- **Execution:** Task boards, presentations/demos registry, roadmap entries, feedback and feature requests, performance metrics stubs.

## 5a) Feature Inventory (coded surfaces)
- **Founder Identity & Matching:** Rich profiles (skills, industries, experience, looking-for), AI cofounder matcher, pitch-back offers, saved matches/actions.
- **Idea Sprint Tools:** Idea Framing (narrative, problem/solution, target audience, value prop canvas), Idea Validation (scores + sliders), Feature Matrix (pain point mapping, severity/frequency/impact), MVP Development (tasks, assignments), MVP Testing (test cases/results), Feedback Board (user feedback + feature requests), Demo Kit (demos, screenshots, presentations).
- **Collaboration & Execution:** Project board/task management, team workspace primitives, meeting/decision logging stubs, iteration roadmap, performance metrics hooks.
- **Skills Marketplace:** Skills dashboard, services/offerings packaging, availability and rates, project tracker, client management, marketplace browse.
- **Investor Readiness:** Pitch deck/presentation registry, demo kit repository, roadmap visibility, launch preparation checklists/templates, data export hooks (planned).
- **Platform & Delivery:** PWA/service worker registration, responsive UI with horizontal tab scroll, lazy-loaded routes/components, Redux-managed state, Docker/Nginx deploy with Vercel/Netlify-ready static build.

## 6) Differentiation
- Structured, end-to-end workflow (match → validate → build → launch) instead of isolated matching or tooling.
- Pitch-back mechanic encourages specific collaboration offers (roles/equity) vs. generic “let’s chat.”
- Dual-mode: founder sprint tools + freelancer/skills marketplace under one roof.
- Ready-to-deploy PWA with offline/service worker support; modular lazy-loaded routes for performance.

## 7) Architecture (high level)
- **Frontend:** React 18, Vite, Tailwind; lazy-loaded routes/components; Redux Toolkit store; React Router; service worker registration.
- **Build/Deploy:** Vite production configs, Dockerfiles, Nginx reverse proxy, Vercel/Netlify-ready static deploy; environment-configurable API/socket URLs.
- **Structure:** Feature folders (`components/sprint-tools`, `skills-tools`, `ai-cofounder`, etc.), centralized store, manifest for PWA, SEO/OG meta and JSON-LD in `index.html`.
- **Perf/Security:** Code splitting, CSP headers (Nginx), compression/caching, XSS/CORS considerations noted in config; lint/test scripts wired.

## 8) GTM Assumptions (team to finalize)
- Acquire founders through startup communities, accelerators, and indie hacker channels.
- Seed liquidity with curated experts offering services; enable paid packaged gigs.
- Community-led growth via pitch-back invites and shared demos.
- Monetization options to decide: premium matching, sprint tooling seats, marketplace take rate, data rooms for investors.

## 9) Roadmap (proposed next)
- Ship AI matching heuristics hooked to profile fields and sprint data.
- Expand Feature Matrix with impact/effort visualization and exports.
- Collaboration layer: live co-editing, comments, notifications, Slack/Notion integrations.
- Investor pack: one-click data room export (deck, metrics placeholders, roadmap, demo kit).
- Mobile polish: tab bar horizontal scroll (implemented) and full responsive QA across flows.

## 10) Risks & Mitigations
- **Cold-start matching:** seed vetted founder/skill profiles; concierge matching; incentives for early responders.
- **Quality control in marketplace:** verification, reviews, milestone-based payouts.
- **Retention:** habit loops via weekly sprint rituals, feedback prompts, and roadmap checkpoints.
- **Data trust:** clear permissioning for shared decks/roadmaps; audit trail for offers and decisions.

## 11) What to Validate Next
- Matching efficacy (time-to-first-conversation, acceptance on pitch-back).
- Sprint completion rates and cycle time across tabs.
- Conversion from validated idea → MVP build → demo kit completion.
- Willingness to pay across founder seats vs. marketplace take rate.

## 12) Open Items for Investors
- Fundraising target, use of funds, and timelines: **TBD by team.**
- Metrics (MAU, matches, retention, revenue): **TBD; instrumentation hooks required.**
- Legal/compliance (KYC for payouts, data residency): **TBD based on markets.**

---
This brief is grounded in the current codebase surface and deployment setup. Fill in business metrics and funding details before sharing externally.
