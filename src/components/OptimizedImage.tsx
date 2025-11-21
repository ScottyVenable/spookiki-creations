import { useState, useEffect, useRef } from 'react'
import { useMobileOptimizationContext } from '@/contexts/MobileOptimizationContext'

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  className?: string
  eager?: boolean
}

/**
 * Optimized image component with lazy loading and mobile optimizations
 * - Lazy loads images on mobile to save bandwidth
 * - Uses native lazy loading when available
 * - Provides loading state
 */
export function OptimizedImage({ src, alt, className = '', eager = false, ...props }: OptimizedImageProps) {
  const { isMobile, prefersReducedData } = useMobileOptimizationContext()
  const [isLoaded, setIsLoaded] = useState(eager) // Start loaded if eager
  const [isInView, setIsInView] = useState(eager)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (eager || !imgRef.current) {
      setIsInView(true)
      return
    }

    // Use IntersectionObserver for lazy loading on mobile
    if (isMobile || prefersReducedData) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true)
              observer.disconnect()
            }
          })
        },
        {
          rootMargin: '50px', // Start loading slightly before visible
        }
      )

      observer.observe(imgRef.current)
      return () => observer.disconnect()
    } else {
      // On desktop, load immediately
      setIsInView(true)
    }
  }, [isMobile, prefersReducedData, eager])

  return (
    <img
      ref={imgRef}
      src={isInView ? src : ''}
      alt={alt}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      loading={eager ? 'eager' : 'lazy'}
      onLoad={() => setIsLoaded(true)}
      {...props}
    />
  )
}
