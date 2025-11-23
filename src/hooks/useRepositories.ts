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

export const useRepositories = () => {
  return useQuery<Repository[], Error>({
    queryKey: ["githubRepositories"],
    queryFn: async () => {
      const [monynhaRepos, marceloRepos] = await Promise.all([
        fetchGitHubRepos("Monynha-Softwares"),
        fetchGitHubRepos("marcelo-m7"),
      ]);

      const allRepos: Repository[] = [...monynhaRepos, ...marceloRepos]
        .filter(repo => repo.name && repo.html_url) // Ensure essential fields exist
        .map(repo => ({
          id: repo.id,
          name: repo.name,
          html_url: repo.html_url,
          description: repo.description,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          updated_at: repo.updated_at,
          owner_login: repo.owner.login,
        }));

      // Sort by updated_at descending
      allRepos.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

      return allRepos;
    },
    staleTime: Infinity, // Only refetch on hard reload
    gcTime: Infinity,
    retry: 2,
  });
};