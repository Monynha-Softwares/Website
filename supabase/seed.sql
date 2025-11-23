-- Seed data for Monynha Softwares project
-- Extracted from initial migration and adjusted for Monynha branding

-- Site settings
INSERT INTO public.settings (key, value, description, is_public) VALUES
('site_title', '"Monynha Softwares"', 'Main site title', true),
('site_description', '"Monynha Softwares — building institutional and creative web experiences"', 'Site meta description', true),
('social_instagram', '"https://instagram.com/monynha"', 'Instagram profile URL', true),
('contact_email', '"contact@monynha.com"', 'Contact email address', true);

-- Home page content
INSERT INTO public.pages (slug, title, content, meta_title, meta_description, status) VALUES
('home', 'Home', 
'{"hero": {"title": "Monynha Softwares", "subtitle": "Digital Product & Creative Engineering", "description": "Institutional site and portfolio showcasing web, 3D and interactive projects"}}'::jsonb,
 'Home - Monynha Softwares',
 'Monynha Softwares — digital product, creative engineering and institutional web presence', 'published');

-- About page content
INSERT INTO public.pages (slug, title, content, meta_title, meta_description, status) VALUES
('about', 'About', 
'{"bio": "Monynha Softwares builds web experiences and creative digital products. We combine design, animation, and modern web architecture to deliver accessible and performant sites."}'::jsonb,
 'About - Monynha Softwares',
 'Learn more about Monynha Softwares and our services', 'published');

-- Sample artworks (kept from template as demo content)
INSERT INTO public.artworks (slug, title, description, category, technique, year, cover_url, tags, featured, display_order) VALUES
('digital-dreams', 'Digital Dreams', 'An exploration of surreal digital landscapes', 'Motion Design', 'Cinema 4D, After Effects', 2024, 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', ARRAY['motion','digital','surreal'], true, 1),
('abstract-forms', 'Abstract Forms', 'Geometric abstractions in 3D space', '3D Art', 'Blender', 2024, 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80', ARRAY['3d','abstract','geometric'], true, 2),
('interactive-experience', 'Interactive Experience', 'User-driven visual narrative', 'Interactive', 'Three.js, React', 2023, 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80', ARRAY['interactive','web','experimental'], true, 3);

-- Sample exhibitions (demo)
INSERT INTO public.exhibitions (title, description, location, year, date, type, display_order) VALUES
('Digital Futures', 'Group exhibition exploring digital art forms', 'New York, USA', 2024, 'March 2024', 'group', 1),
('Solo Show: Reflections', 'First solo exhibition showcasing recent work', 'London, UK', 2023, 'September 2023', 'solo', 2);
