-- Migration: 20251124000000_seed_about_page_content.sql

-- 1. Seed Experiences (Professional Timeline)
INSERT INTO public.experiences (role, organization, location, start_date, end_date, highlights, display_order)
VALUES
('Lead Software Engineer', 'Monynha Softwares', 'Remote', '2022-01-01', NULL, ARRAY['Architected scalable microservices using Supabase and React.', 'Mentored junior developers on best practices and inclusive design.', 'Led the transition to a fully accessible component library.'], 1),
('Senior Frontend Developer', 'Tech Innovators Inc.', 'São Paulo, BR', '2018-06-01', '2021-12-31', ARRAY['Developed high-performance UI components for a major e-commerce platform.', 'Integrated GraphQL APIs for efficient data fetching.', 'Improved core web vitals by 30% across key pages.'], 2),
('Creative Technologist', 'Digital Art Studio', 'Rio de Janeiro, BR', '2016-01-01', '2018-05-31', ARRAY['Designed and implemented interactive 3D installations using Three.js.', 'Managed client relationships and project delivery timelines.'], 3)
ON CONFLICT (id) DO NOTHING;

-- 2. Seed Skills (Technical Skills)
INSERT INTO public.skills (name, category, level, display_order)
VALUES
('TypeScript', 'Frontend', 'Expert', 10),
('React', 'Frontend', 'Expert', 20),
('Tailwind CSS', 'Frontend', 'Advanced', 30),
('Framer Motion', 'Frontend', 'Advanced', 40),
('Supabase', 'Backend/DB', 'Advanced', 50),
('PostgreSQL', 'Backend/DB', 'Intermediate', 60),
('Node.js', 'Backend', 'Advanced', 70),
('Accessibility (A11y)', 'Design/UX', 'Expert', 80),
('Product Strategy', 'Design/UX', 'Advanced', 90),
('3D Graphics (Three.js)', 'Creative Tech', 'Intermediate', 100)
ON CONFLICT (id) DO NOTHING;

-- 3. Seed Cultural Context (English)
INSERT INTO public.cultural_context (title, description, category, locale)
VALUES
('Inclusive Design', 'We prioritize accessibility and human-centered design to ensure our products serve everyone, regardless of ability or background.', 'Philosophy', 'en'),
('Open Source Commitment', 'We actively contribute to and rely on the open-source ecosystem, believing in shared knowledge and community collaboration.', 'Values', 'en'),
('Marginalized Voices', 'We amplify creators and ideas from the margins, challenging mainstream tech narratives and fostering diversity.', 'Mission', 'en')
ON CONFLICT (id) DO NOTHING;

-- 4. Seed Cultural Context (Portuguese - pt-BR)
INSERT INTO public.cultural_context (title, description, category, locale)
VALUES
('Design Inclusivo', 'Priorizamos acessibilidade e design centrado no ser humano para garantir que nossos produtos sirvam a todos, independentemente de capacidade ou origem.', 'Filosofia', 'pt-BR'),
('Compromisso Open Source', 'Contribuímos ativamente e dependemos do ecossistema de código aberto, acreditando no conhecimento compartilhado e na colaboração comunitária.', 'Valores', 'pt-BR'),
('Vozes Marginalizadas', 'Amplificamos criadores e ideias das margens, desafiando narrativas tecnológicas convencionais e promovendo a diversidade.', 'Missão', 'pt-BR')
ON CONFLICT (id) DO NOTHING;