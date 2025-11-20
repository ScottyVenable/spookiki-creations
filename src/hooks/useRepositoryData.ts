import { useState, useEffect, useCallback } from 'react'

/**
 * A hook for managing data from repository JSON files with admin edits stored in localStorage.
 * This provides a hybrid storage solution:
 * - Base data comes from JSON files in the repository (version controlled)
 * - Admin modifications are stored in localStorage (session-specific)
 * - Merges both sources, with localStorage taking precedence
 * 
 * Note: This hook stores the complete modified dataset in localStorage (not just diffs).
 * This is intentional to match the existing admin panel workflow where the entire
 * product/blog list is updated on each modification.
 * 
 * @param dataUrl - URL to the JSON file in the repository (e.g., '/data/products.json')
 * @param localStorageKey - Key for localStorage to store admin modifications
 * @returns An array containing the merged data, a setter function, and a delete function
 * 
 * @template T - Data type must have an `id: string` property for merging logic
 */
export function useRepositoryData<T extends { id: string }>(
  dataUrl: string,
  localStorageKey: string
): readonly [T[] | undefined, (newValue: T[] | ((oldValue?: T[]) => T[])) => void, () => void] {
  const [repoData, setRepoData] = useState<T[]>([])
  const [localData, setLocalData] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load data from repository JSON file
  useEffect(() => {
    const loadRepoData = async () => {
      try {
        const response = await fetch(dataUrl)
        if (response.ok) {
          const data = await response.json()
          setRepoData(data)
        } else {
          console.error(`Failed to load repository data from ${dataUrl}`)
        }
      } catch (error) {
        console.error(`Error loading repository data from ${dataUrl}:`, error)
      } finally {
        setIsLoading(false)
      }
    }

    loadRepoData()
  }, [dataUrl])

  // Load local modifications from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      const item = window.localStorage.getItem(localStorageKey)
      if (item !== null) {
        setLocalData(JSON.parse(item))
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${localStorageKey}":`, error)
    }
  }, [localStorageKey])

  // Merge repository data with local modifications
  const mergedData = useCallback(() => {
    if (isLoading) {
      return undefined
    }

    // Create a map of local items by ID
    const localMap = new Map(localData.map(item => [item.id, item]))

    // Merge: start with repo data, then apply local modifications
    const merged: T[] = []
    
    // Add all items from repo, but use local version if available
    repoData.forEach(repoItem => {
      const localItem = localMap.get(repoItem.id)
      merged.push(localItem || repoItem)
      if (localItem) {
        localMap.delete(repoItem.id) // Mark as processed
      }
    })

    // Add any new items that only exist in local storage
    localMap.forEach(localItem => {
      merged.push(localItem)
    })

    return merged
  }, [repoData, localData, isLoading])

  // Setter function that only modifies localStorage
  const setValue = useCallback(
    (value: T[] | ((oldValue?: T[]) => T[])) => {
      try {
        const currentMerged = mergedData()
        const valueToStore = typeof value === 'function' 
          ? (value as (oldValue?: T[]) => T[])(currentMerged) 
          : value

        setLocalData(valueToStore)
        
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(localStorageKey, JSON.stringify(valueToStore))
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${localStorageKey}":`, error)
      }
    },
    [localStorageKey, mergedData]
  )

  // Delete function clears localStorage modifications (reverts to repo data)
  const deleteValue = useCallback(() => {
    try {
      setLocalData([])
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(localStorageKey)
      }
    } catch (error) {
      console.error(`Error deleting localStorage key "${localStorageKey}":`, error)
    }
  }, [localStorageKey])

  return [mergedData(), setValue, deleteValue] as const
}
