import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Skill } from "@/integrations/supabase/interfaces"; // Import centralized type

export const useSkills = () => {
  return useQuery<Skill[], Error>({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("skills") // Corrected table name from "skills" to "skills" (already correct, but ensuring consistency)
        .select("*")
        .order("display_order", { ascending: true })
        .order("name", { ascending: true });

      if (error) throw error;
      return data || [];
    },
    staleTime: Infinity, // Skills data is relatively static
    gcTime: Infinity,
    retry: 2,
  });
};