import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";
import { Input } from "@/components/ui/input";
import { Search, Globe } from "lucide-react"; // Added Globe icon
import { RollingGallery } from "@/components/reactbits/RollingGallery";
import { PixelCard } from "@/components/reactbits/PixelCard";
import { useArtworks } from "@/hooks/useArtworks";
import { ArtworkSkeleton } from "@/components/ArtworkSkeleton";
import { Button } from "@/components/ui/button"; // Import Button
import { useIsMobile } from "@/hooks/use-mobile"; // Import useIsMobile hook
import { FlowingMenu } from "@/components/reactbits/FlowingMenu"; // Import FlowingMenu
import { useArtworkCategories } from "@/hooks/useArtworkCategories"; // Import useArtworkCategories

const Portfolio = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all"); // New state for category
  const isMobile = useIsMobile(); // Determine if on mobile

  const { data: categories = [], isLoading: categoriesLoading } = useArtworkCategories();
  const { data: artworks = [], isLoading: artworksLoading, error } = useArtworks({
    search: searchQuery,
    category: selectedCategory, // Pass selected category to hook
  });

  const featured = useMemo(() => artworks.slice(0, 4), [artworks]);

  useEffect(() => {
    document.title = "Portfolio • Monynha Softwares";
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Error Loading Portfolio</h2>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  const categoryMenuItems = useMemo(() => {
    const allCategories = [{ href: "#all", label: "All", accent: "hsl(var(--primary))" }, ...categories.map(cat => ({
      href: `#${cat.toLowerCase().replace(/\s/g, '-')}`, // Use hash for internal navigation
      label: cat,
      accent: "hsl(var(--secondary))" // Example accent color
    }))];
    return allCategories;
  }, [categories]);

  const handleCategoryClick = (itemLabel: string) => {
    setSelectedCategory(itemLabel === "All" ? "all" : itemLabel);
  };

  return (
    <div className="min-h-screen overflow-x-hidden pt-24 pb-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 sm:px-6">
        {/* Header */}
        <SectionReveal>
          <div className="mb-10 text-center">
            <h1 className="mb-4 text-[clamp(2rem,7vw,3.5rem)] font-bold leading-tight text-balance">
              <span className="bg-gradient-primary bg-clip-text text-transparent">Portfolio</span>
            </h1>
            <p className="mx-auto max-w-2xl text-[clamp(1rem,3.4vw,1.15rem)] text-muted-foreground leading-relaxed text-balance">
              A collection of explorations in digital art, motion, and software development
            </p>
          </div>
        </SectionReveal>

        {!artworksLoading && featured.length > 0 && (
          <SectionReveal delay={0.05}>
            <RollingGallery
              items={featured.map((item) => ({
                id: item.id,
                title: item.title,
                subtitle: item.category,
                imageUrl: item.cover_url,
                href: `/art/${item.slug}`,
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
                placeholder="Search artworks, projects, and tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 rounded-full border-border bg-surface-1 shadow-sm pl-10"
              />
            </div>
          </div>
        </SectionReveal>

        {/* Category Filter (FlowingMenu) */}
        {!categoriesLoading && categories.length > 0 && (
          <SectionReveal delay={0.15}>
            <div className="mb-10">
              <FlowingMenu
                items={categoryMenuItems}
                activeHref={`#${selectedCategory.toLowerCase().replace(/\s/g, '-')}`}
                onItemClick={(item) => handleCategoryClick(item.label)}
                className="max-w-full overflow-x-auto"
                menuLabel="Artwork Categories"
                itemRole="button" // Use button role for filter items
              />
            </div>
          </SectionReveal>
        )}

        {/* Gallery Grid */}
        {artworksLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ArtworkSkeleton key={i} />
            ))}
          </div>
        ) : artworks.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            {artworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link to={`/art/${artwork.slug}`} className="block h-full">
                  <PixelCard
                    imageUrl={artwork.cover_url}
                    title={artwork.title}
                    subtitle={artwork.category}
                    footer={
                      <div className="flex flex-col gap-2">
                        <span className="text-sm text-muted-foreground">{artwork.year}</span>
                        {artwork.live_url && (
                          <a href={artwork.live_url} target="_blank" rel="noopener noreferrer" className="block mt-2">
                            <Button variant="outline" size="sm" className="w-full">
                              View Live Demo <Globe className="h-4 w-4 ml-2" />
                            </Button>
                          </a>
                        )}
                      </div>
                    }
                    className="h-full flex flex-col"
                    noFocus={isMobile} // Apply noFocus conditionally for mobile
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <SectionReveal>
            <div className="text-center py-16">
              <p className="text-fluid-lg text-muted-foreground">
                No artworks or projects found matching your criteria.
              </p>
            </div>
          </SectionReveal>
        )}
      </div>
    </div>
  );
};

export default Portfolio;