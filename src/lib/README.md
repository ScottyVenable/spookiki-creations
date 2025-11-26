# 📚 Library Directory

This directory contains utility functions, type definitions, and shared code used throughout the application.

## 📁 Files

```
lib/
├── utils.ts           # General utility functions
├── types.ts           # TypeScript type definitions
├── data.ts            # Sample/fallback data
├── auth.ts            # Authentication utilities
└── notifications.ts   # Notification helpers
```

## 📄 File Descriptions

### utils.ts

General utility functions used across the application.

**Key Functions:**

```tsx
// Merge class names with Tailwind CSS support
cn(...classes: ClassValue[]): string

// Example usage
<div className={cn(
  "base-class",
  isActive && "active-class",
  variant === "primary" && "primary-styles"
)} />
```

### types.ts

TypeScript type definitions for core data models.

**Key Types:**

```tsx
// Product type
interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: 'art' | 'ornament' | 'snake' | 'other'
  status: 'active' | 'draft' | 'archived'
  stock: number
  isFeatured: boolean
  material?: string
  gemstone?: string
  gemstoneMeaning?: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

// Order type
interface Order {
  id: string
  items: OrderItem[]
  customer: CustomerInfo
  shipping: ShippingAddress
  status: OrderStatus
  paymentMethod: string
  subtotal: number
  shipping: number
  total: number
  createdAt: string
}

// User type
interface User {
  id: string
  username: string
  name: string
  role: 'admin' | 'customer'
  email?: string
}

// Blog post type
interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  author: string
  tags: string[]
  publishedAt: string
  status: 'published' | 'draft'
}
```

### data.ts

Sample and fallback data used when real data is unavailable.

**Contents:**
- `sampleProducts` - Default product catalog
- `sampleBlogPosts` - Default blog posts
- `sampleOrders` - Sample order data
- `categories` - Product category definitions
- `gemMeanings` - Gemstone metaphysical meanings

**Usage:**
```tsx
import { sampleProducts, sampleBlogPosts } from '@/lib/data'

// Use as fallback
const products = loadedProducts || sampleProducts
```

### auth.ts

Authentication utilities and user management.

**Key Functions:**

```tsx
// Authenticate user
authenticateUser(username: string, password: string): User | null

// Check if user is admin
isAdmin(user: User): boolean

// Get initial admin users
getInitialUsers(): User[]

// Hash password (demo level)
hashPassword(password: string): string

// Verify password
verifyPassword(password: string, hash: string): boolean
```

**Initial Users:**
```tsx
// Pre-configured admin accounts
{
  username: 'spookiki',
  password: 'welcome123',
  role: 'admin'
},
{
  username: 'Scotty2Hotty999',
  password: 'SVen!8019',
  role: 'admin'
}
```

### notifications.ts

Notification and toast helpers.

**Key Functions:**

```tsx
// Show success notification
showSuccess(message: string): void

// Show error notification
showError(message: string): void

// Show info notification
showInfo(message: string): void

// Show loading notification
showLoading(message: string): void
```

## 🎯 Usage Patterns

### Importing Types
```tsx
import type { Product, Order, User } from '@/lib/types'

function ProductCard({ product }: { product: Product }) {
  // ...
}
```

### Using Utilities
```tsx
import { cn } from '@/lib/utils'

<button className={cn(
  "px-4 py-2 rounded",
  variant === "primary" && "bg-primary text-white",
  disabled && "opacity-50 cursor-not-allowed"
)}>
```

### Authentication Flow
```tsx
import { authenticateUser, isAdmin } from '@/lib/auth'

const user = authenticateUser(username, password)
if (user && isAdmin(user)) {
  // Allow admin access
}
```

## 🔧 Adding New Utilities

When adding new utilities:

1. Choose appropriate file or create new one
2. Export with clear naming
3. Add TypeScript types
4. Document usage in this README

## 📚 Related Documentation

- [Contexts](../contexts/README.md) - Global state using lib types
- [Components](../components/README.md) - Components using utilities
- [Hooks](../hooks/README.md) - Hooks using lib functions
