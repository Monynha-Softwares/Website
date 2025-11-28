import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Project } from "@/integrations/supabase/supabase.types";
import { useTranslation } from "react-i18next";

interface UseProjectsOptions {
  slug?: string;
  category?: string;
  featured?: boolean; // Assuming a 'featured' column might be added later
  limit?: number;
  search?: string; // Added search option
}

export const useProjects = (options: UseProjectsOptions = {}) => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  return useQuery<Project[], Error>({
    queryKey: ["projects", options, currentLocale],
    queryFn: async () => {
      // Set the locale for RLS policies
      await supabase.rpc('set_current_locale', { locale_code: currentLocale });

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
      // Note: 'featured' column does not exist in schema, skipping direct filtering for now.
      
      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      let filteredData = data || [];

      // Client-side search filtering across name, summary, and stack
      if (options.search) {
        const searchLower = options.search.toLowerCase();
        filteredData = filteredData.filter(
          (project) =>
            project.name.toLowerCase().includes(searchLower) ||
            project.summary?.toLowerCase().includes(searchLower) ||
            project.full_description?.toLowerCase().includes(searchLower) ||
            project.stack?.some((tech: string) => tech.toLowerCase().includes(searchLower))
        );
      }

      return filteredData;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};