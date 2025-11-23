import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/SectionReveal";
import { ArrowLeft, CalendarDays, User, Tag } from "lucide-react";
import { useBlogPost } from "@/hooks/useBlogPosts"; // Updated hook
import { Skeleton } from "@/components/ui/skeleton";
import { BlogContent } from "@/components/blog/BlogContent";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useEffect } from "react";

const ThoughtDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useBlogPost(slug || ""); // Use updated hook for single post

  useEffect(() => {
    if (post) {
      document.title = `${post.title} • Monynha Softwares Thoughts`;
    } else if (!isLoading) {
      document.title = "Thought Not Found • Monynha Softwares";
    }
  }, [post, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen overflow-x-hidden pt-24 pb-16">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <Skeleton className="h-10 w-32 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-48 w-full mb-4" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen overflow-x-hidden pt-24 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="mb-4 text-[clamp(1.75rem,6vw,2.75rem)] font-bold leading-tight">Thought Not Found</h1>
          <p className="text-muted-foreground mb-8">
            {error?.message || "The blog post you're looking for doesn't exist."}
          </p>
          <Link to="/thoughts">
            <Button variant="outline">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Thoughts
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden pt-24 pb-16">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        {/* Back Button */}
        <SectionReveal>
          <Link to="/thoughts">
            <Button variant="ghost" className="mb-8 group">
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Thoughts
            </Button>
          </Link>
        </SectionReveal>

        {/* Post Header */}
        <SectionReveal delay={0.1}>
          <h1 className="mb-4 text-[clamp(2rem,7vw,3.5rem)] font-bold leading-tight text-balance">
            {post.title}
          </h1>
          <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              {format(new Date(post.date), "PPP")}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <Tag className="h-4 w-4" />
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </SectionReveal>

        {/* Post Content */}
        <SectionReveal delay={0.2}>
          <BlogContent htmlContent={post.content_html} className="mt-8" />
        </SectionReveal>
      </div>
    </div>
  );
};

export default ThoughtDetail;