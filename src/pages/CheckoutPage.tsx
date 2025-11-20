import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { useKV } from '@github/spark/hooks'
import type { CartItem, Order, PaymentMethod } from '@/lib/types'
import { formatPrice, generateOrderId } from '@/lib/data'
import { CreditCard } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { sendOrderNotification } from '@/lib/notifications'

export default function CheckoutPage() {
  const [cart, setCart] = useKV<CartItem[]>('cart', [])
  const [orders, setOrders] = useKV<Order[]>('orders', [])
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    paymentMethod: 'cashapp' as PaymentMethod,
    paymentReference: '',
    customerNote: '',
    agreeToTerms: false,
  })

  const safeCart = cart || []

  if (safeCart.length === 0) {
    window.history.pushState({}, '', '/cart')
    window.dispatchEvent(new PopStateEvent('popstate'))
    return null
  }

  const subtotal = safeCart.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0)
  const shipping = 6.50
  const total = subtotal + shipping

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions')
      return
    }

    setIsSubmitting(true)

    try {
      const orderId = generateOrderId()
      
      const newOrder: Order = {
        id: orderId,
        email: formData.email,
        shipping_name: formData.name,
        shipping_address_line1: formData.address1,
        shipping_address_line2: formData.address2,
        shipping_city: formData.city,
        shipping_state: formData.state,
        shipping_postal_code: formData.zipCode,
        shipping_country: formData.country,
        status: 'awaiting_payment',
        payment_method: formData.paymentMethod,
        payment_reference: formData.paymentReference,
        subtotal,
        shipping_cost: shipping,
        tax_amount: 0,
        total,
        customer_note: formData.customerNote,
        items: safeCart.map(item => ({
          id: `${orderId}-${item.product_id}`,
          order_id: orderId,
          product_id: item.product_id,
          name_snapshot: item.product.name,
          unit_price: item.unit_price,
          quantity: item.quantity,
        })),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      setOrders((currentOrders) => [...(currentOrders || []), newOrder])
      
      // Send order notification
      await sendOrderNotification({
        orderId,
        customerEmail: formData.email,
        customerName: formData.name,
        total,
        items: safeCart.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.unit_price * item.quantity,
        })),
        paymentMethod: formData.paymentMethod,
      })

      setCart([])

      window.history.pushState({}, '', `/order/${orderId}/confirmation`)
      window.dispatchEvent(new PopStateEvent('popstate'))
    } catch (error) {
      toast.error('Failed to submit order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Contact Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Shipping Address
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Kiki Smith"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address1">Address Line 1 *</Label>
                    <Input
                      id="address1"
                      name="address1"
                      required
                      value={formData.address1}
                      onChange={handleInputChange}
                      placeholder="123 Spooky Lane"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address2">Address Line 2</Label>
                    <Input
                      id="address2"
                      name="address2"
                      value={formData.address2}
                      onChange={handleInputChange}
                      placeholder="Apt 4B"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Portland"
                      />
                    </div>

                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="ME"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zipCode">Zip Code *</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="04101"
                      />
                    </div>

                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="United States"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </h2>
                
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value as PaymentMethod }))}
                  className="space-y-4"
                >
                  <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="cashapp" id="cashapp" />
                    <Label htmlFor="cashapp" className="flex-1 cursor-pointer">
                      <div className="font-medium">Cash App</div>
                      <div className="text-sm text-muted-foreground">Pay via Cash App - instructions will be provided after order</div>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="venmo" id="venmo" />
                    <Label htmlFor="venmo" className="flex-1 cursor-pointer">
                      <div className="font-medium">Venmo</div>
                      <div className="text-sm text-muted-foreground">Pay via Venmo - instructions will be provided after order</div>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="paypal_invoice" id="paypal_invoice" />
                    <Label htmlFor="paypal_invoice" className="flex-1 cursor-pointer">
                      <div className="font-medium">PayPal Invoice</div>
                      <div className="text-sm text-muted-foreground">Receive a PayPal invoice via email</div>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="flex-1 cursor-pointer">
                      <div className="font-medium">Other / Contact Me</div>
                      <div className="text-sm text-muted-foreground">We'll work out payment details via email</div>
                    </Label>
                  </div>
                </RadioGroup>

                <div className="mt-6">
                  <Label htmlFor="customerNote">Order Notes (Optional)</Label>
                  <textarea
                    id="customerNote"
                    name="customerNote"
                    value={formData.customerNote}
                    onChange={handleInputChange}
                    className="w-full mt-2 p-3 border border-border rounded-lg bg-background"
                    rows={3}
                    placeholder="Any special requests or notes for your order?"
                  />
                </div>
              </Card>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))}
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                  I agree to the terms and conditions and understand that my order will be processed once payment is confirmed
                </Label>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {safeCart.map(item => (
                    <div key={item.product_id} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{item.product.name}</div>
                        <div className="text-xs text-muted-foreground">Qty: {item.quantity}</div>
                      </div>
                      <div className="text-sm font-medium">
                        {formatPrice(item.unit_price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

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

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </Button>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    After placing your order, you'll receive payment instructions. Your items will ship within 3-5 business days once payment is confirmed.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
