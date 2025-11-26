import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ProductCard } from '@/components/ProductCard'
import { Link } from '@/components/Link'
import { useCloudStorage } from '@/hooks/useCloudStorage'
import type { Product, CartItem } from '@/lib/types'
import { sampleProducts, formatPrice } from '@/lib/data'
import { Plus, Minus, ShoppingCart, Package } from '@phosphor-icons/react'
import { toast } from 'sonner'

const BASE_PATH = ''

export default function ProductDetailPage() {
  const [products] = useCloudStorage<Product[]>('products', sampleProducts)
  const [cart, setCart] = useCloudStorage<CartItem[]>('cart', [])
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const pathname = window.location.pathname.replace(BASE_PATH, '')
  const slug = pathname.split('/product/')[1]
  const product = (products || sampleProducts).find(p => p.slug === slug)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/shop">
          <Button>Browse All Products</Button>
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    setCart((currentCart) => {
      const safeCart = currentCart || []
      const existingItem = safeCart.find(item => item.product_id === product.id)
      
      if (existingItem) {
        return safeCart.map(item =>
          item.product_id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        return [...safeCart, {
          product_id: product.id,
          product: product,
          quantity: quantity,
          unit_price: product.price
        }]
      }
    })
    
    toast.success(`Added ${quantity} ${product.name} to cart`, {
      description: 'Check out now or continue shopping',
    })
    
    setQuantity(1)
  }

  const relatedProducts = (products || sampleProducts)
    .filter(p => p.category === product.category && p.id !== product.id && p.status === 'active')
    .slice(0, 3)

  const canAddToCart = product.stock_quantity > 0

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag.replace(/_/g, ' ')}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
              {product.name}
            </h1>

            <div className="text-3xl font-bold text-primary mb-6">
              {formatPrice(product.price)}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">
              {product.description}
            </p>

            {product.gemstone && product.gemstone_meaning && (
              <Card className="bg-secondary/20 border-secondary p-6 mb-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  <span className="text-lg">✨</span>
                  {product.gemstone} Energy
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.gemstone_meaning}
                </p>
              </Card>
            )}

            <div className="space-y-4 mb-6">
              {product.material && (
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Materials</div>
                    <div className="text-sm text-muted-foreground">{product.material}</div>
                  </div>
                </div>
              )}

              {product.color_palette && (
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-gradient-to-r from-primary to-accent mt-0.5"></div>
                  <div>
                    <div className="font-medium text-sm">Color Palette</div>
                    <div className="text-sm text-muted-foreground">{product.color_palette}</div>
                  </div>
                </div>
              )}
            </div>

            <Separator className="my-6" />

            <div className="mb-6">
              {canAddToCart ? (
                <>
                  {product.stock_quantity <= 3 && (
                    <div className="text-sm text-accent mb-4 font-medium">
                      Only {product.stock_quantity} left in stock!
                    </div>
                  )}
                  <div className="text-sm text-muted-foreground mb-4">
                    Ships within 3-5 business days from Maine
                  </div>
                </>
              ) : (
                <div className="text-sm text-destructive mb-4 font-medium">
                  Currently sold out
                </div>
              )}
            </div>

            {canAddToCart && (
              <div className="flex gap-4 mb-6">
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-6 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                    disabled={quantity >= product.stock_quantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  size="lg"
                  className="flex-1 gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
            )}

            <Card className="bg-muted/50 p-6">
              <h4 className="font-semibold mb-2">Care Instructions</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Handle with care - each piece is delicate and handmade</li>
                <li>• Keep away from water and extreme temperatures</li>
                <li>• Dust gently with a soft, dry cloth</li>
                {product.category === 'snake' && <li>• Cleanse crystals under moonlight to refresh their energy</li>}
              </ul>
            </Card>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: 'Nunito, sans-serif' }}>
              You May Also Like
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
