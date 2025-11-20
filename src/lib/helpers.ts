import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'

/**
 * Enhanced KV hook with error handling and loading states
 */
export function useKVWithFeedback<T>(
  key: string,
  initialValue: T
): [T | null, (value: T | ((current: T | null) => T)) => void, boolean, Error | null] {
  const [data, setData] = useKV<T>(key, initialValue)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const setDataWithFeedback = (value: T | ((current: T | null) => T)) => {
    setLoading(true)
    setError(null)
    
    try {
      setData(value)
      setLoading(false)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to save data')
      setError(error)
      toast.error(`Failed to save: ${error.message}`)
      setLoading(false)
    }
  }

  return [data, setDataWithFeedback, loading, error]
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
