# Admin System Testing Guide

## Test Accounts

### Admin Accounts
1. **Kiki (Owner)**
   - Username: `spookiki`
   - Password: `welcome123`
   - Role: Admin

2. **Scotty**
   - Username: `Scotty2Hotty999`
   - Password: `SVen!8019`
   - Role: Admin

## Features to Test

### 1. Authentication System ✓
- [ ] Login with Kiki's account (spookiki / welcome123)
- [ ] Login with Scotty's account (Scotty2Hotty999 / SVen!8019)
- [ ] Verify "Admin" link appears in navigation for admins
- [ ] Verify user dropdown menu shows username and role
- [ ] Test logout functionality
- [ ] Verify login persists after page refresh
- [ ] Test invalid login credentials (should show error)

### 2. Account Settings ✓
- [ ] Navigate to Account → Settings
- [ ] View profile information (username, name, role)
- [ ] Change password
- [ ] Verify new password works after change
- [ ] Confirm password mismatch validation
- [ ] Test minimum password length validation (6 characters)

### 3. Admin Panel Access ✓
- [ ] Navigate to /admin while logged in as admin
- [ ] Verify dashboard shows correct metrics:
  - Pending Payment count
  - Paid Orders count
  - Total Revenue
  - Active Products count
- [ ] Verify non-admin users cannot access /admin
- [ ] Test "View Store" button returns to homepage
- [ ] Test sign out from admin panel

### 4. Product Management (Admin Panel) ✓
- [ ] Navigate to Products tab
- [ ] Click "Add Product" button
- [ ] Fill in all product fields:
  - Name (required)
  - Description
  - Price (required)
  - Stock Quantity
  - Category (art/ornament/snake/other)
  - Status (active/draft/archived)
  - Material
  - Gemstone
  - Gemstone Meaning
  - Tags (comma-separated)
  - Multiple image URLs
  - Featured toggle
- [ ] Save new product
- [ ] Verify product appears in list
- [ ] Edit existing product
- [ ] Add multiple images to a product
- [ ] Remove an image from a product
- [ ] Toggle featured status
- [ ] Change product status (active/draft/archived)
- [ ] Delete a product (with confirmation)
- [ ] Verify products with no image show placeholder icon

### 5. Order Management (Admin Panel) ✓
- [ ] Navigate to Orders tab
- [ ] View all orders sorted by date (newest first)
- [ ] Change order status using dropdown:
  - Pending
  - Awaiting Payment
  - Paid
  - Shipped
  - Cancelled
- [ ] Click "View Details" on an order
- [ ] Verify order details page shows:
  - Order items
  - Pricing breakdown
  - Shipping address
  - Order status

### 6. Website Settings (Admin Panel) ✓
- [ ] Navigate to Website tab
- [ ] Test General Settings tab:
  - Site Name
  - Tagline
  - Contact Email
  - Contact Phone
  - Instagram URL
  - Facebook URL
  - Twitter URL
- [ ] Test Content Settings tab:
  - Homepage Hero Title
  - Homepage Hero Subtitle
  - Hero Image URL (with preview)
  - About Section Text
- [ ] Test Policies Settings tab:
  - Shipping Information
  - Return & Exchange Policy
- [ ] Click "Save All Settings"
- [ ] Verify settings persist after page refresh

### 7. Customer Experience (Non-Admin View) ✓
- [ ] Log out from admin account
- [ ] Verify "Admin" link is hidden in navigation
- [ ] Verify "Login" button appears in header
- [ ] Login to view account page
- [ ] View order history
- [ ] View order details
- [ ] Navigate to /admin without being logged in (should be denied)
- [ ] Verify regular users cannot see admin features

### 8. Product Display Integration ✓
- [ ] Create a product in admin panel with status "active"
- [ ] Navigate to Shop page
- [ ] Verify new product appears
- [ ] Create a product with status "draft"
- [ ] Verify draft product does NOT appear on Shop page
- [ ] Mark a product as "featured"
- [ ] Verify it appears in featured section on homepage

### 9. Data Persistence ✓
- [ ] Create products, change settings, update orders
- [ ] Refresh page
- [ ] Verify all changes persist
- [ ] Close and reopen browser
- [ ] Verify login session persists (if recently logged in)
- [ ] Verify all data is still present

### 10. Edge Cases ✓
- [ ] Try creating product with empty name (should validate)
- [ ] Try creating product with $0 price
- [ ] Add product with no images
- [ ] Add product with 10+ images
- [ ] Edit product and remove all images
- [ ] Change password to very short password (should validate)
- [ ] Log in with wrong password
- [ ] Log in with non-existent username

## Success Criteria

All checkboxes above should pass for a complete, working admin system.

## Notes

- All data is stored in browser localStorage via useKV hook
- Passwords are base64 encoded (not production-secure, for demo purposes)
- Admin access is controlled by user role
- Multiple admins can exist and manage the site
- Changes to products, orders, and settings are immediate
