# GitHub Pages Deployment Setup

This repository is configured to automatically deploy to GitHub Pages whenever changes are pushed to the `main` branch.

## Custom Domain Configuration

This site is configured to use the custom domain: **spookikicreations.store**

### HTTPS Certificate

GitHub Pages automatically provisions and renews Let's Encrypt SSL certificates for custom domains. The certificate is managed by GitHub and requires no manual intervention.

### DNS Configuration

To complete the custom domain setup, configure your DNS provider with the following records:

**Option 1: Apex domain (recommended)**
Add these A records pointing to GitHub Pages:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**Option 2: CNAME record**
Add a CNAME record pointing to:
```
<username>.github.io
```

## Setup Instructions

To enable GitHub Pages for this repository, follow these steps:

1. **Go to Repository Settings**
   - Navigate to your repository on GitHub
   - Click on "Settings" in the top navigation

2. **Configure GitHub Pages**
   - In the left sidebar, click on "Pages" under "Code and automation"
   - Under "Build and deployment":
     - **Source**: Select "GitHub Actions"
   - Save the settings

3. **Trigger Deployment**
   - The workflow will automatically run when you:
     - Push changes to the `main` branch
     - Manually trigger it from the "Actions" tab

4. **Access Your Site**
   - Once deployed, your site will be available at:
     ```
     https://spookikicreations.store/
     ```
   - Or via the default GitHub Pages URL:
     ```
     https://<username>.github.io/spookiki-creations/
     ```

## Files Added for GitHub Pages

- **`.github/workflows/deploy.yml`**: GitHub Actions workflow that builds and deploys the site
- **`.github/workflows/https-certificate-check.yml`**: Workflow that verifies HTTPS certificate status
- **`public/CNAME`**: Custom domain configuration file (spookikicreations.store)
- **`vite.config.ts`**: Configured with `base: '/'` for custom domain compatibility

## Manual Deployment

You can also manually trigger a deployment:
1. Go to the "Actions" tab in your repository
2. Click on "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button
4. Select the branch and click "Run workflow"

## Local Development

The base path is only applied during production builds. For local development:

```bash
npm install
npm run dev
```

This will start a development server at `http://localhost:5173/`

## Build Locally

To test the production build locally:

```bash
npm run build
npm run preview
```

The preview server will serve the built files with the correct base path.
