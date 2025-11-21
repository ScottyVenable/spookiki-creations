import { useState, useEffect } from 'react'
import { ProductCard } from '@/components/ProductCard'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useRepositoryData } from '@/hooks/useRepositoryData'
import type { Product, ProductCategory } from '@/lib/types'
import { FunnelSimple } from '@phosphor-icons/react'

const BASE_PATH = '/spookiki-creations'

export default function ShopPage() {
  const [products] = useRepositoryData<Product>('./data/products.json', 'products')
  const [category, setCategory] = useState<ProductCategory | 'all'>('all')
  const [sortBy, setSortBy] = useState('newest')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const currentPath = window.location.pathname.replace(BASE_PATH, '')
  
  useEffect(() => {
    if (currentPath.startsWith('/shop/')) {
      const pathCategory = currentPath.split('/shop/')[1] as ProductCategory
      if (['art', 'ornament', 'snake', 'other'].includes(pathCategory)) {
        setCategory(pathCategory)
      }
    }
  }, [currentPath])

  const allTags = Array.from(new Set((products || []).flatMap(p => p.tags)))

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  let filteredProducts = (products || []).filter(p => p.status === 'active')

  if (category !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === category)
  }

  if (selectedTags.length > 0) {
    filteredProducts = filteredProducts.filter(p =>
      selectedTags.some(tag => p.tags.includes(tag))
    )
  }

  switch (sortBy) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price)
      break
    case 'newest':
    default:
      filteredProducts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }

  const getCategoryTitle = () => {
    switch (category) {
      case 'art': return 'Art Prints'
      case 'ornament': return 'Clay Ornaments'
      case 'snake': return 'Gemstone Snakes'
      case 'other': return 'Other Creations'
      default: return 'All Creations'
    }
  }

  const getCategoryDescription = () => {
    switch (category) {
      case 'art': return 'Whimsical prints that bring spooky-cute vibes to any wall'
      case 'ornament': return 'Hand-sculpted clay treasures to hang year-round'
      case 'snake': return 'Each piece is handmade and one-of-a-kind with genuine gemstones'
      default: return 'Each piece is handmade and may have small quirks – that\'s the magic ✨'
    }
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
            {getCategoryTitle()}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {getCategoryDescription()}
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <Tabs value={category} onValueChange={(v) => setCategory(v as ProductCategory | 'all')} className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="art">Art</TabsTrigger>
              <TabsTrigger value="ornament">Ornaments</TabsTrigger>
              <TabsTrigger value="snake">Snakes</TabsTrigger>
            </TabsList>
          </Tabs>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {allTags.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <FunnelSimple className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  {tag.replace(/_/g, ' ')}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No products found with the selected filters.</p>
            <button 
              onClick={() => { setCategory('all'); setSelectedTags([]) }}
              className="text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
