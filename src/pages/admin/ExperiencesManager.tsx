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
import type { Experience } from "@/integrations/supabase/supabase.types";
import { useExperiences } from "@/hooks/useExperiences";
import { AdminFormDialog } from "@/components/admin/AdminFormDialog"; // Import AdminFormDialog
import { useAdminForm } from "@/hooks/useAdminForm"; // Import useAdminForm

const ExperiencesManager = () => {
  const { isAdmin, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);

  const { data: experiences, isLoading: experiencesLoading } = useExperiences();

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("experiences").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-experiences"] });
      queryClient.invalidateQueries({ queryKey: ["experiences"] }); // Invalidate public cache
      toast.success("Experience entry deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete experience entry");
    },
  });

  if (isLoading || experiencesLoading) {
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
            <h1 className="text-4xl font-bold">Manage Experiences</h1>
          </div>
          <AdminFormDialog
            title="Experience"
            triggerLabel="Add Experience"
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onTriggerClick={() => setEditingExperience(null)}
            isEditing={!!editingExperience}
          >
            <ExperienceForm
              experience={editingExperience}
              onSuccess={() => {
                setIsDialogOpen(false);
                setEditingExperience(null);
                queryClient.invalidateQueries({ queryKey: ["admin-experiences"] });
                queryClient.invalidateQueries({ queryKey: ["experiences"] });
              }}
            />
          </AdminFormDialog>
        </div>

        <div className="grid gap-4">
          {experiences?.map((experience) => (
            <Card key={experience.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{experience.role} at {experience.organization}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {experience.location} • {experience.start_date} - {experience.end_date || "Present"}
                    </p>
                    {experience.highlights && experience.highlights.length > 0 && (
                      <ul className="list-disc list-inside text-xs text-muted-foreground mt-2">
                        {experience.highlights.map((highlight, idx) => (
                          <li key={idx}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingExperience(experience);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        if (confirm(`Delete experience "${experience.role}"?`)) {
                          deleteMutation.mutate(experience.id);
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

interface ExperienceFormProps {
  experience: Experience | null;
  onSuccess: () => void;
}

interface ExperienceFormData {
  role: string;
  organization: string;
  location: string;
  start_date: string;
  end_date: string;
  highlights: string;
  display_order: number;
}

const ExperienceForm = ({ experience, onSuccess }: ExperienceFormProps) => {
  const { formData, setFormData, handleSubmit, isPending } = useAdminForm<ExperienceFormData, "experiences">({
    tableName: "experiences",
    id: experience?.id,
    initialData: {
      role: experience?.role || "",
      organization: experience?.organization || "",
      location: experience?.location || "",
      start_date: experience?.start_date || "",
      end_date: experience?.end_date || "",
      highlights: experience?.highlights?.join("\n") || "",
      display_order: experience?.display_order || 0,
    },
    transformToPayload: (data) => ({
      role: data.role,
      organization: data.organization,
      location: data.location,
      start_date: data.start_date,
      end_date: data.end_date || null,
      highlights: data.highlights.split("\n").map(h => h.trim()).filter(h => h.length > 0),
      display_order: data.display_order,
    }),
    queryKeysToInvalidate: ["admin-experiences", "experiences"],
    onSuccessCallback: onSuccess,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="role">Role</Label>
        <Input
          id="role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="organization">Organization</Label>
        <Input
          id="organization"
          value={formData.organization}
          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="start_date">Start Date</Label>
          <Input
            id="start_date"
            type="date"
            value={formData.start_date}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="end_date">End Date (optional)</Label>
          <Input
            id="end_date"
            type="date"
            value={formData.end_date}
            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="highlights">Highlights (one per line)</Label>
        <Textarea
          id="highlights"
          value={formData.highlights}
          onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
          rows={5}
          placeholder="e.g., Led a team of 5 developers&#10;Implemented new features"
        />
      </div>

      <div>
        <Label htmlFor="display_order">Display Order</Label>
        <Input
          id="display_order"
          type="number"
          value={formData.display_order}
          onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
        />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : experience ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default ExperiencesManager;