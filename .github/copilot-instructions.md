# Copilot Instructions — Monynha Softwares Website

Purpose: quick, concrete guidance to get an AI coding agent productive here.

## Big Picture
- Architecture: Vite + React + TypeScript SPA. Entry: `src/main.tsx`. Routes & pages live in `src/pages/`.
- UI: Tailwind + `shadcn/ui`. Visual/animated primitives in `src/components/reactbits/` (e.g., `GooeyNav.tsx`, `LiquidEtherBackground.tsx`).
- Data: Supabase-backed content. Client: `lib/supabase/client.ts` (or `src/integrations/supabase/client.ts`), types in `src/integrations/supabase/supabase.types.ts`, migrations in `supabase/migrations/`.

## Quick Commands
- Install & dev: `npm install` then `npm run dev` (dev server: `http://localhost:5173`).
- Build / preview: `npm run build` / `npm run preview`.
- Lint: `npm run lint`.
- Unit tests: `npm run test` (Vitest; uses `vitest.setup.ts`).
- E2E: `npm run test:e2e` (Playwright, `playwright/`).
- Supabase reset (local): `supabase db reset`.
- Regenerate types after schema change:
  `npx supabase gen types typescript --schema public > src/integrations/supabase/types_db.ts`

## Important Files to Read First
- `src/main.tsx`, `src/App.tsx` — boot & routing.
- `src/components/reactbits/` — heavy visuals; respect `prefers-reduced-motion`.
- `src/integrations/supabase/` and `lib/supabase/client.ts` — DB client & types.
- `supabase/migrations/` and `supabase/seed.sql` — canonical schema & seed data.
- `docs/` — deployment, DB, and ReactBits integration notes.

## Project Conventions (concrete)
- Limit heavy animations to 2–3 per page; provide static fallbacks (see `docs/REACTBITS_INTEGRATION.md`).
- Lazy-load heavy components using `React.lazy` + `Suspense`.
- Hooks live in `src/hooks/` (e.g., `useArtworks.tsx`, `useRepository.ts`); prefer them for data access.
- Component naming: PascalCase, files next to component in `src/components/**`.
- Supabase types: centralized in `src/integrations/supabase/supabase.types.ts` (regenerate after migrations).

## Integrations & Runtime Notes
- Supabase: RLS enabled — admin context may be required for drafts. Buckets: `artwork-images`, `general-media`.
- 3D/WebGL: `three`, `@react-three/fiber`, `@react-three/drei` used; keep rendering isolated and lazy-loaded.

## Guidance For AI Agents (how to work here)
- Read the files listed above + `docs/` before making changes.
- Make small, focused edits. Run `npm run test` and `npm run lint` after edits.
- Use the repo tools to apply changes (I will use `apply_patch`/workspace editing) and track work with a TODO list.
- Avoid large refactors without an explicit plan — propose a small design/PR note first.
- If modifying DB schema, add a `supabase/migrations/` SQL migration and regenerate types.

If this looks good, I will apply it to `.github/copilot-instructions.md` now. Or tell me which sections to change/expand (e.g., add a PR checklist, example "first-tasks", or more file references).# Copilot Instructions — Monynha Softwares Website

Purpose: quick, concrete guidance to get an AI coding agent productive here.

## Big Picture
- Architecture: Vite + React + TypeScript SPA. Entry: `src/main.tsx`. Routes & pages live in `src/pages/`.
- UI: Tailwind + `shadcn/ui`. Visual/animated primitives in `src/components/reactbits/` (e.g., `GooeyNav.tsx`, `LiquidEtherBackground.tsx`).
- Data: Supabase-backed content. Client: `lib/supabase/client.ts` (or `src/integrations/supabase/client.ts`), types in `src/integrations/supabase/supabase.types.ts`, migrations in `supabase/migrations/`.

## Quick Commands
- Install & dev: `npm install` then `npm run dev` (dev server: `http://localhost:5173`).
- Build / preview: `npm run build` / `npm run preview`.
- Lint: `npm run lint`.
- Unit tests: `npm run test` (Vitest; uses `vitest.setup.ts`).
- E2E: `npm run test:e2e` (Playwright, `playwright/`).
- Supabase reset (local): `supabase db reset`.
- Regenerate types after schema change:
  `npx supabase gen types typescript --schema public > src/integrations/supabase/types_db.ts`

## Important Files to Read First
- `src/main.tsx`, `src/App.tsx` — boot & routing.
- `src/components/reactbits/` — heavy visuals; respect `prefers-reduced-motion`.
- `src/integrations/supabase/` and `lib/supabase/client.ts` — DB client & types.
- `supabase/migrations/` and `supabase/seed.sql` — canonical schema & seed data.
- `docs/` — deployment, DB, and ReactBits integration notes.

## Project Conventions (concrete)
- Limit heavy animations to 2–3 per page; provide static fallbacks (see `docs/REACTBITS_INTEGRATION.md`).
- Lazy-load heavy components using `React.lazy` + `Suspense`.
- Hooks live in `src/hooks/` (e.g., `useArtworks.tsx`, `useRepository.ts`); prefer them for data access.
- Component naming: PascalCase, files next to component in `src/components/**`.
- Supabase types: centralized in `src/integrations/supabase/supabase.types.ts` (regenerate after migrations).

## Integrations & Runtime Notes
- Supabase: RLS enabled — admin context may be required for drafts. Buckets: `artwork-images`, `general-media`.
- 3D/WebGL: `three`, `@react-three/fiber`, `@react-three/drei` used; keep rendering isolated and lazy-loaded.

## Guidance For AI Agents (how to work here)
- Read the files listed above + `docs/` before making changes.
- Make small, focused edits. Run `npm run test` and `npm run lint` after edits.
- Use the repo tools to apply changes (I will use `apply_patch`/workspace editing) and track work with a TODO list.
- Avoid large refactors without an explicit plan — propose a small design/PR note first.
- If modifying DB schema, add a `supabase/migrations/` SQL migration and regenerate types.

If this looks good, I will apply it to `.github/copilot-instructions.md` now. Or tell me which sections to change/expand (e.g., add a PR checklist, example "first-tasks", or more file references).