import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useCloudStorage } from '@/hooks/useCloudStorage'
import type { Product, ProductCategory, ProductStatus } from '@/lib/types'
import { formatPrice } from '@/lib/data'
import { Plus, Pencil, Trash, Image as ImageIcon } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { ImageUploader } from '@/components/ImageUploader'

// Form data type that allows string values for number fields during editing
type ProductFormData = Omit<Partial<Product>, 'price' | 'stock_quantity'> & {
  price?: number | string
  stock_quantity?: number | string
}

export function AdminProductsTab() {
  const [products, setProducts] = useCloudStorage<Product[]>('products', [])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState<ProductFormData>({})
  const [isImageUploaderOpen, setIsImageUploaderOpen] = useState(false)

  const allProducts = products || []

  const handleNewProduct = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: 'other',
      tags: [],
      images: [],
      is_featured: false,
      stock_quantity: 0,
      status: 'draft',
    })
    setEditingProduct(null)
    setIsDialogOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setFormData({ ...product })
    setEditingProduct(product)
    setIsDialogOpen(true)
  }

  const handleSaveProduct = () => {
    if (!formData.name || formData.price === undefined || formData.price === '') {
      toast.error('Please fill in required fields')
      return
    }

    // Parse numeric values from string inputs
    const price = typeof formData.price === 'string' ? parseFloat(formData.price) : formData.price
    const stock_quantity = typeof formData.stock_quantity === 'string' ? parseInt(formData.stock_quantity, 10) : (formData.stock_quantity ?? 0)

    // Validate numeric values
    if (isNaN(price) || price < 0) {
      toast.error('Please enter a valid price')
      return
    }

    if (isNaN(stock_quantity) || stock_quantity < 0) {
      toast.error('Please enter a valid stock quantity')
      return
    }

    const now = new Date().toISOString()
    const slug = formData.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || ''

    const productData = {
      ...formData,
      price,
      stock_quantity
    }

    if (editingProduct) {
      setProducts((current) => {
        const updated = (current || []).map(p =>
          p.id === editingProduct.id
            ? { ...productData as Product, slug, updated_at: now }
            : p
        )
        return updated
      })
      toast.success('Product updated')
    } else {
      const newProduct: Product = {
        ...productData as Product,
        id: Date.now().toString(),
        slug,
        created_at: now,
        updated_at: now,
      }
      setProducts((current) => [...(current || []), newProduct])
      toast.success('Product created')
    }

    setIsDialogOpen(false)
    setFormData({})
  }

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts((current) => (current || []).filter(p => p.id !== productId))
      toast.success('Product deleted')
    }
  }

  const handleImageUrlAdd = (url: string) => {
    if (url.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), url.trim()]
      }))
    }
  }

  const handleImageRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index)
    }))
  }

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold" style={{ fontFamily: 'Nunito, sans-serif' }}>
            All Products
          </h2>
          <Button onClick={handleNewProduct}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        {allProducts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No products yet. Create your first product!
          </div>
        ) : (
          <div className="space-y-4">
            {allProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-4 border border-border rounded-lg p-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  {product.images[0] ? (
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="font-semibold">{product.name}</div>
                  <div className="text-sm text-muted-foreground capitalize">{product.category}</div>
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

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? 'Edit Product' : 'Create New Product'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter product name"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Product description"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price ?? ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.stock_quantity ?? ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock_quantity: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category || 'other'}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as ProductCategory }))}
                >
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="art">Art</SelectItem>
                    <SelectItem value="ornament">Ornament</SelectItem>
                    <SelectItem value="snake">Snake</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status || 'draft'}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as ProductStatus }))}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="material">Material</Label>
                <Input
                  id="material"
                  value={formData.material || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, material: e.target.value }))}
                  placeholder="e.g., Polymer clay"
                />
              </div>

              <div>
                <Label htmlFor="gemstone">Gemstone</Label>
                <Input
                  id="gemstone"
                  value={formData.gemstone || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, gemstone: e.target.value }))}
                  placeholder="e.g., Amethyst"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="gemstone-meaning">Gemstone Meaning</Label>
                <Textarea
                  id="gemstone-meaning"
                  value={formData.gemstone_meaning || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, gemstone_meaning: e.target.value }))}
                  placeholder="Describe the metaphysical properties..."
                  rows={2}
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={(formData.tags || []).join(', ')}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                  }))}
                  placeholder="e.g., spooky, cute, handmade"
                />
              </div>

              <div className="col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <Label>Product Images</Label>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setIsImageUploaderOpen(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Image
                  </Button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {(formData.images || []).map((url, index) => (
                    <div key={index} className="relative group">
                      <img src={url} alt="" className="w-full h-24 object-cover rounded-lg" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                        onClick={() => handleImageRemove(index)}
                      >
                        <Trash className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-2 flex items-center gap-2">
                <Switch
                  id="featured"
                  checked={formData.is_featured || false}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
                />
                <Label htmlFor="featured" className="cursor-pointer">Mark as Featured Product</Label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProduct}>
                {editingProduct ? 'Update Product' : 'Create Product'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ImageUploader
        open={isImageUploaderOpen}
        onOpenChange={setIsImageUploaderOpen}
        onImageSelected={handleImageUrlAdd}
        title="Add Product Image"
        description="Upload an image from your device or enter an image URL"
      />
    </>
  )
}
