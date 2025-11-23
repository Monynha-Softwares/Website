/**
 * Placeholder Supabase client module (Agent 2)
 *
 * Purpose:
 * - Provide a minimal, well-documented client scaffold that subsequent agents
 *   can use to initialize an admin/service client against Supabase.
 * - This file must NOT be executed in CI or locally until the environment
 *   variables are provisioned securely and reviewed.
 *
 * Security rules (READ FIRST):
 * - Only `SUPABASE_SERVICE_KEY` (server/service key) or `DATABASE_URL` should
 *   be used here. Never use `VITE_SUPABASE_PUBLISHABLE_KEY` or
 *   `VITE_SUPABASE_URL` in server-side code.
 * - Do NOT commit secrets to the repository. Use environment variables, secret
 *   managers or a secure vault.
 *
 * Implementation notes:
 * - This module exports factory functions and small helpers only. It contains
 *   NO queries, mutations or route handlers. The next agent should implement
 *   concrete database calls in a separate module and add tests.
 */

// Import is intentionally left here as a hint. The runtime consumer must
// install `@supabase/supabase-js` if they plan to use the factory below.
// import { createClient, SupabaseClient } from '@supabase/supabase-js'

type SupabaseClientPlaceholder = unknown

/**
 * getAdminClient
 *
 * Description:
 * - Factory that would return a Supabase client authorized with a service key
 *   for administrative server-side operations.
 * - This is a placeholder: it documents the intended shape and checks for
 *   required environment variables, but it will NOT perform any network calls
 *   during review by Agent 2.
 *
 * Usage (next agent):
 * - Ensure `SUPABASE_SERVICE_KEY` and `VITE_SUPABASE_PROJECT_ID` are available
 *   in a secure environment (CI secrets, server env, or local `.env` not
 *   committed to Git).
 * - Install `@supabase/supabase-js` and replace the placeholder implementation
 *   below with `createClient(supabaseUrl, serviceKey, { /* opts */ })`.
 */
export function getAdminClient(): SupabaseClientPlaceholder {
  // Read env vars but do not use them to make any call here.
  const serviceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
  const databaseUrl = process.env.DATABASE_URL
  const projectId = process.env.VITE_SUPABASE_PROJECT_ID

  // Basic validation for the next agent's convenience. This does not contact
  // Supabase nor create any client at Agent 2 stage.
  if (!serviceKey) {
    // We purposely do not throw here to avoid failing automated checks. The
    // next agent should ensure keys exist and fail fast in their runtime.
  }

  // Placeholder object describing intent. Replace with real Supabase client.
  return {
    __placeholder: true,
    note: 'Replace with createClient(supabaseUrl, serviceKey) from @supabase/supabase-js',
    env: {
      hasServiceKey: Boolean(serviceKey),
      hasDatabaseUrl: Boolean(databaseUrl),
      projectId: projectId || null,
    },
  }
}

/**
 * getConnectionCheckPayload
 * - Helper that prepares a minimal payload a test function could use to
 *   validate connectivity. This function itself does not perform network I/O.
 */
export function getConnectionCheckPayload() {
  return {
    requiredEnv: ['DATABASE_URL', 'SUPABASE_SERVICE_KEY', 'VITE_SUPABASE_PROJECT_ID'],
    forbiddenEnv: ['VITE_SUPABASE_PUBLISHABLE_KEY', 'VITE_SUPABASE_URL'],
  }
}

export default {
  getAdminClient,
  getConnectionCheckPayload,
}
