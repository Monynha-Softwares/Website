-- Seed a sample project and a sample artwork
-- For local/dev convenience. Run with admin/service-role credentials.

BEGIN;

-- Sample project
INSERT INTO public.projects (id, name, slug, summary, thumbnail, category, stack, url, repo_url, visibility, year, created_at)
VALUES (
  'sample-project-1',
  'Website Rebuild',
  'website-rebuild',
  'A sample project showcasing the site rebuild and Supabase integration.',
  '/brand/og-image.svg',
  'web',
  ARRAY['react','typescript','supabase']::text[],
  'https://monynha.com',
  'https://github.com/Monynha-Softwares/Website',
  'public',
  2025,
  now()
)
ON CONFLICT (id) DO NOTHING;

-- Sample artwork
INSERT INTO public.artworks (id, title, slug, category, cover_url, images, tags, year, status, created_at)
VALUES (
  'sample-artwork-1',
  'Seed Artwork',
  'seed-artwork',
  'illustration',
  '/brand/og-image.svg',
  '[]'::jsonb,
  ARRAY['seed','sample']::text[],
  2025,
  'published',
  now()
)
ON CONFLICT (id) DO NOTHING;

COMMIT;
