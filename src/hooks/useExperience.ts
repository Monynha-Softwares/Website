import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Experience {
  id: string;
  role: string;
  org: string;
  start_date: string;
  end_date: string | null;
  location: string;
  highlights: string[];
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const useExperience = () => {
  return useQuery<Experience[], Error>({
    queryKey: ["experience"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experience") // Assuming a new 'experience' table
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