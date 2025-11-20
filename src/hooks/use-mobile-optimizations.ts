import { useEffect, useState } from "react"
import { useIsMobile } from "./use-mobile"

export interface MobileOptimizations {
  isMobile: boolean
  reduceMotion: boolean
  prefersReducedData: boolean
  isSlowConnection: boolean
}

/**
 * Hook to detect mobile device and determine optimization strategies
 * Returns flags for various mobile-specific optimizations
 */
export function useMobileOptimizations(): MobileOptimizations {
  const isMobile = useIsMobile()
  const [reduceMotion, setReduceMotion] = useState(false)
  const [prefersReducedData, setPrefersReducedData] = useState(false)
  const [isSlowConnection, setIsSlowConnection] = useState(false)

  useEffect(() => {
    // Check for prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduceMotion(motionQuery.matches)
    
    const handleMotionChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
    motionQuery.addEventListener("change", handleMotionChange)

    // Check for save-data preference
    const saveDataQuery = window.matchMedia("(prefers-reduced-data: reduce)")
    setPrefersReducedData(saveDataQuery.matches)

    // Check connection speed if available
    interface NetworkInformation {
      effectiveType?: string
      addEventListener?: (type: string, listener: () => void) => void
      removeEventListener?: (type: string, listener: () => void) => void
    }
    const connection = (navigator as { connection?: NetworkInformation }).connection || 
                      (navigator as { mozConnection?: NetworkInformation }).mozConnection || 
                      (navigator as { webkitConnection?: NetworkInformation }).webkitConnection
    if (connection) {
      const updateConnectionStatus = () => {
        const effectiveType = connection.effectiveType
        setIsSlowConnection(effectiveType === "slow-2g" || effectiveType === "2g")
      }
      updateConnectionStatus()
      if (connection.addEventListener) {
        connection.addEventListener("change", updateConnectionStatus)
      }
      
      return () => {
        motionQuery.removeEventListener("change", handleMotionChange)
        if (connection.removeEventListener) {
          connection.removeEventListener("change", updateConnectionStatus)
        }
      }
    }

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange)
    }
  }, [])

  return {
    isMobile,
    reduceMotion: reduceMotion || (isMobile && isSlowConnection),
    prefersReducedData: prefersReducedData || isSlowConnection,
    isSlowConnection,
  }
}
