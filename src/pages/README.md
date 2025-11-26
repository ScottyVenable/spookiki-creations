# 📄 Pages Directory

This directory contains all page-level components that correspond to routes in the application.

## 📁 Page Files

```
pages/
├── HomePage.tsx           # Main landing page
├── ShopPage.tsx           # Product listing/catalog
├── ProductDetailPage.tsx  # Individual product view
├── CartPage.tsx           # Shopping cart
├── CheckoutPage.tsx       # Checkout flow
├── OrderConfirmationPage.tsx  # Order confirmation
├── BlogIndexPage.tsx      # Blog post listing
├── BlogPostPage.tsx       # Individual blog post
├── AccountPage.tsx        # User account/login
├── AdminPage.tsx          # Admin dashboard
├── AboutPage.tsx          # About the store
├── ContactPage.tsx        # Contact form
└── FAQPage.tsx            # Frequently asked questions
```

## 🏠 Public Pages

### HomePage.tsx
The main landing page featuring:
- Hero section with call-to-action
- Featured products grid
- Category cards (Art, Ornaments, Snakes)
- Blog post previews
- About section teaser
- Newsletter signup

**Route:** `/`

### ShopPage.tsx
Product catalog with:
- Category tabs (All, Art, Ornaments, Snakes)
- Filter tags (New, Limited, One of a Kind)
- Sort options (Newest, Price, Name)
- Product grid with cards
- Pagination

**Route:** `/shop`, `/shop/:category`

### ProductDetailPage.tsx
Individual product view with:
- Image gallery
- Product details (name, price, description)
- Gemstone meaning (if applicable)
- Material and stock information
- Add to cart button
- Related products

**Route:** `/product/:slug`

### CartPage.tsx
Shopping cart showing:
- Cart items with images
- Quantity controls
- Remove item option
- Subtotal calculation
- Proceed to checkout button
- Empty cart state

**Route:** `/cart`

### CheckoutPage.tsx
Multi-step checkout:
- Contact information
- Shipping address
- Payment method selection
- Order summary
- Place order button

**Route:** `/checkout`

### OrderConfirmationPage.tsx
Post-purchase confirmation:
- Order number
- Order summary
- Payment instructions
- Shipping information
- Continue shopping link

**Route:** `/order/:orderId`

## 📝 Content Pages

### BlogIndexPage.tsx
Blog listing page:
- Blog post cards
- Tag filtering
- Date sorting
- Pagination
- Featured posts

**Route:** `/blog`

### BlogPostPage.tsx
Individual blog post:
- Full post content (Markdown)
- Author and date
- Tags
- Related posts
- Share buttons

**Route:** `/blog/:slug`

### AboutPage.tsx
About the store:
- Brand story
- Kiki's background
- Crafting process
- Values and mission

**Route:** `/about`

### ContactPage.tsx
Contact form with:
- Name, email fields
- Message textarea
- Send button
- Contact information
- Social media links

**Route:** `/contact`

### FAQPage.tsx
Frequently asked questions:
- Accordion-style Q&A
- Categories (Ordering, Shipping, Returns, etc.)
- Search functionality (future)

**Route:** `/faq`

## 🔐 Protected Pages

### AccountPage.tsx
User account management:
- Login form (when logged out)
- Account dashboard (when logged in)
- Order history
- Profile settings
- Password change

**Route:** `/account`, `/account/settings`

### AdminPage.tsx
Admin dashboard with tabs:
- **Dashboard** - Key metrics overview
- **Orders** - Order management
- **Products** - Product CRUD
- **Website** - Site settings

**Route:** `/admin` (admin role required)

## 🎨 Page Structure Pattern

Each page follows a consistent structure:

```tsx
import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
// ... other imports

export function PageName() {
  // State and hooks
  const [data, setData] = useState(null)
  
  // Effects
  useEffect(() => {
    // Load data
  }, [])
  
  // Event handlers
  const handleAction = () => {
    // Handle user action
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Page content */}
      </main>
      <Footer />
    </div>
  )
}
```

## 🔗 Route Configuration

Routes are configured in `/components/Router.tsx`:

```tsx
const routes = [
  { path: '/', component: HomePage },
  { path: '/shop', component: ShopPage },
  { path: '/shop/:category', component: ShopPage },
  { path: '/product/:slug', component: ProductDetailPage },
  // ... etc
]
```

## 📱 Responsive Design

All pages implement responsive design:
- **Desktop** (1280px+) - Full layout
- **Tablet** (768px-1279px) - Adapted layout
- **Mobile** (<768px) - Mobile-optimized

## 🔄 Data Loading

Pages load data using:
- React Query for server state
- Context for global state (auth, cart)
- Local state for UI state

## 📚 Related Documentation

- [Components](../components/README.md) - Reusable components
- [Contexts](../contexts/README.md) - Global state
- [Hooks](../hooks/README.md) - Custom hooks
- [Router](../components/Router.tsx) - Route configuration
