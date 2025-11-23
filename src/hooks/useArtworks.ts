import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Artwork } from "@/integrations/supabase/supabase.types"; // Import centralized type

interface UseArtworksOptions {
  category?: string;
  search?: string;
  featured?: boolean;
}

export const useArtworks = (options: UseArtworksOptions = {}) => {
  return useQuery<Artwork[], Error>({ // Specify return type
    queryKey: ["artworks", options],
    queryFn: async () => {
      let query = supabase
        .from("artworks")
        .select("*")
        .eq("status", "published")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (options.featured) {
        query = query.eq("featured", true);
      }

      // Filter by the 'category' column directly
      if (options.category) {
        query = query.eq("category", options.category);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Client-side search filtering (includes tags, title, description)
      let filteredData = data || [];
      if (options.search) {
        const searchLower = options.search.toLowerCase();
        filteredData = filteredData.filter(
          (artwork) =>
            artwork.title.toLowerCase().includes(searchLower) ||
            artwork.description?.toLowerCase().includes(searchLower) ||
            artwork.tags?.some((tag: string) => tag.toLowerCase().includes(searchLower)) ||
            artwork.category.toLowerCase().includes(searchLower) // Also search in category
        );
      }

      return filteredData;
    },
  });
};