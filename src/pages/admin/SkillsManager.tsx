import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import type { Skill } from "@/integrations/supabase/supabase.types";

const SkillsManager = () => {
  const { isAdmin, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const { data: skills, isLoading: skillsLoading } = useQuery<Skill[], Error>({
    queryKey: ["admin-skills"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("display_order", { ascending: true })
        .order("name", { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
  });

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("skills").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-skills"] });
      queryClient.invalidateQueries({ queryKey: ["skills"] }); // Invalidate public cache
      toast.success("Skill deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete skill");
    },
  });

  if (isLoading || skillsLoading) {
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
            <h1 className="text-4xl font-bold">Manage Skills</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingSkill(null)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Skill
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingSkill ? "Edit" : "Add"} Skill</DialogTitle>
              </DialogHeader>
              <SkillForm
                skill={editingSkill}
                onSuccess={() => {
                  setIsDialogOpen(false);
                  setEditingSkill(null);
                  queryClient.invalidateQueries({ queryKey: ["admin-skills"] });
                  queryClient.invalidateQueries({ queryKey: ["skills"] });
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {skills?.map((skill) => (
            <Card key={skill.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{skill.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Category: {skill.category} • Level: {skill.level}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingSkill(skill);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        if (confirm(`Delete skill "${skill.name}"?`)) {
                          deleteMutation.mutate(skill.id);
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

interface SkillFormProps {
  skill: Skill | null;
  onSuccess: () => void;
}

const SkillForm = ({ skill, onSuccess }: SkillFormProps) => {
  const [formData, setFormData] = useState({
    name: skill?.name || "",
    category: skill?.category || "",
    level: skill?.level || "Intermediate",
    display_order: skill?.display_order || 0,
  });

  const mutation = useMutation<void, Error, typeof formData>({
    mutationFn: async (data: typeof formData) => {
      const payload: Omit<Skill, "id" | "created_at" | "updated_at"> = {
        name: data.name,
        category: data.category,
        level: data.level,
        display_order: data.display_order,
      };

      if (skill) {
        const { error } = await supabase
          .from("skills")
          .update(payload)
          .eq("id", skill.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("skills").insert([payload]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(`Skill ${skill ? "updated" : "created"} successfully`);
      onSuccess();
    },
    onError: (err) => {
      toast.error(`Failed to ${skill ? "update" : "create"} skill: ${err.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Skill Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

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
        <Label htmlFor="level">Level</Label>
        <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
            <SelectItem value="Expert">Expert</SelectItem>
          </SelectContent>
        </Select>
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

      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Saving..." : skill ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default SkillsManager;