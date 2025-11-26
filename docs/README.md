# Spookiki Creations Documentation

This folder contains all project documentation organized by category.

## 📁 Folder Structure

```
docs/
├── admin/          # Admin panel documentation
│   └── FEATURES.md # Admin feature list
├── setup/          # Setup & deployment guides
│   ├── CLOUD_STORAGE.md  # Firebase setup instructions
│   └── GITHUB_PAGES.md   # GitHub Pages deployment guide
├── features/       # Feature documentation
│   └── IMAGE_UPLOAD.md   # Image upload feature docs
├── development/    # Development notes & summaries
│   ├── IMPLEMENTATION.md # Technical implementation details
│   ├── FIX_SUMMARY.md    # Bug fixes and resolutions
│   └── ISSUES_FOUND.md   # Known issues and status
├── testing/        # Testing documentation
│   ├── README.md   # Testing overview
│   ├── RESULTS.md  # Test results
│   └── SUMMARY.md  # Testing summary
├── private/        # ⚠️ GITIGNORED - Sensitive docs
│   ├── ADMIN_GUIDE.md      # Admin guide with credentials
│   ├── ADMIN_TESTING.md    # Testing checklist with credentials
│   └── QUICK_REFERENCE.md  # Quick reference with credentials
├── PRD.md          # Product Requirements Document
└── TODO.md         # Project TODO list
```

## ⚠️ Private Documentation

The `docs/private/` folder is **gitignored** and contains sensitive information like admin credentials. These files are only available locally and should never be committed to the repository.

### What's in private/:
- **ADMIN_GUIDE.md** - Complete admin user manual (contains login credentials)
- **ADMIN_TESTING.md** - Testing checklist (contains login credentials)  
- **QUICK_REFERENCE.md** - Quick reference card (contains login credentials)

## Quick Links

### Getting Started
- [Cloud Storage Setup](setup/CLOUD_STORAGE.md) - How to configure Firebase
- [GitHub Pages Setup](setup/GITHUB_PAGES.md) - How to deploy the site

### For Admins
- [Admin Features](admin/FEATURES.md) - What the admin panel can do
- [Private Admin Guide](private/ADMIN_GUIDE.md) - *(local only)* Full admin documentation

### For Developers
- [Implementation Summary](development/IMPLEMENTATION.md) - Technical overview
- [Known Issues](development/ISSUES_FOUND.md) - Bug tracking
- [Testing Guide](testing/README.md) - How to test the application

## Adding New Documentation

1. Choose the appropriate subfolder based on content type
2. Use clear, descriptive filenames in UPPERCASE with underscores
3. If the document contains sensitive info (passwords, API keys, etc.), put it in `private/`
