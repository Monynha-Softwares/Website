import { Link } from "react-router-dom";
import { Star, GitFork, Link as LinkIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { PixelCard } from "@/components/reactbits/PixelCard";
import { SectionReveal } from "@/components/SectionReveal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Repository } from "@/hooks/useRepositories";
import { cn } from "@/lib/utils";

interface RepositoryListProps {
  repositories: Repository[];
  isLoading: boolean;
  error: Error | null;
}

export const RepositoryList = ({ repositories, isLoading, error }: RepositoryListProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="w-full aspect-[4/3] rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-fluid-lg text-destructive">
          Error loading repositories: {error.message}
        </p>
      </div>
    );
  }

  if (repositories.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-fluid-lg text-muted-foreground">
          No repositories found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {repositories.map((repo, index) => (
        <SectionReveal key={repo.id} delay={index * 0.05}>
          <Link to={`/repositories/${repo.owner_login}/${repo.name}`} className="block h-full">
            <PixelCard
              imageUrl={`https://opengraph.githubassets.com/1/${repo.owner_login}/${repo.name}`} // GitHub OpenGraph image
              title={repo.name}
              subtitle={repo.description || "No description provided."}
              footer={
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <GitFork className="h-4 w-4 text-primary" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      {repo.stargazers_count}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Updated {formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true })}
                  </p>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              }
              className="h-full flex flex-col"
              noFocus // Disable PixelCard's internal hover as the whole card is a link
            >
              {/* Custom content for PixelCard children if needed, otherwise it will use title/subtitle/footer */}
            </PixelCard>
          </Link>
        </SectionReveal>
      ))}
    </div>
  );
};

RepositoryList.displayName = "RepositoryList";