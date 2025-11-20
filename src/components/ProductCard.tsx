import type { Product } from '@/lib/types'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Link } from './Link'
import { formatPrice } from '@/lib/data'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.slug}`}>
      <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
        <div className="aspect-square overflow-hidden bg-muted relative">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.tags.length > 0 && (
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              {product.tags.includes('new') && (
                <Badge className="bg-accent text-accent-foreground">New</Badge>
              )}
              {product.tags.includes('limited') && (
                <Badge className="bg-primary text-primary-foreground">Limited</Badge>
              )}
              {product.tags.includes('one_of_a_kind') && (
                <Badge className="bg-primary text-primary-foreground">1 of 1</Badge>
              )}
              {product.stock_quantity === 0 && (
                <Badge variant="secondary">Sold Out</Badge>
              )}
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors" style={{ fontFamily: 'Nunito, sans-serif' }}>
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.stock_quantity > 0 && product.stock_quantity <= 3 && (
              <span className="text-xs text-muted-foreground">
                Only {product.stock_quantity} left
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}
