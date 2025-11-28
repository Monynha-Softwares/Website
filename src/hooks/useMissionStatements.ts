import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { MissionStatement } from "@/integrations/supabase/supabase.types";
import { useTranslation } from "react-i18next"; // Import useTranslation

export const useMissionStatements = () => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  return useQuery<MissionStatement[], Error>({
    queryKey: ["missionStatements", currentLocale], // Add currentLocale to queryKey
    queryFn: async () => {
      // Set the locale for RLS policies
      await supabase.rpc('set_current_locale', { locale_code: currentLocale });

      const { data, error } = await supabase
        .from("mission_statements")
        .select("*")
        .eq("locale", currentLocale) // Filter by locale
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data || [];
    },
    staleTime: Infinity, // Mission statements are relatively static
    gcTime: Infinity,
    retry: 2,
  });
};