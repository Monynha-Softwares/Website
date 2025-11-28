import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { CulturalContext } from "@/integrations/supabase/supabase.types";
import { useTranslation } from "react-i18next"; // Import useTranslation

export const useCulturalContext = () => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  return useQuery<CulturalContext[], Error>({
    queryKey: ["culturalContext", currentLocale], // Add currentLocale to queryKey
    queryFn: async () => {
      // Set the locale for RLS policies
      await supabase.rpc('set_current_locale', { locale_code: currentLocale });

      const { data, error } = await supabase
        .from("cultural_context")
        .select("*")
        .eq("locale", currentLocale) // Filter by locale
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data || [];
    },
    staleTime: Infinity, // Cultural context is relatively static
    gcTime: Infinity,
    retry: 2,
  });
};