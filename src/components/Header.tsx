import { ShoppingCart, User, MagnifyingGlass, GearSix, SignOut, List } from '@phosphor-icons/react'
import { Link } from './Link'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from './ui/sheet'
import { useKV } from '@github/spark/hooks'
import { useAuth } from '@/contexts/AuthContext'
import type { CartItem } from '@/lib/types'
import { useState } from 'react'

export function Header() {
  const [cart] = useKV<CartItem[]>('cart', [])
  const { currentUser, logout, isAdmin } = useAuth()
  const cartItemCount = (cart || []).reduce((sum, item) => sum + item.quantity, 0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => setMobileMenuOpen(false)
  
  const handleLogout = () => {
    logout()
    closeMobileMenu()
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Spookiki Creations
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/shop" className="text-sm font-medium hover:text-primary transition-colors">
            Shop
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
            Blog
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </Link>
          {isAdmin && (
            <Link href="/admin" className="text-sm font-medium hover:text-primary transition-colors text-accent">
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <List className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px]">
              <SheetHeader>
                <SheetTitle style={{ fontFamily: 'Nunito, sans-serif' }}>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                <SheetClose asChild>
                  <Link href="/shop" className="text-base font-medium hover:text-primary transition-colors py-2">
                    Shop
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/blog" className="text-base font-medium hover:text-primary transition-colors py-2">
                    Blog
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/about" className="text-base font-medium hover:text-primary transition-colors py-2">
                    About
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/contact" className="text-base font-medium hover:text-primary transition-colors py-2">
                    Contact
                  </Link>
                </SheetClose>
                {isAdmin && (
                  <SheetClose asChild>
                    <Link href="/admin" className="text-base font-medium hover:text-primary transition-colors py-2 text-accent">
                      Admin Panel
                    </Link>
                  </SheetClose>
                )}
                {currentUser && (
                  <>
                    <div className="border-t border-border my-2" />
                    <SheetClose asChild>
                      <Link href="/account" className="text-base font-medium hover:text-primary transition-colors py-2">
                        My Account
                      </Link>
                    </SheetClose>
                    <Button variant="outline" onClick={handleLogout} className="justify-start">
                      <SignOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                )}
                {!currentUser && (
                  <SheetClose asChild>
                    <Link href="/account">
                      <Button variant="outline" className="w-full justify-start">
                        Login
                      </Button>
                    </Link>
                  </SheetClose>
                )}
              </nav>
            </SheetContent>
          </Sheet>

          <Button variant="ghost" size="icon" className="hidden md:flex">
            <MagnifyingGlass className="h-5 w-5" />
          </Button>
          
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground">@{currentUser.username}</p>
                  {isAdmin && (
                    <Badge variant="secondary" className="mt-1 text-xs">Admin</Badge>
                  )}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    My Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/settings" className="cursor-pointer">
                    <GearSix className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer">
                        <GearSix className="mr-2 h-4 w-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <SignOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/account" className="hidden md:block">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
          )}
          
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground text-xs"
                  variant="default"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
