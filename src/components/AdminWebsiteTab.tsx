import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useKV } from '@github/spark/hooks'
import { Palette, FileText, Image as ImageIcon, User } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { useAuth } from '@/contexts/AuthContext'

interface WebsiteSettings {
  siteName?: string
  tagline?: string
  aboutText?: string
  contactEmail?: string
  contactPhone?: string
  socialLinks?: {
    instagram?: string
    facebook?: string
    twitter?: string
  }
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: string
  shippingInfo?: string
  returnPolicy?: string
  lastUpdatedBy?: string
  lastUpdatedAt?: string
}

export function AdminWebsiteTab() {
  const [settings, setSettings] = useKV<WebsiteSettings>('website-settings', {})
  const [formData, setFormData] = useState<WebsiteSettings>({})
  const { currentUser } = useAuth()

  useEffect(() => {
    setFormData(settings || {})
  }, [settings])

  const handleSave = () => {
    const userName = currentUser?.name || currentUser?.username || 'Unknown Admin'
    const updatedSettings = {
      ...formData,
      lastUpdatedBy: userName,
      lastUpdatedAt: new Date().toISOString()
    }
    setSettings(updatedSettings)
    toast.success('Website settings saved')
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
        Website Settings
      </h2>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3">
          <TabsTrigger value="general">
            <FileText className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="content">
            <Palette className="mr-2 h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="policies">
            <FileText className="mr-2 h-4 w-4" />
            Policies
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div>
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              value={formData.siteName || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, siteName: e.target.value }))}
              placeholder="Spookiki Creations"
            />
          </div>

          <div>
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              value={formData.tagline || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
              placeholder="Handmade spooky-cute creations"
            />
          </div>

          <div>
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input
              id="contactEmail"
              type="email"
              value={formData.contactEmail || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
              placeholder="hello@spookiki.com"
            />
          </div>

          <div>
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <Input
              id="contactPhone"
              type="tel"
              value={formData.contactPhone || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div className="space-y-3">
            <Label>Social Media Links</Label>
            <div>
              <Input
                placeholder="Instagram URL"
                value={formData.socialLinks?.instagram || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, instagram: e.target.value }
                }))}
              />
            </div>
            <div>
              <Input
                placeholder="Facebook URL"
                value={formData.socialLinks?.facebook || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, facebook: e.target.value }
                }))}
              />
            </div>
            <div>
              <Input
                placeholder="Twitter URL"
                value={formData.socialLinks?.twitter || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, twitter: e.target.value }
                }))}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div>
            <Label htmlFor="heroTitle">Homepage Hero Title</Label>
            <Input
              id="heroTitle"
              value={formData.heroTitle || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, heroTitle: e.target.value }))}
              placeholder="Welcome to Spookiki Creations"
            />
          </div>

          <div>
            <Label htmlFor="heroSubtitle">Homepage Hero Subtitle</Label>
            <Textarea
              id="heroSubtitle"
              value={formData.heroSubtitle || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, heroSubtitle: e.target.value }))}
              placeholder="Handmade spooky-cute art, ornaments, and gemstone clay snakes"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="heroImage">Hero Image URL</Label>
            <Input
              id="heroImage"
              value={formData.heroImage || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, heroImage: e.target.value }))}
              placeholder="https://example.com/hero-image.jpg"
            />
            {formData.heroImage && (
              <div className="mt-2">
                <img src={formData.heroImage} alt="Hero preview" className="w-full max-w-md h-48 object-cover rounded-lg" />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="aboutText">About Section Text</Label>
            <Textarea
              id="aboutText"
              value={formData.aboutText || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, aboutText: e.target.value }))}
              placeholder="Tell your story..."
              rows={6}
            />
          </div>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          <div>
            <Label htmlFor="shippingInfo">Shipping Information</Label>
            <Textarea
              id="shippingInfo"
              value={formData.shippingInfo || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, shippingInfo: e.target.value }))}
              placeholder="Describe your shipping policy..."
              rows={6}
            />
          </div>

          <div>
            <Label htmlFor="returnPolicy">Return & Exchange Policy</Label>
            <Textarea
              id="returnPolicy"
              value={formData.returnPolicy || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, returnPolicy: e.target.value }))}
              placeholder="Describe your return policy..."
              rows={6}
            />
          </div>
        </TabsContent>
      </Tabs>

      {settings?.lastUpdatedBy && (
        <div className="mt-4 p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>
            Last updated by <strong>{settings.lastUpdatedBy}</strong>
            {settings.lastUpdatedAt && (
              <> on {new Date(settings.lastUpdatedAt).toLocaleString()}</>
            )}
          </span>
        </div>
      )}

      <div className="flex justify-end mt-6">
        <Button onClick={handleSave}>
          Save All Settings
        </Button>
      </div>
    </Card>
  )
}
