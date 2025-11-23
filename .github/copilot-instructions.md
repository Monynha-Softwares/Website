# Copilot Instructions — Monynha Softwares Corporate Website

Purpose: Provide AI coding agents with immediate, actionable context to be productive in this repository.

Keep the content concise and refer to concrete files/commands.

## 1. Big Picture (What This Repo Is)
- **Architecture**: Vite + React + TypeScript single-page app (entry: `src/main.tsx`, router in `src/App.tsx`).
- **UI**: Tailwind CSS + `shadcn/ui` primitives. Animated components live under `src/components/reactbits/` (e.g., `GooeyNav.tsx`, `LiquidEtherBackground.tsx`, `PixelCard.tsx`).
- **Data**: Supabase-backed content (migrations in `supabase/migrations/`). Integrations live under `src/integrations/supabase` and hooks in `src/hooks/` (e.g., `useArtworks.tsx`, `useArtwork.tsx`). Data types are centralized in `src/integrations/supabase/supabase.types.ts`.
- **Purpose**: Corporate institutional website showcasing Monynha Softwares' services, values, and contact information, including a portfolio, open-source repositories, and a blog.

## 2. Developer Workflows & Commands
- **Local Development**:
  ```bash
  npm install
  npm run dev
  ```
  (Dev server runs at `http://localhost:5173`.)

- **Build/Preview**:
  ```bash
  npm run build
  npm run preview
  ```

- **Linting**:
  ```bash
  npm run lint
  ```
  (ESLint configured in repo.)

- **Unit Tests**:
  ```bash
  npm run test
  ```
  (Vitest setup includes `vitest.setup.ts` for polyfills.)

- **E2E Tests**:
  ```bash
  npm run test:e2e
  ```
  (Playwright tests in `playwright/`.)

- **Database Migrations**:
  ```bash
  supabase db reset
  ```
  (Recreates local DB and applies migrations from `supabase/migrations/`.)
- **Generate Supabase Types**:
  ```bash
  npx supabase gen types typescript --schema public > src/integrations/supabase/types.ts
  ```

## 3. Environment and Deployment
- **Environment Variables** (create `.env` at repo root):
  ```env
  VITE_SUPABASE_URL=<your-supabase-url>
  VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>
  VITE_SUPABASE_PROJECT_ID=<your-project-id>
  ```

- **Storage Buckets**: `artwork-images`, `general-media` (public read expected for front-end images).

- **Deployment**: Standard Vite static-hosting workflows (e.g., Vercel, Netlify, Cloudflare Pages). See `docs/DEPLOYMENT.md`.

## 4. Project-Specific Conventions and Patterns
- **React Bits Rule**: Limit heavy animated components to 2–3 per page to preserve performance (see `docs/REACTBITS_INTEGRATION.md`).
- **Accessibility**: Animated components must check `prefers-reduced-motion` and provide static fallbacks (examples in `docs/REACTBITS_INTEGRATION.md`).
- **Lazy Loading**: Dynamically import heavy components (e.g., `const Liquid = lazy(() => import('src/components/reactbits/LiquidEtherBackground'))`).
- **Component Placement**:
  - UI primitives: `src/components/ui/`
  - Animated primitives: `src/components/reactbits/`
  - Page routes: `src/pages/` (e.g., `Home.tsx`, `Portfolio.tsx`, `About.tsx`, `Contact.tsx`).
- **File Naming**: React components use PascalCase and live in `src/components/**`.

## 5. Integration & Cross-Cutting Notes
- **Supabase**: Data models described in `docs/DATABASE.md` (tables: `artworks`, `exhibitions`, `pages`, `settings`, `contact_messages`, `profiles`, `user_roles`). RLS is enabled—tests and local queries may require admin context for draft content. Types are centralized in `src/integrations/supabase/supabase.types.ts`.
- **Images**: Stored in Supabase Storage. Public URL format: `https://<project>.supabase.co/storage/v1/object/public/<bucket>/<path>` (see `docs/SETUP.md`).
- **3D/WebGL**: `three`, `@react-three/fiber`, and `@react-three/drei` are used. Heavy rendering is isolated in `src/components/reactbits/` or `src/components/Hero3D.tsx`.

## 6. Tests & CI Hints
- Unit tests: `vitest` configured in `package.json`. Use `npm run test` locally.
- Playwright E2E: See `playwright/` folder (e.g., `mobile-navigation.spec.ts`). Use `npm run test:e2e` to run them.
- Use the `matchMedia` polyfill in `vitest.setup.ts` for tests relying on `prefers-reduced-motion`.