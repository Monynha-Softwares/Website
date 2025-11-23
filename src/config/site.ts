import { Palette, Eye, Sparkles, type LucideIcon } from "lucide-react";

// --- Navigation Links ---
interface NavLink {
  href: string;
  label: string;
  accent: string; // CSS gradient string or color
}

export const defaultNavLinks: NavLink[] = [
  { href: "/", label: "Home", accent: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)" },
  { href: "/portfolio", label: "Portfolio", accent: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)" },
  { href: "/about", label: "About", accent: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)" },
  { href: "/contact", label: "Contact", accent: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)" },
  { href: "/repositories", label: "Repositories", accent: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)" },
];

// --- Featured Disciplines (for Home page) ---
interface FeaturedDiscipline {
  icon: keyof typeof ICON_MAP; // Use keyof typeof ICON_MAP for type safety
  title: string;
  desc: string;
}

export const ICON_MAP: { [key: string]: LucideIcon } = {
  Palette: Palette,
  Eye: Eye,
  Sparkles: Sparkles,
  // Add other icons as needed
};

export const defaultFeaturedDisciplines: FeaturedDiscipline[] = [
  { icon: "Palette", title: "Motion Design", desc: "Dynamic visual narratives" },
  { icon: "Eye", title: "3D Art", desc: "Immersive spatial experiences" },
  { icon: "Sparkles", title: "Interactive", desc: "Engaging digital installations" },
];

// --- Footer Links ---
interface FooterLink {
  name: string;
  href: string;
}

interface SiteLinks {
  ecosystem: FooterLink[];
  company: FooterLink[];
  legal: FooterLink[];
}

export const defaultFooterLinks: SiteLinks = {
  ecosystem: [
    { name: "Main Portal", href: "https://monynha.com" },
    { name: "Boteco Pro Platform", href: "https://boteco.pt" },
    { name: "Online Services Hub", href: "https://monynha.online" },
    { name: "Experimental Playground", href: "https://monynha.fun" },
    { name: "Developer & Tech Portal", "href": "https://monynha.tech" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/legal/privacy-policy" },
    { name: "Terms of Service", href: "/legal/terms-of-service" },
  ],
};