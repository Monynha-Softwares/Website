-- Seed site settings and a default profile
-- Run with a service-role/admin connection (do not run from client-side code)

BEGIN;

-- Insert a site profile (used by About/Home pages)
INSERT INTO public.profiles (id, full_name, headline, personal_site_url, github_url, linkedin_url, email, created_at)
VALUES (
  'site_profile',
  'Monynha Softwares',
  'Design & Web Engineering',
  'https://monynha.com',
  'https://github.com/Monynha-Softwares',
  'https://www.linkedin.com/company/monynha-softwares',
  'hello@monynha.com',
  now()
)
ON CONFLICT (id) DO NOTHING;

-- Insert common settings (as JSON values where helpful)
INSERT INTO public.settings (id, key, value, description, is_public, created_at)
VALUES
  ('setting_site_title', 'site_title', '"Monynha Softwares"'::jsonb, 'Site display title', true, now()),
  ('setting_site_description', 'site_description', '"Design & Web Engineering"'::jsonb, 'Short site tagline', true, now()),
  ('setting_contact_email', 'contact_email', '"hello@monynha.com"'::jsonb, 'Primary contact email', false, now())
ON CONFLICT (id) DO NOTHING;

COMMIT;
