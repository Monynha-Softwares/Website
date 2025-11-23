import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types_db"; // Changed import path
import type { Setting } from "@/integrations/supabase/supabase.types";

type SettingsQueryResult = Setting[] | (Setting | null);

export const useSettings = (key?: string) => {
  return useQuery<SettingsQueryResult>({
    queryKey: ["settings", key],
    queryFn: async () => {
      if (!key) {
        const { data, error } = await supabase
          .from("settings")
          .select("*")
          .eq("is_public", true);

        if (error) throw error;
        return data as Setting[];
      }

      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .eq("key", key)
        .eq("is_public", true)
        .maybeSingle();

      if (error) throw error;
      return data as Setting | null;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};

export const useSiteSetting = <T = Json | null>(key: string, fallback?: T) => {
  const { data } = useSettings(key);

  if (!data || Array.isArray(data)) {
    return (fallback ?? null) as T;
  }

  // Attempt to parse the value if it's a string that looks like JSON
  let parsedValue: unknown = data.value;
  if (typeof data.value === 'string') {
    try {
      parsedValue = JSON.parse(data.value);
    } catch (e) {
      // Not a JSON string, use as is
    }
  }
  
  return (parsedValue ?? fallback ?? null) as T;
};