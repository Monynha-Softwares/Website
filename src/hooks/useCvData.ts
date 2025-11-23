import { useQuery } from "@tanstack/react-query";

interface Project {
  slug: string;
  name: string;
  summary: string;
  fullDescription: string;
  stack: string[];
  url: string | null;
  domain: string | null;
  repoUrl: string | null;
  thumbnail: string;
  category: string;
  status: string;
  visibility: string;
  year: number;
}

interface CvData {
  profile: {
    name: string;
    headline: string;
    location: string;
    bio: string;
    avatar: string;
  };
  links: {
    github: string;
    org: string;
    site: string;
    linkedin: string;
    email: string;
    instagram: string;
  };
  projects: Project[];
  experience: Array<{
    role: string;
    org: string;
    start: string;
    end: string | null;
    location: string;
    highlights: string[];
  }>;
  skills: Array<{
    name: string;
    category: string;
    level: string;
  }>;
  series: Array<{
    slug: string;
    title: string;
    description: string;
    year: number;
    works: string[];
  }>;
  artworks: Array<{
    slug: string;
    title: string;
    media: string[];
    year: number;
    materials: string[];
    description: string;
    url3d: string;
  }>;
  thoughts: Array<{
    slug: string;
    date: string;
    tags: string[];
    title: string;
    excerpt: string;
    body: string;
  }>;
  contact: {
    email: string;
    availability: string;
    note: string;
    successMessage: string;
    errorMessage: string;
  };
}

export const useCvData = () => {
  return useQuery<CvData>({
    queryKey: ["cvData"],
    queryFn: async () => {
      const response = await fetch("/data/cv.json");
      if (!response.ok) {
        throw new Error("Failed to fetch CV data");
      }
      return response.json();
    },
    staleTime: Infinity, // CV data is static, so it can be cached indefinitely
    gcTime: Infinity,
  });
};