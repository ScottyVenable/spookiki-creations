import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { OrderStatusBadge } from '@/components/OrderStatusBadge'
import { Link } from '@/components/Link'
import { useKV } from '@github/spark/hooks'
import type { Order } from '@/lib/types'
import { formatPrice, getPaymentInstructions } from '@/lib/data'
import { CheckCircle, Package, ArrowRight } from '@phosphor-icons/react'

const BASE_PATH = '/spookiki-creations'

export default function OrderConfirmationPage() {
  const [orders] = useKV<Order[]>('orders', [])

  const pathname = window.location.pathname.replace(BASE_PATH, '')
  const orderId = pathname.split('/order/')[1]?.split('/')[0]
  const order = (orders || []).find(o => o.id === orderId)

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Order not found</h1>
        <Link href="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  const paymentInstructions = getPaymentInstructions(order.payment_method, order.total, order.id)

  return (
    <div className="py-12 bg-muted/30">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="p-8 md:p-12 text-center mb-8 bg-gradient-to-br from-secondary/10 to-accent/10 border-2">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" weight="fill" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Thank You for Your Order!
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Your order has been placed successfully. Check your email for confirmation details.
          </p>
          <div className="inline-flex items-center gap-2 bg-background px-6 py-3 rounded-full">
            <span className="text-sm text-muted-foreground">Order Number:</span>
            <span className="font-bold text-lg">{order.id}</span>
          </div>
        </Card>

        <Card className="p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Payment Instructions
            </h2>
            <OrderStatusBadge status={order.status} />
          </div>

          <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-lg mb-6">
            <p className="font-medium mb-2">To complete your order:</p>
            <p className="text-muted-foreground leading-relaxed">
              {paymentInstructions}
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            Once I confirm your payment, I'll start creating your order. You'll receive a shipping confirmation 
            email when your items are on their way!
          </p>
        </Card>

        <Card className="p-8 mb-6">
          <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Order Details
          </h2>

          <div className="space-y-4 mb-6">
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

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>{formatPrice(order.shipping_cost)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </Card>

        <Card className="p-8 mb-6">
          <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Shipping Address
          </h2>
          
          <div className="text-muted-foreground">
            <div>{order.shipping_name}</div>
            <div>{order.shipping_address_line1}</div>
            {order.shipping_address_line2 && <div>{order.shipping_address_line2}</div>}
            <div>{order.shipping_city}, {order.shipping_state} {order.shipping_postal_code}</div>
            <div>{order.shipping_country}</div>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/shop" className="flex-1">
            <Button variant="outline" size="lg" className="w-full gap-2">
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/account" className="flex-1">
            <Button variant="default" size="lg" className="w-full gap-2">
              <Package className="h-4 w-4" />
              View All Orders
            </Button>
          </Link>
        </div>

        <Card className="mt-8 p-6 bg-muted/50">
          <p className="text-sm text-center text-muted-foreground leading-relaxed">
            Questions about your order? Feel free to reach out at{' '}
            <a href="mailto:hello@spookiki.com" className="text-primary hover:underline">
              hello@spookiki.com
            </a>
            {' '}or check out the{' '}
            <Link href="/faq" className="text-primary hover:underline">
              FAQ page
            </Link>
            .
          </p>
        </Card>
      </div>
    </div>
  )
}
