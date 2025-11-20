import { useKV } from '@github/spark/hooks'

/**
 * Enhanced KV hook - basic wrapper around useKV for consistency
 * Note: KV operations are synchronous, so error handling happens at the storage layer
 */
export function useKVSafe<T>(
  key: string,
  initialValue: T
): [T | null, (value: T | ((current: T | null) => T)) => void] {
  const [data, setData] = useKV<T>(key, initialValue)
  return [data, setData]
}

/**
 * Safely parse JSON with error handling
 */
export function safeJSONParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json)
  } catch {
    return fallback
  }
}

/**
 * Format date for display
 */
export function formatDate(date: string | Date): string {
  try {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  } catch {
    return 'Invalid date'
  }
}

/**
 * Format datetime for display
 */
export function formatDateTime(date: string | Date): string {
  try {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return 'Invalid date'
  }
}
