import { Button } from './ui/button'
import { Input } from './ui/input'
import { Link } from './Link'

export function Footer() {
  return (
    <footer className="bg-muted mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Shop
            </h3>
            <ul className="space-y-2">
              <li><Link href="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Shop All</Link></li>
              <li><Link href="/shop/art" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Art Prints</Link></li>
              <li><Link href="/shop/ornament" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Ornaments</Link></li>
              <li><Link href="/shop/snake" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Crystal Snakes</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Info
            </h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link href="/faq#shipping" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
              About
            </h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Kiki</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Newsletter
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get early access to limited drops and studio updates.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="flex-1"
              />
              <Button variant="default">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Spookiki Creations. Handmade with love in Maine. ✨
          </p>
          <div className="flex gap-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Instagram
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              TikTok
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
