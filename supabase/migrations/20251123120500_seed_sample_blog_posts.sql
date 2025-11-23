-- Seed a sample published blog post
-- Use admin/service-role credentials to run this file

BEGIN;

INSERT INTO public.blog_posts (id, title, slug, author, content_html, excerpt, date, status, tags, created_at)
VALUES (
  'sample-post-1',
  'Welcome to Monynha',
  'welcome-to-monynha',
  'Monynha Team',
  '<p>Welcome to Monynha Softwares — this is a seeded sample post.</p>',
  'Welcome to Monynha Softwares — this is a seeded sample post.',
  to_char(now(), 'YYYY-MM-DD'),
  'published',
  ARRAY['announcement','seed']::text[],
  now()
)
ON CONFLICT (id) DO NOTHING;

COMMIT;
