import type { Product, BlogPost, Order } from './types'

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Moonlight Ghost Print',
    slug: 'moonlight-ghost-print',
    description: 'A whimsical ghost floating under a crescent moon, painted in soft watercolors with delicate gold accents. This piece captures the gentle, friendly side of the spooky season. Each print is made with archival inks on premium matte paper.',
    price: 24.99,
    category: 'art',
    tags: ['new', 'limited'],
    images: ['https://images.unsplash.com/photo-1509715513011-e394f0cb20c4?w=800&q=80'],
    is_featured: true,
    stock_quantity: 5,
    status: 'active',
    material: 'Archival print on matte paper',
    color_palette: 'Soft blues, purples, and gold',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Crystal Snake - Amethyst',
    slug: 'crystal-snake-amethyst',
    description: 'Hand-sculpted polymer clay snake adorned with a genuine amethyst crystal. This little serpent friend is ready to bring protective energy to your space. Each snake is uniquely crafted with care and intention.',
    price: 32.00,
    category: 'snake',
    tags: ['one_of_a_kind', 'featured'],
    images: ['https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80'],
    is_featured: true,
    stock_quantity: 1,
    status: 'active',
    material: 'Polymer clay, genuine gemstone',
    gemstone: 'Amethyst',
    gemstone_meaning: 'Amethyst is known as a stone of spiritual protection and purification. It helps calm the mind, enhance intuition, and promote emotional balance.',
    color_palette: 'Deep purple with black accents',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Witchy Moon Ornament',
    slug: 'witchy-moon-ornament',
    description: 'A delicate crescent moon ornament with tiny stars, perfect for year-round witchy vibes or Halloween decor. Hand-painted with shimmering gold details. Comes with a satin ribbon for hanging.',
    price: 18.50,
    category: 'ornament',
    tags: ['ready_to_ship'],
    images: ['https://images.unsplash.com/photo-1570288544992-d4c8d6d4e8c4?w=800&q=80'],
    is_featured: false,
    stock_quantity: 8,
    status: 'active',
    material: 'Polymer clay with gold leaf',
    color_palette: 'Black, gold, and deep blue',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Spooky Garden Print',
    slug: 'spooky-garden-print',
    description: 'Mushrooms, crystals, and mysterious plants create a magical nighttime garden scene. This atmospheric piece brings cozy witchy energy to any space. Printed on high-quality archival paper.',
    price: 28.00,
    category: 'art',
    tags: ['new'],
    images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80'],
    is_featured: true,
    stock_quantity: 12,
    status: 'active',
    material: 'Archival print on premium paper',
    color_palette: 'Forest greens, deep purples, touches of gold',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Crystal Snake - Rose Quartz',
    slug: 'crystal-snake-rose-quartz',
    description: 'Sweet pink snake with a rose quartz crystal heart. This gentle friend radiates loving, compassionate energy. Perfect for self-love and emotional healing work.',
    price: 32.00,
    category: 'snake',
    tags: ['one_of_a_kind'],
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80'],
    is_featured: false,
    stock_quantity: 1,
    status: 'active',
    material: 'Polymer clay, genuine gemstone',
    gemstone: 'Rose Quartz',
    gemstone_meaning: 'Rose Quartz is the stone of unconditional love and compassion. It opens the heart chakra, encourages self-love, and brings gentle healing energy.',
    color_palette: 'Soft pinks with white accents',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Bat Friend Ornament',
    slug: 'bat-friend-ornament',
    description: 'An adorable little bat with spread wings, ready to hang in your space. Hand-sculpted with attention to every tiny detail. These cuties are misunderstood and deserve all the love!',
    price: 16.00,
    category: 'ornament',
    tags: ['ready_to_ship'],
    images: ['https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?w=800&q=80'],
    is_featured: false,
    stock_quantity: 6,
    status: 'active',
    material: 'Polymer clay',
    color_palette: 'Black with subtle purple shimmer',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const sampleBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Why I Started Making Spooky-Cute Art',
    slug: 'why-i-started-making-spooky-cute-art',
    cover_image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    content: `# My Journey Into Handmade Creations

It all started on a particularly cozy October evening. I was feeling the pull to create something with my hands, something that captured the magic I felt in the autumn air...

## Finding My Style

The "spooky-cute" aesthetic just felt right. Not too scary, but definitely mystical. Like the friendly ghost who just wants to be your pal.

## The Mental Health Connection

Creating these pieces has become my meditation. Each snake I sculpt, each painting I make, is a moment of calm in a chaotic world.`,
    status: 'published',
    published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['process', 'behind_the_scenes'],
  },
  {
    id: '2',
    title: 'The Meaning Behind Crystal Snakes',
    slug: 'the-meaning-behind-crystal-snakes',
    cover_image: 'https://images.unsplash.com/photo-1518967290816-0430902d6b41?w=800&q=80',
    content: `# Crystal Energy Meets Clay Art

Each of my crystal snakes is made with intention. The gemstones aren't just decorative - they're chosen for their energetic properties...

## Why Snakes?

Snakes represent transformation, rebirth, and healing. They shed their skin and emerge renewed. What better symbol for personal growth?

## Choosing Your Snake

Listen to your intuition when selecting a snake. Which gemstone calls to you? That's the one you need.`,
    status: 'published',
    published_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['process', 'spirituality'],
  },
  {
    id: '3',
    title: 'Behind the Scenes: My Studio Space',
    slug: 'behind-the-scenes-my-studio-space',
    cover_image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80',
    content: `# Welcome to My Creative Chaos

My studio is a mix of organized supplies and beautiful creative mess. Let me show you around...

## Essential Tools

- Polymer clay in every color imaginable
- Tiny sculpting tools for details
- A collection of gemstones that sparkles in the light
- Paint brushes worn soft from use

## The Vibe

Lots of plants, fairy lights, and candles burning. Music playing softly. This is where the magic happens.`,
    status: 'published',
    published_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['behind_the_scenes', 'studio'],
  },
]

export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`
}

export const generateOrderId = (): string => {
  return `SPK${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substring(2, 5).toUpperCase()}`
}

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export const getPaymentInstructions = (method: string, total: number, orderId: string): string => {
  switch (method) {
    case 'cashapp':
      return `Send $${total.toFixed(2)} to $SpookikiCreations on Cash App. Include order #${orderId} in the note.`
    case 'venmo':
      return `Send $${total.toFixed(2)} to @SpookikiCreations on Venmo. Include order #${orderId} in the note.`
    case 'paypal_invoice':
      return `You'll receive a PayPal invoice for $${total.toFixed(2)} shortly. Please check your email for order #${orderId}.`
    case 'other':
      return `I'll reach out to you via email about payment for order #${orderId}. Total: $${total.toFixed(2)}`
    default:
      return `Payment instructions for order #${orderId} will be sent to your email.`
  }
}
