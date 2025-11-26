# Image Upload Feature Documentation

## Overview

This feature makes it easy to upload photos directly from your device instead of having to manually enter image URLs. It's designed to be user-friendly, similar to using Google Drive or other file pickers.

## Features

### Two Ways to Add Images

#### 1. Upload File (Recommended)
- **Select from Device**: Click to browse and select images from your computer
- **Drag & Drop Support**: Coming soon!
- **Preview Before Upload**: See your image before adding it
- **Supported Formats**: JPG, PNG, GIF, WebP
- **Size Limit**: Up to 10MB per image

#### 2. Two Upload Options

##### Option A: Upload to Cloud (Recommended)
- **Best for Performance**: Images are stored on Imgur's servers
- **No Size Limits**: Your browser storage isn't affected
- **Always Accessible**: Images remain available even if you clear browser data
- **Shareable URLs**: Get a permanent link you can use anywhere

##### Option B: Use Local Copy
- **Immediate**: No upload wait time
- **Privacy**: Images stay in your browser
- **Limitations**: 
  - Takes up browser storage space
  - May slow down the app with many images
  - Lost if you clear browser data

#### 3. Enter URL Manually
- **Fallback Option**: Still works like before
- **Use for existing images**: If you already have images hosted elsewhere
- **Preview**: See the image before adding it

## Where to Find It

### Admin Products Page
1. Log in as admin
2. Go to Admin → Products
3. Click "Add Product" or edit an existing product
4. Scroll to "Product Images" section
5. Click the **"Add Image"** button
6. Choose your upload method in the dialog

### Visual Editor
1. Log in as admin
2. Go to Admin → Visual Editor
3. Select an image element
4. In the properties panel, click the **image icon button** next to the URL field
5. Choose your upload method in the dialog

## How to Use

### Uploading from Your Device

1. **Click "Add Image" button**
   - Opens the Image Uploader dialog

2. **Select "Upload File" tab** (default)
   - Click the file input or select browse
   - Choose an image from your device

3. **Preview your image**
   - The image appears with file details (name, size)
   - Verify it's the correct image

4. **Choose upload method**:
   
   **For Cloud Upload (Recommended)**:
   - Click "Upload to Cloud (Recommended)"
   - Wait for upload to complete (usually 1-3 seconds)
   - Success! The image URL is added to your product

   **For Local Copy**:
   - Click "Use Local Copy"
   - Image is immediately converted to base64 and stored
   - The image data is added to your product

### Using an Image URL

1. **Click "Add Image" button**

2. **Select "Enter URL" tab**

3. **Paste or type the image URL**
   - Example: `https://example.com/my-photo.jpg`

4. **Preview** (optional)
   - The image preview appears below

5. **Click "Add"**
   - The URL is added to your product

## Technical Details

### Image Upload Process

```
User selects file
      ↓
Validation (type, size)
      ↓
Local preview created
      ↓
User chooses upload method
      ↓
╔═══════════════╦══════════════════╗
║ Cloud Upload  ║   Local Copy     ║
╠═══════════════╬══════════════════╣
║ Convert to    ║ Convert to       ║
║ base64        ║ base64 data URL  ║
║      ↓        ║       ↓          ║
║ Upload to     ║ Store directly   ║
║ Imgur API     ║ in product       ║
║      ↓        ║                  ║
║ Get public    ║                  ║
║ URL           ║                  ║
╚═══════════════╩══════════════════╝
      ↓
Image URL stored in product/element
```

### Security & Privacy

- **No API Keys Required**: Uses Imgur's anonymous upload API
- **Client-Side Only**: All processing happens in your browser
- **No Server Storage**: Images are either uploaded to Imgur or stored as base64
- **File Validation**: 
  - Type checking ensures only images are accepted
  - Size limit prevents browser crashes

### Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **File API**: Required for file selection and preview
- **Fetch API**: Required for Imgur uploads
- **Base64 Encoding**: Required for both upload methods

## Troubleshooting

### "Upload failed" Error
- **Solution**: Try the "Use Local Copy" option instead
- **Cause**: Network issues or Imgur rate limiting
- **Alternative**: Use the "Enter URL" tab if you have the image hosted elsewhere

### "Image size must be less than 10MB"
- **Solution**: Resize or compress your image before uploading
- **Tools**: Use online image compressors or photo editing software
- **Recommendation**: For web, images should typically be under 1MB

### "Please select an image file"
- **Solution**: Ensure the file has an image extension (.jpg, .png, .gif, .webp)
- **Cause**: Selected a non-image file

### Images not loading after "Use Local Copy"
- **Solution**: Use "Upload to Cloud" instead
- **Cause**: Browser storage limits or very large base64 data
- **Prevention**: Use cloud upload for images over 1MB

## Best Practices

### For Best Performance
1. ✅ **Use "Upload to Cloud"** for product images
2. ✅ **Compress images** before uploading (aim for <500KB)
3. ✅ **Use modern formats** like WebP when possible
4. ❌ **Avoid "Use Local Copy"** for many/large images

### For Privacy
1. ✅ **Use "Use Local Copy"** if images contain private info
2. ✅ **Use "Enter URL"** if you host images yourself
3. ❌ **Don't use "Upload to Cloud"** for sensitive content

### For Reliability
1. ✅ **Use "Upload to Cloud"** for permanent images
2. ✅ **Keep a backup** of important images locally
3. ✅ **Test images** load correctly after adding

## Comparison with Manual URL Entry

| Feature | New Upload | Manual URL |
|---------|-----------|------------|
| **Ease of Use** | ⭐⭐⭐⭐⭐ Click & select | ⭐⭐ Copy/paste URL |
| **Speed** | ⭐⭐⭐⭐ 2-3 seconds | ⭐⭐⭐⭐⭐ Instant |
| **No Hosting Needed** | ✅ Yes (cloud option) | ❌ Need hosting |
| **Preview** | ✅ Before upload | ⚠️ After adding |
| **Validation** | ✅ Type & size | ❌ Manual check |
| **Error Handling** | ✅ Clear messages | ⚠️ Broken links |

## Future Enhancements

Potential improvements for future versions:

1. **Google Drive Integration**: Direct selection from Google Drive
2. **Dropbox Integration**: Select from Dropbox
3. **Drag & Drop**: Drag images directly onto the dialog
4. **Bulk Upload**: Upload multiple images at once
5. **Image Editing**: Crop, rotate, adjust before uploading
6. **Progress Indicators**: Better feedback during upload
7. **Automatic Compression**: Reduce file size automatically

## Support

If you encounter issues:

1. Try the alternative upload method
2. Check browser console for error messages
3. Verify internet connection for cloud uploads
4. Try a different image format or smaller file
5. Clear browser cache and try again

## Credits

- **Imgur API**: Used for anonymous image hosting
- **Radix UI**: Dialog components
- **Phosphor Icons**: Icon library
- **Sonner**: Toast notifications
