import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Artwork } from "@/integrations/supabase/supabase.types"; // Import centralized type

interface UseArtworksOptions {
  tag?: string; // Renamed from category to tag
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

      // Filtering logic: filter by tags array
      if (options.tag && options.tag !== "all") {
        query = query.contains("tags", [options.tag.toLowerCase()]); // Use .contains for array matching
      }

      const { data, error } = await query;

      if (error) throw error;

      // Client-side search filtering
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

// New hook to fetch all unique tags from artworks
export const useArtworkTags = () => {
  return useQuery<string[], Error>({
    queryKey: ["artworkTags"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("artworks")
        .select("tags")
        .eq("status", "published");

      if (error) throw error;

      const allTags = data?.flatMap(artwork => artwork.tags || []) || [];
      const uniqueTags = Array.from(new Set(allTags.map(tag => tag.toLowerCase())));
      return ["all", ...uniqueTags]; // Add 'all' as a default filter option
    },
    staleTime: Infinity, // Tags are relatively static, cache indefinitely
    gcTime: Infinity,
  });
};