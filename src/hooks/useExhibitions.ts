import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Exhibition } from "@/integrations/supabase/supabase.types"; // Import centralized type

export const useExhibitions = () => {
  return useQuery<Exhibition[], Error>({ // Specify return type
    queryKey: ["exhibitions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("exhibitions")
        .select("*")
        .order("year", { ascending: false })
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });
};