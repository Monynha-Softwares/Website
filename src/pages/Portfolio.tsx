import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";
import { Input } from "@/components/ui/input";
import { Search, Globe, Code } from "lucide-react"; // Added Code icon
import { RollingGallery } from "@/components/reactbits/RollingGallery";
import { PixelCard } from "@/components/reactbits/PixelCard";
import { ProjectSkeleton } from "@/components/ProjectSkeleton"; // Updated import
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { FlowingMenu } from "@/components/reactbits/FlowingMenu";
import { useProjects } from "@/hooks/useProjects"; // Changed from useArtworks
import { useTranslation } from "react-i18next"; // Import useTranslation
import { Badge } from "@/components/ui/badge"; // Import Badge

const Portfolio = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all"); // State for category filter (optional)
  const isMobile = useIsMobile();

  // Fetch projects
  const { data: projects = [], isLoading: projectsLoading, error } = useProjects({
    search: searchQuery,
    category: selectedCategory === "all" ? undefined : selectedCategory,
  });

  // Extract unique categories for filtering (client-side for simplicity)
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    projects.forEach(p => {
      if (p.category) uniqueCategories.add(p.category);
    });
    return Array.from(uniqueCategories).sort();
  }, [projects]);

  const featured = useMemo(() => projects.filter(p => p.visibility === 'Public').slice(0, 4), [projects]);

  useEffect(() => {
    document.title = `${t("common.portfolio")} • Monynha Softwares`;
  }, [t]);

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

  const categoryMenuItems = useMemo(() => {
    const allCategories = [{ href: "#all", label: t("common.all"), accent: "hsl(var(--primary))" }];
    const dynamicCategories = categories.map(cat => ({
      href: `#${cat.toLowerCase().replace(/\s/g, '-')}`,
      label: cat,
      accent: "hsl(var(--secondary))"
    }));
    return [...allCategories, ...dynamicCategories];
  }, [categories, t]);

  const handleCategoryClick = (item: { label: string }) => {
    setSelectedCategory(item.label === t("common.all") ? "all" : item.label);
  };

  return (
    <div className="min-h-screen overflow-x-hidden pt-24 pb-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 sm:px-6">
        {/* Header */}
        <SectionReveal>
          <div className="mb-10 text-center">
            <h1 className="mb-4 text-[clamp(2rem,7vw,3.5rem)] font-bold leading-tight text-balance drop-shadow-[0_12px_32px_rgba(6,10,28,0.65)]">
              <span className="bg-gradient-primary bg-clip-text text-transparent">{t("common.portfolio")}</span>
            </h1>
            <p className="mx-auto max-w-2xl text-[clamp(1rem,3.4vw,1.15rem)] text-muted-foreground leading-relaxed text-balance">
              {t("portfolioPage.subtitle")}
            </p>
          </div>
        </SectionReveal>

        {!projectsLoading && featured.length > 0 && (
          <SectionReveal delay={0.05}>
            <RollingGallery
              items={featured.map((item) => ({
                id: item.id,
                title: item.name,
                subtitle: item.category,
                imageUrl: item.thumbnail || "/brand/placeholder.svg",
                href: `/projects/${item.slug}`, // Internal link
                footer: <span className="text-sm">{item.year}</span>,
              }))}
              speed={24}
            />
          </SectionReveal>
        )}

        {/* Search Input */}
        <SectionReveal delay={0.1}>
          <div className="mb-10 space-y-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t("portfolioPage.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 rounded-full border-border bg-surface-1 shadow-sm pl-10"
              />
            </div>
          </div>
        </SectionReveal>

        {/* Category Filter (FlowingMenu) */}
        {!projectsLoading && categories.length > 0 && (
          <SectionReveal delay={0.15}>
            <div className="mb-10">
              <FlowingMenu
                items={categoryMenuItems}
                activeHref={`#${selectedCategory.toLowerCase().replace(/\s/g, '-')}`}
                onItemClick={handleCategoryClick}
                className="max-w-full overflow-x-auto"
                menuLabel={t("portfolioPage.projectCategories")}
                itemRole="button"
              />
            </div>
          </SectionReveal>
        )}

        {/* Gallery Grid */}
        {projectsLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ProjectSkeleton key={i} />
            ))}
          </div>
        ) : projects.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link to={`/projects/${project.slug}`} className="block h-full">
                  <PixelCard
                    imageUrl={project.thumbnail || "/brand/placeholder.svg"}
                    title={project.name}
                    subtitle={project.summary || t("repositoryDetailPage.noDescriptionProvided")}
                    footer={
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap gap-2">
                          {project.stack?.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
                          <span className="flex items-center gap-1">
                            <Code className="h-4 w-4 text-primary" />
                            {project.category}
                          </span>
                          <span>{project.year}</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-2">
                          {t("common.viewDetails")}
                          <Globe className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    }
                    className="h-full flex flex-col"
                    noFocus={isMobile}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <SectionReveal>
            <div className="text-center py-16">
              <p className="text-fluid-lg text-muted-foreground">
                {t("common.noProjectsFound")}
              </p>
            </div>
          </SectionReveal>
        )}
      </div>
    </div>
  );
};

export default Portfolio;