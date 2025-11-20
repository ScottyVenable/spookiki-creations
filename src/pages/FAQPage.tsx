import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function FAQPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about ordering handmade treasures
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="shipping">
              <AccordionTrigger className="text-left">
                How long does shipping take?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                All items are made to order and ship within 3-5 business days from Maine. Once shipped, 
                domestic orders typically arrive within 5-7 business days via USPS. You'll receive a 
                shipping confirmation email with tracking information.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment">
              <AccordionTrigger className="text-left">
                What payment methods do you accept?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                I accept Cash App, Venmo, and PayPal invoices. When you place an order, you'll receive 
                detailed payment instructions. Once I confirm your payment, I'll start working on your order.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="handmade">
              <AccordionTrigger className="text-left">
                Are items exactly as pictured?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Because every piece is handmade, there will be small variations from the photos. Each item 
                is unique with its own character and quirks—that's part of the magic! Colors may vary 
                slightly, and no two pieces are identical. This is especially true for my one-of-a-kind 
                crystal snakes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="returns">
              <AccordionTrigger className="text-left">
                What's your return policy?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Due to the handmade nature of my work, I don't accept returns on standard orders. However, 
                if your item arrives damaged or significantly different from the description, please contact 
                me within 48 hours of delivery with photos, and we'll work out a solution together.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="custom">
              <AccordionTrigger className="text-left">
                Do you take custom orders?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Yes! I love creating custom pieces, especially crystal snakes with specific gemstones or 
                color combinations. Please reach out through the contact form with your ideas, and we can 
                discuss pricing and timeline. Custom orders typically take 1-2 weeks.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="care">
              <AccordionTrigger className="text-left">
                How do I care for my handmade items?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Handle all pieces with care as they are delicate. Keep away from water and extreme 
                temperatures. Dust gently with a soft, dry cloth. For crystal snakes, you can cleanse 
                the crystals under moonlight to refresh their energy. Art prints should be kept out of 
                direct sunlight to prevent fading.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="gemstones">
              <AccordionTrigger className="text-left">
                Are the gemstones genuine?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Yes! All gemstones used in my crystal snakes are genuine crystals. Each one is hand-selected 
                for its quality and energetic properties. I believe in using authentic materials to create 
                pieces with real intention and meaning.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="restock">
              <AccordionTrigger className="text-left">
                Will sold-out items be restocked?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                One-of-a-kind pieces (especially crystal snakes) will not be restocked—once they're gone, 
                they're gone! However, art prints and popular ornament designs are often recreated. Follow 
                me on Instagram or sign up for the newsletter to be notified about new drops and restocks.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="international">
              <AccordionTrigger className="text-left">
                Do you ship internationally?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Currently, I only ship within the United States. International shipping may be available 
                in the future—stay tuned to my newsletter for updates!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="wholesale">
              <AccordionTrigger className="text-left">
                Do you offer wholesale pricing?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                I'm open to wholesale partnerships with shops that align with the Spookiki aesthetic! 
                Please reach out through the contact form with information about your business, and we 
                can discuss options.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-12 p-8 bg-muted/50 rounded-2xl text-center">
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Still have questions?
            </h2>
            <p className="text-muted-foreground mb-6">
              I'm here to help! Feel free to reach out anytime.
            </p>
            <a href="/contact">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Contact Me
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
