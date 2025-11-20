# Spookiki Creations - Admin System Documentation

## Overview

The Spookiki Creations admin system provides a comprehensive suite of tools for managing the e-commerce website. Administrators can manage products, process orders, and customize website content—all without touching code.

## Admin Accounts

### Initial Users

The system comes with two pre-configured admin accounts:

1. **Kiki (Website Owner)**
   - Username: `spookiki`
   - Password: `welcome123`
   - Role: Admin

2. **Scotty**
   - Username: `Scotty2Hotty999`
   - Password: `SVen!8019`
   - Role: Admin

> **Note:** Both users can change their passwords through Account Settings.

## Accessing the Admin Panel

### For Admin Users

1. **Login**: Click the "Login" button in the header or navigate to `/account`
2. **Enter Credentials**: Use one of the admin accounts above
3. **Navigate to Admin**: 
   - Click the "Admin" link in the main navigation (only visible to admins)
   - Or use the dropdown menu under your profile icon
   - Or navigate directly to `/admin`

### Security

- Non-admin users cannot access `/admin` (they will see an access denied message)
- Login sessions persist between browser sessions
- Passwords can be changed at any time through Account Settings

## Admin Features

### Dashboard Overview

When you first enter the admin panel, you'll see four key metrics:

- **Pending Payment**: Orders awaiting payment confirmation
- **Paid Orders**: Orders that have been paid but not yet shipped
- **Total Revenue**: Combined total of all paid and shipped orders
- **Active Products**: Number of products currently active in the store

### Product Management

Navigate to the **Products** tab to manage your inventory.

#### Creating a New Product

1. Click the "Add Product" button
2. Fill in the product details:

**Required Fields:**
- **Product Name**: The display name of your product
- **Price**: The sale price in USD

**Optional Fields:**
- **Description**: Detailed product information
- **Stock Quantity**: How many units you have available
- **Category**: Choose from Art, Ornament, Snake, or Other
- **Status**: 
  - `Active`: Visible in the store
  - `Draft`: Hidden, work in progress
  - `Archived`: Hidden, no longer sold
- **Material**: What the product is made from
- **Gemstone**: If applicable, the type of gemstone used
- **Gemstone Meaning**: Metaphysical properties or significance
- **Tags**: Comma-separated tags for filtering (e.g., "spooky, cute, handmade")
- **Product Images**: Add multiple image URLs
- **Featured**: Toggle to display in the featured products section

3. Click "Create Product" to save

#### Managing Product Images

- **Adding Images**: Enter an image URL and click "Add" or press Enter
- **Multiple Images**: Add as many images as you like
- **Removing Images**: Hover over an image thumbnail and click the trash icon
- **Image Order**: The first image is used as the main product image

#### Editing Products

1. Find the product in the list
2. Click the pencil icon
3. Make your changes
4. Click "Update Product"

#### Deleting Products

1. Click the trash icon on the product
2. Confirm the deletion

> **Warning:** Deleting a product is permanent and cannot be undone.

### Order Management

Navigate to the **Orders** tab to manage customer orders.

#### Order List

Orders are displayed in reverse chronological order (newest first) showing:
- Order ID
- Customer name and email
- Item count and total amount
- Current status
- Date placed

#### Updating Order Status

Use the dropdown menu to change order status:

- **Pending**: Order received, not yet processed
- **Awaiting Payment**: Waiting for payment confirmation
- **Paid**: Payment confirmed, ready to ship
- **Shipped**: Order has been shipped to customer
- **Cancelled**: Order was cancelled

> **Tip:** Status changes are saved automatically and update the dashboard metrics.

#### Viewing Order Details

Click "View Details" on any order to see:
- Full list of items ordered
- Pricing breakdown (subtotal, shipping, total)
- Complete shipping address
- Payment method
- Order status

### Website Customization

Navigate to the **Website** tab to customize site content.

#### General Settings

- **Site Name**: Main site title (default: "Spookiki Creations")
- **Tagline**: Brief description of your business
- **Contact Email**: Customer service email
- **Contact Phone**: Customer service phone number
- **Social Media Links**: Instagram, Facebook, Twitter URLs

#### Content Settings

- **Homepage Hero Title**: Main headline on homepage
- **Homepage Hero Subtitle**: Supporting text below title
- **Hero Image URL**: Background image for hero section (with live preview)
- **About Section Text**: Your story and brand description

#### Policies Settings

- **Shipping Information**: Your shipping methods, timeframes, and costs
- **Return & Exchange Policy**: Terms for returns and exchanges

> **Important:** Click "Save All Settings" to persist changes.

## Account Management

### Viewing Your Account

1. Click your profile icon in the header
2. Select "My Account"
3. View your:
   - Total orders
   - Shipped orders
   - Account type (Admin/Customer)
   - Order history

### Changing Your Password

1. Click your profile icon → "Settings"
2. Enter your new password
3. Confirm your new password
4. Click "Update Password"

**Password Requirements:**
- Minimum 6 characters
- Passwords must match

## Customer View vs Admin View

### As an Admin, You Can:

- ✅ View the store like any customer
- ✅ Access the admin panel
- ✅ Manage products, orders, and settings
- ✅ See the "Admin" link in navigation
- ✅ Access enhanced account features

### Customers (Non-Admins) Can:

- ✅ Browse products
- ✅ Add items to cart
- ✅ Place orders
- ✅ View their order history
- ❌ Cannot access admin panel
- ❌ Cannot see admin navigation links

## Data Persistence

All data (products, orders, user credentials, website settings) is stored locally in your browser using the `useKV` persistence API. This means:

- ✅ Changes persist between sessions
- ✅ No server or database required
- ✅ Instant updates
- ⚠️ Data is browser-specific (doesn't sync between devices)
- ⚠️ Clearing browser data will delete all admin data

## Best Practices

### Product Management

1. **Use Draft Status**: Create products as drafts, review them, then set to active
2. **Multiple Images**: Always add at least 2-3 images per product
3. **Rich Descriptions**: Write detailed, engaging product descriptions
4. **Accurate Stock**: Keep stock quantities updated to avoid overselling
5. **Featured Products**: Limit featured products to 3-6 of your best items

### Order Management

1. **Process Promptly**: Check for new orders daily
2. **Update Status**: Keep customers informed by updating order status
3. **Communicate**: Use the customer's email to send shipment tracking info

### Website Settings

1. **Professional Contact Info**: Keep contact information current
2. **Clear Policies**: Write clear, customer-friendly shipping and return policies
3. **Quality Images**: Use high-quality hero images that represent your brand
4. **Backup Content**: Keep a copy of your website text in a separate document

## Troubleshooting

### Can't Access Admin Panel

- Verify you're logged in as an admin user
- Check that you're using the correct username (case-sensitive)
- Try logging out and back in
- Clear your browser cache if login persists incorrectly

### Products Not Appearing in Store

- Check product status is set to "Active" (not Draft or Archived)
- Verify product has at least one image
- Refresh the shop page
- Check browser console for errors

### Changes Not Saving

- Ensure you clicked the "Save" button
- Check for form validation errors (red borders or error messages)
- Try refreshing the page and re-entering the data
- Check browser console for errors

### Password Not Working After Change

- Ensure passwords matched when you set them
- Try logging out completely and back in
- Verify caps lock is off
- Password is case-sensitive

## Support

For questions or issues with the admin system, see the main README or contact the development team.

---

**Last Updated**: January 2025
**Version**: 1.0.0
