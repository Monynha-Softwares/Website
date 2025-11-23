-- Rename artworks table to projects
ALTER TABLE public.artworks RENAME TO projects;

-- Rename title column to name and add optional links
ALTER TABLE public.projects
  RENAME COLUMN title TO name,
  ADD COLUMN repo_url TEXT,
  ADD COLUMN site_url TEXT;

-- Ensure RLS remains enforced
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Refresh RLS policies to match new table name
DROP POLICY IF EXISTS "Published artworks are viewable by everyone" ON public.projects;
DROP POLICY IF EXISTS "Artworks are editable by admins" ON public.projects;

CREATE POLICY "Published projects are viewable by everyone" ON public.projects
  FOR SELECT
  USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Projects are editable by admins" ON public.projects
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));
