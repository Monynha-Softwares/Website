# Agent Activity Log

This document is shared between all agents. Each agent MUST record:

1. Agent name
2. Tasks performed
3. Files modified
4. Justification for any change
5. Hints and context for the next agent

---

## Agent 3 (Home hero copy refresh)

Agent name: ChatGPT (OpenAI) — GPT-5.1-Codex-Max

Date: 2025-02-25

Tasks planned:
- Align the home hero copy with Monynha's institutional messaging focused on inclusive technology.
- Update default tagline sourced via `useSiteSetting` to reflect the new positioning.
- Maintain existing layout/animations and keep routes untouched while adjusting CTAs.

Files to modify:
- `src/pages/Home.tsx`
- `src/hooks/useSettings.ts`

Justification:
- Marketing requested hero and tagline text to match Monynha's inclusive technology mission.

Notes before changes:
- No dependency or structural updates expected. Will run lint and unit tests after edits.

Tasks performed:
- Updated the home hero copy to center Monynha's inclusive technology mission and adjusted CTAs to "Projects" and "Contact Us" while preserving layout/animation behavior.
- Set the default `site_tagline` fallback to the new inclusive positioning via `useSiteSetting` usage on the home page.
- Fixed ESLint parsing in the Supabase client placeholder (semicolon cleanup and removing nested block comment) so linters pass.

Files modified:
- `src/pages/Home.tsx`
- `lib/supabase/client.ts`
- `AGENT_LOG.md`

Tests executed:
- `npm run lint`
- `npm run test:run`

Notes after changes:
- No new dependencies or structural changes introduced. Supabase placeholder remains non-functional and commented for future work; minimal formatting/comment tweak was required to satisfy ESLint.

## Initial Agent (Setup)

Agent name: Initial Agent — GitHub Copilot

Date: 2025-11-23

Tasks performed:
- Created `AGENT_LOG.md` (this file).
- Created `AGENT_RULES.md` (mandatory agent rules).
- Created the isolated workspace folder `/.agent_workspace`.
- Created `/.agent_workspace/README.md` explaining workspace rules.

Files added:
- `AGENT_RULES.md`
- `/.agent_workspace/README.md`

Files modified: none (only additions).

Justification for changes:
- Establish a minimal communication mechanism between agents, rules, and an isolated working area. No frontend, logic, or configuration files were modified.

Logged environment variables (record only — DO NOT USE YET):
- `DATABASE_URL`
- `SUPABASE_SERVICE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

Project identifier recorded: `monynha-corp-website`

Keys that MUST NOT be used by future agents (prohibited at this stage):
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_URL`

Security and privacy notes:
- No keys were placed in this repository. Never log secrets in files tracked by Git. Use vaults or secret managers and environment variables outside of the code.

Hints for the next agent:
- Always create an issue or log in `AGENT_LOG.md` before changing architecture or central files.
- Before changing frontend code, run tests (or request permission to run them) and record in the log which tests you ran and their results.
- If an architecture change is necessary, record a detailed technical justification in this log and open an issue for human review.
- Use `/.agent_workspace` for drafts, local runs, and proofs-of-concept; do not move anything from this folder to production without human review.

---

## Agent 2 (Supabase Setup)

Agent name: Agent 2 — GitHub Copilot

Date: 2025-11-23

Tasks performed:
- Created `lib/supabase/client.ts` as a scaffold/placeholder for Supabase client initialization using only `SUPABASE_SERVICE_KEY`.
- Documented required and prohibited environment variables.
- Added a schema blueprint to this log.

Files added:
- `lib/supabase/client.ts`

Files modified: none (only documentation and scaffold additions).

Environment variables (validation):
- Allowed/required for server-side usage:
  - `DATABASE_URL`
  - `SUPABASE_SERVICE_KEY` (or `SUPABASE_SERVICE_ROLE_KEY`)
  - `VITE_SUPABASE_PROJECT_ID`
- Explicitly prohibited in this stage:
  - `VITE_SUPABASE_PUBLISHABLE_KEY`
  - `VITE_SUPABASE_URL`

Notes: None of these variables were read or executed by Agent 2 — they were only recorded. Never put keys in the repository.

Schema blueprint (informational — no DB changes made):

- `public` (default): meant for public site content (artworks, pages, public settings). Public reads should be allowed via RLS where applicable.
- `protected` (proposed logical namespace — NOT CREATED): meant for drafts and admin-only data accessible only via service role keys and strict RLS policies.

How to access schemas (proposal):
- Public frontend operations: use read-only public methods where appropriate — avoid using `VITE_SUPABASE_PUBLISHABLE_KEY` until RLS policies are solid.
- Admin/privileged operations: use `SUPABASE_SERVICE_KEY` server-side with secure handling.
- RLS: define admin-only policies for protected content, public policies for `public` content where safe.

Risks & mitigations:
- Risk: leaking keys in the repo. Mitigation: never commit keys; use secret managers.
- Risk: unauthorized schema changes. Mitigation: do not run migrations without human review; open issue/PR first.

Instructions for Agent 3:
- The project now includes a Supabase client scaffold at `lib/supabase/client.ts`. Agent 3 may:
  1. Install `@supabase/supabase-js` if needed.
  2. Implement actual queries in a separate module (e.g. `lib/supabase/queries.ts`).
  3. Ensure `SUPABASE_SERVICE_KEY` is provisioned securely before running server-side code.
  4. Create migrations only after opening an issue/PR and obtaining human approval.

Short message for the team:
- The project is scaffolded for Supabase integration. The next agent can implement queries and wire portfolio content while preserving routes and styles. Do not change architecture without logging the justification in `AGENT_LOG.md`.

---

Status summary: all tasks were completed without touching application frontend code, without creating tables, and without running actions against a Supabase instance.
