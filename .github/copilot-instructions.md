# Copilot Instructions — Monynha Softwares Website

Purpose: concise guidance to get an AI coding agent productive in this repository.

## Big Picture
- Architecture: Vite + React + TypeScript SPA. Entry: `src/main.tsx`. Routes & pages in `src/pages/`.
- UI: Tailwind + `shadcn/ui`. Animated primitives in `src/components/reactbits/` (limit to 2-3 per page, provide `prefers-reduced-motion` fallbacks).
- Data: Supabase-backed. Client: `src/integrations/supabase/client.ts`. Types: generated `types_db.ts` + utilities in `supabase.types.ts`. Hooks in `src/hooks/` use React Query for data fetching.

## Quick Commands
- Install & dev: `npm install` then `npm run dev` (http://localhost:5173).
- Build / preview: `npm run build` / `npm run preview`.
- Lint: `npm run lint`.
- Unit tests: `npm run test` (Vitest).
- E2E: `npm run test:e2e` (Playwright).
- Supabase reset (local): `supabase db reset`.
- Regenerate types: `npx supabase gen types typescript --schema public > src/integrations/supabase/types_db.ts`

## Files to Read First
- `src/main.tsx`, `src/App.tsx` — bootstrap & routing.
- `src/integrations/supabase/` — client, generated types, utilities.
- `supabase/migrations/`, `supabase/seed.sql` — schema & seeds.
- `docs/` — deployment, DB, ReactBits integration.

## Conventions
- Lazy-load heavy components with `React.lazy` + `Suspense`.
- Data access via hooks in `src/hooks/` (e.g., `useArtworks` for artworks table).
- Schema changes: add migration in `supabase/migrations/`, run `supabase db reset`, regenerate types.
- No try/catch for API calls; let errors bubble to React Query.
- Responsive design with Tailwind.

## How AI agents should work here
- Read above files + `docs/` before changes.
- Small, focused edits; run `npm run lint` and `npm run test` after.
- For schema changes, add migration and regenerate types.


