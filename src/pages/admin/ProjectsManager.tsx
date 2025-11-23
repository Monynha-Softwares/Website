import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import type { Project, ContentStatus } from "@/integrations/supabase/interfaces";
import { useProjects } from "@/hooks/useProjects"; // Import useProjects hook

const ProjectsManager = () => {
  const { isAdmin, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const { data: projects, isLoading: projectsLoading } = useProjects({}); // Fetch all projects

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      toast.success("Project deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete project");
    },
  });

  if (isLoading || projectsLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-0 to-surface-1 px-4 pt-24 pb-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link to="/admin" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold">Manage Projects</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingProject(null)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProject ? "Edit" : "Add"} Project</DialogTitle>
              </DialogHeader>
              <ProjectForm
                project={editingProject}
                onSuccess={() => {
                  setIsDialogOpen(false);
                  setEditingProject(null);
                  queryClient.invalidateQueries({ queryKey: ["projects"] });
                  queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {projects?.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  {project.thumbnail && (
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{project.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">Slug: {project.slug}</p>
                        <p className="text-xs text-muted-foreground mt-1">Category: {project.category} • Year: {project.year}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingProject(project);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (confirm(`Delete project "${project.name}"?`)) {
                              deleteMutation.mutate(project.id);
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ProjectFormProps {
  project: Project | null;
  onSuccess: () => void;
}

const ProjectForm = ({ project, onSuccess }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    name: project?.name || "",
    slug: project?.slug || "",
    summary: project?.summary || "",
    full_description: project?.full_description || "",
    category: project?.category || "",
    stack: project?.stack?.join(", ") || "",
    url: project?.url || "",
    domain: project?.domain || "",
    repo_url: project?.repo_url || "",
    thumbnail: project?.thumbnail || "",
    status: project?.status || "draft",
    visibility: project?.visibility || "Public",
    year: project?.year?.toString() || "",
  });

  const mutation = useMutation<void, Error, typeof formData>({
    mutationFn: async (data: typeof formData) => {
      const payload: Omit<Project, "id" | "created_at" | "updated_at"> = {
        name: data.name,
        slug: data.slug,
        summary: data.summary,
        full_description: data.full_description || null,
        category: data.category,
        stack: data.stack.split(",").map(s => s.trim()).filter(s => s.length > 0),
        url: data.url || null,
        domain: data.domain || null,
        repo_url: data.repo_url || null,
        thumbnail: data.thumbnail,
        status: data.status as ContentStatus,
        visibility: data.visibility || null,
        year: data.year ? parseInt(data.year) : null,
      };

      if (project) {
        const { error } = await supabase
          .from("projects")
          .update(payload)
          .eq("id", project.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert([payload]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(`Project ${project ? "updated" : "created"} successfully`);
      onSuccess();
    },
    onError: (err) => {
      toast.error(`Failed to ${project ? "update" : "create"} project: ${err.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Project Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          value={formData.summary}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          rows={3}
          required
        />
      </div>

      <div>
        <Label htmlFor="full_description">Full Description</Label>
        <Textarea
          id="full_description"
          value={formData.full_description}
          onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
          rows={6}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="stack">Tech Stack (comma-separated)</Label>
        <Input
          id="stack"
          value={formData.stack}
          onChange={(e) => setFormData({ ...formData, stack: e.target.value })}
          placeholder="e.g., React, Tailwind, Supabase"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="url">Live URL</Label>
          <Input
            id="url"
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            placeholder="https://example.com"
          />
        </div>
        <div>
          <Label htmlFor="domain">Domain</Label>
          <Input
            id="domain"
            value={formData.domain}
            onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
            placeholder="example.com"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="repo_url">Repository URL</Label>
        <Input
          id="repo_url"
          type="url"
          value={formData.repo_url}
          onChange={(e) => setFormData({ ...formData, repo_url: e.target.value })}
          placeholder="https://github.com/user/repo"
        />
      </div>

      <div>
        <Label htmlFor="thumbnail">Thumbnail Image</Label>
        <ImageUpload
          onUploadComplete={(url) => setFormData({ ...formData, thumbnail: url })}
          currentImage={formData.thumbnail}
          bucketName="general-media" // Assuming a general-media bucket for project thumbnails
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as ContentStatus })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="visibility">Visibility</Label>
          <Select value={formData.visibility} onValueChange={(value) => setFormData({ ...formData, visibility: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Public">Public</SelectItem>
              <SelectItem value="Private">Private</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Saving..." : project ? "Update Project" : "Create Project"}
      </Button>
    </form>
  );
};

export default ProjectsManager;