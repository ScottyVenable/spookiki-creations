# Issues Found During Core Functionality Testing

**Testing Date**: November 21, 2025
**Context**: Testing performed on main branch to evaluate core functionality after hybrid storage implementation (PR #12)

---

## Issue 1: PR #12 (Hybrid Storage) Not Merged - Blocking Full Testing

**Priority**: 🔴 Critical
**Type**: Process/Deployment
**Status**: Open

### Description
The hybrid storage implementation from PR #12 (branch `copilot/save-product-universally`) has not been merged to the main branch, preventing comprehensive testing of the core storage functionality.

### Impact
Cannot test the following features:
- Repository JSON files loading (`public/data/products.json`, `public/data/blog-posts.json`)
- `useRepositoryData` hook functionality
- `useLocalStorage` hook functionality  
- Data merging between repository and localStorage
- Admin product modifications persisting across sessions
- Cross-tab synchronization

### Current State
- PR #12 Status: **OPEN**
- PR #12 URL: https://github.com/ScottyVenable/spookiki-creations/pull/12
- Current main branch: Uses Spark KV store (experiencing errors)

### Steps to Reproduce
1. Clone repository on main branch
2. Try to access `public/data/products.json` → Does not exist
3. Check `src/hooks/` for `useRepositoryData.ts` → Does not exist
4. Run application → Falls back to sample data, KV errors in console

### Expected Behavior
- Repository JSON files should exist in `public/data/`
- Hybrid storage hooks should be available
- Products and blog posts should load from repository JSON + localStorage

### Actual Behavior
- No `public/data/` directory
- Hooks don't exist
- Application uses Spark KV store with connection errors

### Recommendation
1. Review and merge PR #12
2. Verify build succeeds after merge
3. Re-run comprehensive testing

---

## Issue 2: Product Images Fail to Load (403 Forbidden Errors)

**Priority**: 🟠 High
**Type**: Bug - Data/Assets
**Status**: Open

### Description
Product and blog post images fail to load, resulting in broken images throughout the site. Two types of errors occur:
1. 403 Forbidden errors for `/data/` URLs
2. ERR_BLOCKED_BY_CLIENT for external Unsplash URLs

### Impact
- Poor user experience with broken images
- Homepage featured products show no images
- Blog posts show no cover images
- Product detail pages affected
- Shop page affected

### Steps to Reproduce
1. Navigate to homepage
2. Scroll to "Featured Pieces" section
3. Observe broken product images
4. Check browser console
5. See multiple errors:
   - `Failed to load resource: the server responded with a status of 403 (Forbidden) @ http://localhost:5000/spookiki-creations/data/...`
   - `Failed to load resource: net::ERR_BLOCKED_BY_CLIENT @ https://images.unsplash.com/...`

### Expected Behavior
- Product images should load and display correctly
- Blog post cover images should display
- No 403 or ERR_BLOCKED_BY_CLIENT errors

### Actual Behavior
- All product images broken
- 403 Forbidden errors for local data URLs
- External Unsplash URLs blocked by browser/ad blocker

### Root Cause Analysis
1. **403 Forbidden**: The `/data/` URLs are being served incorrectly or don't exist
2. **ERR_BLOCKED_BY_CLIENT**: Browser extensions or privacy settings blocking external image requests

### Reproduction Environment
- Browser: Playwright (Chromium-based)
- Dev Server: Vite on port 5000
- Base Path: `/spookiki-creations/`

### Recommendations
1. **Short-term**: Use locally hosted placeholder images
2. **Medium-term**: Implement proper image hosting (GitHub repo, CDN, or local public folder)
3. **Long-term**: Add image upload feature (see ADMIN_FEATURES.md suggestions)

### Related Files
- `src/lib/data.ts` - Contains sample data with image URLs
- `public/data/products.json` - Should contain product image URLs (requires PR #12)
- `public/data/blog-posts.json` - Should contain blog cover images (requires PR #12)

---

## Issue 3: Spark KV Store Connection Errors

**Priority**: 🟠 High  
**Type**: Bug - Integration
**Status**: Open

### Description
The application is attempting to use the Spark Runtime KV store for data persistence, but all KV operations fail with "Forbidden" errors. The app falls back to sample data, but console is flooded with errors.

### Impact
- Console errors on every page load
- Data persistence doesn't work as intended
- Admin changes don't persist
- Poor developer experience with error noise

### Steps to Reproduce
1. Open browser dev tools
2. Navigate to any page
3. Observe console errors:
   ```
   Error: Failed to fetch KV key: Forbidden
       at KVClient.getKey (http://localhost:5000/spookiki-creations/...)
   
   Error: Failed to set key: Forbidden
       at KVClient.setKey (http://localhost:5000/spookiki-creations/...)
   ```

### Expected Behavior
- Either KV store works correctly, OR
- Application uses alternative storage (localStorage after PR #12 merge)
- No console errors

### Actual Behavior
- KV operations fail with Forbidden errors
- Console flooded with error messages
- App falls back to sample data
- No persistence between sessions

### Root Cause
The Spark KV store requires authentication/configuration that isn't set up in the development environment.

### Current Workaround
PR #12 implements localStorage-based persistence with repository JSON fallback, which should resolve this issue once merged.

### Recommendations
1. Merge PR #12 to implement localStorage-based storage
2. Remove or properly configure Spark KV dependencies
3. Add error handling to suppress KV errors if localStorage is available

### Related
- Directly resolved by merging PR #12
- See `src/hooks/useLocalStorage.ts` in PR #12 branch
- See `src/hooks/useRepositoryData.ts` in PR #12 branch

---

## Issue 4: Empty href Attributes Causing Browser Warnings

**Priority**: 🟡 Medium
**Type**: Bug - HTML/Accessibility
**Status**: Open

### Description
Multiple elements have empty `href=""` attributes, causing browser warnings about downloading the current page.

### Impact
- Console warnings pollute developer tools
- Potential accessibility issues
- Poor code quality indicators
- May confuse screen readers

### Steps to Reproduce
1. Open browser dev tools console
2. Navigate to homepage
3. Observe warnings:
   ```
   An empty string ("") was passed to the href attribute. This may cause the browser to download the current page.
   ```

### Expected Behavior
- All links should have valid href values
- No empty string href attributes
- Clean console with no warnings

### Actual Behavior
- Multiple empty href warnings
- Elements with `href=""`

### Recommendations
1. Audit all `<a>` tags in the codebase
2. Replace empty hrefs with:
   - `href="#"` for placeholder links
   - `href="javascript:void(0)"` for non-navigating links (not recommended)
   - Convert to `<button>` elements if not actually links
3. Add linting rule to prevent empty hrefs

### Potential Locations
- Product cards
- Blog cards  
- Navigation elements
- Call-to-action buttons improperly using `<a>` tags

---

## Issue 5: External Font Loading Blocked

**Priority**: 🟢 Low
**Type**: Enhancement
**Status**: Open

### Description
Google Fonts requests are being blocked, likely by privacy/ad blocking extensions.

### Impact
- Fonts may fall back to system defaults
- Typography may not match design specifications
- Inconsistent appearance across different browsers/settings

### Steps to Reproduce
1. Open browser dev tools
2. Navigate to any page
3. Check console for error:
   ```
   Failed to load resource: net::ERR_BLOCKED_BY_CLIENT @ https://fonts.googleapis.com...
   ```

### Expected Behavior
- Fonts load from Google Fonts or alternative source
- Typography displays as designed
- No blocked requests

### Actual Behavior
- Google Fonts blocked by browser/extensions
- Fonts fall back to system defaults

### Recommendations
1. **Option A**: Self-host fonts locally
   - Download fonts and add to `public/fonts/`
   - Update CSS to use local font files
   - Better privacy and performance
2. **Option B**: Use CSS system font stack
   - Rely on high-quality system fonts
   - Better performance, no external requests
3. **Option C**: Accept fallback behavior
   - Document that design requires font access
   - Provide graceful degradation

### Related Files
- Likely in CSS files that import Google Fonts
- Check `<link>` tags in index.html
- Check `@import` in CSS files

---

## Summary

| Priority | Count | Issues |
|----------|-------|--------|
| 🔴 Critical | 1 | #1 PR #12 not merged |
| 🟠 High | 2 | #2 Image loading, #3 KV errors |
| 🟡 Medium | 1 | #4 Empty href warnings |
| 🟢 Low | 1 | #5 Font loading |

### Immediate Action Items

1. **Merge PR #12** - Unlocks comprehensive testing and fixes KV errors
2. **Fix image loading** - Critical for UX
3. **Clean up empty href attributes** - Code quality

### Testing Blocked By

- **Issue #1**: Prevents testing hybrid storage, admin features, persistence

### Can Be Tested Now

- Authentication UI (login page renders)
- Page routing and navigation
- Homepage layout and structure
- Mobile responsiveness (basic)
- Static content display

---

## How to Create GitHub Issues

For each issue above, create a GitHub issue with:
- **Title**: Issue heading (e.g., "PR #12 Not Merged - Blocking Full Testing")
- **Labels**: `bug`, `priority-high`, `testing`, etc.
- **Body**: Copy the full issue section
- **Assignee**: Appropriate team member
- **Milestone**: Current sprint/release

Example command (if using gh CLI):
```bash
gh issue create --title "Product Images Fail to Load (403 Forbidden)" --label "bug,priority-high" --body "$(cat ISSUES_FOUND.md | sed -n '/## Issue 2/,/## Issue 3/p')"
```
