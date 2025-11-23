import { useQuery } from "@tanstack/react-query";
import { blogPostManifest, BlogPost, BlogPostMeta } from "@/lib/blogPosts";
import { marked } from "marked";
import DOMPurify from "dompurify";

// Function to parse front matter from Markdown content
const parseFrontMatter = (markdown: string): { meta: BlogPostMeta; content: string } => {
  const frontMatterRegex = /^---\s*([\s\S]*?)\s*---([\s\S]*)/;
  const match = markdown.match(frontMatterRegex);

  if (!match) {
    throw new Error("Invalid Markdown format: missing front matter.");
  }

  const frontMatterRaw = match[1];
  const content = match[2].trim();

  const meta: Partial<BlogPostMeta> = {};
  frontMatterRaw.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    const value = valueParts.join(":").trim();

    if (key && value) {
      if (key === "tags") {
        meta[key] = JSON.parse(value.replace(/'/g, '"')); // Parse array of strings
      } else if (key === "date") {
        meta[key] = value.replace(/"/g, ''); // Remove quotes from date string
      }
      else {
        meta[key as keyof BlogPostMeta] = value.replace(/"/g, ''); // Remove quotes from string values
      }
    }
  });

  // Basic validation for required fields
  const requiredFields: Array<keyof BlogPostMeta> = ["slug", "title", "date", "author", "tags", "excerpt"];
  for (const field of requiredFields) {
    if (!meta[field]) {
      throw new Error(`Missing required front matter field: ${field}`);
    }
  }

  return { meta: meta as BlogPostMeta, content };
};

export const useBlogPosts = (slug?: string) => {
  return useQuery<BlogPost[], Error>({
    queryKey: ["blogPosts", slug],
    queryFn: async () => {
      const posts: BlogPost[] = [];

      for (const entry of blogPostManifest) {
        if (slug && entry.slug !== slug) {
          continue;
        }

        const response = await fetch(entry.filePath);
        if (!response.ok) {
          console.error(`Failed to fetch blog post: ${entry.filePath}`);
          continue;
        }
        const markdownContent = await response.text();

        try {
          const { meta, content } = parseFrontMatter(markdownContent);
          const contentHtml = DOMPurify.sanitize(marked.parse(content));

          posts.push({
            ...meta,
            slug: entry.slug, // Ensure slug from manifest is used
            contentHtml,
          });
        } catch (parseError) {
          console.error(`Error parsing blog post ${entry.filePath}:`, parseError);
        }

        if (slug) {
          // If fetching a single post, break after finding it
          break;
        }
      }

      // Sort posts by date, newest first
      posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      return posts;
    },
    staleTime: Infinity, // Blog posts are static, cache indefinitely
    gcTime: Infinity,
    retry: 1,
  });
};