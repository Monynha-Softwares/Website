// This file acts as a manifest for your blog posts.
// Add new blog post entries here to make them discoverable by the app.

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  excerpt: string;
}

export interface BlogPost extends BlogPostMeta {
  contentHtml: string;
}

// List of all blog posts. The `filePath` should correspond to the Markdown file
// in the `public/content/blog` directory.
export const blogPostManifest: { slug: string; filePath: string }[] = [
  { slug: "design-tecnologia-inclusiva", filePath: "/content/blog/design-tecnologia-inclusiva.md" },
  { slug: "por-tras-da-monynha", filePath: "/content/blog/por-tras-da-monynha.md" },
  { slug: "react-query-gerenciamento-estado", filePath: "/content/blog/react-query-gerenciamento-estado.md" },
  { slug: "como-construi-meu-portfolio", filePath: "/content/blog/como-construi-meu-portfolio.md" },
];