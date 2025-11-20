# GitHub Spark Integration

This document explains how this repository is configured to work seamlessly with GitHub Spark.

## Overview

GitHub Spark is used to develop and modify the website. When Spark makes commits, the GitHub Actions workflow automatically:
1. Detects if `package-lock.json` is out of sync with `package.json`
2. Regenerates the lock file if needed
3. Commits the updated lock file back to the repository
4. Builds and deploys the website to GitHub Pages

## How It Works

### Automatic Lock File Synchronization

The `.github/workflows/deploy.yml` workflow includes smart dependency installation:

```yaml
- name: Install dependencies
  run: |
    # Try npm ci first (faster and more reliable for production)
    # If it fails due to lock file mismatch, fall back to npm install
    if ! npm ci 2>/dev/null; then
      echo "⚠️  npm ci failed - package-lock.json may be out of sync"
      echo "📦 Running npm install to regenerate lock file..."
      npm install
      echo "✅ Dependencies installed and lock file updated"
    else
      echo "✅ Dependencies installed with npm ci"
    fi

- name: Commit updated lock file if changed
  run: |
    if ! git diff --quiet package-lock.json; then
      echo "📝 package-lock.json was updated - committing changes"
      git config user.name "github-actions[bot]"
      git config user.email "github-actions[bot]@users.noreply.github.com"
      git add package-lock.json
      git commit -m "chore: update package-lock.json after Spark changes [skip ci]"
      git push
    else
      echo "✅ package-lock.json is up to date"
    fi
```

### Why This Is Needed

When GitHub Spark modifies dependencies in `package.json`, it may not always update the `package-lock.json` file. This can cause build failures because `npm ci` requires both files to be perfectly in sync.

Our workflow solves this by:
- **First trying `npm ci`** - This is the standard, fastest way to install dependencies in CI/CD
- **Falling back to `npm install`** - If the lock file is out of sync, we regenerate it
- **Committing the fix** - The updated lock file is automatically committed back to the repository
- **Using `[skip ci]`** - This prevents an infinite loop of workflow runs

## Benefits

✅ **Zero manual intervention** - No need to manually run `npm install` after Spark changes  
✅ **Always deployable** - The repository is always in a buildable state  
✅ **Fast builds** - Uses `npm ci` when possible for speed  
✅ **Self-healing** - Automatically fixes sync issues  
✅ **Audit trail** - Lock file updates are tracked in git history  

## Workspace Configuration

This repository does **not** use npm workspaces. If you see a `workspaces` configuration in `package.json`, it should be removed as it can cause issues with dependency resolution.

## Troubleshooting

### Build fails with "package.json and package-lock.json are out of sync"

This should be automatically fixed by the workflow. If you see this error:
1. Wait for the workflow to complete - it should auto-fix the issue
2. If it persists, check that the workflow has write permissions (`contents: write`)

### Workflow doesn't commit lock file changes

Check that:
1. The workflow has `permissions.contents: write` in `.github/workflows/deploy.yml`
2. Branch protection rules allow github-actions[bot] to commit

### Want to update dependencies locally

Run:
```bash
npm install
```

This will update `package-lock.json`. Commit both files:
```bash
git add package.json package-lock.json
git commit -m "chore: update dependencies"
```

## Related Files

- `.github/workflows/deploy.yml` - Main deployment workflow
- `package.json` - Project dependencies and scripts
- `package-lock.json` - Locked dependency versions
- `.spark-initial-sha` - Spark initialization marker
- `spark.meta.json` - Spark metadata configuration
