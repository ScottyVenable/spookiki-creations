export type UserRole = 'customer' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  password_hash: string
  role: UserRole
  created_at: string
  updated_at: string
}

export type ProductCategory = 'art' | 'ornament' | 'snake' | 'other'
export type ProductStatus = 'active' | 'draft' | 'archived'

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  category: ProductCategory
  tags: string[]
  images: string[]
  is_featured: boolean
  stock_quantity: number
  status: ProductStatus
  material?: string
  gemstone?: string
  gemstone_meaning?: string
  color_palette?: string
  created_at: string
  updated_at: string
}

export interface CartItem {
  product_id: string
  product: Product
  quantity: number
  unit_price: number
}

export type OrderStatus = 'pending' | 'awaiting_payment' | 'paid' | 'shipped' | 'cancelled'
export type PaymentMethod = 'cashapp' | 'venmo' | 'paypal_invoice' | 'other'

export interface Order {
  id: string
  user_id?: string
  email: string
  shipping_name: string
  shipping_address_line1: string
  shipping_address_line2?: string
  shipping_city: string
  shipping_state: string
  shipping_postal_code: string
  shipping_country: string
  status: OrderStatus
  payment_method: PaymentMethod
  payment_reference?: string
  subtotal: number
  shipping_cost: number
  tax_amount: number
  total: number
  customer_note?: string
  items: OrderItem[]
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  name_snapshot: string
  unit_price: number
  quantity: number
}

export type BlogPostStatus = 'draft' | 'published'

export interface BlogPost {
  id: string
  title: string
  slug: string
  cover_image?: string
  content: string
  status: BlogPostStatus
  published_at?: string
  created_at: string
  updated_at: string
  tags: string[]
}

export interface PageContent {
  key: string
  value: string
}
