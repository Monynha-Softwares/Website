import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Experience } from "@/integrations/supabase/interfaces"; // Import centralized type

export const useExperience = () => {
  return useQuery<Experience[], Error>({
    queryKey: ["experience"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experiences") // Corrected table name from "experience" to "experiences"
        .select("*")
        .order("start_date", { ascending: false })
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data || [];
    },
    staleTime: Infinity, // Experience data is relatively static
    gcTime: Infinity,
    retry: 2,
  });
};