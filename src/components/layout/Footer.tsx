import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useSiteSetting } from "@/hooks/useSettings";

interface FooterLink {
  name: string;
  href: string;
}

interface SiteLinks {
  ecosystem: FooterLink[];
  company: FooterLink[];
  legal: FooterLink[];
}

export const Footer = () => { // Added 'export' here
  const currentYear = new Date().getFullYear();
  const { data: blogPosts } = useBlogPosts();
  const showThoughtsLink = blogPosts && blogPosts.length > 0;

  const siteLinks = useSiteSetting<SiteLinks>('site_links', {
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
  });

  return (
    <footer className="bg-surface-0 py-16 sm:py-24 border-t border-border/70">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Logo */}
          <div className="col-span-full md:col-span-1 lg:col-span-2">
            <Link to="/" aria-label="Monynha Softwares home">
              <BrandLogo className="h-10 text-foreground" />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Inclusive technology for everyone. Built with pride, coffee and open-source.
            </p>
          </div>

          {/* Monynha Ecosystem */}
          <div className="col-span-1">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Monynha Ecosystem</h3>
            <nav className="flex flex-col space-y-3">
              {siteLinks.ecosystem.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "text-muted-foreground text-sm hover:text-primary transition-colors",
                    "hover:underline hover:underline-offset-4",
                  )}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Company</h3>
            <nav className="flex flex-col space-y-3">
              {siteLinks.company.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "text-muted-foreground text-sm hover:text-primary transition-colors",
                    "hover:underline hover:underline-offset-4",
                  )}
                >
                  {link.name}
                </Link>
              ))}
              {showThoughtsLink && (
                <Link
                  to="/thoughts"
                  className={cn(
                    "text-muted-foreground text-sm hover:text-primary transition-colors",
                    "hover:underline hover:underline-offset-4",
                  )}
                >
                  Thoughts
                </Link>
              )}
            </nav>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Legal</h3>
            <nav className="flex flex-col space-y-3">
              {siteLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "text-muted-foreground text-sm hover:text-primary transition-colors",
                    "hover:underline hover:underline-offset-4",
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Monynha Softwares. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";