import { useQuery } from "@tanstack/react-query";

interface GitHubRepoDetail {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  created_at: string;
  homepage: string | null; // Added homepage field
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

export interface RepositoryDetailData {
  id: number;
  name: string;
  fullName: string;
  htmlUrl: string;
  description: string | null;
  language: string | null;
  stargazersCount: number;
  forksCount: number;
  openIssuesCount: number;
  updatedAt: string;
  createdAt: string;
  homepageUrl: string | null; // Added homepageUrl to the processed data
  ownerLogin: string;
  ownerAvatarUrl: string;
  ownerHtmlUrl: string;
}

const fetchGitHubRepoDetail = async (owner: string, repoName: string): Promise<GitHubRepoDetail> => {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repoName}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch repository details for ${owner}/${repoName}`);
  }
  return response.json();
};

export const useRepository = (owner: string, repoName: string) => {
  return useQuery<RepositoryDetailData, Error>({
    queryKey: ["githubRepository", owner, repoName],
    queryFn: async () => {
      const repo = await fetchGitHubRepoDetail(owner, repoName);
      return {
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        htmlUrl: repo.html_url,
        description: repo.description,
        language: repo.language,
        stargazersCount: repo.stargazers_count,
        forksCount: repo.forks_count,
        openIssuesCount: repo.open_issues_count,
        updatedAt: repo.updated_at,
        createdAt: repo.created_at,
        homepageUrl: repo.homepage, // Map homepage from API to homepageUrl
        ownerLogin: repo.owner.login,
        ownerAvatarUrl: repo.owner.avatar_url,
        ownerHtmlUrl: repo.owner.html_url,
      };
    },
    enabled: !!owner && !!repoName,
    staleTime: Infinity, // Only refetch on hard reload
    gcTime: Infinity,
    retry: 2,
  });
};