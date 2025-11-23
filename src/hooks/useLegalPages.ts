import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { LegalPage } from "@/integrations/supabase/interfaces";

export const useLegalPages = (slug?: string) => {
  return useQuery<LegalPage | LegalPage[] | null, Error>({
    queryKey: ["legalPages", slug],
    queryFn: async () => {
      if (slug) {
        const { data, error } = await supabase
          .from("legal_pages")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();

        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("legal_pages")
          .select("*")
          .order("title", { ascending: true });

        if (error) throw error;
        return data || [];
      }
    },
    staleTime: Infinity, // Legal pages are relatively static
    gcTime: Infinity,
    retry: 2,
  });
};

export const useLegalPage = (slug: string) => {
  return useQuery<LegalPage | null, Error>({
    queryKey: ["legalPage", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("legal_pages")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 2,
  });
};