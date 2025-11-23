import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Project } from "@/integrations/supabase/supabase.types";

interface UseProjectsOptions {
  slug?: string;
  category?: string;
  featured?: boolean; // Assuming a 'featured' column might be added later
  limit?: number;
}

export const useProjects = (options: UseProjectsOptions = {}) => {
  return useQuery<Project[], Error>({
    queryKey: ["projects", options],
    queryFn: async () => {
      let query = supabase
        .from("projects")
        .select("*")
        .eq("status", "published")
        .order("year", { ascending: false })
        .order("created_at", { ascending: false });

      if (options.slug) {
        query = query.eq("slug", options.slug);
      }
      if (options.category) {
        query = query.eq("category", options.category);
      }
      if (options.featured) {
        // Assuming a 'featured' column exists or will be added
        // For now, we'll just return all if 'featured' is not a real column
        // query = query.eq("featured", true);
      }
      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};

export const useProject = (slug: string) => {
  return useQuery<Project | null, Error>({
    queryKey: ["project", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};