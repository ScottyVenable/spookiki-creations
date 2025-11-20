import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { OrderStatusBadge } from '@/components/OrderStatusBadge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Link } from '@/components/Link'
import { useKV } from '@github/spark/hooks'
import type { Order, Product, OrderStatus } from '@/lib/types'
import { formatPrice } from '@/lib/data'
import { Package, ShoppingCart, CurrencyDollar, Sparkle } from '@phosphor-icons/react'

export default function AdminPage() {
  const [orders, setOrders] = useKV<Order[]>('orders', [])
  const [products] = useKV<Product[]>('products', [])

  const allOrders = orders || []
  const allProducts = products || []

  const pendingOrders = allOrders.filter(o => o.status === 'awaiting_payment')
  const paidOrders = allOrders.filter(o => o.status === 'paid')
  const totalRevenue = allOrders
    .filter(o => o.status === 'paid' || o.status === 'shipped')
    .reduce((sum, o) => sum + o.total, 0)

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
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Spookiki Admin
            </h1>
            <Link href="/">
              <Button variant="outline">View Store</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Pending Payment</span>
              <Package className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">{pendingOrders.length}</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Paid Orders</span>
              <ShoppingCart className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">{paidOrders.length}</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Revenue</span>
              <CurrencyDollar className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">{formatPrice(totalRevenue)}</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Active Products</span>
              <Sparkle className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">
              {allProducts.filter(p => p.status === 'active').length}
            </div>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
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
          </TabsContent>

          <TabsContent value="products">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  All Products
                </h2>
                <Button>Add Product</Button>
              </div>

              <div className="space-y-4">
                {allProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 border border-border rounded-lg p-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1">
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-sm text-muted-foreground">{product.category}</div>
                    </div>

                    <div className="text-right">
                      <div className="font-medium">{formatPrice(product.price)}</div>
                      <div className="text-sm text-muted-foreground">Stock: {product.stock_quantity}</div>
                    </div>

                    <div className="flex gap-2">
                      {product.is_featured && <Badge variant="default">Featured</Badge>}
                      <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                        {product.status}
                      </Badge>
                    </div>

                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
