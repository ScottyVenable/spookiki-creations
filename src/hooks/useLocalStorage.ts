import { useState, useEffect, useCallback } from 'react'

/**
 * A hook that works similarly to React.useState, but persists the value using localStorage.
 * The value is automatically retrieved from localStorage on mount and updated on state change.
 * This is a fallback for when the Spark Runtime KV store is not available.
 *
 * @param key - The key under which to store the value in localStorage.
 * @param initialValue - The initial value to use if no stored value is found.
 * @returns An array containing the current value, a setter function, and a delete function.
 */
export function useLocalStorage<T = string>(
  key: string,
  initialValue?: T
): readonly [T | undefined, (newValue: T | ((oldValue?: T) => T)) => void, () => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error, return initialValue
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback(
    (value: T | ((oldValue?: T) => T)) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value
        // Save state
        setStoredValue(valueToStore)
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue]
  )

  // Function to delete the value from localStorage
  const deleteValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(undefined)
    } catch (error) {
      console.error(`Error deleting localStorage key "${key}":`, error)
    }
  }, [key])

  // Listen for changes to this key from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch (error) {
          console.error(`Error parsing storage event for key "${key}":`, error)
        }
      } else if (e.key === key && e.newValue === null) {
        setStoredValue(undefined)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key])

  return [storedValue, setValue, deleteValue] as const
}
