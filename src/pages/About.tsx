import { SectionReveal } from "@/components/SectionReveal";
import { Button } from "@/components/ui/button";
import { Instagram, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { TextType } from "@/components/reactbits/TextType";
import { StepperTimeline } from "@/components/reactbits/StepperTimeline";
import { useExhibitions } from "@/hooks/useExhibitions";
import { TimelineSkeleton } from "@/components/TimelineSkeleton";
import { Badge } from "@/components/ui/badge";
import { PixelCard } from "@/components/reactbits/PixelCard";
import { useProfile } from "@/hooks/useProfile";
import { useExperiences } from "@/hooks/useExperiences"; // Updated import
import { useSkills } from "@/hooks/useSkills";
import { useProjects } from "@/hooks/useProjects";
import { useSiteSetting } from "@/hooks/useSettings";

const About = () => {
  const { data: exhibitions = [], isLoading: exhibitionsLoading, error: exhibitionsError } = useExhibitions();
  const { data: profile, isLoading: profileLoading, error: profileError } = useProfile();
  const { data: experiences = [], isLoading: experienceLoading, error: experienceError } = useExperiences(); // Updated hook usage
  const { data: skills = [], isLoading: skillsLoading, error: skillsError } = useSkills();
  const { data: projects = [], isLoading: projectsLoading, error: projectsError } = useProjects({ limit: 6 });
  
  const contactInfo = useSiteSetting<{ email?: string; instagram?: string; availability?: string; note?: string }>('contact_info', {});
  const siteTitle = useSiteSetting<string>('site_title', 'Monynha Softwares');
  const siteDescription = useSiteSetting<string>('site_description', '');

  const isLoading = exhibitionsLoading || profileLoading || experienceLoading || skillsLoading || projectsLoading;
  const error = exhibitionsError || profileError || experienceError || skillsError || projectsError;

  const experienceTimeline = experiences.map((exp) => ({ // Updated to use 'experiences'
    title: exp.role,
    subtitle: `${exp.organization} · ${exp.location} (${exp.start_date} - ${exp.end_date || "Present"})`,
    description: exp.highlights?.join(" • ") || "",
    indicator: exp.start_date.split('-')[0],
  })) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 pb-16">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Error Loading Content</h2>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden pt-24 pb-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <SectionReveal>
          <div className="mb-14 text-center">
            <h1 className="mb-4 text-[clamp(2rem,7vw,3.5rem)] font-bold leading-tight text-balance">
              Our <span className="bg-gradient-primary bg-clip-text text-transparent">Story</span>
            </h1>
            <p className="mx-auto max-w-2xl text-[clamp(1rem,3.4vw,1.15rem)] text-muted-foreground leading-relaxed text-balance">
              Monynha Softwares was born from a collective dream: to prove that technology and affection can coexist, that innovation also comes from the margins, and that the web can be a space of welcoming, creation, and resistance.
            </p>
          </div>
        </SectionReveal>

        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Bio */}
          <SectionReveal delay={0.1}>
            <div className="space-y-6">
              <h2 className="text-[clamp(1.75rem,6vw,2.75rem)] font-bold leading-tight">Meet {profile?.full_name || siteTitle || "Our Founder"}</h2>
              <TextType
                className="text-[clamp(1rem,3.3vw,1.1rem)] leading-relaxed"
                text={profile?.bio ?? siteDescription ?? "Loading biography..."}
              />
              <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:flex-wrap">
                {contactInfo?.instagram && (
                  <a
                    href={contactInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      <Instagram className="mr-2 h-5 w-5" />
                      Follow Marcelo
                    </Button>
                  </a>
                )}
                {contactInfo?.email && (
                  <a href={`mailto:${contactInfo.email}`}>
                    <Button variant="hero" size="lg" className="w-full sm:w-auto">
                      <Mail className="mr-2 h-5 w-5" />
                      Email Marcelo
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </SectionReveal>

          {/* Profile Image */}
          <SectionReveal delay={0.2}>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl border border-border bg-gradient-mesh shadow-lg">
                <img
                  src={profile?.avatar_url || "/avatar.jpg"}
                  alt={`${profile?.full_name || "Founder"}, Founder of Monynha Softwares`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
            </div>
          </SectionReveal>
        </div>

        {/* Experience Timeline */}
        {experienceTimeline.length > 0 && (
          <SectionReveal delay={0.3}>
            <div className="mx-auto max-w-3xl mb-20">
              <h2 className="mb-8 text-center text-[clamp(1.75rem,6vw,2.75rem)] font-bold leading-tight">
                Professional <span className="bg-gradient-primary bg-clip-text text-transparent">Experience</span>
              </h2>
              <StepperTimeline steps={experienceTimeline} />
            </div>
          </SectionReveal>
        )}

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <SectionReveal delay={0.4}>
            <div className="mx-auto max-w-4xl mb-20">
              <h2 className="mb-8 text-center text-[clamp(1.75rem,6vw,2.75rem)] font-bold leading-tight">
                Technical <span className="bg-gradient-primary bg-clip-text text-transparent">Skills</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-4 py-2 text-sm font-medium rounded-full"
                  >
                    {skill.name} ({skill.level})
                  </Badge>
                ))}
              </div>
            </div>
          </SectionReveal>
        )}

        {/* Company Projects Section */}
        {projects && projects.length > 0 && (
          <SectionReveal delay={0.5}>
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-8 text-center text-[clamp(1.75rem,6vw,2.75rem)] font-bold leading-tight">
                Our <span className="bg-gradient-primary bg-clip-text text-transparent">Projects</span>
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                  <SectionReveal key={project.slug} delay={index * 0.05}>
                    <Link to={project.url || project.repo_url || "#"} target="_blank" rel="noopener noreferrer" className="block h-full">
                      <PixelCard
                        imageUrl={project.thumbnail || "/brand/placeholder.svg"}
                        title={project.name}
                        subtitle={project.summary || "No summary provided."}
                        footer={
                          <div className="flex flex-col gap-2">
                            <div className="flex flex-wrap gap-2">
                              {project.stack?.map((tech, techIndex) => (
                                <Badge key={techIndex} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {project.status} • {project.year}
                            </p>
                            {project.url && (
                              <Button variant="outline" size="sm" className="w-full mt-2">
                                View Live <ArrowRight className="h-4 w-4 ml-2" />
                              </Button>
                            )}
                          </div>
                        }
                        className="h-full flex flex-col"
                        noFocus
                      />
                    </Link>
                  </SectionReveal>
                ))}
              </div>
              {projects.length > 6 && (
                <div className="mt-12 text-center">
                  <Link to="/repositories">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      View All Projects
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </SectionReveal>
        )}
      </div>
    </div>
  );
};

export default About;