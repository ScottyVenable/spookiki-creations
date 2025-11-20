import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { OrderStatusBadge } from '@/components/OrderStatusBadge'
import { Link } from '@/components/Link'
import { useKV } from '@github/spark/hooks'
import { useAuth } from '@/contexts/AuthContext'
import type { Order } from '@/lib/types'
import { formatPrice } from '@/lib/data'
import { Package, User, ShoppingBag, SignIn, LockKey } from '@phosphor-icons/react'
import { toast } from 'sonner'

export default function AccountPage() {
  const [orders] = useKV<Order[]>('orders', [])
  const { currentUser, login, logout, changePassword } = useAuth()
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const currentPath = window.location.pathname
  const isSettingsPage = currentPath.includes('/settings')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const success = login(loginUsername, loginPassword)
    if (success) {
      toast.success('Welcome back!')
      setLoginUsername('')
      setLoginPassword('')
    } else {
      toast.error('Invalid username or password')
    }
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    changePassword(newPassword)
    toast.success('Password changed successfully')
    setNewPassword('')
    setConfirmPassword('')
  }

  if (!currentUser) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="p-8">
            <div className="text-center mb-6">
              <SignIn className="h-12 w-12 text-primary mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Welcome Back
              </h1>
              <p className="text-muted-foreground">
                Sign in to view your account
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>

            <Separator className="my-6" />

            <div className="text-center text-sm text-muted-foreground">
              <p>Demo Accounts:</p>
              <p className="mt-2">Admin: spookiki / welcome123</p>
              <p>Admin: Scotty2Hotty999 / SVen!8019</p>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (isSettingsPage) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Link href="/account">
            <Button variant="ghost" className="mb-6">← Back to Account</Button>
          </Link>

          <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Account Settings
          </h1>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Profile Information
              </h2>
              <div className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input value={currentUser.name} disabled />
                </div>
                <div>
                  <Label>Username</Label>
                  <Input value={currentUser.username} disabled />
                </div>
                <div>
                  <Label>Role</Label>
                  <Input value={currentUser.role} disabled className="capitalize" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Change Password
              </h2>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                  />
                </div>
                <Button type="submit">
                  <LockKey className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  const userOrders = (orders || []).sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  if (currentPath.includes('/orders/')) {
    const orderId = currentPath.split('/orders/')[1]
    const order = userOrders.find(o => o.id === orderId)

    if (!order) {
      return (
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <Link href="/account">
            <Button>Back to Account</Button>
          </Link>
        </div>
      )
    }

    return (
      <div className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link href="/account">
            <Button variant="ghost" className="mb-6">← Back to Orders</Button>
          </Link>

          <Card className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Order #{order.id}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Placed on {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>

            <Separator className="my-6" />

            <div className="space-y-4 mb-6">
              <h2 className="font-semibold">Items</h2>
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <div className="font-medium">{item.name_snapshot}</div>
                    <div className="text-sm text-muted-foreground">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-medium">
                    {formatPrice(item.unit_price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{formatPrice(order.shipping_cost)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h2 className="font-semibold mb-3">Shipping Address</h2>
              <div className="text-sm text-muted-foreground">
                <div>{order.shipping_name}</div>
                <div>{order.shipping_address_line1}</div>
                {order.shipping_address_line2 && <div>{order.shipping_address_line2}</div>}
                <div>{order.shipping_city}, {order.shipping_state} {order.shipping_postal_code}</div>
                <div>{order.shipping_country}</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                My Account
              </h1>
              <p className="text-muted-foreground">
                Welcome back, {currentUser.name}!
              </p>
            </div>
            <Link href="/account/settings">
              <Button variant="outline">
                Settings
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 text-center">
              <ShoppingBag className="h-10 w-10 text-primary mx-auto mb-3" weight="fill" />
              <div className="text-2xl font-bold mb-1">{userOrders.length}</div>
              <div className="text-sm text-muted-foreground">Total Orders</div>
            </Card>

            <Card className="p-6 text-center">
              <Package className="h-10 w-10 text-primary mx-auto mb-3" weight="fill" />
              <div className="text-2xl font-bold mb-1">
                {userOrders.filter(o => o.status === 'shipped').length}
              </div>
              <div className="text-sm text-muted-foreground">Shipped</div>
            </Card>

            <Card className="p-6 text-center">
              <User className="h-10 w-10 text-primary mx-auto mb-3" weight="fill" />
              <div className="text-2xl font-bold mb-1 capitalize">{currentUser.role}</div>
              <div className="text-sm text-muted-foreground">Account Type</div>
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Order History
            </h2>

            {userOrders.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
                <Link href="/shop">
                  <Button>Start Shopping</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userOrders.map((order) => (
                  <div key={order.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold">Order #{order.id}</span>
                          <OrderStatusBadge status={order.status} />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-semibold">{formatPrice(order.total)}</div>
                        </div>
                        <Link href={`/account/orders/${order.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
