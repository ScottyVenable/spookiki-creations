import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { OrderStatusBadge } from '@/components/OrderStatusBadge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import type { Order, OrderStatus } from '@/lib/types'
import { formatPrice } from '@/lib/data'

export function AdminOrdersTab() {
  const [orders, setOrders] = useLocalStorage<Order[]>('orders', [])

  const allOrders = orders || []

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((currentOrders) => {
      const safeOrders = currentOrders || []
      return safeOrders.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus, updated_at: new Date().toISOString() }
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
                <div className="grid md:grid-cols-5 gap-4 items-center">
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
