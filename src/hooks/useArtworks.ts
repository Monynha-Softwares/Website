import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Artwork } from "@/integrations/supabase/supabase.types"; // Import centralized type
import { useTranslation } from "react-i18next"; // Import useTranslation

interface UseArtworksOptions {
  search?: string;
  featured?: boolean;
  category?: string; // Add category filter
}

export const useArtworks = (options: UseArtworksOptions = {}) => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  return useQuery<Artwork[], Error>({ // Specify return type
    queryKey: ["artworks", options, currentLocale], // Add currentLocale to queryKey
    queryFn: async () => {
      // Set the locale for RLS policies
      await supabase.rpc('set_current_locale', { locale_code: currentLocale });

      let query = supabase
        .from("artworks")
        .select("*")
        .eq("status", "published")
        .eq("locale", currentLocale) // Filter by locale
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (options.featured) {
        query = query.eq("featured", true);
      }
      if (options.category && options.category !== "all") { // Add category filtering
        query = query.eq("category", options.category);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Client-side search filtering across title, description, and tags
      let filteredData = data || [];
      if (options.search) {
        const searchLower = options.search.toLowerCase();
        filteredData = filteredData.filter(
          (artwork) =>
            artwork.title.toLowerCase().includes(searchLower) ||
            artwork.description?.toLowerCase().includes(searchLower) ||
            artwork.tags?.some((tag: string) => tag.toLowerCase().includes(searchLower))
        );
      }

      return filteredData;
    },
  });
};