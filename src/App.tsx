import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Navigation } from "./components/Navigation";
import { ScrollToTop } from "./components/ScrollToTop";
import { Footer } from "./components/layout/Footer";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import ArtworkDetail from "./pages/ArtworkDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Repositories from "./pages/Repositories";
import RepositoryDetail from "./pages/RepositoryDetail";
import Thoughts from "./pages/Thoughts";
import ThoughtDetail from "./pages/ThoughtDetail";
import LegalPageDetail from "./pages/LegalPageDetail";
import Auth from "./pages/Auth";
import Dashboard from "./pages/admin/Dashboard";
import ArtworksManager from "./pages/admin/ArtworksManager";
import ExhibitionsManager from "./pages/admin/ExhibitionsManager";
import MessagesManager from "./pages/admin/MessagesManager";
import SettingsManager from "./pages/admin/SettingsManager";
import ProjectsManager from "./pages/admin/ProjectsManager";
import ExperiencesManager from "./pages/admin/ExperiencesManager";
import SkillsManager from "./pages/admin/SkillsManager";
import BlogPostsManager from "./pages/admin/BlogPostsManager";
import LegalPagesManager from "./pages/admin/LegalPagesManager"; // Import LegalPagesManager
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/art/:slug" element={<ArtworkDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/repositories" element={<Repositories />} />
            <Route path="/repositories/:owner/:repoName" element={<RepositoryDetail />} />
            <Route path="/thoughts" element={<Thoughts />} />
            <Route path="/thoughts/:slug" element={<ThoughtDetail />} />
            <Route path="/legal/:slug" element={<LegalPageDetail />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/artworks" element={<ArtworksManager />} />
            <Route path="/admin/exhibitions" element={<ExhibitionsManager />} />
            <Route path="/admin/messages" element={<MessagesManager />} />
            <Route path="/admin/settings" element={<SettingsManager />} />
            <Route path="/admin/projects" element={<ProjectsManager />} />
            <Route path="/admin/experiences" element={<ExperiencesManager />} />
            <Route path="/admin/skills" element={<SkillsManager />} />
            <Route path="/admin/blog-posts" element={<BlogPostsManager />} />
            <Route path="/admin/legal-pages" element={<LegalPagesManager />} /> {/* New Legal Pages Manager Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;