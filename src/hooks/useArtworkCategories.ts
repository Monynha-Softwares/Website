import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useArtworkCategories = () => {
  return useQuery<string[], Error>({
    queryKey: ["artworkCategories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("artworks")
        .select("category")
        .eq("status", "published")
        .distinct("category");

      if (error) throw error;
      return data?.map((item) => item.category) || [];
    },
    staleTime: Infinity, // Categories are relatively static
    gcTime: Infinity,
    retry: 2,
  });
};