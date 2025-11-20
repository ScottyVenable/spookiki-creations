import type { User } from './types'

export interface AuthUser {
  id: string
  username: string
  name: string
  role: 'admin' | 'customer'
}

export const INITIAL_USERS: Record<string, { password: string; name: string; role: 'admin' | 'customer' }> = {
  'spookiki': {
    password: 'welcome123',
    name: 'Kiki',
    role: 'admin'
  },
  'Scotty2Hotty999': {
    password: 'SVen!8019',
    name: 'Scotty',
    role: 'admin'
  }
}

export function authenticateUser(username: string, password: string): AuthUser | null {
  const userConfig = INITIAL_USERS[username]
  
  if (!userConfig) {
    return null
  }
  
  if (userConfig.password !== password) {
    return null
  }
  
  return {
    id: username.toLowerCase(),
    username,
    name: userConfig.name,
    role: userConfig.role
  }
}

export function hashPassword(password: string): string {
  return btoa(password)
}

export function verifyPassword(password: string, hash: string): boolean {
  return btoa(password) === hash
}
