# GitHub Pages Deployment Setup

This repository is configured to automatically deploy to GitHub Pages whenever changes are pushed to the `main` branch.

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
     https://<username>.github.io/spookiki-creations/
     ```
   - Replace `<username>` with your GitHub username

## Files Added for GitHub Pages

- **`.github/workflows/deploy.yml`**: GitHub Actions workflow that builds and deploys the site
- **`vite.config.ts`**: Updated with `base: '/spookiki-creations/'` for correct asset paths

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
