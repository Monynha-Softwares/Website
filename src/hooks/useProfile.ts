import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Profile } from "@/integrations/supabase/supabase.types";

export const useProfile = (id?: string) => {
  return useQuery<Profile | null, Error>({
    queryKey: ["profile", id],
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

      // When no ID is provided, prefer the seeded site profile ID stored in
      // `settings.key = 'site_profile_id'`. The migration stores the UUID as
      // a JSON string in `settings.value` (e.g. '"4a9b..."'). Read that
      // setting, parse it safely, and fetch the profile by UUID.
      const { data: profileSetting, error: profileSettingError } = await supabase
        .from("settings")
        .select("value")
        .eq("key", "site_profile_id")
        .maybeSingle();

      if (profileSettingError) throw profileSettingError;

      let seededProfileId: string | null = null;
      if (profileSetting && profileSetting.value) {
        try {
          // value may be a JSON string like '"uuid"' or a plain string
          if (typeof profileSetting.value === "string") {
            // Try to JSON.parse in case it's quoted JSON
            try {
              const parsed = JSON.parse(profileSetting.value);
              if (typeof parsed === "string") seededProfileId = parsed;
            } catch (e) {
              // Not JSON quoted, assume the string is the UUID
              seededProfileId = profileSetting.value;
            }
          } else if (typeof profileSetting.value === "object" && profileSetting.value !== null) {
            // If somehow stored as an object, try to coerce
            seededProfileId = String(profileSetting.value);
          }
        } catch (e) {
          // Ignore parsing errors and continue to fallback strategies
          seededProfileId = null;
        }
      }

      if (seededProfileId) {
        const { data: seededProfile, error: seededError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", seededProfileId)
          .maybeSingle();

        if (seededError) throw seededError;
        if (seededProfile) return seededProfile;
      }

      // Next fallback: try to find the seeded profile by common fields
      // (safe since these are text columns).
      const { data: siteProfileByName, error: nameError } = await supabase
        .from("profiles")
        .select("*")
        .eq("full_name", "Monynha Softwares")
        .maybeSingle();

      if (nameError) throw nameError;
      if (siteProfileByName) return siteProfileByName;

      const { data: siteProfileByEmail, error: emailError } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", "hello@monynha.com")
        .maybeSingle();

      if (emailError) throw emailError;
      if (siteProfileByEmail) return siteProfileByEmail;

      // Fallback: return the most recently created profile if no seeded row.
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