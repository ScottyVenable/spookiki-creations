import type { OrderStatus } from '@/lib/types'
import { Badge } from './ui/badge'

interface OrderStatusBadgeProps {
  status: OrderStatus
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const variants: Record<OrderStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    pending: { label: 'Pending', variant: 'secondary' },
    awaiting_payment: { label: 'Awaiting Payment', variant: 'outline' },
    paid: { label: 'Paid', variant: 'default' },
    shipped: { label: 'Shipped', variant: 'default' },
    cancelled: { label: 'Cancelled', variant: 'destructive' },
  }

  const { label, variant } = variants[status]

  return <Badge variant={variant}>{label}</Badge>
}
