import { useEffect } from "react";
import { SectionReveal } from "@/components/SectionReveal";
import { useRepositories } from "@/hooks/useRepositories";
import { RepositoryList } from "@/components/repositories/RepositoryList";

const Repositories = () => {
  const { data: repositories = [], isLoading, error } = useRepositories();

  useEffect(() => {
    document.title = "Repositories • Monynha Softwares";
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden pt-24 pb-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 sm:px-6">
        {/* Header */}
        <SectionReveal>
          <div className="mb-10 text-center">
            <h1 className="mb-4 text-[clamp(2rem,7vw,3.5rem)] font-bold leading-tight text-balance">
              Open Source <span className="bg-gradient-primary bg-clip-text text-transparent">Repositories</span>
            </h1>
            <p className="mx-auto max-w-2xl text-[clamp(1rem,3.4vw,1.15rem)] text-muted-foreground leading-relaxed text-balance">
              Projects maintained by Monynha Softwares & Marcelo M7
            </p>
          </div>
        </SectionReveal>

        {/* Repository List */}
        <RepositoryList repositories={repositories} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};

export default Repositories;