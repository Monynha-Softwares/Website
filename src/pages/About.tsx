import { SectionReveal } from "@/components/SectionReveal";
import { Button } from "@/components/ui/button";
import { Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { TextType } from "@/components/reactbits/TextType";
import { StepperTimeline } from "@/components/reactbits/StepperTimeline";
import { useExhibitions } from "@/hooks/useExhibitions";
import { TimelineSkeleton } from "@/components/TimelineSkeleton";

const About = () => {
  const { data: exhibitions = [], isLoading, error } = useExhibitions();

  const timeline = exhibitions.map((exhibition) => ({
    title: exhibition.title,
    subtitle: `${exhibition.year} · ${exhibition.location || ""}`,
    description: exhibition.description || "",
    indicator: exhibition.year.toString(),
  }));

  return (
    <div className="min-h-screen overflow-x-hidden pt-24 pb-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <SectionReveal>
          <div className="mb-14 text-center">
            <h1 className="mb-4 text-[clamp(2rem,7vw,3.5rem)] font-bold leading-tight text-balance">
              About <span className="bg-gradient-primary bg-clip-text text-transparent">Monynha</span>
            </h1>
            <p className="mx-auto max-w-2xl text-[clamp(1rem,3.4vw,1.15rem)] text-muted-foreground leading-relaxed text-balance">
              We build inclusive, reliable software so every person can access technology with confidence.
            </p>
          </div>
        </SectionReveal>

        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Bio */}
          <SectionReveal delay={0.1}>
            <div className="space-y-6">
              <h2 className="text-[clamp(1.75rem,6vw,2.75rem)] font-bold leading-tight">Monynha Softwares</h2>
              <TextType
                className="text-[clamp(1rem,3.3vw,1.1rem)] leading-relaxed"
                text="Monynha Softwares is a multidisciplinary studio crafting accessible products, immersive interfaces, and thoughtful digital services for organizations that care about inclusion."
              />
              <TextType
                className="text-[clamp(1rem,3.3vw,1.1rem)] leading-relaxed"
                delay={1200}
                text="Our team blends research, design, and engineering to deliver software that feels effortless to use—whether it's a public-facing experience or a mission-critical platform."
              />
              <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:flex-wrap">
                <a
                  href="https://www.instagram.com/monynhasoftwares/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <Instagram className="mr-2 h-5 w-5" />
                    Follow Monynha
                  </Button>
                </a>
                <Link to="/contact">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto">
                    <Mail className="mr-2 h-5 w-5" />
                    Talk with Us
                  </Button>
                </Link>
              </div>
            </div>
          </SectionReveal>

          {/* Profile Image */}
          <SectionReveal delay={0.2}>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl border border-border bg-gradient-mesh shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop"
                  alt="Monynha Softwares team at work"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
            </div>
          </SectionReveal>
        </div>

        {/* Timeline */}
        <SectionReveal delay={0.3}>
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-[clamp(1.75rem,6vw,2.75rem)] font-bold leading-tight">
              Milestones & <span className="bg-gradient-primary bg-clip-text text-transparent">Timeline</span>
            </h2>
            {isLoading ? (
              <TimelineSkeleton />
            ) : error ? (
              <p className="text-center text-muted-foreground">Error loading exhibitions</p>
            ) : timeline.length > 0 ? (
              <StepperTimeline steps={timeline} />
            ) : (
              <p className="text-center text-muted-foreground">No exhibitions to display yet.</p>
            )}
          </div>
        </SectionReveal>
      </div>
    </div>
  );
};

export default About;
