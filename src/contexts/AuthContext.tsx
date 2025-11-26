import { createContext, useContext, ReactNode, useEffect, useState, useRef } from 'react'
import { useCloudStorage } from '@/hooks/useCloudStorage'
import type { AuthUser } from '@/lib/auth'
import { INITIAL_USERS, hashPassword } from '@/lib/auth'

interface UserCredentials {
  username: string
  passwordHash: string
  name: string
  role: 'admin' | 'customer'
}

interface AuthContextType {
  currentUser: AuthUser | null
  login: (username: string, password: string) => boolean
  logout: () => void
  changePassword: (newPassword: string) => void
  isAdmin: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentSession, setCurrentSession] = useCloudStorage<string | null>('current-user-session', null)
  const [userCredentials, setUserCredentials] = useCloudStorage<Record<string, UserCredentials>>('user-credentials', {})
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const hasInitialized = useRef(false)

  // Initialize users from INITIAL_USERS env config
  useEffect(() => {
    // Only initialize once and only when we have something to work with
    if (hasInitialized.current) return
    
    // Skip if INITIAL_USERS is empty (env not loaded yet)
    if (Object.keys(INITIAL_USERS).length === 0) {
      console.warn('No admin users found in VITE_ADMIN_USERS environment variable')
      setIsLoading(false)
      return
    }

    const initializeUsers = () => {
      const creds = userCredentials || {}
      let needsUpdate = false
      const updatedCreds = { ...creds }

      Object.entries(INITIAL_USERS).forEach(([username, config]) => {
        if (!updatedCreds[username]) {
          console.log(`Initializing user: ${username}`)
          updatedCreds[username] = {
            username,
            passwordHash: hashPassword(config.password),
            name: config.name,
            role: config.role
          }
          needsUpdate = true
        }
      })

      if (needsUpdate) {
        console.log('Saving initial user credentials to cloud storage')
        setUserCredentials(updatedCreds)
      }
      
      hasInitialized.current = true
      setIsLoading(false)
    }

    // Give Firebase a moment to load existing data
    const timer = setTimeout(initializeUsers, 500)
    return () => clearTimeout(timer)
  }, [userCredentials, setUserCredentials])

  // Restore session when credentials are available
  useEffect(() => {
    if (currentSession && userCredentials) {
      const creds = userCredentials || {}
      const userCred = creds[currentSession]
      if (userCred) {
        setCurrentUser({
          id: currentSession.toLowerCase(),
          username: userCred.username,
          name: userCred.name,
          role: userCred.role
        })
      } else {
        // Session exists but no matching credentials - clear it
        setCurrentSession(null)
        setCurrentUser(null)
      }
    } else if (!currentSession) {
      setCurrentUser(null)
    }
  }, [currentSession, userCredentials, setCurrentSession])

  const login = (username: string, password: string): boolean => {
    console.log(`Login attempt for user: ${username}`)
    
    // First try stored credentials
    const creds = userCredentials || {}
    let userCred = creds[username]
    
    // If no stored credentials, check INITIAL_USERS directly (first login scenario)
    if (!userCred && INITIAL_USERS[username]) {
      console.log(`User ${username} not in cloud storage, checking INITIAL_USERS`)
      const initialUser = INITIAL_USERS[username]
      
      // Verify against initial password
      if (initialUser.password === password) {
        // Create the credential entry
        const newCred: UserCredentials = {
          username,
          passwordHash: hashPassword(password),
          name: initialUser.name,
          role: initialUser.role
        }
        
        // Save to cloud storage
        setUserCredentials(prev => ({
          ...(prev || {}),
          [username]: newCred
        }))
        
        // Set session
        setCurrentSession(username)
        console.log(`Login successful for ${username} (initial login)`)
        return true
      }
      
      console.log(`Password mismatch for ${username}`)
      return false
    }
    
    if (!userCred) {
      console.log(`User ${username} not found`)
      return false
    }
    
    // Verify password hash
    if (hashPassword(password) !== userCred.passwordHash) {
      console.log(`Password mismatch for ${username}`)
      return false
    }
    
    setCurrentSession(username)
    console.log(`Login successful for ${username}`)
    return true
  }

  const logout = () => {
    console.log('Logging out')
    setCurrentSession(null)
    setCurrentUser(null)
  }

  const changePassword = (newPassword: string) => {
    if (!currentUser) return
    
    console.log(`Changing password for ${currentUser.username}`)
    setUserCredentials((current) => {
      const updated = { ...(current || {}) }
      if (updated[currentUser.username]) {
        updated[currentUser.username] = {
          ...updated[currentUser.username],
          passwordHash: hashPassword(newPassword)
        }
      }
      return updated
    })
  }

  const isAdmin = currentUser?.role === 'admin'

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, changePassword, isAdmin, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
