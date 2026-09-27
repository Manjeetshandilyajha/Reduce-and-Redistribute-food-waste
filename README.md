# AnnaSetu — AI-Powered Institutional Food Waste Redistribution Platform

AnnaSetu ("Anna" = food, "Setu" = bridge) is a B2B SaaS platform for institutional kitchens (hotels, messes, hospital canteens, banquet halls) that predicts food surplus before it is cooked, verifies freshness in real time against FSSAI decay windows, matches edible surplus to nearby verified NGOs in under 200ms, and routes spoiled waste to Bio-CNG / BSFL processing with a 100% digital cryptographic audit trail.

---

## Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

App will run at `http://localhost:5173`.

---

## Production Build & Preview

```bash
# Create production bundle
npm run build

# Preview production build locally
npm run preview
```

Output bundle will be created in `dist/`.

---

## Deploy to Render

### Option 1: Deploy via Render Web Dashboard (Recommended)

1. Push this project repository to **GitHub** / **GitLab**.
2. Log in to [Render Dashboard](https://dashboard.render.com) and click **"New +"** -> **"Static Site"**.
3. Connect and select your `AnnaSetu` repository.
4. Configure the build parameters:
   - **Name:** `annasetu`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
5. Click **"Create Static Site"**.
6. Under **Redirects / Rewrites**, add the SPA rewrite rule:
   - **Source:** `/*`
   - **Destination:** `/index.html`
   - **Action:** `Rewrite`

### Option 2: Deploy via Render Blueprint (render.yaml)

Render will automatically discover `render.yaml` in your repository root and configure the Static Site service with SPA rewrites (`/*` → `/index.html`) automatically.

---

## Deploy to Vercel

### Option 1: Deploy via Vercel Web Dashboard (Recommended)

1. Push this project repository to **GitHub** / **GitLab** / **Bitbucket**.
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `AnnaSetu` repository.
4. Vercel automatically detects the **Vite** framework preset:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click **"Deploy"**.

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally if needed
npm install -g vercel

# Deploy to Vercel
vercel
```

---

## SPA Routing Configuration

Client-side routes (e.g. `/`, `/kitchen`, `/ngo`, `/admin`, `/kitchen/surplus`, `/kitchen/matching`, `/kitchen/handoff`, `/kitchen/tracking`, `/kitchen/spoiled`) are pre-configured:
- For **Render**: `render.yaml` handles `/*` → `/index.html` rewrite.
- For **Vercel**: `vercel.json` handles `/(.*)` → `/index.html` rewrite.

No backend or environment variables required for frontend demo deployment.

