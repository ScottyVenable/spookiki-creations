# 📦 Source Code Directory

This directory contains all the source code for the Spookiki Creations e-commerce platform.

## 📁 Directory Structure

```
src/
├── components/     # Reusable React components
├── contexts/       # React Context providers for global state
├── hooks/          # Custom React hooks
├── lib/            # Utility functions, types, and data
├── pages/          # Page-level components (routes)
├── styles/         # CSS stylesheets and theming
├── App.tsx         # Root application component
├── main.tsx        # Application entry point
├── index.css       # Global CSS imports
├── main.css        # Main stylesheet
├── ErrorFallback.tsx  # Error boundary fallback UI
└── vite-end.d.ts   # Vite type declarations
```

## 🚀 Entry Points

### `main.tsx`
The application entry point that renders the root React component into the DOM.

### `App.tsx`
The root application component that sets up:
- `MobileOptimizationProvider` - Responsive behavior context
- `AuthProvider` - Authentication state management
- `Router` - Application routing
- `Toaster` - Toast notifications

## 📂 Subdirectories

### `/components`
Contains all reusable React components including:
- UI primitives (`ui/` - shadcn/ui components)
- Layout components (Header, Footer)
- Feature components (ProductCard, BlogCard, etc.)
- Admin components (Admin tabs, forms)

### `/contexts`
React Context providers for global state management:
- `AuthContext` - User authentication and session management
- `MobileOptimizationContext` - Mobile-responsive behavior

### `/hooks`
Custom React hooks for reusable logic:
- `use-mobile.ts` - Mobile detection hook
- `use-mobile-optimizations.ts` - Mobile optimization utilities

### `/lib`
Utility modules and shared code:
- `utils.ts` - General utility functions
- `types.ts` - TypeScript type definitions
- `data.ts` - Sample/fallback data
- `auth.ts` - Authentication utilities
- `notifications.ts` - Notification helpers

### `/pages`
Page-level components that map to routes:
- Homepage, Shop, Product Detail
- Blog Index, Blog Post
- Cart, Checkout, Order Confirmation
- Account, Admin
- About, Contact, FAQ

### `/styles`
CSS stylesheets:
- `theme.css` - Custom theme variables and styles

## 🎨 Styling Approach

The project uses a combination of:
- **Tailwind CSS** - Utility-first CSS framework
- **CSS Variables** - Custom theming via `theme.css`
- **shadcn/ui** - Pre-built component styles

## 📝 Code Conventions

### File Naming
- Components: `PascalCase.tsx` (e.g., `ProductCard.tsx`)
- Hooks: `use-kebab-case.ts` (e.g., `use-mobile.ts`)
- Utilities: `camelCase.ts` (e.g., `utils.ts`)

### Component Structure
```tsx
// imports
import { ... } from '...'

// types (if needed)
interface ComponentProps {
  // ...
}

// component
export function ComponentName({ ...props }: ComponentProps) {
  // hooks
  // handlers
  // render
  return (...)
}
```

### Path Aliases
The project uses `@/` as an alias for the `src/` directory:
```tsx
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
```

## 🔧 Development

### Adding a New Component
1. Create file in appropriate directory
2. Export from component
3. Import using `@/` alias

### Adding a New Page
1. Create page component in `/pages`
2. Add route in `/components/Router.tsx`

### Adding a New Hook
1. Create file in `/hooks`
2. Follow `use-*.ts` naming convention
3. Export hook function

## 📚 Related Documentation

- [Components README](./components/README.md)
- [Pages README](./pages/README.md)
- [Hooks README](./hooks/README.md)
- [Contexts README](./contexts/README.md)
- [Lib README](./lib/README.md)
- [Styles README](./styles/README.md)
