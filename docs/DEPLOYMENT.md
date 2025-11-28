# Deployment Guide

This guide covers deploying the Monynha Softwares corporate website to production. The project is decoupled from external site builders—deployment relies on standard Vite static hosting workflows.

## Prerequisites

- Supabase project (for database + auth)
- Domain name (optional)
- Git repository hosting (GitHub, GitLab, etc.)

---

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel offers frictionless builds for Vite + React projects.

1.  **Push the repository**
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git remote add origin <your-repo-url>
    git push -u origin main
    ```

2.  **Import the project**
    - Visit [vercel.com](https://vercel.com)
    - Click **Import Project**
    - Select your Git repository

3.  **Configure build settings**
    - Framework Preset: **Vite**
    - Build Command: `npm run build`
    - Output Directory: `dist`
    - Install Command: `npm install`

4.  **Add environment variables**

    Navigate to **Settings → Environment Variables** and add:

    ```env
    VITE_SUPABASE_URL=<your-supabase-url>
    VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>
    VITE_SUPABASE_PROJECT_ID=<your-project-id>
    ```

5.  **Deploy**
    - Click **Deploy**
    - Vercel builds and deploys automatically
    - Access the site at `<project>.vercel.app`

6.  **Custom domain (optional)**
    - Settings → Domains
    - Add your domain and follow Vercel’s DNS instructions

---

### Option 2: Netlify

1.  **Connect repository**
    - Visit [app.netlify.com](https://app.netlify.com)
    - Click **Add new site → Import an existing project**
    - Authorize Git provider and pick the repository

2.  **Configure build settings**
    - Build command: `npm run build`
    - Publish directory: `dist`

3.  **Add environment variables**
    Under **Site settings → Build & deploy → Environment**, add Supabase keys identical to the Vercel example above.

4.  **Deploy**
    - Trigger a deploy from the UI or push to the default branch
    - Netlify serves the static build from its CDN

5.  **Domain management**
    - Use Netlify DNS or configure external DNS for a custom domain

---

### Option 3: Static File Hosting (Any CDN / Nginx)

1. Run `npm run build`
2. Upload the generated `dist/` directory to your preferred static host.
3. **Crucial for BrowserRouter**: You must configure the server to serve `index.html` for all SPA routes (history fallback).

#### Nginx Configuration for SPA Fallback

If you are using Nginx, you must include the `try_files` directive in your server block:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Set the root directory to your built application files (e.g., /var/www/monynha/dist)
    root /path/to/your/dist; 
    index index.html;

    location / {
        # This directive checks for a file ($uri), then a directory ($uri/), 
        # and if neither is found, it falls back to serving /index.html.
        try_files $uri $uri/ /index.html;
    }

    # Optional: Cache static assets for better performance
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        log_not_found off;
    }
}
```

---

## Post-Deployment Checklist

- ✅ `npm run build` completes without warnings
- ✅ Environment variables are present in production
- ✅ Supabase database and Storage policies permit your domain
- ✅ Lighthouse reports no missing favicon/manifest warnings
- ✅ Error monitoring (Sentry, Logtail, etc.) is connected if required

---

**Project note:** Monynha Softwares website is decoupled from external builders; deployments mirror standard Vite static site workflows across Vercel, Netlify, and other CDNs.