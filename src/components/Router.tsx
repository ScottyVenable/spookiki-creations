import { useState, useEffect } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import HomePage from '@/pages/HomePage'
import ShopPage from '@/pages/ShopPage'
import ProductDetailPage from '@/pages/ProductDetailPage'
import CartPage from '@/pages/CartPage'
import CheckoutPage from '@/pages/CheckoutPage'
import OrderConfirmationPage from '@/pages/OrderConfirmationPage'
import BlogIndexPage from '@/pages/BlogIndexPage'
import BlogPostPage from '@/pages/BlogPostPage'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'
import FAQPage from '@/pages/FAQPage'
import AccountPage from '@/pages/AccountPage'
import AdminPage from '@/pages/AdminPage'

const BASE_PATH = '/spookiki-creations'

export function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

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
        {renderPage()}
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  )
}
