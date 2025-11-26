/**
 * useCloudStorage - A cross-device compatible storage hook
 * 
 * This hook provides persistent storage that works across devices using:
 * 1. Firebase Realtime Database (cloud sync) - when configured
 * 2. localStorage (fallback) - for offline/development
 * 
 * Features:
 * - Real-time sync across all devices when Firebase is configured
 * - Automatic migration of localStorage data to Firebase on first connection
 * - localStorage backup for offline access
 * - Seamless fallback when Firebase is unavailable
 * 
 * Free tier limits (Firebase Spark Plan):
 * - 1 GB storage
 * - 10 GB/month data transfer
 * - 100 simultaneous connections
 * 
 * Perfect for a small e-commerce site!
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { 
  getDatabase, 
  ref, 
  onValue, 
  set, 
  Database,
  off
} from 'firebase/database'

// Firebase configuration - users should set these in their environment
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
}

// Check if Firebase is configured
const isFirebaseConfigured = (): boolean => {
  return !!(
    firebaseConfig.apiKey && 
    firebaseConfig.databaseURL && 
    firebaseConfig.projectId
  )
}

// Singleton Firebase instances
let firebaseApp: FirebaseApp | null = null
let database: Database | null = null

// Track which keys have been migrated to avoid duplicate migrations
const migratedKeys = new Set<string>()

// Initialize Firebase only once
const initializeFirebase = (): Database | null => {
  if (!isFirebaseConfigured()) {
    console.info('Firebase not configured. Using localStorage fallback.')
    return null
  }

  if (!firebaseApp) {
    const existingApps = getApps()
    if (existingApps.length > 0) {
      firebaseApp = existingApps[0]
    } else {
      try {
        firebaseApp = initializeApp(firebaseConfig)
      } catch (error) {
        console.warn('Failed to initialize Firebase:', error)
        return null
      }
    }
  }

  if (!database && firebaseApp) {
    try {
      database = getDatabase(firebaseApp)
    } catch (error) {
      console.warn('Failed to get Firebase database:', error)
      return null
    }
  }

  return database
}

/**
 * Helper function to check if a value is "empty" for migration purposes
 * Empty means: null, undefined, empty array, or empty object (non-array)
 */
function isEmptyValue<T>(value: T): boolean {
  if (value === null || value === undefined) return true
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value as object).length === 0
  return false
}

/**
 * Helper function to get data from localStorage
 */
function getLocalStorageData<T>(sanitizedKey: string): T | null {
  try {
    const item = localStorage.getItem(`spookiki_${sanitizedKey}`)
    if (item !== null) {
      return JSON.parse(item) as T
    }
  } catch (error) {
    console.warn(`Error reading localStorage for ${sanitizedKey}:`, error)
  }
  return null
}

// Type for the setter function to match React's useState pattern
type SetValue<T> = T | ((prev: T) => T)

/**
 * Custom hook for cloud-synced storage with localStorage fallback
 * 
 * @param key - The storage key
 * @param initialValue - Default value if nothing is stored
 * @returns [value, setValue] tuple like useState
 */
export function useCloudStorage<T>(
  key: string, 
  initialValue: T
): [T, (value: SetValue<T>) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const dbRef = useRef<Database | null>(null)
  const unsubscribeRef = useRef<(() => void) | null>(null)
  // Use ref to avoid re-running effect when initialValue changes
  const initialValueRef = useRef<T>(initialValue)

  // Sanitize key for Firebase (no dots, $, #, [, ], /)
  const sanitizedKey = key.replace(/[.#$[\]/]/g, '_')

  // Initialize and subscribe to Firebase or localStorage
  useEffect(() => {
    const db = initializeFirebase()
    dbRef.current = db

    if (db) {
      // Firebase mode - subscribe to real-time updates
      const dataRef = ref(db, `spookiki/${sanitizedKey}`)
      
      const unsubscribe = onValue(dataRef, (snapshot) => {
        const firebaseData = snapshot.val()
        
        if (firebaseData !== null) {
          // Firebase has data - use it and sync to localStorage
          setStoredValue(firebaseData)
          // Keep localStorage in sync with Firebase
          try {
            localStorage.setItem(`spookiki_${sanitizedKey}`, JSON.stringify(firebaseData))
          } catch (error) {
            console.warn(`Error syncing to localStorage for ${key}:`, error)
          }
        } else {
          // Firebase has no data - check if we should migrate from localStorage
          const localData = getLocalStorageData<T>(sanitizedKey)
          
          if (!isEmptyValue(localData) && !migratedKeys.has(sanitizedKey)) {
            // Migrate localStorage data to Firebase
            migratedKeys.add(sanitizedKey)
            console.info(`Migrating localStorage data to Firebase for key: ${key}`)
            set(dataRef, localData).then(() => {
              console.info(`Successfully migrated ${key} to Firebase`)
            }).catch(error => {
              console.warn(`Failed to migrate ${key} to Firebase:`, error)
              migratedKeys.delete(sanitizedKey)
            })
            setStoredValue(localData as T)
          } else {
            // No data anywhere - use initial value
            setStoredValue(initialValueRef.current)
          }
        }
      }, (error) => {
        console.warn(`Firebase read error for ${key}:`, error)
        // Fallback to localStorage on Firebase error
        loadFromLocalStorage()
      })

      unsubscribeRef.current = () => {
        off(dataRef)
        unsubscribe()
      }
    } else {
      // localStorage fallback mode
      loadFromLocalStorage()
    }

    function loadFromLocalStorage() {
      const localData = getLocalStorageData<T>(sanitizedKey)
      if (localData !== null) {
        setStoredValue(localData)
      } else {
        setStoredValue(initialValueRef.current)
      }
    }

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
      }
    }
  }, [sanitizedKey, key])

  // Save function that writes to both Firebase and localStorage
  const setValue = useCallback((value: SetValue<T>) => {
    setStoredValue(prevValue => {
      const newValue = value instanceof Function ? value(prevValue) : value

      // Save to Firebase if available
      if (dbRef.current) {
        const dataRef = ref(dbRef.current, `spookiki/${sanitizedKey}`)
        set(dataRef, newValue).catch(error => {
          console.warn(`Firebase write error for ${key}:`, error)
        })
      }

      // Always save to localStorage as backup
      try {
        localStorage.setItem(`spookiki_${sanitizedKey}`, JSON.stringify(newValue))
      } catch (error) {
        console.warn(`Error writing to localStorage for ${key}:`, error)
      }

      return newValue
    })
  }, [sanitizedKey, key])

  return [storedValue, setValue]
}

/**
 * Alias for backwards compatibility with useKV pattern
 */
export const useKVReplacement = useCloudStorage

// Export for checking if cloud storage is available
export { isFirebaseConfigured }
