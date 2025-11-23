import { useEffect, useState } from "react";
import { SectionReveal } from "@/components/SectionReveal";
import { useRepositories } from "@/hooks/useRepositories";
import { RepositoryList } from "@/components/repositories/RepositoryList";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

type OwnerFilter = 'all' | 'Monynha-Softwares' | 'marcelo-m7';

const Repositories = () => {
  const [selectedOwner, setSelectedOwner] = useState<OwnerFilter>('all');
  const { data: repositories = [], isLoading, error } = useRepositories({ owner: selectedOwner });

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

        {/* Owner Filters */}
        <SectionReveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Button
              variant={selectedOwner === 'all' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedOwner('all')}
              className="transition-all motion-reduce:transition-none"
            >
              All Repositories
            </Button>
            <Button
              variant={selectedOwner === 'Monynha-Softwares' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedOwner('Monynha-Softwares')}
              className="transition-all motion-reduce:transition-none"
            >
              Monynha Softwares
            </Button>
            <Button
              variant={selectedOwner === 'marcelo-m7' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedOwner('marcelo-m7')}
              className="transition-all motion-reduce:transition-none"
            >
              Marcelo M7
            </Button>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
};

export default Repositories;