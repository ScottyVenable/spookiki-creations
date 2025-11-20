import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Upload, Link as LinkIcon, Trash, ImageSquare } from '@phosphor-icons/react'
import { toast } from 'sonner'

// Configuration constants
const MAX_FILE_SIZE_MB = 10
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024
const IMGUR_CLIENT_ID = '546c25a59c58ad7' // Public client ID for anonymous uploads
const FALLBACK_IMAGE_PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="18"%3EInvalid URL%3C/text%3E%3C/svg%3E'

interface ImageUploaderProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onImageSelected: (url: string) => void
  title?: string
  description?: string
}

export function ImageUploader({ 
  open, 
  onOpenChange, 
  onImageSelected,
  title = "Add Image",
  description = "Upload an image from your device or enter an image URL"
}: ImageUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file')
        return
      }
      
      // Validate file size (max 10MB)
      if (file.size > MAX_FILE_SIZE_BYTES) {
        toast.error(`Image size must be less than ${MAX_FILE_SIZE_MB}MB`)
        return
      }

      setSelectedFile(file)
      
      // Create preview
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)
    }
  }

  const handleUploadToImgur = async () => {
    if (!selectedFile) return

    setUploading(true)
    
    try {
      // Convert file to base64
      const reader = new FileReader()
      reader.readAsDataURL(selectedFile)
      
      reader.onload = async () => {
        try {
          const base64Image = (reader.result as string).split(',')[1]
          
          // Upload to Imgur anonymously
          const response = await fetch('https://api.imgur.com/3/image', {
            method: 'POST',
            headers: {
              'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              image: base64Image,
              type: 'base64',
            }),
          })

          if (!response.ok) {
            throw new Error('Upload failed')
          }

          const data = await response.json()
          
          if (data.success && data.data.link) {
            onImageSelected(data.data.link)
            toast.success('Image uploaded successfully')
            handleClose()
          } else {
            throw new Error('Upload failed')
          }
        } catch (error) {
          console.error('Upload error:', error)
          toast.error('Failed to upload image. Please try entering a URL instead.')
        } finally {
          setUploading(false)
        }
      }

      reader.onerror = () => {
        toast.error('Failed to read file')
        setUploading(false)
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload image')
      setUploading(false)
    }
  }

  const handleUseDataUrl = () => {
    if (!selectedFile) return
    
    const reader = new FileReader()
    reader.readAsDataURL(selectedFile)
    
    reader.onload = () => {
      if (reader.result) {
        onImageSelected(reader.result as string)
        toast.success('Image added')
        handleClose()
      }
    }
    
    reader.onerror = () => {
      toast.error('Failed to read file')
    }
  }

  const handleUrlSubmit = () => {
    if (!imageUrl.trim()) {
      toast.error('Please enter a valid URL')
      return
    }

    // Basic URL validation
    try {
      new URL(imageUrl)
      onImageSelected(imageUrl.trim())
      toast.success('Image URL added')
      handleClose()
    } catch {
      toast.error('Please enter a valid URL')
    }
  }

  const handleClose = () => {
    // Clean up
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setSelectedFile(null)
    setPreviewUrl(null)
    setImageUrl('')
    setUploading(false)
    onOpenChange(false)
  }

  const handleRemoveFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setSelectedFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload File</TabsTrigger>
            <TabsTrigger value="url">Enter URL</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4 pt-4">
            <div>
              <Label htmlFor="file-upload">Select Image</Label>
              <div className="mt-2">
                <Input
                  ref={fileInputRef}
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  disabled={uploading}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Supported formats: JPG, PNG, GIF, WebP (max {MAX_FILE_SIZE_MB}MB)
              </p>
            </div>

            {previewUrl && selectedFile && (
              <div className="space-y-4">
                <div className="relative">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full h-48 object-contain rounded-lg border border-border bg-muted"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={handleRemoveFile}
                    disabled={uploading}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p><strong>File:</strong> {selectedFile.name}</p>
                  <p><strong>Size:</strong> {(selectedFile.size / 1024).toFixed(2)} KB</p>
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={handleUploadToImgur}
                    disabled={uploading}
                    className="w-full"
                  >
                    {uploading ? (
                      'Uploading...'
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload to Cloud (Recommended)
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleUseDataUrl}
                    disabled={uploading}
                    className="w-full"
                  >
                    <ImageSquare className="mr-2 h-4 w-4" />
                    Use Local Copy
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Cloud upload is recommended for better performance. Local copy stores the image in your browser.
                  </p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="url" className="space-y-4 pt-4">
            <div>
              <Label htmlFor="image-url">Image URL</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="image-url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleUrlSubmit()
                    }
                  }}
                />
                <Button onClick={handleUrlSubmit}>
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Enter a publicly accessible image URL
              </p>
            </div>

            {imageUrl && (
              <div className="mt-4">
                <Label>Preview</Label>
                <img 
                  src={imageUrl} 
                  alt="URL Preview" 
                  className="w-full h-48 object-contain rounded-lg border border-border bg-muted mt-2"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE_PLACEHOLDER
                  }}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
