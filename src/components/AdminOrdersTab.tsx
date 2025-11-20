import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { OrderStatusBadge } from '@/components/OrderStatusBadge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useKV } from '@github/spark/hooks'
import type { Order, OrderStatus } from '@/lib/types'
import { formatPrice } from '@/lib/data'
import { useAuth } from '@/contexts/AuthContext'
import { User } from '@phosphor-icons/react'

export function AdminOrdersTab() {
  const [orders, setOrders] = useKV<Order[]>('orders', [])
  const { currentUser } = useAuth()

  const allOrders = orders || []

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const userName = currentUser?.name || currentUser?.username || 'Unknown Admin'
    setOrders((currentOrders) => {
      const safeOrders = currentOrders || []
      return safeOrders.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus, updated_at: new Date().toISOString(), status_updated_by: userName }
          : order
      )
    })
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
        All Orders
      </h2>

      {allOrders.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No orders yet
        </div>
      ) : (
        <div className="space-y-4">
          {allOrders
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .map((order) => (
              <div key={order.id} className="border border-border rounded-lg p-4">
                <div className="grid md:grid-cols-5 gap-4 items-start md:items-center">
                  <div>
                    <div className="font-semibold">#{order.id}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium">{order.shipping_name}</div>
                    <div className="text-sm text-muted-foreground">{order.email}</div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </div>
                    <div className="font-medium">{formatPrice(order.total)}</div>
                  </div>

                  <div>
                    <Select
                      value={order.status}
                      onValueChange={(value) => updateOrderStatus(order.id, value as OrderStatus)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="awaiting_payment">Awaiting Payment</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    {order.status_updated_by && (
                      <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <User className="h-3 w-3" />
                        Updated by {order.status_updated_by}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        window.history.pushState({}, '', `/order/${order.id}/confirmation`)
                        window.dispatchEvent(new PopStateEvent('popstate'))
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </Card>
  )
}
