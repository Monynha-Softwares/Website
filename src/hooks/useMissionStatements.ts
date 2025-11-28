import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { MissionStatement } from "@/integrations/supabase/supabase.types";

export const useMissionStatements = () => {
  return useQuery<MissionStatement[], Error>({
    queryKey: ["missionStatements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("mission_statements")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data || [];
    },
    staleTime: Infinity, // Mission statements are relatively static
    gcTime: Infinity,
    retry: 2,
  });
};