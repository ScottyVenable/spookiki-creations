# 🧩 Components Directory

This directory contains all reusable React components for the Spookiki Creations platform.

## 📁 Directory Structure

```
components/
├── ui/                    # shadcn/ui component library
├── admin/                 # Admin-specific components
├── Header.tsx             # Site header with navigation
├── Footer.tsx             # Site footer
├── Router.tsx             # Application routing
├── Link.tsx               # Navigation link component
├── ProductCard.tsx        # Product display card
├── BlogCard.tsx           # Blog post preview card
├── OrderStatusBadge.tsx   # Order status indicator
├── ImageUploader.tsx      # Image upload dialog
├── OptimizedImage.tsx     # Optimized image component
├── VisualEditor.tsx       # Visual content editor
├── AdminOrdersTab.tsx     # Admin orders management
├── AdminProductsTab.tsx   # Admin products management
└── AdminWebsiteTab.tsx    # Admin website settings
```

## 🎯 Component Categories

### Layout Components

#### `Header.tsx`
Main site header with:
- Logo and site name
- Navigation links (Shop, Blog, About, Contact)
- User dropdown (login/logout, admin access)
- Cart icon with item count
- Mobile hamburger menu

#### `Footer.tsx`
Site footer with:
- Quick links navigation
- Social media links
- Newsletter signup
- Copyright information

#### `Router.tsx`
Client-side routing implementation:
- Handles base path (`/spookiki-creations/`)
- Maps URLs to page components
- Supports dynamic routes (product detail, blog post)

### Feature Components

#### `ProductCard.tsx`
Displays product information in a card format:
- Product image with fallback
- Name, price, category
- "Limited", "New", "Featured" badges
- Add to cart functionality
- Hover effects and animations

#### `BlogCard.tsx`
Blog post preview card:
- Cover image
- Title and excerpt
- Author and date
- Tag badges
- Read more link

#### `OrderStatusBadge.tsx`
Visual indicator for order status:
- Color-coded badges (Pending, Paid, Shipped, etc.)
- Consistent styling across admin panel

#### `ImageUploader.tsx`
Image upload dialog component:
- File selection from device
- Cloud upload (Imgur) option
- Local base64 storage option
- URL input alternative
- Image preview

#### `OptimizedImage.tsx`
Optimized image loading:
- Lazy loading support
- Placeholder during load
- Error fallback

### Admin Components

#### `AdminProductsTab.tsx`
Product management interface:
- Product list with thumbnails
- Create/edit/delete products
- Multiple image management
- Category and status controls
- Featured toggle

#### `AdminOrdersTab.tsx`
Order management interface:
- Order list with status
- Status update dropdown
- Order detail view
- Customer information display

#### `AdminWebsiteTab.tsx`
Website settings management:
- General settings (name, tagline, contact)
- Content settings (hero, about)
- Policy settings (shipping, returns)

### Utility Components

#### `Link.tsx`
Custom link component:
- Handles base path automatically
- Works with React routing
- Supports all standard link props

## 🎨 UI Component Library

The `/ui` subdirectory contains shadcn/ui components - a collection of reusable UI primitives built on Radix UI. See [ui/README.md](./ui/README.md) for details.

## 📝 Component Patterns

### Props Interface
```tsx
interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  showBadge?: boolean
}
```

### Event Handlers
```tsx
const handleAddToCart = () => {
  onAddToCart?.(product)
  toast.success('Added to cart!')
}
```

### Conditional Rendering
```tsx
{product.isFeatured && (
  <Badge variant="secondary">Featured</Badge>
)}
```

## 🔧 Usage Examples

### ProductCard
```tsx
import { ProductCard } from '@/components/ProductCard'

<ProductCard 
  product={product}
  onAddToCart={handleAddToCart}
/>
```

### Header with Auth
```tsx
import { Header } from '@/components/Header'

<Header />  // Automatically handles auth state
```

### Router Setup
```tsx
import { Router } from '@/components/Router'

<Router />  // Handles all routing
```

## 📚 Related Documentation

- [UI Components](./ui/README.md) - shadcn/ui component library
- [Admin Components](./admin/README.md) - Admin panel components
- [Pages](../pages/README.md) - Page-level components
