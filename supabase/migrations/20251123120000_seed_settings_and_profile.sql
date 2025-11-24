-- Insert a default profile for the site owner/founder
INSERT INTO public.profiles (id, email, full_name, headline, location, bio, avatar_url)
VALUES (
  '4a9b1c2d-3e4f-5a6b-7c8d-9e0f1a2b3c4d', -- Using a valid UUID for the site profile
  'contact@monynha.com',
  'Marcelo M7',
  'Inclusive Tech that Empowers',
  'Lisbon, Portugal',
  'I am a digital artist and creative developer, passionate about crafting immersive and accessible digital experiences. My work explores the intersection of art, technology, and human connection, always with a focus on inclusivity and innovation. I believe in democratizing technology and giving voice to those who create outside the norm.',
  '/avatar.jpg'
)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  headline = EXCLUDED.headline,
  location = EXCLUDED.location,
  bio = EXCLUDED.bio,
  avatar_url = EXCLUDED.avatar_url,
  updated_at = NOW();

-- Insert or update a setting for the site profile ID
INSERT INTO public.settings (key, value, description, is_public)
VALUES (
  'site_profile_id',
  '"4a9b1c2d-3e4f-5a6b-7c8d-9e0f1a2b3c4d"', -- Store the UUID as a string in settings
  'The UUID of the main site profile (e.g., founder/company bio)',
  TRUE
)
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  description = EXCLUDED.description,
  is_public = EXCLUDED.is_public,
  updated_at = NOW();

-- Insert or update contact info setting
INSERT INTO public.settings (key, value, description, is_public)
VALUES (
  'contact_info',
  '{ "email": "contact@monynha.com", "instagram": "https://instagram.com/marcelo.santos.027", "availability": "Available for collaborations and creative opportunities.", "note": "Get in touch for projects, partnerships, or out-of-the-box ideas!" }',
  'Contact information for the site, including email and social links.',
  TRUE
)
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  description = EXCLUDED.description,
  is_public = EXCLUDED.is_public,
  updated_at = NOW();

-- Insert or update contact form messages setting
INSERT INTO public.settings (key, value, description, is_public)
VALUES (
  'contact_form_messages',
  '{ "success": "Message sent successfully! I''ll get back to you soon 🌈", "error": "Oops! Something went wrong. Please try again later 💜" }',
  'Custom messages for the contact form feedback.',
  TRUE
)
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  description = EXCLUDED.description,
  is_public = EXCLUDED.is_public,
  updated_at = NOW();

-- Insert or update site navigation links setting
INSERT INTO public.settings (key, value, description, is_public)
VALUES (
  'site_navigation_links',
  '[{"href": "/", "label": "Home", "accent": "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)"}, {"href": "/portfolio", "label": "Portfolio", "accent": "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)"}, {"href": "/about", "label": "About", "accent": "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)"}, {"href": "/contact", "label": "Contact", "accent": "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)"}, {"href": "/repositories", "label": "Repositories", "accent": "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)"}]',
  'Main navigation links for the site.',
  TRUE
)
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  description = EXCLUDED.description,
  is_public = EXCLUDED.is_public,
  updated_at = NOW();

-- Insert or update site footer links setting
INSERT INTO public.settings (key, value, description, is_public)
VALUES (
  'site_links',
  '{ "ecosystem": [ { "name": "Main Portal", "href": "https://monynha.com" }, { "name": "Boteco Pro Platform", "href": "https://boteco.pt" }, { "name": "Online Services Hub", "href": "https://monynha.online" }, { "name": "Experimental Playground", "href": "https://monynha.fun" }, { "name": "Developer & Tech Portal", "href": "https://monynha.tech" } ], "company": [ { "name": "About", "href": "/about" }, { "name": "Contact", "href": "/contact" } ], "legal": [ { "name": "Privacy Policy", "href": "/legal/privacy-policy" }, { "name": "Terms of Service", "href": "/legal/terms-of-service" } ] }',
  'Footer navigation links for the site.',
  TRUE
)
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  description = EXCLUDED.description,
  is_public = EXCLUDED.is_public,
  updated_at = NOW();

-- Insert or update featured disciplines setting
INSERT INTO public.settings (key, value, description, is_public)
VALUES (
  'featured_disciplines',
  '[{"icon": "Palette", "title": "Motion Design", "desc": "Dynamic visual narratives"}, {"icon": "Eye", "title": "3D Art", "desc": "Immersive spatial experiences"}, {"icon": "Sparkles", "title": "Interactive", "desc": "Engaging digital installations"}]',
  'Featured disciplines for the home page.',
  TRUE
)
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  description = EXCLUDED.description,
  is_public = EXCLUDED.is_public,
  updated_at = NOW();