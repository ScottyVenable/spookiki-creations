import { useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Link } from '@/components/Link'
import { useKV } from '@github/spark/hooks'
import { useAuth } from '@/contexts/AuthContext'
import type { Order, Product } from '@/lib/types'
import type { NewsletterSubscriber } from '@/lib/notifications'
import { formatPrice } from '@/lib/data'
import { Package, ShoppingCart, CurrencyDollar, Sparkle, House, SignOut, EnvelopeSimple } from '@phosphor-icons/react'
import { AdminProductsTab } from '@/components/AdminProductsTab'
import { AdminOrdersTab } from '@/components/AdminOrdersTab'
import { AdminWebsiteTab } from '@/components/AdminWebsiteTab'
import { VisualEditor } from '@/components/VisualEditor'

export default function AdminPage() {
  const [orders] = useKV<Order[]>('orders', [])
  const [products] = useKV<Product[]>('products', [])
  const [subscribers] = useKV<NewsletterSubscriber[]>('newsletter_subscribers', [])
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
              <span className="text-sm text-muted-foreground">Newsletter Subs</span>
              <EnvelopeSimple className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">{(subscribers || []).length}</div>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-5">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
            <TabsTrigger value="website">Website</TabsTrigger>
            <TabsTrigger value="design">Design Editor</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <AdminOrdersTab />
          </TabsContent>

          <TabsContent value="products">
            <AdminProductsTab />
          </TabsContent>

          <TabsContent value="newsletter">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Newsletter Subscribers ({(subscribers || []).length})
              </h2>
              
              {!subscribers || subscribers.length === 0 ? (
                <div className="text-center py-12">
                  <EnvelopeSimple className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No subscribers yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold">Email</th>
                          <th className="text-left py-3 px-4 font-semibold">Source</th>
                          <th className="text-left py-3 px-4 font-semibold">Subscribed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subscribers.map((sub, idx) => (
                          <tr key={idx} className="border-b border-border hover:bg-muted/50">
                            <td className="py-3 px-4">{sub.email}</td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                                {sub.source}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">
                              {new Date(sub.subscribedAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const emails = subscribers.map(s => s.email).join(', ')
                        navigator.clipboard.writeText(emails)
                        alert('Email addresses copied to clipboard!')
                      }}
                    >
                      Copy All Emails
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="website">
            <AdminWebsiteTab />
          </TabsContent>

          <TabsContent value="design">
            <VisualEditor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
