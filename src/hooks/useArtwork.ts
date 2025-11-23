import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Artwork } from "@/integrations/supabase/supabase.types"; // Import centralized type

export const useArtwork = (slug: string) => {
  return useQuery<Artwork | null>({ // Specify return type
    queryKey: ["artwork", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("artworks")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });
};