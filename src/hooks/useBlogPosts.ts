import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { BlogPost } from "@/integrations/supabase/supabase.types";

export const useBlogPosts = (slug?: string) => {
  // Removed useTranslation and locale logic to fetch all posts regardless of language

  return useQuery<BlogPost[], Error>({
    queryKey: ["blogPosts", slug], // Removed currentLocale from key
    queryFn: async () => {
      // Removed supabase.rpc('set_current_locale', ...) call

      let query = supabase
        .from("blog_posts")
        .select("*")
        .order("date", { ascending: false });

      if (slug) {
        query = query.eq("slug", slug);
      } else {
        // Only fetch published posts for the main listing
        query = query.eq("status", "published");
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    },
    staleTime: Infinity, // Blog posts are relatively static, cache indefinitely
    gcTime: Infinity,
    retry: 1,
  });
};

export const useBlogPost = (slug: string) => {
  // Removed useTranslation and locale logic to fetch all posts regardless of language

  return useQuery<BlogPost | null, Error>({
    queryKey: ["blogPost", slug], // Removed currentLocale from key
    queryFn: async () => {
      // Removed supabase.rpc('set_current_locale', ...) call

      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published") // Explicitly enforce published status for public detail view
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 1,
  });
};