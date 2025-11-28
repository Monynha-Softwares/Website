import { Database as DB } from "./types_db";

// Utility types for easier access to table rows
export type Tables<T extends keyof DB['public']['Tables']> =
  DB['public']['Tables'][T]['Row'];
export type TablesInsert<T extends keyof DB['public']['Tables']> =
  DB['public']['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof DB['public']['Tables']> =
  DB['public']['Tables'][T]['Update'];
export type Enums<T extends keyof DB['public']['Enums']> =
  DB['public']['Enums'][T];

// Application-specific types derived from Supabase schema
// export type Artwork = Tables<'artworks'>; // Removed as 'artworks' table does not exist in DB schema
export type BlogPost = Tables<'blog_posts'>;
export type BrandIdentity = Tables<'brand_identity'>; // New type
export type ContactMessage = Tables<'contact_messages'>;
export type CulturalContext = Tables<'cultural_context'>; // New type
export type Exhibition = Tables<'exhibitions'>;
export type Experience = Tables<'experiences'>;
export type LegalPage = Tables<'legal_pages'>;
export type MissionStatement = Tables<'mission_statements'>; // New type
export type NarrativeBlock = Tables<'narrative_blocks'>; // New type
export type Page = Tables<'pages'>;
export type Profile = Tables<'profiles'>;
export type Project = Tables<'projects'>;
export type Setting = Tables<'settings'>;
export type Skill = Tables<'skills'>;
export type UserRole = Tables<'user_roles'>;
export type Value = Tables<'values'>; // New type

// Enums
export type AppRole = Enums<'app_role'>;
export type ContentStatus = Enums<'content_status'>;

// Re-export Database as DB for consistency if needed elsewhere
export type Database = DB;