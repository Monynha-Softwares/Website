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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import type { LegalPage } from "@/integrations/supabase/interfaces";

const LegalPagesManager = () => {
  const { isAdmin, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLegalPage, setEditingLegalPage] = useState<LegalPage | null>(null);

  const { data: legalPages, isLoading: legalPagesLoading } = useQuery<LegalPage[], Error>({
    queryKey: ["admin-legal-pages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("legal_pages")
        .select("*")
        .order("title", { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
  });

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("legal_pages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-legal-pages"] });
      queryClient.invalidateQueries({ queryKey: ["legalPages"] }); // Invalidate public cache
      toast.success("Legal page deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete legal page");
    },
  });

  if (isLoading || legalPagesLoading) {
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
            <h1 className="text-4xl font-bold">Manage Legal Pages</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingLegalPage(null)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Legal Page
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingLegalPage ? "Edit" : "Add"} Legal Page</DialogTitle>
              </DialogHeader>
              <LegalPageForm
                legalPage={editingLegalPage}
                onSuccess={() => {
                  setIsDialogOpen(false);
                  setEditingLegalPage(null);
                  queryClient.invalidateQueries({ queryKey: ["admin-legal-pages"] });
                  queryClient.invalidateQueries({ queryKey: ["legalPages"] }); // Invalidate public cache
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {legalPages?.map((page) => (
            <Card key={page.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{page.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Slug: {page.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingLegalPage(page);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        if (confirm(`Delete legal page "${page.title}"?`)) {
                          deleteMutation.mutate(page.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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

interface LegalPageFormProps {
  legalPage: LegalPage | null;
  onSuccess: () => void;
}

const LegalPageForm = ({ legalPage, onSuccess }: LegalPageFormProps) => {
  const [formData, setFormData] = useState({
    title: legalPage?.title || "",
    slug: legalPage?.slug || "",
    content: legalPage?.content || "",
  });

  const mutation = useMutation<void, Error, typeof formData>({
    mutationFn: async (data: typeof formData) => {
      const payload: Omit<LegalPage, "id" | "created_at" | "updated_at"> = {
        title: data.title,
        slug: data.slug,
        content: data.content,
      };

      if (legalPage) {
        const { error } = await supabase
          .from("legal_pages")
          .update(payload)
          .eq("id", legalPage.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("legal_pages").insert([payload]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(`Legal page ${legalPage ? "updated" : "created"} successfully`);
      onSuccess();
    },
    onError: (err) => {
      toast.error(`Failed to ${legalPage ? "update" : "create"} legal page: ${err.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
        <Label htmlFor="content">Content (HTML/Markdown)</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={15}
          className="font-mono"
          required
        />
      </div>

      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Saving..." : legalPage ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default LegalPagesManager;