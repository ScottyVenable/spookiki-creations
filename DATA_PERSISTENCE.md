# Data Persistence with GitHub Pages

This application uses Spark's KV (Key-Value) storage to persist data. Here's how it works:

## How KV Storage Works

- **Authentication Required**: KV storage is tied to the authenticated GitHub user's Spark environment
- **Persistent Storage**: All data (products, orders, settings, user credentials) is stored in KV and persists between sessions
- **GitHub Pages Deployment**: When deployed to GitHub Pages, the KV storage works seamlessly for authenticated users

## What Gets Saved

1. **Products** (`products` key)
   - All product information including images, pricing, categories
   - Creator and last editor information
   - Stock levels and status

2. **Orders** (`orders` key)
   - Complete order history
   - Status updates with admin attribution
   - Customer information

3. **Cart** (`cart` key)
   - Shopping cart items (per user)
   - Persists between sessions

4. **Website Settings** (`website-settings` key)
   - Site customization
   - Contact information
   - Policies and content
   - Last updated by tracking

5. **User Credentials** (`user-credentials` key)
   - Admin and customer accounts
   - Password hashes (never plain text)

6. **Blog Posts** (`blog-posts` key)
   - Published and draft posts
   - Tags and metadata

## Data Persistence on GitHub Pages

When your site is published on GitHub Pages:

1. **Data is User-Specific**: Each admin user has their own KV storage namespace
2. **No Shared Database**: Unlike traditional databases, KV storage is per-authenticated-user
3. **Production Ready**: For production use, consider:
   - Using a shared backend service if multiple admins need to see the same data
   - Exporting/importing data between admin accounts if needed
   - Setting up a single "service account" for all admin operations

## Best Practices

1. **Regular Backups**: Periodically export your data (future feature)
2. **Test Changes**: Use the admin panel's preview features before publishing
3. **Coordinate Updates**: If multiple admins, communicate who is making changes
4. **Clear Browser Cache**: If data seems stale, clear cache and reload

## Admin Audit Trail

All changes made in the admin panel now track:
- **Who** made the change (admin name)
- **When** the change was made (timestamp)
- **What** was changed (product/order/settings)

This audit trail helps when multiple admins are working on the site.

## Troubleshooting

### Data Not Persisting
- Ensure you're logged in to GitHub through Spark
- Check browser console for KV errors
- Verify you're not in private/incognito mode

### Data Appears Empty
- KV storage is per-user - different GitHub accounts will see different data
- Make sure you're logged in with the correct account
- Initial setup will have sample data that you can customize

### Multiple Admins
- Currently, each admin sees their own data in KV
- For shared data, consider implementing a backend service
- Or designate a single "admin account" that all administrators use
