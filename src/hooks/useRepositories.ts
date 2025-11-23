import { useQuery } from "@tanstack/react-query";

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  owner: {
    login: string;
  };
}

export interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  owner_login: string;
}

const fetchGitHubRepos = async (org: string): Promise<GitHubRepo[]> => {
  const response = await fetch(`https://api.github.com/users/${org}/repos?per_page=100`);
  if (!response.ok) {
    throw new Error(`Failed to fetch repositories from ${org}`);
  }
  return response.json();
};

interface UseRepositoriesOptions {
  owner?: "marcelo-m7" | "Monynha-Softwares" | "all";
}

export const useRepositories = (options?: UseRepositoriesOptions) => {
  return useQuery<Repository[], Error>({
    queryKey: ["githubRepositories", options?.owner],
    queryFn: async () => {
      let allRepos: Repository[] = [];

      if (!options?.owner || options.owner === "Monynha-Softwares" || options.owner === "all") {
        const monynhaRepos = await fetchGitHubRepos("Monynha-Softwares");
        allRepos.push(...monynhaRepos.map(repo => ({
          id: repo.id,
          name: repo.name,
          html_url: repo.html_url,
          description: repo.description,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          updated_at: repo.updated_at,
          owner_login: repo.owner.login,
        })));
      }

      if (!options?.owner || options.owner === "marcelo-m7" || options.owner === "all") {
        const marceloRepos = await fetchGitHubRepos("marcelo-m7");
        allRepos.push(...marceloRepos.map(repo => ({
          id: repo.id,
          name: repo.name,
          html_url: repo.html_url,
          description: repo.description,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          updated_at: repo.updated_at,
          owner_login: repo.owner.login,
        })));
      }

      // Filter out any repos that might not have essential fields (though GitHub API usually provides them)
      allRepos = allRepos.filter(repo => repo.name && repo.html_url);

      // Sort by updated_at descending
      allRepos.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

      return allRepos;
    },
    staleTime: Infinity, // Only refetch on hard reload
    gcTime: Infinity,
    retry: 2,
  });
};