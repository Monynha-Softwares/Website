import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Value } from "@/integrations/supabase/supabase.types";

export const useValues = () => {
  return useQuery<Value[], Error>({
    queryKey: ["values"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("values")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data || [];
    },
    staleTime: Infinity, // Values are relatively static
    gcTime: Infinity,
    retry: 2,
  });
};