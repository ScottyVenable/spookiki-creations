import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Link } from '@/components/Link'
import { useKV } from '@github/spark/hooks'
import type { CartItem } from '@/lib/types'
import { formatPrice } from '@/lib/data'
import { Trash, Plus, Minus, ArrowRight, ShoppingBag } from '@phosphor-icons/react'
import { toast } from 'sonner'

export default function CartPage() {
  const [cart, setCart] = useKV<CartItem[]>('cart', [])

  const safeCart = cart || []

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId)
      return
    }

    setCart((currentCart) => {
      const safeCart = currentCart || []
      return safeCart.map(item =>
        item.product_id === productId
          ? { ...item, quantity: Math.min(newQuantity, item.product.stock_quantity) }
          : item
      )
    })
  }

  const removeItem = (productId: string) => {
    setCart((currentCart) => {
      const safeCart = currentCart || []
      return safeCart.filter(item => item.product_id !== productId)
    })
    toast.success('Item removed from cart')
  }

  const subtotal = safeCart.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0)
  const shipping = 6.50
  const total = subtotal + shipping

  if (safeCart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto text-center p-12">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any spooky-cute treasures yet!
          </p>
          <Link href="/shop">
            <Button className="gap-2">
              Start Shopping
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {safeCart.map((item) => (
              <Card key={item.product_id} className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                  <Link href={`/product/${item.product.slug}`} className="flex-shrink-0">
                    <div className="w-full sm:w-24 h-48 sm:h-24 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.product.slug}`}>
                      <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors" style={{ fontFamily: 'Nunito, sans-serif' }}>
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-3">
                      {formatPrice(item.unit_price)} each
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                      <div className="flex items-center border border-border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="px-4 text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock_quantity}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive gap-2"
                        onClick={() => removeItem(item.product_id)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="hidden sm:inline">Remove</span>
                      </Button>
                    </div>

                    {item.quantity >= item.product.stock_quantity && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Maximum stock reached
                      </p>
                    )}
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="font-semibold text-lg">
                      {formatPrice(item.unit_price * item.quantity)}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">{formatPrice(shipping)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button size="lg" className="w-full gap-2">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <Link href="/shop">
                <Button variant="ghost" className="w-full mt-3">
                  Continue Shopping
                </Button>
              </Link>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All items are handmade and ship within 3-5 business days from Maine. 
                  You'll choose your payment method at checkout.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
