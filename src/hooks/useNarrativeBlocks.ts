import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { NarrativeBlock } from "@/integrations/supabase/supabase.types";
import { useTranslation } from "react-i18next"; // Import useTranslation

export const useNarrativeBlocks = (key?: string) => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const fallbackLocale = 'en'; // Define a fallback locale

  return useQuery<NarrativeBlock | NarrativeBlock[] | null, Error>({
    queryKey: ["narrativeBlocks", key, currentLocale],
    queryFn: async () => {
      // First, try to fetch for the current locale
      await supabase.rpc('set_current_locale', { locale_code: currentLocale });

      let data, error;
      if (key) {
        ({ data, error } = await supabase
          .from("narrative_blocks")
          .select("*")
          .eq("key", key)
          .eq("locale", currentLocale)
          .maybeSingle());
      } else {
        ({ data, error } = await supabase
          .from("narrative_blocks")
          .select("*")
          .eq("locale", currentLocale));
      }

      if (error) throw error;

      // If no data found for current locale, try fallback locale
      if (!data || (Array.isArray(data) && data.length === 0)) {
        if (currentLocale !== fallbackLocale) { // Avoid redundant fetch if current is already fallback
          await supabase.rpc('set_current_locale', { locale_code: fallbackLocale });
          let fallbackData, fallbackError;
          if (key) {
            ({ data: fallbackData, error: fallbackError } = await supabase
              .from("narrative_blocks")
              .select("*")
              .eq("key", key)
              .eq("locale", fallbackLocale)
              .maybeSingle());
          } else {
            ({ data: fallbackData, error: fallbackError } = await supabase
              .from("narrative_blocks")
              .select("*")
              .eq("locale", fallbackLocale));
          }
          if (fallbackError) throw fallbackError;
          data = fallbackData; // Use fallback data
        }
      }
      
      return data || (key ? null : []);
    },
    staleTime: Infinity, // Narrative blocks are relatively static
    gcTime: Infinity,
    retry: 2,
  });
};

export const useNarrativeBlock = (key: string) => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const fallbackLocale = 'en';

  return useQuery<NarrativeBlock | null, Error>({
    queryKey: ["narrativeBlock", key, currentLocale], // Add currentLocale to queryKey
    queryFn: async () => {
      // Set the locale for RLS policies
      await supabase.rpc('set_current_locale', { locale_code: currentLocale });

      let { data, error } = await supabase
        .from("narrative_blocks")
        .select("*")
        .eq("key", key)
        .eq("locale", currentLocale) // Filter by locale
        .maybeSingle();

      if (error) throw error;

      // If no data found for current locale, try fallback locale
      if (!data && currentLocale !== fallbackLocale) {
        await supabase.rpc('set_current_locale', { locale_code: fallbackLocale });
        const { data: fallbackData, error: fallbackError } = await supabase
          .from("narrative_blocks")
          .select("*")
          .eq("key", key)
          .eq("locale", fallbackLocale)
          .maybeSingle();
        if (fallbackError) throw fallbackError;
        data = fallbackData; // Use fallback data
      }
      return data;
    },
    enabled: !!key,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 2,
  });
};