import { Database as DB } from "./types_db";

// Utility types for easier access to table rows
export type Tables<T extends keyof DB['public']['Tables']> =
  DB['public']['Tables'][T]['Row'];
export type Enums<T extends keyof DB['public']['Enums']> =
  DB['public']['Enums'][T];

// Application-specific types derived from Supabase schema
export type Artwork = Tables<'artworks'>;
export type BlogPost = Tables<'blog_posts'>;
export type ContactMessage = Tables<'contact_messages'>;
export type Exhibition = Tables<'exhibitions'>;
export type Experience = Tables<'experiences'>;
export type LegalPage = Tables<'legal_pages'>;
export type Page = Tables<'pages'>;
export type Profile = Tables<'profiles'>;
export type Project = Tables<'projects'>;
export type Setting = Tables<'settings'>;
export type Skill = Tables<'skills'>;
export type UserRole = Tables<'user_roles'>;

// Enums
export type AppRole = Enums<'app_role'>;
export type ContentStatus = Enums<'content_status'>;

// Re-export Database as DB for consistency if needed elsewhere
export type Database = DB;