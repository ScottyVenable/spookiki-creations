import { useState, useEffect, lazy, Suspense } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import HomePage from '@/pages/HomePage'

// Lazy load pages for better performance, especially on mobile
const ShopPage = lazy(() => import('@/pages/ShopPage'))
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'))
const CartPage = lazy(() => import('@/pages/CartPage'))
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage'))
const OrderConfirmationPage = lazy(() => import('@/pages/OrderConfirmationPage'))
const BlogIndexPage = lazy(() => import('@/pages/BlogIndexPage'))
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const FAQPage = lazy(() => import('@/pages/FAQPage'))
const AccountPage = lazy(() => import('@/pages/AccountPage'))
const AdminPage = lazy(() => import('@/pages/AdminPage'))

const BASE_PATH = ''

// Loading component for Suspense fallback
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}

export function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    // Handle redirect from 404.html for SPA routing on GitHub Pages
    const redirectPath = sessionStorage.getItem('redirectPath')
    if (redirectPath && redirectPath !== '/') {
      sessionStorage.removeItem('redirectPath')
      window.history.replaceState(null, '', redirectPath)
      setCurrentPath(redirectPath)
    }
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const getPathWithoutBase = (path: string) => {
    if (path.startsWith(BASE_PATH)) {
      return path.slice(BASE_PATH.length) || '/'
    }
    return path
  }

  const renderPage = () => {
    const path = getPathWithoutBase(currentPath)
    
    if (path === '/') return <HomePage />
    if (path === '/shop' || path.startsWith('/shop/')) return <ShopPage />
    if (path.startsWith('/product/')) return <ProductDetailPage />
    if (path === '/cart') return <CartPage />
    if (path === '/checkout') return <CheckoutPage />
    if (path.startsWith('/order/')) return <OrderConfirmationPage />
    if (path === '/blog') return <BlogIndexPage />
    if (path.startsWith('/blog/')) return <BlogPostPage />
    if (path === '/about') return <AboutPage />
    if (path === '/contact') return <ContactPage />
    if (path === '/faq') return <FAQPage />
    if (path.startsWith('/account')) return <AccountPage />
    if (path.startsWith('/admin')) return <AdminPage />
    
    return <HomePage />
  }

  const path = getPathWithoutBase(currentPath)
  const isAdminRoute = path.startsWith('/admin')

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Header />}
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          {renderPage()}
        </Suspense>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  )
}
