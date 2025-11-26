import type { User } from './types'

export interface AuthUser {
  id: string
  username: string
  name: string
  role: 'admin' | 'customer'
}

// Parse admin users from environment variable
// Format: username:password:displayName:role (separated by | for multiple users)
function parseAdminUsers(): Record<string, { password: string; name: string; role: 'admin' | 'customer' }> {
  const adminUsersEnv = import.meta.env.VITE_ADMIN_USERS || ''
  
  if (!adminUsersEnv) {
    console.warn('No admin users configured. Set VITE_ADMIN_USERS in your .env file.')
    return {}
  }
  
  const users: Record<string, { password: string; name: string; role: 'admin' | 'customer' }> = {}
  
  const userEntries = adminUsersEnv.split('|')
  for (const entry of userEntries) {
    const [username, password, name, role] = entry.split(':')
    if (username && password && name && role) {
      users[username] = {
        password,
        name,
        role: role as 'admin' | 'customer'
      }
    }
  }
  
  return users
}

export const INITIAL_USERS = parseAdminUsers()

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
