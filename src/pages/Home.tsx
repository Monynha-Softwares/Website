import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/SectionReveal";
import { ArrowRight, Sparkles, Palette, Eye } from "lucide-react";
import { motion } from "framer-motion";
import LiquidEtherBackground from "@/components/reactbits/LiquidEtherBackground";
import { SplitText } from "@/components/reactbits/SplitText";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";
import { PixelCard } from "@/components/reactbits/PixelCard";
import { usePages } from "@/hooks/usePages";
import { useSiteSetting } from "@/hooks/useSettings";
import { useArtworks } from "@/hooks/useArtworks";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ArtworkSkeleton } from "@/components/ArtworkSkeleton";
import { useProfile } from "@/hooks/useProfile";
import type { Page } from "@/integrations/supabase/supabase.types"; // Import Page type

interface FeaturedDiscipline {
  icon: string; // Changed to string to represent Lucide icon name
  title: string;
  desc: string;
}

const ICON_MAP: { [key: string]: React.ElementType } = {
  Palette: Palette,
  Eye: Eye,
  Sparkles: Sparkles,
  // Add other icons as needed
};

const Home = () => {
  const { data: homePageData } = usePages("home"); // Renamed to avoid conflict with type
  const homePage = homePageData as Page | null; // Cast to Page type
  const tagline = useSiteSetting("site_tagline", "Inclusive technology for everyone");
  const { data: featuredArtworks, isLoading: artworksLoading } = useArtworks({ featured: true });
  const { data: profile } = useProfile();
  const featuredDisciplines = useSiteSetting<FeaturedDiscipline[]>('featured_disciplines', [
    { icon: "Palette", title: "Motion Design", desc: "Dynamic visual narratives" },
    { icon: "Eye", title: "3D Art", desc: "Immersive spatial experiences" },
    { icon: "Sparkles", title: "Interactive", desc: "Engaging digital installations" },
  ]);

  // Extract content from homePage if available
  const heroContent = homePage?.content?.hero || {};
  const heroTitle = heroContent.title || (profile?.full_name || "Monynha Softwares");
  const heroSubtitle = heroContent.subtitle || (profile?.headline || "Inclusive tech that empowers");
  const heroDescription = heroContent.description || (profile?.bio || "We build accessible, human-centered digital experiences so every person can participate, create, and thrive.");
  const heroTagline = heroContent.tagline || tagline;


  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6">
        <LiquidEtherBackground />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="motion-reduce:scale-100 motion-reduce:transition-none"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="mb-6 motion-reduce:animate-none"
            >
              <span className="inline-flex flex-wrap items-center gap-2 rounded-full border border-border/50 bg-surface-1/50 px-3 py-1 text-[clamp(0.85rem,3.2vw,0.95rem)] text-muted-foreground backdrop-blur-md whitespace-normal">
                <Sparkles className="h-4 w-4 text-primary" />
                {heroTagline}
              </span>
            </motion.div>

            <SplitText
              as="h1"
              text={[heroTitle, heroSubtitle].join("\n")}
              className="mb-6 text-[clamp(2.25rem,8vw,3.75rem)] font-bold leading-[1.1] break-words text-balance items-center"
            />

            <p className="mx-auto mb-8 max-w-2xl text-[clamp(1rem,3.4vw,1.15rem)] text-muted-foreground leading-relaxed text-balance text-center">
              {heroDescription}
            </p>

            <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Link to="/portfolio" className="w-full sm:w-auto">
                <Button variant="hero" size="lg" className="group w-full">
                  Projects
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button variant="glass" size="lg" className="w-full">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 motion-reduce:animate-none"
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-border/50 p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-primary motion-reduce:animate-none"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Work Preview */}
      <section className="bg-gradient-to-b from-surface-0 to-surface-1/20 py-16 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <h2 className="mb-4 text-[clamp(1.85rem,6vw,3.25rem)] font-bold leading-tight text-balance">
                Featured <span className="bg-gradient-primary bg-clip-text text-transparent">Works</span>
              </h2>
              <p className="mx-auto max-w-2xl text-[clamp(1rem,3.4vw,1.15rem)] text-muted-foreground leading-relaxed text-balance">
                A curated selection of recent projects blending artistry with technology
              </p>
            </div>
          </SectionReveal>

          <ErrorBoundary>
            {artworksLoading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <ArtworkSkeleton key={i} />
                ))}
              </div>
            ) : featuredArtworks && featuredArtworks.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {featuredArtworks.slice(0, 3).map((artwork, index) => (
                  <SectionReveal key={artwork.id} delay={index * 0.1}>
                    <Link to={`/art/${artwork.slug}`} className="block">
                      <PixelCard
                        title={artwork.title}
                        imageUrl={artwork.cover_url}
                      />
                    </Link>
                  </SectionReveal>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {featuredDisciplines.map((item, index) => {
                  const IconComponent = ICON_MAP[item.icon];
                  return (
                    <SectionReveal key={index} delay={index * 0.1}>
                      <SpotlightCard className="bg-surface-3/90 p-6 sm:p-8">
                        <div className="flex flex-col gap-3 text-left sm:gap-4">
                          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            {IconComponent && <IconComponent className="h-7 w-7" />}
                          </div>
                          <div>
                            <h3 className="mb-1 text-[clamp(1.25rem,4.5vw,1.75rem)] font-bold leading-snug text-balance">
                              {item.title}
                            </h3>
                            <p className="text-[clamp(1rem,3.2vw,1.1rem)] text-muted-foreground leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </SpotlightCard>
                    </SectionReveal>
                  );
                })}
              </div>
            )}
          </ErrorBoundary>

          <SectionReveal delay={0.3}>
            <div className="mt-12 text-center">
              <Link to="/portfolio">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View All Work
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;