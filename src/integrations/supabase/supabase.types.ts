import { Database } from "./types";

// Utility types for easier access to table rows
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];

// Application-specific types derived from Supabase schema
export type Artwork = Tables<'artworks'>;
export type BlogPost = Tables<'blog_posts'>; // New type
export type ContactMessage = Tables<'contact_messages'>;
export type Exhibition = Tables<'exhibitions'>;
export type Experience = Tables<'experiences'>; // New type
export type LegalPage = Tables<'legal_pages'>; // New type
export type Page = Tables<'pages'>;
export type Profile = Tables<'profiles'>;
export type Project = Tables<'projects'>; // New type
export type Series = Tables<'series'>; // New type
export type Setting = Tables<'settings'>;
export type Skill = Tables<'skills'>; // New type
export type UserRole = Tables<'user_roles'>;

// Enums
export type AppRole = Enums<'app_role'>;
export type ContentStatus = Enums<'content_status'>;