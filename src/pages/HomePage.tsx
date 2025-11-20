import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ProductCard } from '@/components/ProductCard'
import { BlogCard } from '@/components/BlogCard'
import { Link } from '@/components/Link'
import { ArrowRight, Sparkle } from '@phosphor-icons/react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import type { Product, BlogPost } from '@/lib/types'
import { sampleProducts, sampleBlogPosts } from '@/lib/data'
import { useEffect } from 'react'

export default function HomePage() {
  const [products, setProducts] = useLocalStorage<Product[]>('products', [])
  const [blogPosts, setBlogPosts] = useLocalStorage<BlogPost[]>('blog_posts', [])

  useEffect(() => {
    if (!products || products.length === 0) {
      setProducts(sampleProducts)
    }
    if (!blogPosts || blogPosts.length === 0) {
      setBlogPosts(sampleBlogPosts)
    }
  }, [])

  const featuredProducts = (products || sampleProducts).filter(p => p.is_featured && p.status === 'active').slice(0, 4)
  const recentPosts = (blogPosts || sampleBlogPosts).filter(p => p.status === 'published').slice(0, 3)

  return (
    <div>
      <section className="py-16 md:py-24 bg-gradient-to-br from-background via-background to-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Spooky-Cute Art,<br />
                Handmade With Love
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Unique creations blending whimsy and witchy vibes. Each piece is crafted with intention,
                from art prints to gemstone-adorned clay snakes that bring magic to your space.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/shop">
                  <Button size="lg" className="gap-2">
                    Shop New Arrivals
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button size="lg" variant="outline" className="gap-2">
                    Read the Blog
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-muted rounded-3xl transform rotate-3"></div>
              <Card className="relative overflow-hidden rounded-3xl border-2 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80"
                  alt="Spookiki Creations Studio"
                  className="w-full aspect-square object-cover"
                />
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Shop by Collection
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/shop/art">
              <Card className="group overflow-hidden border-2 hover:border-primary transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                  <img 
                    src="https://images.unsplash.com/photo-1509715513011-e394f0cb20c4?w=600&q=80"
                    alt="Art Prints"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    Art Prints
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Whimsical illustrations perfect for your cozy space
                  </p>
                </div>
              </Card>
            </Link>

            <Link href="/shop/ornament">
              <Card className="group overflow-hidden border-2 hover:border-primary transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-secondary/20 to-muted/20">
                  <img 
                    src="https://images.unsplash.com/photo-1570288544992-d4c8d6d4e8c4?w=600&q=80"
                    alt="Clay Ornaments"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    Clay Ornaments
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Hand-sculpted treasures to hang year-round
                  </p>
                </div>
              </Card>
            </Link>

            <Link href="/shop/snake">
              <Card className="group overflow-hidden border-2 hover:border-primary transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-accent/20 to-primary/10">
                  <img 
                    src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80"
                    alt="Gem Snakes"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    Gemstone Snakes
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Clay serpents with healing crystal energy
                  </p>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Featured Pieces
            </h2>
            <Link href="/shop">
              <Button variant="ghost" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80"
                alt="About Kiki"
                className="rounded-3xl shadow-lg"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-2 mb-4">
                <Sparkle className="h-6 w-6 text-primary" weight="fill" />
                <span className="text-sm font-medium text-primary uppercase tracking-wide">About Kiki</span>
              </div>
              <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Creating Magic,<br />One Piece at a Time
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Hi! I'm Kiki, the artist behind these spooky-cute creations. What started as a cozy evening 
                project has grown into my passion for blending whimsy with witchy vibes. Each piece I make 
                carries intention and love, whether it's a gentle ghost print or a gemstone snake with healing energy.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Creating art has become my meditation and mental health practice. I hope these pieces bring 
                you the same joy and calm they bring me while making them.
              </p>
              <Link href="/about">
                <Button variant="outline" className="gap-2">
                  Read My Story
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
              From the Spookiki Journal
            </h2>
            <p className="text-muted-foreground">
              Behind-the-scenes, process notes, and creative musings
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recentPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/blog">
              <Button variant="outline" className="gap-2">
                Read More Posts
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-2">
            <div className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Join the Spookiki Circle
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get early access to limited drops, studio updates, and exclusive behind-the-scenes content.
                Plus, be the first to know about new crystal snake releases!
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background"
                />
                <Button size="lg">
                  Subscribe
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
