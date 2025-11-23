import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Skill {
  id: string;
  name: string;
  category: string;
  level: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const useSkills = () => {
  return useQuery<Skill[], Error>({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("skills") // Assuming a new 'skills' table
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