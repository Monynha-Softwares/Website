// This file provides `interface` wrappers around generated Supabase `Row` types.
// Do NOT edit generated files (e.g., `types.ts` / `types_db.ts`).
// Use these interfaces when you specifically need an `interface` rather than a `type`.

import { Database as DB } from './types'

// These are thin aliases to the generated row types. We export them as `type`
// aliases because the generated types use indexed access expressions that
// cannot be used directly as `interface` bases (TypeScript restriction).
// Use these aliases where you need a named, exported shape in application code.

export type Artwork = DB['public']['Tables']['artworks']['Row']
export type BlogPost = DB['public']['Tables']['blog_posts']['Row']
export type ContactMessage = DB['public']['Tables']['contact_messages']['Row']
export type Exhibition = DB['public']['Tables']['exhibitions']['Row']
export type Experience = DB['public']['Tables']['experiences']['Row']
export type LegalPage = DB['public']['Tables']['legal_pages']['Row']
export type Page = DB['public']['Tables']['pages']['Row']
export type Profile = DB['public']['Tables']['profiles']['Row']
export type Project = DB['public']['Tables']['projects']['Row']
export type Series = DB['public']['Tables']['series']['Row']
export type Setting = DB['public']['Tables']['settings']['Row']
export type Skill = DB['public']['Tables']['skills']['Row']
export type UserRole = DB['public']['Tables']['user_roles']['Row']

// Export enums as types for convenience (do not convert enums to interfaces)
export type AppRole = DB['public']['Enums']['app_role']
export type ContentStatus = DB['public']['Enums']['content_status']

// Helpful re-exports if callers prefer the `Tables` utility
export type Tables<T extends keyof DB['public']['Tables']> = DB['public']['Tables'][T]['Row']
