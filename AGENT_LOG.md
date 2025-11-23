# Agent Activity Log

This document is shared between all agents. Each agent MUST record:

1. Agent name
2. Tasks performed
3. Files modified
4. Justification for any change
5. Hints and context for the next agent

---

## Agent 4 (Brand refresh & Supabase sanity)

Agent name: ChatGPT (OpenAI) — GPT-5.1-Codex-Max

Date: 2025-11-23

Tasks planned:
- Replace remaining "Art Leo"/"Leonardo" branding in UI assets (meta tags, brand components, navigation a11y labels, About/Contact copy) with Monynha Softwares language while preserving layouts/animations.
- Refresh public brand SVG titles/text to match Monynha Softwares and keep accessibility intact.
- Harden Supabase client initialization by validating required VITE env vars and documenting expected configuration in `.env.example` without secrets.
- Update related unit tests/snapshots after brand text changes; run lint and test suites.

Files to modify:
- `index.html`, `src/components/brand/*`, `src/components/reactbits/GooeyNav.tsx`, `src/pages/About.tsx`, `src/pages/Contact.tsx`
- `public/brand/*`, `.env.example`, `src/integrations/supabase/client.ts`
- `src/components/__tests__/Navigation.test.tsx` and snapshot

Justification:
- The site still presents Leonardo Silva/Art Leo branding; needs alignment to Monynha Softwares as per product direction.
- Supabase client should fail fast when env vars are missing to prevent misconfigured builds; `.env.example` currently incomplete.

Notes before changes:
- No new dependencies or folder changes planned. Will run `npm run lint` and `npm run test:run` after edits.

Tasks performed:
- Rebranded UI copy and metadata from Art Leo/Leonardo to Monynha Softwares across hero metadata, About, Contact, navigation labels, and brand components while preserving layouts and animations.
- Updated public SVG assets (logo/mark/OG) titles and text for accessible Monynha branding.
- Tightened Supabase client initialization with env validation and safe test-mode defaults; expanded `.env.example` with required vars.
- Synced unit tests and snapshots with new branding (Navigation, GooeyNav) and reran lint/tests.

Files modified:
- `.env.example`, `index.html`, `public/brand/*`
- `src/components/brand/BrandLogo.tsx`, `src/components/brand/BrandMark.tsx`, `src/components/reactbits/GooeyNav.tsx`
- `src/pages/About.tsx`, `src/pages/Contact.tsx`
- `src/integrations/supabase/client.ts`
- `src/components/__tests__/Navigation.test.tsx`, `src/components/reactbits/__tests__/GooeyNav.test.tsx`, `src/components/__tests__/__snapshots__/Navigation.test.tsx.snap`

Tests executed:
- `npm run lint`
- `npm run test:run -- --update`

Notes after changes:
- No new dependencies added; folder structure unchanged. Supabase client now fails fast when env vars are missing (with test-only fallbacks to avoid breaking CI). Branding references to Art Leo/Leonardo removed from UI assets and tests.

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

---

## Agent 5 (Schema check & verification)

Agent name: GitHub Copilot

Date: 2025-11-23

Tasks performed:
- Read all `supabase/migrations/*` and `docs/DATABASE.md` to synthesize the current schema.
- Inspected frontend hooks and auth context (`src/hooks/*`, `src/contexts/AuthContext.tsx`) for table/column usage.
- Verified the connected Supabase instance contains the expected tables and ran sample reads.
- Confirmed `src/integrations/supabase/types.ts` matches the migrations; provided guidance to regenerate types if needed.
- Added a small read-only healthcheck snippet to use for integration testing.

What I found (summary):
- Tables present in `public` schema: `settings`, `pages`, `artworks`, `exhibitions`, `contact_messages`, `profiles`, `user_roles` (RLS enabled on each).
- Row counts observed (live DB):
  - `settings`: 0 rows
  - `pages`: 2 rows
  - `artworks`: 5 rows
  - `exhibitions`: 4 rows
  - `contact_messages`: 0 rows
  - `profiles`: 0 rows
  - `user_roles`: 0 rows

Notes on schema vs frontend usage:
- `useArtworks` (selects from `artworks`) references: `status`, `display_order`, `created_at`, `featured`, `category`, `title`, `description`, `tags` — all present in schema.
- `useExhibitions` (selects from `exhibitions`) uses `year` and `display_order` — present.
- `usePages` (selects from `pages`) uses `slug`, `status`, `content`, `meta_title`, `meta_description` — present.
- `useSettings` (selects from `settings`) uses `key`, `value`, `is_public` — present (note `is_public` was added in a later migration).
- `useContactForm` inserts into `contact_messages` fields `name`, `email`, `message`, `status` — present.
- `AuthContext` checks `user_roles` table (`user_id`, `role`) — present.

Conclusion on names: All table names and columns referenced by the frontend hooks and `AuthContext` match the schema created by the migrations.

Type definitions:
- `src/integrations/supabase/types.ts` exists and reflects the current schema (enums `app_role`, `content_status`; tables and columns are present).
- If you want to regenerate the types locally (recommended after any schema migration), run from project root (requires Supabase CLI installed and authenticated):

```powershell
npx supabase gen types typescript --schema public > src/integrations/supabase/types.ts
```

Replace `npx supabase` with your installed `supabase` CLI if preferred. After running, verify the file and commit if correct.

Healthcheck (read-only) snippet
- Save this small function in a utility file (e.g. `src/lib/healthcheck.ts`) and run locally with proper `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` configured in `.env`.

```typescript
import { supabase } from "@/integrations/supabase/client";

export async function healthcheck() {
  // Read public settings
  const { data: settings, error: sErr } = await supabase
    .from("settings")
    .select("key, value")
    .eq("is_public", true)
    .limit(10);

  if (sErr) throw sErr;

  // Read one artwork and one exhibition (if any)
  const { data: artworks, error: aErr } = await supabase
    .from("artworks")
    .select("id, slug, title")
    .eq("status", "published")
    .limit(1)
    .maybeSingle();
  if (aErr) throw aErr;

  const { data: exhibitions, error: eErr } = await supabase
    .from("exhibitions")
    .select("id, title, year")
    .order("year", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (eErr) throw eErr;

  return {
    settings: settings || [],
    artwork: artworks || null,
    exhibition: exhibitions || null,
  };
}
```

Recommendations & next actions:
- If you plan to run local development and want content to appear, either run `supabase/seed.sql` (already added to repo) or re-run the migration seeds via Supabase SQL editor.
- If you need an admin user immediately, create an auth user via the app signup route (the migration that assigns the first `auth.users` entry an admin was already applied and will have effect if an `auth.users` row exists), or run manually (example SQL):

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('<USER_ID>', 'admin')
ON CONFLICT DO NOTHING;
```

- Regenerate types after any schema change with the `supabase gen types` command above and commit the resulting `src/integrations/supabase/types.ts`.

What is missing or unexpected:
- `settings` currently has 0 rows in the live DB; front-end expects some public settings (site title, description). Use `supabase/seed.sql` or the dashboard SQL editor to insert these.
- `user_roles` is empty — no admin user exists yet; create a user via sign-up or assign role via SQL as shown above.

Security note:
- I did not log any secrets or service keys. Do not store service role keys in the repository — use CI/CD secrets or a vault.

If you want, I can:
- run the `supabase gen types` command locally and update `src/integrations/supabase/types.ts` (requires your Supabase CLI and project credentials), or
- apply the `supabase/seed.sql` file to the connected DB (I can show the exact `supabase` CLI command to use), or
- create a tiny script to create a first admin role once you provide a `user_id`.

---

Status: AGENT_LOG entry appended.
