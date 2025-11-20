import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Link } from '@/components/Link'
import { useKV } from '@github/spark/hooks'
import { useAuth } from '@/contexts/AuthContext'
import type { Order, Product } from '@/lib/types'
import { formatPrice } from '@/lib/data'
import { Package, ShoppingCart, CurrencyDollar, Sparkle, House, SignOut } from '@phosphor-icons/react'
import { AdminProductsTab } from '@/components/AdminProductsTab'
import { AdminOrdersTab } from '@/components/AdminOrdersTab'
import { AdminWebsiteTab } from '@/components/AdminWebsiteTab'

export default function AdminPage() {
  const [orders] = useKV<Order[]>('orders', [])
  const [products] = useKV<Product[]>('products', [])
  const { currentUser, isAdmin, logout } = useAuth()

  useEffect(() => {
    if (!isAdmin) {
      window.history.pushState({}, '', '/')
      window.dispatchEvent(new PopStateEvent('popstate'))
    }
  }, [isAdmin])

  if (!currentUser || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You must be an admin to access this page.</p>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const allOrders = orders || []
  const allProducts = products || []

  const pendingOrders = allOrders.filter(o => o.status === 'awaiting_payment')
  const paidOrders = allOrders.filter(o => o.status === 'paid')
  const totalRevenue = allOrders
    .filter(o => o.status === 'paid' || o.status === 'shipped')
    .reduce((sum, o) => sum + o.total, 0)

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Spookiki Admin
              </h1>
              <p className="text-sm text-muted-foreground">
                Welcome back, {currentUser.name}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="outline">
                  <House className="mr-2 h-4 w-4" />
                  View Store
                </Button>
              </Link>
              <Button variant="outline" onClick={logout}>
                <SignOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
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
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="website">Website</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <AdminOrdersTab />
          </TabsContent>

          <TabsContent value="products">
            <AdminProductsTab />
          </TabsContent>

          <TabsContent value="website">
            <AdminWebsiteTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
