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
              <h2 className="text-[clamp(1.75rem,6vw,2.75rem)] font-bold leading-tight">Meet Marcelo Santos</h2>
              <TextType
                className="text-[clamp(1rem,3.3vw,1.1rem)] leading-relaxed"
                text="Based between Brazil and Portugal, Marcelo is a full-stack developer, DevOps enthusiast and open-source evangelist who believes that technology should serve everyone. He founded Monynha Softwares to bring together code, community and identity, designing products that are inclusive, accessible and grounded in real lives. Outside the code, he mentors peripheral developers, experiments with digital art and keeps an eye on the next big leap in accessibility. He lives by the creed: “technology + diversity + art = magic ✨”"
              />
              <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:flex-wrap">
                <a
                  href="https://www.instagram.com/marcelo.santos.027/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <Instagram className="mr-2 h-5 w-5" />
                    Follow Marcelo
                  </Button>
                </a>
                <a href="mailto:marcelo@monynha.com">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto">
                    <Mail className="mr-2 h-5 w-5" />
                    Email Marcelo
                  </Button>
                </a>
              </div>
            </div>
          </SectionReveal>

          {/* Profile Image */}
          <SectionReveal delay={0.2}>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl border border-border bg-gradient-mesh shadow-lg">
                <img
                  src="/avatar.jpg"
                  alt="Marcelo Santos, Founder of Monynha Softwares"
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