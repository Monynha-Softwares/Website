# Multi-stage Dockerfile for Monynha Softwares Website
# - Installs dependencies (pnpm)
# - Generates Supabase TypeScript types during build (optional, controlled by build args/env)
# - Builds the Vite app
# - Serves static `dist` with nginx

# --- Dependencies stage ---
FROM node:18-alpine AS deps
WORKDIR /app

# Ensure `pnpm` is available
RUN npm install -g pnpm

# Copy lockfile and package manifest first for efficient caching
COPY package.json pnpm-lock.yaml* ./

# Install production + dev deps required for build
RUN pnpm install --frozen-lockfile --no-optional

# Copy the rest of the repo
COPY . .


# --- Builder stage: generate types + build ---
FROM node:18-alpine AS builder
WORKDIR /app

# Copy installed node_modules and project files from deps stage
COPY --from=deps /app /app

# Set production environment by default
ENV NODE_ENV=production

# Optional build-time args for Supabase type generation
ARG SUPABASE_URL
ARG SUPABASE_SERVICE_ROLE_KEY
ENV SUPABASE_URL=${SUPABASE_URL}
ENV SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}

# Try to generate Supabase TypeScript types. If the command fails (no CLI or no creds), continue.
# The generated file will be: `src/integrations/supabase/types_db.ts`
RUN npx supabase gen types typescript --schema public > src/integrations/supabase/types_db.ts || echo "Supabase type generation skipped"

# Build the Vite app
RUN pnpm build


# --- Production stage: serve with nginx ---
FROM nginx:alpine AS production

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose default HTTP port
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
