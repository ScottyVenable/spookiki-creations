import { CircleNotch } from '@phosphor-icons/react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <CircleNotch className={`${sizeClasses[size]} animate-spin text-primary`} />
    </div>
  )
}

export function LoadingSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-muted rounded ${className}`} />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <LoadingSkeleton className="h-64 w-full" />
      <div className="p-4 space-y-3">
        <LoadingSkeleton className="h-4 w-3/4" />
        <LoadingSkeleton className="h-4 w-1/2" />
        <LoadingSkeleton className="h-10 w-full" />
      </div>
    </div>
  )
}
