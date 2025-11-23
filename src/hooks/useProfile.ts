import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Profile } from "@/integrations/supabase/supabase.types";

export const useProfile = (id?: string) => {
  return useQuery<Profile | null, Error>({
    queryKey: ["profile", id],
    queryFn: async () => {
      // For now, we'll fetch a default profile if no ID is provided,
      // or if a placeholder ID is used. In a real app, you'd fetch
      // the authenticated user's profile or a specific public profile.
      const profileId = id || '00000000-0000-0000-0000-000000000000'; // Using placeholder for now

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", profileId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};