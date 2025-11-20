# Spookiki Creations E-commerce Platform

A handmade marketplace for spooky-cute art, ornaments, and gemstone clay snakes with a cozy, mystical aesthetic.

**Experience Qualities**:
1. **Whimsical** - Every interaction should feel delightful and slightly magical, like discovering a treasure in a witchy cottage
2. **Intimate** - The interface creates a personal connection with Kiki and her handmade creations, never feeling corporate or transactional
3. **Trustworthy** - Clear information, transparent processes, and warm communication build confidence in handmade purchases

**Complexity Level**: Complex Application (advanced functionality, accounts)
  - Full ecommerce with customer accounts, admin panel, cart/checkout, product catalog, blog, and manual payment processing

## Essential Features

### User Authentication & Account Management
- **Functionality**: Secure login system with role-based access control (admin/customer), password management
- **Purpose**: Enable personalized experiences and restrict admin functionality to authorized users
- **Trigger**: User clicks "Login" button in header or navigates to /account
- **Progression**: Account Page → Enter Credentials → Authenticate → Dashboard/Admin Panel
- **Success criteria**: Admins can access admin panel, users can change passwords, secure session management, login persists between sessions

### Product Browsing & Discovery
- **Functionality**: Browse products by category (Art, Ornaments, Snakes), filter by tags, view detailed product pages
- **Purpose**: Help customers discover unique handmade pieces that resonate with them
- **Trigger**: User clicks "Shop" in nav or collection cards on homepage
- **Progression**: Homepage → Shop Grid → Category Filter → Product Card Click → Product Detail → Add to Cart
- **Success criteria**: Users can find specific items within 2 clicks, product images are prominent, gem meanings are clearly displayed

### Shopping Cart & Checkout
- **Functionality**: Persistent cart with quantity management, multi-step checkout with manual payment options
- **Purpose**: Allow customers to purchase multiple items with flexible payment methods suitable for small business
- **Trigger**: User clicks "Add to Cart" on product page
- **Progression**: Add to Cart → Cart Review → Checkout Contact/Shipping → Payment Method Selection → Order Confirmation with Payment Instructions
- **Success criteria**: Cart persists between sessions, checkout is clear and simple, payment instructions are explicit

### Customer Accounts
- **Functionality**: Registration, login, order history, profile management
- **Purpose**: Let customers track orders and save information for repeat purchases
- **Trigger**: User clicks "Account" in nav or chooses to save info at checkout
- **Progression**: Register/Login → Dashboard → View Orders → Order Detail with Status
- **Success criteria**: Returning customers can quickly check order status, registration is optional not required

### Admin Product Management
- **Functionality**: Full CRUD operations for products including multiple images, pricing, categories, gemstone meanings, stock levels, featured status, and status management (active/draft/archived)
- **Purpose**: Give Kiki complete control over her inventory and product presentation
- **Trigger**: Admin navigates to /admin → Products tab
- **Progression**: Product List → Create/Edit Product → Upload Multiple Images (URL) → Set Details & Pricing → Set Category/Status/Featured → Save → View in Product Grid
- **Success criteria**: Can add new product with all fields in under 2 minutes, can add/remove multiple product images, can toggle featured status, can set stock quantity and track inventory, changes reflect immediately on storefront

### Admin Website Customization
- **Functionality**: Edit site settings including site name, tagline, contact info, social links, hero content, about text, and policies
- **Purpose**: Allow full website customization without code changes
- **Trigger**: Admin navigates to /admin → Website tab
- **Progression**: Website Settings → Select Category (General/Content/Policies) → Edit Fields → Save All Settings
- **Success criteria**: All website text can be customized, settings persist between sessions, changes are non-destructive

### Admin Order Fulfillment
- **Functionality**: View orders, filter by status, update payment/shipping status, view customer details
- **Purpose**: Streamline manual payment verification and shipping workflow
- **Trigger**: New order email notification or admin checks dashboard
- **Progression**: Orders List → Filter by "Awaiting Payment" → Verify Payment → Update to "Paid" → Ship Product → Update to "Shipped"
- **Success criteria**: Can process an order status update in 30 seconds, can filter to see what needs attention

### Blog & Storytelling
- **Functionality**: Markdown blog posts with images, tags, draft/publish workflow
- **Purpose**: Build community and share the creative process behind the handmade pieces
- **Trigger**: User clicks "Blog" or sees blog preview on homepage
- **Progression**: Blog Index → Filter by Tag → Post Click → Read Content → Related Posts
- **Success criteria**: Posts are visually appealing with good typography, admin can publish in minutes

## Edge Case Handling
- **Out of Stock Products**: Disabled add-to-cart button with "Sold Out" badge, option to show "Made to Order" instead
- **Empty Cart Checkout**: Friendly illustration with shop redirect, prevent checkout page access
- **Duplicate Orders**: Order confirmation page is accessible by order ID only, prevents resubmission
- **Invalid Payment Method**: Clear instructions for each method, admin can mark orders as needing clarification
- **Guest vs Logged-In**: Cart transfers when guest logs in, guest checkout fully supported
- **Mobile Shopping**: Full responsive design, touch-friendly product galleries, simplified checkout forms

## Design Direction
The design should evoke a warm, mystical curiosity—like browsing a cozy witch's marketplace where every piece has a story and intention. The interface balances playful whimsy with clean professionalism, ensuring customers feel delighted but never confused. We lean toward a rich interface with personality through rounded shapes, generous spacing, and soft color blocks, while keeping product photography as the hero.

## Color Selection
Custom palette - Mystical cozy with soft pastels and warm neutrals to create an inviting, magical atmosphere.

