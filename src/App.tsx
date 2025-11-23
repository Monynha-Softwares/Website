import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Navigation } from "./components/Navigation";
import { ScrollToTop } from "./components/ScrollToTop";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import ArtworkDetail from "./pages/ArtworkDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Repositories from "./pages/Repositories";
import RepositoryDetail from "./pages/RepositoryDetail";
import Thoughts from "./pages/Thoughts"; // Import the new Thoughts page
import ThoughtDetail from "./pages/ThoughtDetail"; // Import the new ThoughtDetail page
import Auth from "./pages/Auth";
import Dashboard from "./pages/admin/Dashboard";
import ArtworksManager from "./pages/admin/ArtworksManager";
import ExhibitionsManager from "./pages/admin/ExhibitionsManager";
import MessagesManager from "./pages/admin/MessagesManager";
import SettingsManager from "./pages/admin/SettingsManager";
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
            <Route path="/thoughts" element={<Thoughts />} /> {/* New Thoughts Route */}
            <Route path="/thoughts/:slug" element={<ThoughtDetail />} /> {/* New Thought Detail Route */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/artworks" element={<ArtworksManager />} />
            <Route path="/admin/exhibitions" element={<ExhibitionsManager />} />
            <Route path="/admin/messages" element={<MessagesManager />} />
            <Route path="/admin/settings" element={<SettingsManager />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;