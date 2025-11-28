import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Page } from "@/integrations/supabase/supabase.types"; // Import centralized type
import { useTranslation } from "react-i18next"; // Import useTranslation

type PagesQueryResult = Page[] | (Page | null);

export const usePages = (slug?: string) => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const fallbackLocale = 'en';

  return useQuery<PagesQueryResult>({
    queryKey: ["pages", slug, currentLocale], // Add currentLocale to queryKey
    queryFn: async () => {
      // Set the locale for RLS policies
      await supabase.rpc('set_current_locale', { locale_code: currentLocale });

      let data, error;
      if (!slug) {
        ({ data, error } = await supabase
          .from("pages")
          .select("*")
          .eq("status", "published")
          .eq("locale", currentLocale)); // Filter by locale
      } else {
        ({ data, error } = await supabase
          .from("pages")
          .select("*")
          .eq("slug", slug)
          .eq("status", "published")
          .eq("locale", currentLocale) // Filter by locale
          .maybeSingle());
      }

      if (error) throw error;

      // If no data found for current locale, try fallback locale
      if ((!data || (Array.isArray(data) && data.length === 0)) && currentLocale !== fallbackLocale) {
        await supabase.rpc('set_current_locale', { locale_code: fallbackLocale });
        let fallbackData, fallbackError;
        if (!slug) {
          ({ data: fallbackData, error: fallbackError } = await supabase
            .from("pages")
            .select("*")
            .eq("status", "published")
            .eq("locale", fallbackLocale));
        } else {
          ({ data: fallbackData, error: fallbackError } = await supabase
            .from("pages")
            .select("*")
            .eq("slug", slug)
            .eq("status", "published")
            .eq("locale", fallbackLocale)
            .maybeSingle());
        }
        if (fallbackError) throw fallbackError;
        data = fallbackData; // Use fallback data
      }
      return data || (slug ? null : []);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};