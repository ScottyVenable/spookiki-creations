import { Card } from '@/components/ui/card'
import { Sparkle, Heart, Palette } from '@phosphor-icons/react'

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
              About Spookiki Creations
            </h1>
            <p className="text-lg text-muted-foreground">
              Where spooky meets cute, and every piece is made with love
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <img
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80"
                alt="Kiki in her studio"
                className="rounded-3xl shadow-lg"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkle className="h-6 w-6 text-primary" weight="fill" />
                <span className="text-sm font-medium text-primary uppercase tracking-wide">The Beginning</span>
              </div>
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Hi, I'm Kiki!
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  What started as a cozy October evening project has blossomed into my full creative passion. 
                  I've always been drawn to the "spooky-cute" aesthetic—things that are a little mystical, 
                  a little witchy, but ultimately warm and approachable.
                </p>
                <p>
                  Each piece I create is more than just art or decor. It's a tiny portal to that magical feeling 
                  of autumn evenings, candles flickering, and the gentle mystery of the night. Whether it's a 
                  friendly ghost floating across a canvas or a clay snake adorned with healing crystals, 
                  every creation carries intention and love.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-primary/10">
              <Palette className="h-12 w-12 text-primary mx-auto mb-4" weight="fill" />
              <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Nunito, sans-serif' }}>
                The Process
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every piece is handmade in my Maine studio. From sculpting polymer clay snakes to painting 
                watercolor ghosts, each step is done with care and attention to detail.
              </p>
            </Card>

            <Card className="p-6 text-center bg-gradient-to-br from-secondary/10 to-secondary/20">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" weight="fill" />
              <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Nunito, sans-serif' }}>
                The Why
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Creating art has become my meditation and mental health practice. I hope these pieces bring 
                you the same joy, calm, and magic they bring me while making them.
              </p>
            </Card>

            <Card className="p-6 text-center bg-gradient-to-br from-accent/10 to-accent/20">
              <Sparkle className="h-12 w-12 text-primary mx-auto mb-4" weight="fill" />
              <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Nunito, sans-serif' }}>
                The Magic
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                My crystal snakes are especially close to my heart. Each genuine gemstone is chosen for its 
                unique energetic properties, paired with hand-sculpted clay in a labor of love.
              </p>
            </Card>
          </div>

          <Card className="p-12 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-2">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Handmade Means Unique
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Because every piece is crafted by hand, no two are exactly alike. Small variations, tiny quirks, 
                and unique characteristics aren't flaws—they're part of the magic. When you purchase from 
                Spookiki Creations, you're getting a truly one-of-a-kind treasure.
              </p>
              <p className="text-sm text-muted-foreground">
                Thank you for supporting small, handmade art. Your purchase means the world to me and 
                allows me to keep creating these spooky-cute treasures. ✨
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
