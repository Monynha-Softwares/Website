import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { BlogPost } from "@/integrations/supabase/interfaces";

export const useBlogPosts = (slug?: string) => {
  return useQuery<BlogPost[], Error>({
    queryKey: ["blogPosts", slug],
    queryFn: async () => {
      let query = supabase
        .from("blog_posts")
        .select("*")
        .order("date", { ascending: false });

      if (slug) {
        query = query.eq("slug", slug);
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
  return useQuery<BlogPost | null, Error>({
    queryKey: ["blogPost", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
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