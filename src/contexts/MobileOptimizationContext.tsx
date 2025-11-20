import { createContext, useContext, ReactNode } from 'react'
import { useMobileOptimizations, MobileOptimizations } from '@/hooks/use-mobile-optimizations'

const MobileOptimizationContext = createContext<MobileOptimizations>({
  isMobile: false,
  reduceMotion: false,
  prefersReducedData: false,
  isSlowConnection: false,
})

export function useMobileOptimizationContext() {
  return useContext(MobileOptimizationContext)
}

interface MobileOptimizationProviderProps {
  children: ReactNode
}

/**
 * Provider component that makes mobile optimization settings available throughout the app
 * Detects mobile device, connection speed, and user preferences
 */
export function MobileOptimizationProvider({ children }: MobileOptimizationProviderProps) {
  const optimizations = useMobileOptimizations()
  
  return (
    <MobileOptimizationContext.Provider value={optimizations}>
      {children}
    </MobileOptimizationContext.Provider>
  )
}
