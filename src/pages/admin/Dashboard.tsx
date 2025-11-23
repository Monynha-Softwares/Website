import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Calendar, Mail, Settings, ArrowRight, BookText, Code, Briefcase, LayoutGrid } from "lucide-react"; // Added new icons

const Dashboard = () => {
  const { isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const adminSections = [
    {
      title: "Artworks",
      description: "Manage your portfolio pieces",
      icon: Palette,
      href: "/admin/artworks",
      color: "text-purple-500",
    },
    {
      title: "Projects",
      description: "Showcase your software projects",
      icon: Code,
      href: "/admin/projects",
      color: "text-cyan-500",
    },
    {
      title: "Exhibitions",
      description: "Update your timeline and events",
      icon: Calendar,
      href: "/admin/exhibitions",
      color: "text-blue-500",
    },
    {
      title: "Experiences",
      description: "Manage professional experience",
      icon: Briefcase,
      href: "/admin/experiences",
      color: "text-green-500",
    },
    {
      title: "Skills",
      description: "Define your technical skills",
      icon: LayoutGrid,
      href: "/admin/skills",
      color: "text-yellow-500",
    },
    {
      title: "Blog Posts",
      description: "Create and manage blog content",
      icon: BookText,
      href: "/admin/blog-posts",
      color: "text-red-500",
    },
    {
      title: "Legal Pages",
      description: "Manage privacy policy, terms, etc.",
      icon: BookText,
      href: "/admin/legal-pages",
      color: "text-orange-500",
    },
    {
      title: "Contact Messages",
      description: "View and respond to inquiries",
      icon: Mail,
      href: "/admin/messages",
      color: "text-pink-500",
    },
    {
      title: "Settings",
      description: "Configure site settings",
      icon: Settings,
      href: "/admin/settings",
      color: "text-gray-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-0 to-surface-1 px-4 pt-24 pb-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your portfolio content and settings
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {adminSections.map((section) => (
            <Card key={section.href} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg bg-surface-2 p-3 ${section.color}`}>
                    <section.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link to={section.href}>
                  <Button variant="outline" className="w-full group-hover:border-primary">
                    Manage
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Backend Access</CardTitle>
            <CardDescription>
              Need advanced database operations or direct table editing?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Access your backend dashboard for advanced operations, database management, authentication settings, and more.
            </p>
            <p className="text-xs text-muted-foreground/60 mb-4">
              This will open the backend dashboard where you can manage your database tables, authentication, storage, and edge functions (e.g. Supabase dashboard).
            </p>
            <a href="https://supabase.com/dashboard/project/hkkgfebdhevcdurpcdgu" target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                Go to Supabase Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;