# 🪝 Hooks Directory

This directory contains custom React hooks for reusable logic across the application.

## 📁 Files

```
hooks/
├── use-mobile.ts                  # Mobile device detection
├── use-mobile-optimizations.ts    # Mobile optimization utilities
└── useCloudStorage.ts             # Firebase/localStorage sync hook
```

## 📄 Hook Descriptions

### useCloudStorage.ts

Provides cross-device synchronized storage using Firebase Realtime Database with localStorage fallback.

**Usage:**
```tsx
import { useCloudStorage } from '@/hooks/useCloudStorage'

function MyComponent() {
  const [products, setProducts] = useCloudStorage<Product[]>('products', [])
  
  const handleAddProduct = (product: Product) => {
    setProducts(current => [...current, product])
  }
  
  return (
    <div>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}
```

**Features:**
- Real-time sync across all devices when Firebase is configured
- Automatic migration of localStorage data to Firebase on first connection
- localStorage backup for offline access
- Seamless fallback when Firebase is unavailable
- Same API as React's useState

**Configuration:**
Set these environment variables in `.env`:
```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

**Data Synced:**
- Products catalog
- Customer orders
- Shopping cart
- User credentials
- Website settings
- Newsletter subscribers
- Blog posts

See [Cloud Storage Setup Guide](../../docs/setup/CLOUD_STORAGE.md) for detailed setup instructions.

### use-mobile.ts

Detects if the user is on a mobile device based on viewport width.

**Usage:**
```tsx
import { useMobile } from '@/hooks/use-mobile'

function MyComponent() {
  const isMobile = useMobile()
  
  return (
    <div>
      {isMobile ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
    </div>
  )
}
```

**Features:**
- Listens to window resize events
- Uses media query for breakpoint detection
- Cleans up event listeners on unmount
- SSR-safe with default desktop behavior

**Implementation Details:**
```tsx
export function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [breakpoint])
  
  return isMobile
}
```

### use-mobile-optimizations.ts

Provides mobile-specific optimizations and utilities.

**Usage:**
```tsx
import { useMobileOptimizations } from '@/hooks/use-mobile-optimizations'

function MyComponent() {
  const { 
    isMobile,
    isTouch,
    reducedMotion,
    orientation 
  } = useMobileOptimizations()
  
  return (
    <div className={cn(
      "transition-all",
      reducedMotion && "transition-none"
    )}>
      {/* Content */}
    </div>
  )
}
```

**Features:**
- Mobile device detection
- Touch device detection
- Reduced motion preference detection
- Screen orientation detection
- Viewport dimension tracking

**Return Values:**
| Property | Type | Description |
|----------|------|-------------|
| `isMobile` | `boolean` | True if viewport width < 768px |
| `isTouch` | `boolean` | True if device supports touch |
| `reducedMotion` | `boolean` | True if user prefers reduced motion |
| `orientation` | `'portrait' \| 'landscape'` | Current device orientation |
| `viewport` | `{ width: number, height: number }` | Current viewport dimensions |

## 🎯 Hook Patterns

### Basic Hook Structure
```tsx
import { useState, useEffect } from 'react'

export function useCustomHook(options?: HookOptions) {
  // State
  const [state, setState] = useState(initialState)
  
  // Effects
  useEffect(() => {
    // Setup
    return () => {
      // Cleanup
    }
  }, [dependencies])
  
  // Return value
  return state
}
```

### Hook with Options
```tsx
interface UseMobileOptions {
  breakpoint?: number
  debounce?: number
}

export function useMobile(options: UseMobileOptions = {}) {
  const { breakpoint = 768, debounce = 100 } = options
  // ...
}
```

### Hook Returning Object
```tsx
export function useMobileOptimizations() {
  // Multiple state values
  
  return {
    isMobile,
    isTouch,
    reducedMotion,
    orientation,
    viewport
  }
}
```

## 🔧 Creating New Hooks

When creating a new hook:

1. **Naming**: Use `use-kebab-case.ts` filename
2. **Export**: Export hook as named function `useHookName`
3. **TypeScript**: Add proper type definitions
4. **Cleanup**: Always clean up subscriptions/listeners
5. **SSR Safety**: Handle server-side rendering

### Example Template
```tsx
import { useState, useEffect, useCallback } from 'react'

interface UseExampleOptions {
  enabled?: boolean
}

interface UseExampleReturn {
  value: string
  setValue: (value: string) => void
  reset: () => void
}

export function useExample(
  options: UseExampleOptions = {}
): UseExampleReturn {
  const { enabled = true } = options
  
  const [value, setValue] = useState('')
  
  const reset = useCallback(() => {
    setValue('')
  }, [])
  
  useEffect(() => {
    if (!enabled) return
    
    // Setup logic
    
    return () => {
      // Cleanup
    }
  }, [enabled])
  
  return { value, setValue, reset }
}
```

## 📚 Related Documentation

- [Contexts](../contexts/README.md) - Context providers using hooks
- [Components](../components/README.md) - Components using hooks
- [React Hooks Documentation](https://react.dev/reference/react)
