import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Project } from "@/integrations/supabase/supabase.types";
import { useTranslation } from "react-i18next";

export const useProject = (slug: string) => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  return useQuery<Project | null, Error>({
    queryKey: ["project", slug, currentLocale],
    queryFn: async () => {
      // Set the locale for RLS policies
      await supabase.rpc('set_current_locale', { locale_code: currentLocale });

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