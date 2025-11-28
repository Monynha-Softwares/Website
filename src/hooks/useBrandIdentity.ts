import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { BrandIdentity } from "@/integrations/supabase/supabase.types";

export const useBrandIdentity = () => {
  return useQuery<BrandIdentity | null, Error>({
    queryKey: ["brandIdentity"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("brand_identity")
        .select("*")
        .maybeSingle(); // Assuming there's only one main brand identity entry

      if (error) throw error;
      return data;
    },
    staleTime: Infinity, // Brand identity is static
    gcTime: Infinity,
    retry: 2,
  });
};