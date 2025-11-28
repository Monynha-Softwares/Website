export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string
          content_html: string
          created_at: string | null
          date: string
          excerpt: string
          id: string
          locale: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"] | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author: string
          content_html: string
          created_at?: string | null
          date: string
          excerpt: string
          id?: string
          locale?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"] | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string
          content_html?: string
          created_at?: string | null
          date?: string
          excerpt?: string
          id?: string
          locale?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"] | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      brand_identity: {
        Row: {
          created_at: string | null
          description: string | null
          favicon_url: string | null
          id: string
          logo_url: string | null
          name: string
          og_image_url: string | null
          tagline: string | null
          theme_color: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          favicon_url?: string | null
          id?: string
          logo_url?: string | null
          name: string
          og_image_url?: string | null
          tagline?: string | null
          theme_color?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          favicon_url?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          og_image_url?: string | null
          tagline?: string | null
          theme_color?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string | null
        }
        Relationships: []
      }
      cultural_context: {
        Row: {
          brand_id: string | null
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          locale: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          brand_id?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          locale?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          brand_id?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          locale?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cultural_context_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brand_identity"
            referencedColumns: ["id"]
          },
        ]
      }
      exhibitions: {
        Row: {
          created_at: string | null
          date: string | null
          description: string | null
          display_order: number | null
          id: string
          location: string | null
          title: string
          type: string | null
          updated_at: string | null
          year: number
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          location?: string | null
          title: string
          type?: string | null
          updated_at?: string | null
          year: number
        }
        Update: {
          created_at?: string | null
          date?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          location?: string | null
          title?: string
          type?: string | null
          updated_at?: string | null
          year?: number
        }
        Relationships: []
      }
      experiences: {
        Row: {
          created_at: string | null
          display_order: number | null
          end_date: string | null
          highlights: string[] | null
          id: string
          location: string
          organization: string
          role: string
          start_date: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          end_date?: string | null
          highlights?: string[] | null
          id?: string
          location: string
          organization: string
          role: string
          start_date: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          end_date?: string | null
          highlights?: string[] | null
          id?: string
          location?: string
          organization?: string
          role?: string
          start_date?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      legal_pages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      mission_statements: {
        Row: {
          brand_id: string | null
          created_at: string | null
          display_order: number | null
          id: string
          locale: string | null
          statement: string
          updated_at: string | null
        }
        Insert: {
          brand_id?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          locale?: string | null
          statement: string
          updated_at?: string | null
        }
        Update: {
          brand_id?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          locale?: string | null
          statement?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mission_statements_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brand_identity"
            referencedColumns: ["id"]
          },
        ]
      }
      narrative_blocks: {
        Row: {
          brand_id: string | null
          content: string
          created_at: string | null
          id: string
          key: string
          locale: string | null
          updated_at: string | null
        }
        Insert: {
          brand_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          key: string
          locale?: string | null
          updated_at?: string | null
        }
        Update: {
          brand_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          key?: string
          locale?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "narrative_blocks_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brand_identity"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          content: Json
          created_at: string | null
          id: string
          locale: string | null
          meta_description: string | null
          meta_title: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content: Json
          created_at?: string | null
          id?: string
          locale?: string | null
          meta_description?: string | null
          meta_title?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: Json
          created_at?: string | null
          id?: string
          locale?: string | null
          meta_description?: string | null
          meta_title?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          headline: string | null
          id: string
          location: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          headline?: string | null
          id: string
          location?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          headline?: string | null
          id?: string
          location?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          category: string | null
          created_at: string | null
          domain: string | null
          full_description: string | null
          id: string
          name: string
          repo_url: string | null
          slug: string
          stack: string[] | null
          status: Database["public"]["Enums"]["content_status"] | null
          summary: string | null
          thumbnail: string | null
          updated_at: string | null
          url: string | null
          visibility: string | null
          year: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          domain?: string | null
          full_description?: string | null
          id?: string
          name: string
          repo_url?: string | null
          slug: string
          stack?: string[] | null
          status?: Database["public"]["Enums"]["content_status"] | null
          summary?: string | null
          thumbnail?: string | null
          updated_at?: string | null
          url?: string | null
          visibility?: string | null
          year?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          domain?: string | null
          full_description?: string | null
          id?: string
          name?: string
          repo_url?: string | null
          slug?: string
          stack?: string[] | null
          status?: Database["public"]["Enums"]["content_status"] | null
          summary?: string | null
          thumbnail?: string | null
          updated_at?: string | null
          url?: string | null
          visibility?: string | null
          year?: number | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          description: string | null
          id: string
          is_public: boolean | null
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          description?: string | null
          id?: string
          is_public?: boolean | null
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          description?: string | null
          id?: string
          is_public?: boolean | null
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          created_at: string | null
          display_order: number | null
          id: string
          level: string
          name: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          level: string
          name: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          level?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      values: {
        Row: {
          brand_id: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          icon: string | null
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          brand_id?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          brand_id?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "values_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brand_identity"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      column_exists: {
        Args: {
          table_name: string
          column_name: string
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      handle_new_user: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      handle_updated_at: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      set_current_locale: {
        Args: {
          locale_code: string
        }
        Returns: void
      }
    }
    Enums: {
      app_role: "admin" | "editor" | "user"
      content_status: "published" | "draft" | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}