import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { NarrativeBlock } from "@/integrations/supabase/supabase.types";

export const useNarrativeBlocks = (key?: string) => {
  return useQuery<NarrativeBlock | NarrativeBlock[] | null, Error>({
    queryKey: ["narrativeBlocks", key],
    queryFn: async () => {
      if (key) {
        const { data, error } = await supabase
          .from("narrative_blocks")
          .select("*")
          .eq("key", key)
          .maybeSingle();

        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("narrative_blocks")
          .select("*");

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
  return useQuery<NarrativeBlock | null, Error>({
    queryKey: ["narrativeBlock", key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("narrative_blocks")
        .select("*")
        .eq("key", key)
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