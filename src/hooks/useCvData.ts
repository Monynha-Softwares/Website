import { useQuery } from "@tanstack/react-query";

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
  };
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