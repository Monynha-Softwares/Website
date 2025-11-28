import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { NarrativeBlock } from "@/integrations/supabase/supabase.types";
import { useTranslation } from "react-i18next"; // Import useTranslation

export const useNarrativeBlocks = (key?: string) => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  return useQuery<NarrativeBlock | NarrativeBlock[] | null, Error>({
    queryKey: ["narrativeBlocks", key, currentLocale], // Add currentLocale to queryKey
    queryFn: async () => {
      // Set the locale for RLS policies
      await supabase.rpc('set_current_locale', { locale_code: currentLocale });

      if (key) {
        const { data, error } = await supabase
          .from("narrative_blocks")
          .select("*")
          .eq("key", key)
          .eq("locale", currentLocale) // Filter by locale
          .maybeSingle();

        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("narrative_blocks")
          .select("*")
          .eq("locale", currentLocale); // Filter by locale

        if (error) throw error;
        return data || [];
      }
    },
    staleTime: Infinity, // Narrative blocks are relatively static
    gcTime: Infinity,
    retry: 2,
  });
};

export const useNarrativeBlock = (key: string) => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  return useQuery<NarrativeBlock | null, Error>({
    queryKey: ["narrativeBlock", key, currentLocale], // Add currentLocale to queryKey
    queryFn: async () => {
      // Set the locale for RLS policies
      await supabase.rpc('set_current_locale', { locale_code: currentLocale });

      const { data, error } = await supabase
        .from("narrative_blocks")
        .select("*")
        .eq("key", key)
        .eq("locale", currentLocale) // Filter by locale
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!key,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 2,
  });
};