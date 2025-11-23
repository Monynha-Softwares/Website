import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Page } from "@/integrations/supabase/supabase.types"; // Import centralized type

type PagesQueryResult = Page[] | (Page | null);

export const usePages = (slug?: string) => {
  return useQuery<PagesQueryResult>({
    queryKey: ["pages", slug],
    queryFn: async () => {
      if (!slug) {
        const { data, error } = await supabase
          .from("pages")
          .select("*")
          .eq("status", "published");

        if (error) throw error;
        return data as Page[];
      }

      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

      if (error) throw error;
      return data as Page | null;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};