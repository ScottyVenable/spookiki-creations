# 🔄 Contexts Directory

This directory contains React Context providers for managing global application state.

## 📁 Files

```
contexts/
├── AuthContext.tsx               # Authentication state management
└── MobileOptimizationContext.tsx # Mobile-responsive behavior
```

## 📄 Context Descriptions

### AuthContext.tsx

Manages user authentication state throughout the application.

**Features:**
- User login/logout
- Session persistence
- Role-based access control
- Password management

**Context Value:**
```tsx
interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>
}
```

**Usage:**
```tsx
import { useAuth } from '@/contexts/AuthContext'

function MyComponent() {
  const { user, isAuthenticated, isAdmin, login, logout } = useAuth()
  
  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />
  }
  
  return (
    <div>
      <p>Welcome, {user.name}!</p>
      {isAdmin && <AdminLink />}
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

**Provider Setup:**
```tsx
// In App.tsx
import { AuthProvider } from '@/contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      {/* App content */}
    </AuthProvider>
  )
}
```

### MobileOptimizationContext.tsx

Provides mobile-responsive behavior and optimization flags.

**Features:**
- Mobile device detection
- Touch device detection
- Reduced motion preferences
- Viewport tracking
- Performance optimizations

**Context Value:**
```tsx
interface MobileOptimizationContextType {
  isMobile: boolean
  isTouch: boolean
  reducedMotion: boolean
  orientation: 'portrait' | 'landscape'
  viewport: { width: number; height: number }
}
```

**Usage:**
```tsx
import { useMobileOptimization } from '@/contexts/MobileOptimizationContext'

function MyComponent() {
  const { isMobile, reducedMotion } = useMobileOptimization()
  
  return (
    <div className={cn(
      "grid",
      isMobile ? "grid-cols-1" : "grid-cols-3"
    )}>
      <AnimatedElement 
        disabled={reducedMotion}
      />
    </div>
  )
}
```

**Provider Setup:**
```tsx
// In App.tsx
import { MobileOptimizationProvider } from '@/contexts/MobileOptimizationContext'

function App() {
  return (
    <MobileOptimizationProvider>
      {/* App content */}
    </MobileOptimizationProvider>
  )
}
```

## 🎯 Context Patterns

### Basic Context Structure
```tsx
import { createContext, useContext, useState, ReactNode } from 'react'

// Types
interface MyContextType {
  value: string
  setValue: (value: string) => void
}

// Context
const MyContext = createContext<MyContextType | undefined>(undefined)

// Provider
export function MyProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState('')
  
  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  )
}

// Hook
export function useMyContext() {
  const context = useContext(MyContext)
  if (context === undefined) {
    throw new Error('useMyContext must be used within MyProvider')
  }
  return context
}
```

### Context with Persistence
```tsx
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Load from localStorage on init
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })
  
  useEffect(() => {
    // Persist to localStorage
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])
  
  // ... rest of provider
}
```

### Context with Complex State
```tsx
import { useReducer } from 'react'

type Action = 
  | { type: 'LOGIN'; user: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; updates: Partial<User> }

function authReducer(state: AuthState, action: Action): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.user, isAuthenticated: true }
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false }
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user!, ...action.updates } }
    default:
      return state
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)
  // ...
}
```

## 🔧 Creating New Contexts

When creating a new context:

1. **File Naming**: Use `PascalCaseContext.tsx`
2. **Export**: Provider component and hook
3. **TypeScript**: Define context type interface
4. **Error Handling**: Throw if hook used outside provider
5. **Default Values**: Consider if undefined or default needed

### Checklist
- [ ] Define TypeScript interface for context value
- [ ] Create context with `createContext`
- [ ] Create provider component
- [ ] Create custom hook with error checking
- [ ] Add to App.tsx provider hierarchy
- [ ] Document in this README

## 📚 Provider Hierarchy

The context providers are nested in `App.tsx`:

```tsx
<MobileOptimizationProvider>
  <AuthProvider>
    <Router />
    <Toaster />
  </AuthProvider>
</MobileOptimizationProvider>
```

**Order matters!** Inner providers can access outer context values.

## 📚 Related Documentation

- [Hooks](../hooks/README.md) - Custom hooks used in contexts
- [Components](../components/README.md) - Components consuming contexts
- [Lib](../lib/README.md) - Types and utilities used in contexts
