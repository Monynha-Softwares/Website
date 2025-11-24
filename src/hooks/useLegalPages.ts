import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { LegalPage } from "@/integrations/supabase/supabase.types";

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

        if (error) {
          console.error(`Error fetching legal page with slug '${slug}':`, error);
          throw error;
        }
        console.log(`Fetched legal page '${slug}':`, data);
        return data;
      } else {
        const { data, error } = await supabase
          .from("legal_pages")
          .select("*")
          .order("title", { ascending: true });

        if (error) {
          console.error("Error fetching all legal pages:", error);
          throw error;
        }
        console.log("Fetched all legal pages:", data);
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

      if (error) {
        console.error(`Error fetching legal page with slug '${slug}':`, error);
        throw error;
      }
      console.log(`Fetched legal page '${slug}':`, data);
      return data;
    },
    enabled: !!slug,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 2,
  });
};