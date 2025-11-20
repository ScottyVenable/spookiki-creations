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

export function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const renderPage = () => {
    if (currentPath === '/') return <HomePage />
    if (currentPath === '/shop' || currentPath.startsWith('/shop/')) return <ShopPage />
    if (currentPath.startsWith('/product/')) return <ProductDetailPage />
    if (currentPath === '/cart') return <CartPage />
    if (currentPath === '/checkout') return <CheckoutPage />
    if (currentPath.startsWith('/order/')) return <OrderConfirmationPage />
    if (currentPath === '/blog') return <BlogIndexPage />
    if (currentPath.startsWith('/blog/')) return <BlogPostPage />
    if (currentPath === '/about') return <AboutPage />
    if (currentPath === '/contact') return <ContactPage />
    if (currentPath === '/faq') return <FAQPage />
    if (currentPath.startsWith('/account')) return <AccountPage />
    if (currentPath.startsWith('/admin')) return <AdminPage />
    
    return <HomePage />
  }

  const isAdminRoute = currentPath.startsWith('/admin')

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
