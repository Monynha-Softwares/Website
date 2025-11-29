import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/SectionReveal";
import { ArrowLeft, Calendar, Tag, Layers, Globe, Code } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { GlassIcon } from "@/components/reactbits/GlassIcon";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";
import { Badge } from "@/components/ui/badge";
import { useProject } from "@/hooks/useProject"; // Use dedicated project hook
import { useTranslation } from "react-i18next";

const ProjectDetail = () => {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading, error } = useProject(slug || "");

  if (isLoading) {
    return (
      <div className="min-h-screen overflow-x-hidden pt-24 pb-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <Skeleton className="h-10 w-32 mb-8" />
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
            <Skeleton className="aspect-[4/3] rounded-2xl" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-6 w-1/2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen overflow-x-hidden pt-24 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="mb-4 text-[clamp(1.75rem,6vw,2.75rem)] font-bold leading-tight">{t("common.projectNotFound")}</h1>
          <p className="text-muted-foreground mb-8">
            {error?.message || t("repositoryDetailPage.repositoryNotExists")}
          </p>
          <Link to="/portfolio">
            <Button variant="outline">
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t("common.backToPortfolio")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden pt-24 pb-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Back Button */}
        <SectionReveal>
          <Link to="/portfolio">
            <Button variant="ghost" className="mb-8 group">
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              {t("common.backToPortfolio")}
            </Button>
          </Link>
        </SectionReveal>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Image */}
          <SectionReveal>
            <div className="lg:sticky lg:top-24">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-lg">
                <img
                  src={project.thumbnail || "/brand/placeholder.svg"}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                {project.url && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="hero" size="lg" className="w-full sm:w-auto">
                      {t("common.visitProjectWebsite")} {/* New translation key */}
                      <Globe className="w-5 h-5 ml-2" />
                    </Button>
                  </a>
                )}
                {project.repo_url && (
                  <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      {t("common.viewOnGitHub")}
                      <Code className="w-5 h-5 ml-2" />
                    </Button>
                  </a>
                )}
                <Link to="/contact" className="block sm:inline-block">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto justify-center"
                  >
                    {t("common.inquireAboutThisWork")}
                  </Button>
                </Link>
              </div>
            </div>
          </SectionReveal>

          {/* Details */}
          <div className="space-y-8">
            <SectionReveal delay={0.1}>
              <div>
                <h1 className="mb-4 text-[clamp(1.85rem,6vw,3.25rem)] font-bold leading-tight text-balance">
                  {project.name}
                </h1>
                {project.summary && (
                  <SpotlightCard className="bg-surface-3/90 p-6 sm:p-8 mt-4">
                    <p className="text-[clamp(1rem,3.4vw,1.15rem)] text-muted-foreground leading-relaxed">
                      {project.summary}
                    </p>
                  </SpotlightCard>
                )}
                {project.full_description && project.full_description !== project.summary && (
                  <div className="mt-6">
                    <h2 className="mb-3 text-fluid-xl font-bold">{t("adminProjects.fullDescription")}</h2>
                    <p className="text-[clamp(1rem,3.4vw,1.15rem)] text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {project.full_description}
                    </p>
                  </div>
                )}
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div className="space-y-4">
                {project.year && (
                  <GlassIcon
                    icon={<Calendar className="w-6 h-6" />}
                    title={t("artworkDetailPage.year")}
                    description={String(project.year)}
                  />
                )}

                {project.category && (
                  <GlassIcon
                    icon={<Tag className="w-6 h-6" />}
                    title={t("artworkDetailPage.category")}
                    description={project.category}
                  />
                )}
              </div>
            </SectionReveal>

            {project.stack && project.stack.length > 0 && (
              <SectionReveal delay={0.3}>
                <SpotlightCard className="bg-surface-3/90 p-6 sm:p-8">
                  <div>
                    <h3 className="mb-3 text-[clamp(1.2rem,4vw,1.6rem)] font-bold leading-tight">{t("adminProjects.techStack")}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech: string) => (
                        <Badge key={tech} variant="secondary" className="text-sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </SectionReveal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;