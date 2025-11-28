import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Artwork } from "@/integrations/supabase/supabase.types"; // Import centralized type
import { useTranslation } from "react-i18next"; // Import useTranslation

export const useArtwork = (slug: string) => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  return useQuery<Artwork | null>({ // Specify return type
    queryKey: ["artwork", slug, currentLocale], // Add currentLocale to queryKey
    queryFn: async () => {
      // Set the locale for RLS policies
      await supabase.rpc('set_current_locale', { locale_code: currentLocale });

      const { data, error } = await supabase
        .from("artworks")
        .select("*")
        .eq("slug", slug)
        .eq("locale", currentLocale) // Filter by locale
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });
};