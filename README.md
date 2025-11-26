# 🎃 Spookiki Creations

A handmade marketplace for spooky-cute art, ornaments, and gemstone clay snakes with a cozy, mystical aesthetic.

[![Deploy to GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue)](https://github.com/ScottyVenable/spookiki-creations/actions)

## ✨ Overview

Spookiki Creations is a full-featured e-commerce platform built with React, TypeScript, and Vite. It provides a complete shopping experience with:

- **Product Catalog** - Browse handmade art, ornaments, and gemstone clay snakes
- **Shopping Cart** - Persistent cart with quantity management
- **Checkout Flow** - Multi-step checkout with manual payment options
- **Admin Panel** - Full product, order, and website management
- **Blog** - Markdown-based blog with tags and categories
- **User Accounts** - Authentication with role-based access control

## 🎨 Design Philosophy

The design evokes a warm, mystical curiosity—like browsing a cozy witch's marketplace where every piece has a story and intention. The interface balances playful whimsy with clean professionalism.

**Experience Qualities:**
1. **Whimsical** - Every interaction feels delightful and slightly magical
2. **Intimate** - Creates a personal connection with handmade creations
3. **Trustworthy** - Clear information and transparent processes

## 🚀 Quick Start

### Prerequisites

- Node.js v20+ 
- npm (comes with Node.js)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/`

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 👤 Admin Access

The admin panel is accessible at `/admin` for authorized users.

### Default Admin Accounts

| User | Username | Password | Role |
|------|----------|----------|------|
| Kiki (Owner) | `spookiki` | `welcome123` | Admin |
| Scotty | `Scotty2Hotty999` | `SVen!8019` | Admin |

### Admin Features

- **Products** - Full CRUD operations with multiple images, categories, and featured products
- **Orders** - View and update order status (Pending → Paid → Shipped)
- **Website** - Customize site name, hero content, policies, and contact info

See [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) for detailed documentation.

## 📁 Project Structure

```
spookiki-creations/
├── src/
│   ├── components/     # React components
│   │   ├── ui/         # shadcn/ui component library
│   │   └── admin/      # Admin panel components
│   ├── pages/          # Page components
│   ├── contexts/       # React Context providers
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities and data
│   └── styles/         # CSS styles and theming
├── public/             # Static assets
├── docs/               # Additional documentation
└── ...config files
```

See the README.md in each folder for detailed documentation.

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - Component library (Radix UI primitives)

### State Management
- **React Context** - Global state (Auth, Mobile Optimization)
- **React Query** - Server state management
- **Firebase Realtime Database** - Cloud data sync (free tier)
- **Local Storage** - Offline fallback

### Additional Libraries
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Phosphor Icons** - Additional icons
- **Zod** - Schema validation
- **React Hook Form** - Form handling
- **date-fns** - Date utilities

## 🌐 Deployment

### GitHub Pages

The project is configured for automatic deployment to GitHub Pages:

1. Go to repository **Settings** → **Pages**
2. Set **Source** to "GitHub Actions"
3. Push to `main` branch to trigger deployment

Your site will be available at: `https://<username>.github.io/spookiki-creations/`

See [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md) for detailed instructions.

### ☁️ Cloud Storage (Optional)

For cross-device data sync (products, orders, cart), set up free Firebase:

1. Create a free Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Realtime Database
3. Copy your config to `.env` (see `.env.example`)
4. Run `npm install` to get Firebase package

See [CLOUD_STORAGE_SETUP.md](./CLOUD_STORAGE_SETUP.md) for detailed instructions.

**Without Firebase:** The app works perfectly with localStorage (no cross-device sync).

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [PRD.md](./PRD.md) | Product Requirements Document |
| [CLOUD_STORAGE_SETUP.md](./CLOUD_STORAGE_SETUP.md) | Free cloud storage setup guide |
| [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) | Complete admin user manual |
| [ADMIN_FEATURES.md](./ADMIN_FEATURES.md) | Admin feature summary |
| [ADMIN_TESTING.md](./ADMIN_TESTING.md) | Admin testing checklist |
| [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) | Admin quick reference |
| [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md) | Deployment instructions |
| [IMAGE_UPLOAD_FEATURE.md](./IMAGE_UPLOAD_FEATURE.md) | Image upload documentation |
| [TODO.md](./TODO.md) | Testing TODO and known issues |

## 🎯 Key Features

### For Customers
- Browse products by category (Art, Ornaments, Snakes)
- View detailed product pages with gemstone meanings
- Add items to persistent shopping cart
- Complete checkout with multiple payment options
- Create account and view order history

### For Admins
- Create, edit, and delete products
- Manage multiple product images
- Set product status (Active, Draft, Archived)
- Process and track orders
- Customize website content and policies

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Mystical Purple | `#7A687F` | Primary CTAs, headings |
| Soft Mint | `#96DDCE` | Success states, accents |
| Digital Lavender | `#CBC3E3` | Footer, hover states |
| Blush Pink | `#E8A5A5` | Badges, highlights |
| Background | `#F6F4F0` | Main background |

## 📱 Responsive Design

- **Desktop** - Full navigation and 3-column product grid
- **Tablet** - 2-column product grid, simplified layout
- **Mobile** - Single column, hamburger menu, touch-optimized

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Spark](https://github.com/github/spark)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/) and [Phosphor](https://phosphoricons.com/)

---

Made with 🖤 by Spookiki Creations