- **Primary Color**: Mystical Purple #7A687F - Communicates the witchy, spiritual essence of the brand; used for primary CTAs, headings, and key interactive elements
- **Secondary Colors**: 
  - Soft Mint #96DDCE - Supporting actions, success states, gentle background blocks for gem meanings
  - Digital Lavender #CBC3E3 - Footer backgrounds, accent blocks, hover states
- **Accent Color**: Blush Pink #E8A5A5 - Attention-grabbing highlight for limited edition badges, sale tags, and special callouts
- **Foreground/Background Pairings**:
  - Background (#F6F4F0 warm off-white): Dark Grey #555555 text - Ratio 8.2:1 ✓
  - Card (#FFFFFF white): Dark Grey #555555 text - Ratio 9.5:1 ✓
  - Primary (Mystical Purple #7A687F): White #FFFFFF text - Ratio 5.1:1 ✓
  - Secondary (Soft Mint #96DDCE): Dark Grey #2D2D2D text - Ratio 6.8:1 ✓
  - Accent (Blush Pink #E8A5A5): Dark Grey #2D2D2D text - Ratio 5.4:1 ✓
  - Muted (Digital Lavender #CBC3E3): Dark Grey #3D3D3D text - Ratio 6.1:1 ✓

## Font Selection
Typography should feel friendly and approachable while maintaining excellent readability, balancing whimsy with professionalism to build trust in the handmade products.

- **Typographic Hierarchy**:
  - H1 (Page Titles): Nunito Bold/36px/tight tracking/-0.02em
  - H2 (Section Headings): Nunito SemiBold/28px/normal tracking
  - H3 (Card Titles): Nunito SemiBold/20px/normal tracking
  - Body (Product Descriptions): Inter Regular/16px/1.6 line-height
  - Small (Prices, Labels): Inter Medium/14px/normal
  - Buttons: Inter SemiBold/15px/uppercase/0.05em tracking

## Animations
Animations should feel soft and organic, like gentle magical transitions that guide attention without demanding it. The balance leans toward subtle functionality with occasional moments of delight during key interactions (add to cart, order confirmation).

- **Purposeful Meaning**: 
  - Cart icon bounces when items are added to celebrate the action
  - Product cards lift on hover to suggest touchability and focus
  - Category filters slide smoothly to communicate active selection
  - Order confirmation includes a gentle success animation to create emotional satisfaction
- **Hierarchy of Movement**:
  - Primary: Add to cart, checkout completion (300ms with subtle spring)
  - Secondary: Card hovers, image galleries (200ms ease-out)
  - Tertiary: Filter changes, accordions (150ms ease)

## Component Selection
- **Components**:
  - **Card**: Product cards, blog cards, category highlights with rounded-lg borders
  - **Button**: Primary (filled purple), Secondary (outlined mint), sizes for CTAs vs utility actions
  - **Badge**: For "Limited", "New", "Sold Out", "Featured" with custom colors
  - **Dialog**: Quick view modals (future), image lightbox
  - **Form + Input + Label**: Checkout forms, account forms with inline validation
  - **Select**: Sort dropdown, category filters with custom purple accent
  - **Tabs**: Category navigation on shop page
  - **Accordion**: FAQ page, product care instructions
  - **Separator**: Section dividers with subtle styling
  - **Avatar**: Admin panel, account dashboard for user profile
  - **Table**: Admin order management, product list
  - **Switch**: Admin feature toggles (is_featured, status changes)
  - **Toast (Sonner)**: Add to cart confirmations, form validations with custom purple theme
  - **ScrollArea**: Long product descriptions, order histories

- **Customizations**:
  - Custom ProductCard component with image, badge overlay, hover states
  - Custom CartItemRow component with quantity controls and remove action
  - Custom GemMeaningCard with mint background for product details
  - Custom OrderStatusBadge with color-coded status indicators
  - Custom ImageGallery for product detail with thumbnail navigation
  - Custom AdminMetricCard for dashboard statistics

- **States**:
  - Buttons: default → hover (lift + color intensify) → active (pressed) → disabled (opacity 50%)
  - Inputs: default → focused (purple ring) → error (red border + message) → success (mint checkmark)
  - Product Cards: default → hover (lift 4px + shadow expand) → loading (skeleton pulse)
  - Cart Badge: empty (hidden) → populated (scale in + number) → updated (bounce)

- **Icon Selection**:
  - ShoppingCart (Phosphor): Cart in nav
  - User (Phosphor): Account in nav
  - MagnifyingGlass (Phosphor): Search functionality
  - Heart (Phosphor): Future wishlist feature
  - Plus/Minus (Phosphor): Quantity controls
  - Trash (Phosphor): Remove cart items
  - Package (Phosphor): Orders and shipping
  - Pencil (Phosphor): Edit actions in admin
  - Eye (Phosphor): View/preview actions
  - Check (Phosphor): Success states and confirmations
  - X (Phosphor): Close modals, remove filters
  - FunnelSimple (Phosphor): Filter controls
  - ArrowRight (Phosphor): CTAs and navigation hints

- **Spacing**: Base unit 4px, common values - gap-3 (12px), gap-6 (24px), p-8 (32px) for cards, section margins of 16/24/32 based on hierarchy

- **Mobile**: 
  - Navigation collapses to hamburger menu at <768px
  - Product grid: 3 cols → 2 cols @tablet → 1 col @mobile
  - Checkout steps remain single column, simplify to essential fields
  - Product detail: gallery stacks above details
  - Admin tables switch to card-based layout on mobile
  - Touch targets minimum 44px for buttons and interactive elements
