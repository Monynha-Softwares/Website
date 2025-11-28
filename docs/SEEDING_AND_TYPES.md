Seeding & Regenerating Supabase Types
====================================

This document describes the local developer workflow for applying seed migrations and regenerating the typed DB definitions used by the app.

Important: use a service-role / admin connection for seeds and destructive commands. Do NOT run `supabase db reset` against production.

1) Apply seed migrations

- The repository contains seed SQL files inside `supabase/migrations/` (files beginning with `2025..._seed_...sql`).
- To apply them locally using the Supabase CLI (recommended for dev), run the following from the project root in PowerShell:

```powershell
Set-Location 'C:\Users\marce\Desktop\Monynha Sotwares\Codebase\MS Ecossystem\[monynha.com]\Website'
supabase db reset
```

This will reset the local database and apply migrations and seeds. Use with care.

2) Regenerate TypeScript DB types

After applying migrations, regenerate the typed DB definitions so the client uses the updated schema:

```powershell
Set-Location 'C:\Users\marce\Desktop\Monynha Sotwares\Codebase\MS Ecossystem\[monynha.com]\Website'
npx supabase gen types typescript --schema public > src/integrations/supabase/types_db.ts
```

3) Run/install and verify

```powershell
npm install
npm run dev
npm run test
```

Notes
- If you cannot run `supabase` CLI locally, you can apply the seed SQL via the Supabase dashboard SQL editor (using a service-role key) — paste the SQL file contents there.
- Always commit the regenerated `src/integrations/supabase/types_db.ts` so other contributors have the updated types.