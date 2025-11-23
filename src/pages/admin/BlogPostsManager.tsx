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
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import type { BlogPost, ContentStatus } from "@/integrations/supabase/supabase.types";
import { AdminFormDialog } from "@/components/admin/AdminFormDialog"; // Import AdminFormDialog

const BlogPostsManager = () => {
  const { isAdmin, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);

  const { data: blogPosts, isLoading: blogPostsLoading } = useQuery<BlogPost[], Error>({
    queryKey: ["admin-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("date", { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] }); // Invalidate public cache
      toast.success("Blog post deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete blog post");
    },
  });

  if (isLoading || blogPostsLoading) {
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
            <h1 className="text-4xl font-bold">Manage Blog Posts</h1>
          </div>
          <AdminFormDialog
            title="Blog Post"
            triggerLabel="Add Blog Post"
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onTriggerClick={() => setEditingBlogPost(null)}
            isEditing={!!editingBlogPost}
          >
            <BlogPostForm
              blogPost={editingBlogPost}
              onSuccess={() => {
                setIsDialogOpen(false);
                setEditingBlogPost(null);
                queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
                queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
              }}
            />
          </AdminFormDialog>
        </div>

        <div className="grid gap-4">
          {blogPosts?.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{post.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Slug: {post.slug}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(post.date), "PPP")} • {post.author}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {post.tags?.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      <Badge 
                        variant={
                          post.status === "published" ? "default" :
                          post.status === "draft" ? "secondary" : "outline"
                        }
                      >
                        {post.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingBlogPost(post);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        if (confirm(`Delete blog post "${post.title}"?`)) {
                          deleteMutation.mutate(post.id);
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

interface BlogPostFormProps {
  blogPost: BlogPost | null;
  onSuccess: () => void;
}

const BlogPostForm = ({ blogPost, onSuccess }: BlogPostFormProps) => {
  const [formData, setFormData] = useState({
    title: blogPost?.title || "",
    slug: blogPost?.slug || "",
    date: blogPost?.date ? format(new Date(blogPost.date), "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
    author: blogPost?.author || "",
    tags: blogPost?.tags?.join(", ") || "",
    excerpt: blogPost?.excerpt || "",
    content_html: blogPost?.content_html || "",
    status: blogPost?.status || "draft",
  });

  const mutation = useMutation<void, Error, typeof formData>({
    mutationFn: async (data: typeof formData) => {
      const payload: Omit<BlogPost, "id" | "created_at" | "updated_at"> = {
        title: data.title,
        slug: data.slug,
        date: data.date,
        author: data.author,
        tags: data.tags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0),
        excerpt: data.excerpt,
        content_html: data.content_html,
        status: data.status as ContentStatus,
      };

      if (blogPost) {
        const { error } = await supabase
          .from("blog_posts")
          .update(payload)
          .eq("id", blogPost.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("blog_posts").insert([payload]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(`Blog post ${blogPost ? "updated" : "created"} successfully`);
      onSuccess();
    },
    onError: (err) => {
      toast.error(`Failed to ${blogPost ? "update" : "create"} blog post: ${err.message}`);
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="e.g., technology, accessibility, react"
        />
      </div>

      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          rows={3}
          required
        />
      </div>

      <div>
        <Label htmlFor="content_html">Content (HTML/Markdown)</Label>
        <Textarea
          id="content_html"
          value={formData.content_html}
          onChange={(e) => setFormData({ ...formData, content_html: e.target.value })}
          rows={10}
          className="font-mono"
          required
        />
      </div>

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

      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Saving..." : blogPost ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default BlogPostsManager;