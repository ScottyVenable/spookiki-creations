import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { EnvelopeSimple, MapPin, Clock } from '@phosphor-icons/react'
import { toast } from 'sonner'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderId: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Message sent! I\'ll get back to you soon.')
    setFormData({ name: '', email: '', orderId: '', message: '' })
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground">
              Have a question about an order, or want to chat about a custom piece?
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 text-center">
              <EnvelopeSimple className="h-10 w-10 text-primary mx-auto mb-3" weight="fill" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-sm text-muted-foreground">hello@spookiki.com</p>
            </Card>

            <Card className="p-6 text-center">
              <MapPin className="h-10 w-10 text-primary mx-auto mb-3" weight="fill" />
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-sm text-muted-foreground">Maine, USA</p>
            </Card>

            <Card className="p-6 text-center">
              <Clock className="h-10 w-10 text-primary mx-auto mb-3" weight="fill" />
              <h3 className="font-semibold mb-2">Response Time</h3>
              <p className="text-sm text-muted-foreground">Within 1-2 business days</p>
            </Card>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="orderId">Order ID (optional)</Label>
                <Input
                  id="orderId"
                  value={formData.orderId}
                  onChange={(e) => setFormData(prev => ({ ...prev, orderId: e.target.value }))}
                  placeholder="SPK123ABC"
                />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Tell me what's on your mind..."
                  rows={6}
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              You can also find me on social media:
            </p>
            <div className="flex justify-center gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Instagram
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                TikTok
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
