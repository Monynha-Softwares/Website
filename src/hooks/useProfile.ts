import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Profile } from "@/integrations/supabase/supabase.types";
import { useSiteSetting } from "./useSettings"; // Import useSiteSetting

export const useProfile = (id?: string) => {
  const siteProfileIdSetting = useSiteSetting<string>('site_profile_id'); // Get the site profile ID from settings

  return useQuery<Profile | null, Error>({
    queryKey: ["profile", id, siteProfileIdSetting], // Add siteProfileIdSetting to queryKey
    queryFn: async () => {
      // If an explicit ID is provided, fetch that profile.
      if (id) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (error) throw error;
        return data;
      }

      // When no ID is provided, prefer the seeded "site_profile" row using the ID from settings
      if (siteProfileIdSetting) {
        const { data: siteProfile, error: siteError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", siteProfileIdSetting)
          .maybeSingle();

        if (siteError) throw siteError;
        if (siteProfile) return siteProfile;
      }

      // Fallback: return the most recently created profile if no seeded row or siteProfileIdSetting
      const { data: recentProfile, error: recentError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (recentError) throw recentError;
      return recentProfile || null;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};