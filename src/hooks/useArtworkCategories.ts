import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useArtworkCategories = () => {
  return useQuery<string[], Error>({
    queryKey: ["artworkCategories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("artworks")
        .select("category")
        .eq("status", "published");

      if (error) throw error;

      // Extract unique categories and filter out null/undefined values
      const categories = Array.from(new Set(data?.map(item => item.category).filter(Boolean) as string[] || []));
      
      // Add "all" option and sort alphabetically
      return ["all", ...categories.sort()];
    },
    staleTime: Infinity, // Categories are relatively static
    gcTime: Infinity,
    retry: 2,
  });
};