# Copilot instructions — Art Leo (Portfolio-Dev)

Purpose: give an AI coding agent immediate, actionable context to be productive in this repository.

Keep the content concise and refer to concrete files/commands.

1) Big picture (what this repo is)
- Vite + React + TypeScript single-page app (entry: `src/main.tsx`, router in `src/App.tsx`).
- UI: Tailwind + `shadcn/ui` primitives. Animated primitives live under `src/components/reactbits/` (e.g. `GooeyNav.tsx`, `LiquidEtherBackground.tsx`, `PixelCard.tsx`).
- Data: Supabase-backed content (migrations in `supabase/migrations/`). Integrations live under `src/integrations/supabase` and hooks in `src/hooks/` (e.g. `useArtworks.tsx`, `useArtwork.tsx`).

2) Developer workflows & commands
- Local dev: `npm install` then `npm run dev` (dev server on `http://localhost:5173`).
- Build / preview: `npm run build` and `npm run preview`.
- Lint: `npm run lint` (ESLint configured in repo). Keep TypeScript types tidy.
- Unit tests: `npm run test` (Vitest). There is a test setup at `vitest.setup.ts` that polyfills `matchMedia` for components.
- Full test run: `npm run test:run` and E2E: `npm run test:e2e` (Playwright).
- Database migrations (local dev): use Supabase CLI per `SETUP.md` — e.g. `supabase db reset` to recreate local DB and apply `supabase/migrations/`.

3) Environment and deployment
- Required env vars (create `.env` at repo root):
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`
  - `VITE_SUPABASE_PROJECT_ID`
- Storage buckets referenced in docs: `artwork-images`, `general-media` (public read expected for front-end images).
- Deploy: standard Vite static-hosting workflows (Vercel, Netlify, Cloudflare Pages). See `DEPLOYMENT.md`.

4) Project-specific conventions and patterns
- React Bits rule: limit heavy animated components to 2–3 per page to preserve performance — documented in `REACTBITS_INTEGRATION.md` and `src/components/reactbits/`.
- Accessibility: every animated component must check `prefers-reduced-motion` and provide a static fallback (examples in `REACTBITS_INTEGRATION.md`). Use `window.matchMedia` guard; tests rely on the polyfill in `vitest.setup.ts`.
- Lazy-load heavy components: import backgrounds/3D parts dynamically (e.g. `const Liquid = lazy(() => import('src/components/reactbits/LiquidEtherBackground'))`) and only mount when in viewport.
- Component placement: keep UI primitives in `src/components/ui/`, animated primitives in `src/components/reactbits/`, and page routes in `src/pages/` (e.g. `Home.tsx`, `Portfolio.tsx`, `About.tsx`, `Contact.tsx`).
- File naming: React components use PascalCase and Live in `src/components/**`.

5) Integration & cross-cutting notes
- Supabase: data models described in `DATABASE.md` (tables: `artworks`, `exhibitions`, `pages`, `settings`, `contact_messages`, `profiles`, `user_roles`). RLS is enabled — tests and local queries may require admin context when mutating or reading draft content.
- Images: stored in Supabase Storage. Public URL format: `https://<project>.supabase.co/storage/v1/object/public/<bucket>/<path>` (see `SETUP.md`).
- 3D / WebGL: `three`, `@react-three/fiber`, and `@react-three/drei` are present; heavy rendering should be isolated behind components in `src/components/reactbits/` or `src/components/Hero3D.tsx` (legacy reference).

6) Tests & CI hints
- Unit tests: `vitest` is configured in `package.json`. Use `vitest` or `npm run test` locally.
- Playwright E2E: see `playwright/` folder (e.g. `mobile-navigation.spec.ts`). Use `npm run test:e2e` to run them.
- Use the matchMedia polyfill in `vitest.setup.ts` when adding tests that rely on `prefers-reduced-motion`.

7) Where to look for examples (use these files as canonical references)
- Hero & backgrounds: `src/components/reactbits/LiquidEtherBackground.tsx`, `SilkBackground.tsx`, `LiquidEther.tsx`.
- Navigation: `src/components/Navigation.tsx` (wraps `src/components/reactbits/GooeyNav.tsx`).
- Portfolio data flow: `src/hooks/useArtworks.tsx`, `src/pages/Portfolio.tsx`, `src/components/reactbits/PixelCard.tsx`.
- About / Timeline: `src/components/reactbits/StepperTimeline.tsx` and `src/pages/About.tsx`.
- Tests: `src/components/__tests__/Navigation.test.tsx` and `src/components/reactbits/__tests__/`.

8) Editing & migrations policy
- When changing DB schema: add SQL migration into `supabase/migrations/` and update `DATABASE.md` if the shape of public tables changes. Run `supabase db reset` locally to test migrations.

9) Practical examples for common tasks
- Add a new animated background component:
  - Create `src/components/reactbits/MyBackground.tsx` following `LiquidEtherBackground.tsx` conventions.
  - Add `prefers-reduced-motion` fallback and lazy-load usage in `src/pages/Home.tsx`.
  - Update `REACTBITS_INTEGRATION.md` with a one-paragraph summary of behaviour and where it's used.
- Update artwork data flow:
  - Add migration SQL to `supabase/migrations/`.
  - Update `src/integrations/supabase` and `src/hooks/useArtworks.tsx`.
  - Run `supabase db reset` and `npm run dev` to verify.

10) Questions for the maintainer (when you need clarification)
- Preferred package manager? (repo contains `bun.lockb` but docs reference `npm`.)
- CI configuration and branch protection rules (if any) — none found in repo; confirm preferred CI.

If anything here is missing or unclear, tell me which areas to expand (CI, commit hooks, preferred package manager, internal admin APIs). Ready to update the file or iterate.
