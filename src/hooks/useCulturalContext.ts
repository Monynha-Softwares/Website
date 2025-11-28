import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { CulturalContext } from "@/integrations/supabase/supabase.types";

export const useCulturalContext = () => {
  return useQuery<CulturalContext[], Error>({
    queryKey: ["culturalContext"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cultural_context")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data || [];
    },
    staleTime: Infinity, // Cultural context is relatively static
    gcTime: Infinity,
    retry: 2,
  });
};