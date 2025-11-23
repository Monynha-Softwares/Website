-- Seed data for Monynha Softwares project (idempotent)
-- This seed file uses ON CONFLICT and WHERE NOT EXISTS so it can be re-run safely.

-- Upsert site settings (keyed by `key`)
INSERT INTO public.settings (key, value, description, is_public)
VALUES
	('site_title', '"Monynha Softwares"', 'Main site title', true),
	('site_description', '"Monynha Softwares — building institutional and creative web experiences"', 'Site meta description', true),
	('social_instagram', '"https://instagram.com/monynha"', 'Instagram profile URL', true),
	('contact_email', '"contact@monynha.com"', 'Contact email address', true)
ON CONFLICT (key) DO UPDATE
	SET value = EXCLUDED.value,
			description = EXCLUDED.description,
			is_public = EXCLUDED.is_public,
			updated_at = NOW();

-- Upsert pages by slug
INSERT INTO public.pages (slug, title, content, meta_title, meta_description, status)
VALUES
	('home', 'Home', '{"hero": {"title": "Monynha Softwares", "subtitle": "Digital Product & Creative Engineering", "description": "Institutional site and portfolio showcasing web, 3D and interactive projects"}}'::jsonb, 'Home - Monynha Softwares', 'Monynha Softwares — digital product, creative engineering and institutional web presence', 'published'),
	('about', 'About', '{"bio": "Monynha Softwares builds web experiences and creative digital products. We combine design, animation, and modern web architecture to deliver accessible and performant sites."}'::jsonb, 'About - Monynha Softwares', 'Learn more about Monynha Softwares and our services', 'published')
ON CONFLICT (slug) DO UPDATE
	SET title = EXCLUDED.title,
			content = EXCLUDED.content,
			meta_title = EXCLUDED.meta_title,
			meta_description = EXCLUDED.meta_description,
			status = EXCLUDED.status,
			updated_at = NOW();

-- Upsert artworks by slug
INSERT INTO public.artworks (slug, title, description, category, technique, year, cover_url, tags, featured, display_order, status)
VALUES
	('digital-dreams', 'Digital Dreams', 'An exploration of surreal digital landscapes', 'Motion Design', 'Cinema 4D, After Effects', 2024, 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', ARRAY['motion','digital','surreal'], true, 1, 'published'),
	('abstract-forms', 'Abstract Forms', 'Geometric abstractions in 3D space', '3D Art', 'Blender', 2024, 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80', ARRAY['3d','abstract','geometric'], true, 2, 'published'),
	('interactive-experience', 'Interactive Experience', 'User-driven visual narrative', 'Interactive', 'Three.js, React', 2023, 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80', ARRAY['interactive','web','experimental'], true, 3, 'published')
ON CONFLICT (slug) DO UPDATE
	SET title = EXCLUDED.title,
			description = EXCLUDED.description,
			category = EXCLUDED.category,
			technique = EXCLUDED.technique,
			year = EXCLUDED.year,
			cover_url = EXCLUDED.cover_url,
			tags = EXCLUDED.tags,
			featured = EXCLUDED.featured,
			display_order = EXCLUDED.display_order,
			status = EXCLUDED.status,
			updated_at = NOW();

-- Insert exhibitions if not already present (match by title + year)
INSERT INTO public.exhibitions (title, description, location, year, date, type, display_order)
SELECT * FROM (VALUES
	('Digital Futures', 'Group exhibition exploring digital art forms', 'New York, USA', 2024, 'March 2024', 'group', 1),
	('Solo Show: Reflections', 'First solo exhibition showcasing recent work', 'London, UK', 2023, 'September 2023', 'solo', 2)
) AS v(title, description, location, year, date, type, display_order)
WHERE NOT EXISTS (
	SELECT 1 FROM public.exhibitions e WHERE e.title = v.title AND e.year = v.year
);

-- Ensure essential settings are public
UPDATE public.settings
SET is_public = true, updated_at = NOW()
WHERE key IN ('site_title', 'site_description', 'social_instagram', 'contact_email');
