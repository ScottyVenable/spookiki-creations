import { createContext, useContext, ReactNode, useEffect, useState } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import type { AuthUser } from '@/lib/auth'
import { authenticateUser, INITIAL_USERS, hashPassword } from '@/lib/auth'

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentSession, setCurrentSession] = useLocalStorage<string | null>('current-user-session', null)
  const [userCredentials, setUserCredentials] = useLocalStorage<Record<string, UserCredentials>>('user-credentials', {})
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const initializeUsers = async () => {
      const creds = userCredentials || {}
      let needsUpdate = false
      const updatedCreds = { ...creds }

      Object.entries(INITIAL_USERS).forEach(([username, config]) => {
        if (!updatedCreds[username]) {
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
        setUserCredentials(updatedCreds)
      }
    }

    initializeUsers()
  }, [])

  useEffect(() => {
    if (currentSession) {
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
        setCurrentSession(null)
        setCurrentUser(null)
      }
    } else {
      setCurrentUser(null)
    }
  }, [currentSession, userCredentials])

  const login = (username: string, password: string): boolean => {
    const creds = userCredentials || {}
    const userCred = creds[username]
    
    if (!userCred) {
      return false
    }
    
    if (hashPassword(password) !== userCred.passwordHash) {
      return false
    }
    
    setCurrentSession(username)
    return true
  }

  const logout = () => {
    setCurrentSession(null)
    setCurrentUser(null)
  }

  const changePassword = (newPassword: string) => {
    if (!currentUser) return
    
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
    <AuthContext.Provider value={{ currentUser, login, logout, changePassword, isAdmin }}>
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
