# Cloud Storage Setup Guide

This guide will help you set up **free cloud storage** for your Spookiki Creations website using Firebase Realtime Database. This enables:
- ✅ Cross-device data sync (products, orders, cart, etc.)
- ✅ Real-time updates across browsers/devices
- ✅ Automatic offline fallback to localStorage
- ✅ 100% free for small businesses (Firebase Spark plan)

## Firebase Free Tier Limits

The Firebase Spark (free) plan includes:
- **1 GB** stored data
- **10 GB/month** data transfer
- **100** simultaneous connections

This is more than enough for a small handmade business!

---

## Step-by-Step Setup

### Step 1: Create a Firebase Account

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Sign in with your Google account
3. Click **"Create a project"** (or "Add project")
4. Name your project: `spookiki-creations`
5. You can disable Google Analytics (not needed)
6. Click **"Create project"**

### Step 2: Enable Realtime Database

1. In the Firebase Console, select your project
2. Click **"Build"** in the left sidebar
3. Click **"Realtime Database"**
4. Click **"Create Database"**
5. Choose your region (closest to you)
6. For security rules, choose **"Start in test mode"** for now
   - We'll update these later for production

### Step 3: Get Your Firebase Configuration

1. In Firebase Console, click the **gear icon** ⚙️ → **Project settings**
2. Scroll down to **"Your apps"**
3. Click the **"Web"** icon (</>) to add a web app
4. Register your app with nickname: `spookiki-web`
5. You'll see your Firebase config. Copy these values:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAFRJF4s-d0y1yljd4Q0h9_qWOjNuc_nLw",
  authDomain: "spookiki-creations.firebaseapp.com",
  databaseURL: "https://spookiki-creations-default-rtdb.firebaseio.com",
  projectId: "spookiki-creations",
  storageBucket: "spookiki-creations.firebasestorage.app",
  messagingSenderId: "79631042024",
  appId: "1:79631042024:web:edd5f17020ffc767e0105d",
  measurementId: "G-8K61K434LK"
};
```

### Step 4: Configure Your Website

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Firebase values:
   ```
   VITE_FIREBASE_API_KEY=AIza...
   VITE_FIREBASE_AUTH_DOMAIN=spookiki-creations.firebaseapp.com
   VITE_FIREBASE_DATABASE_URL=https://spookiki-creations-default-rtdb.firebaseio.com
   VITE_FIREBASE_PROJECT_ID=spookiki-creations
   VITE_FIREBASE_STORAGE_BUCKET=spookiki-creations.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123
   ```

3. Install Firebase (if not already installed):
   ```bash
   npm install firebase
   ```

4. Restart your development server:
   ```bash
   npm run dev
   ```

### Step 5: Update Database Security Rules (Important for Production!)

1. Go to Firebase Console → Realtime Database → **Rules** tab
2. Replace the rules with:

```json
{
  "rules": {
    "spookiki": {
      // Allow read/write for all public data
      ".read": true,
      ".write": true,
      
      // Products, blog posts, and website settings are public
      "products": {
        ".read": true,
        ".write": true
      },
      "blog_posts": {
        ".read": true,
        ".write": true
      },
      "website-settings": {
        ".read": true,
        ".write": true
      },
      
      // Orders should be write-only for customers
      "orders": {
        ".read": true,
        ".write": true
      },
      
      // Newsletter subscriptions
      "newsletter_subscribers": {
        ".read": true,
        ".write": true
      },
      
      // Cart data - public for simplicity
      "cart": {
        ".read": true,
        ".write": true
      },
      
      // User credentials - admin only (future enhancement)
      "user-credentials": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

**Note:** For a production site with many users, you would want to add authentication and more restrictive rules. The above rules allow anyone to read/write, which is fine for a small business admin managing their own data.

---

## How It Works

The `useCloudStorage` hook in `src/hooks/useCloudStorage.ts` provides:

1. **Automatic Firebase sync** when configured
2. **localStorage fallback** when Firebase is not configured or unavailable
3. **Real-time updates** across all connected devices
4. **Automatic data migration** - existing localStorage data is automatically migrated to Firebase on first connection
5. **Same API as useKV** - just change the import!

### Data Synchronization

When Firebase is properly configured:
- **All data changes are instantly synced** to Firebase Realtime Database
- **All connected devices receive real-time updates** when data changes
- **localStorage is kept in sync** as a backup for offline access
- **Existing localStorage data is automatically migrated** to Firebase when you first connect

This means:
- User logins and account creations sync across devices
- Admin product edits appear instantly on all devices
- Orders placed on any device are visible everywhere
- Cart data syncs when logged in (using the same browser session)

### Data Types Synced

The following data is automatically synced through Firebase:

| Data Type | Storage Key | Description |
|-----------|-------------|-------------|
| Products | `products` | All product catalog data |
| Orders | `orders` | Customer orders and status |
| Shopping Cart | `cart` | Items in the shopping cart |
| User Credentials | `user-credentials` | User account information |
| User Session | `current-user-session` | Current logged-in user |
| Website Settings | `website-settings` | Site configuration |
| Newsletter Subscribers | `newsletter_subscribers` | Email subscriber list |
| Blog Posts | `blog_posts` | Blog content |

### Usage Example

```typescript
// Old (Spark KV - requires authentication)
import { useKV } from '@github/spark/hooks'
const [products, setProducts] = useKV<Product[]>('products', [])

// New (Cloud Storage - works everywhere)
import { useCloudStorage } from '@/hooks/useCloudStorage'
const [products, setProducts] = useCloudStorage<Product[]>('products', [])
```

---

## Troubleshooting

### "Firebase not configured" message
- Check that your `.env` file has all the VITE_FIREBASE_* values
- Make sure you restart the dev server after editing `.env`

### Data not syncing between devices
- Verify your Firebase Database URL is correct
- Check the browser console for Firebase errors
- Ensure you're not blocking Firebase in your browser

### "Permission denied" errors
- Update your Firebase Database Rules (Step 5)
- Make sure you're in "test mode" for development

---

## Cost Considerations

For a small handmade business, you'll likely never exceed the free tier:

| Usage | Free Limit | Estimated for Spookiki |
|-------|------------|------------------------|
| Stored data | 1 GB | ~10 MB (products, orders, etc.) |
| Downloads | 10 GB/month | ~100 MB/month |
| Connections | 100 simultaneous | 1-5 typical |

If your business grows significantly, Firebase's paid tier (Blaze) is pay-as-you-go and very affordable.

---

## Alternative Free Options

If you prefer not to use Firebase, here are other free options:

1. **Supabase** (PostgreSQL, 500 MB free)
2. **PlanetScale** (MySQL, 5 GB free)
3. **Railway** (PostgreSQL, 500 MB free)
4. **Neon** (PostgreSQL, 3 GB free)

The `useCloudStorage` hook can be adapted to work with any of these.

---

## Support

If you need help setting up cloud storage:
- Check the [Firebase Documentation](https://firebase.google.com/docs/database)
- Open an issue on the GitHub repository
