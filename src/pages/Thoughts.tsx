import { SectionReveal } from "@/components/SectionReveal";
import { useBlogPosts } from "@/hooks/useBlogPosts"; // Updated hook
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Thoughts = () => {
  const { data: blogPosts = [], isLoading, error } = useBlogPosts(); // Use updated hook
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t("thoughtsPage.title")} • Monynha Softwares`;
  }, [t]);

  if (isLoading) {
    return (
      <div className="min-h-screen overflow-x-hidden pt-24 pb-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <SectionReveal>
            <div className="mb-10 text-center">
              <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
              <Skeleton className="h-6 w-1/2 mx-auto" />
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-24 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">{t("common.errorLoadingContent")}</h2>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden pt-24 pb-16">
      <div className="mx-auto w-full max-w-6xl flex-col gap-14 px-4 sm:px-6">
        {/* Header */}
        <SectionReveal>
          <div className="mb-10 text-center">
            <h1 className="mb-4 text-[clamp(2rem,7vw,3.5rem)] font-bold leading-tight text-balance">
              {t("thoughtsPage.title").split(' ')[0]} <span className="bg-gradient-primary bg-clip-text text-transparent">{t("thoughtsPage.title").split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="mx-auto max-w-2xl text-[clamp(1rem,3.4vw,1.15rem)] text-muted-foreground leading-relaxed text-balance">
              {t("thoughtsPage.subtitle")}
            </p>
          </div>
        </SectionReveal>

        {/* Blog Post Grid */}
        {blogPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <BlogPostCard key={post.slug} post={post} delay={index * 0.05} />
            ))}
          </div>
        ) : (
          <SectionReveal>
            <div className="text-center py-16">
              <p className="text-fluid-lg text-muted-foreground">
                {t("common.noThoughtsYet")}
              </p>
            </div>
          </SectionReveal>
        )}
      </div>
    </div>
  );
};

export default Thoughts;