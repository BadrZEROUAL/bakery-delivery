"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MenuIcon, UserIcon } from "@/components/icons"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/i18n/language-context"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function Header() {
  const { t } = useLanguage()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const checkLoginStatus = () => {
      const user = localStorage.getItem("user")
      setIsLoggedIn(!!user)
    }

    // Check initial status
    checkLoginStatus()

    // Listen for storage changes (works across tabs)
    window.addEventListener("storage", checkLoginStatus)

    // Listen for custom login event (works in same tab)
    window.addEventListener("loginStateChanged", checkLoginStatus)

    return () => {
      window.removeEventListener("storage", checkLoginStatus)
      window.removeEventListener("loginStateChanged", checkLoginStatus)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.dispatchEvent(new Event("loginStateChanged"))
    router.push("/")
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">B</span>
            </div>
            <span className="font-bold text-xl text-foreground">BakeryBox</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("nav.products")}
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("nav.about")}
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("nav.contact")}
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            {isLoggedIn ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="hidden md:inline-flex gap-2">
                      <UserIcon className="h-4 w-4" />
                      {t("nav.account")}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/account?tab=info" className="cursor-pointer">
                        {t("account.manageAccount")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account?tab=orders" className="cursor-pointer">
                        {t("account.orderHistory")}
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" onClick={handleLogout} className="hidden md:inline-flex bg-transparent">
                  {t("nav.logout")}
                </Button>
                <Link href="/order">
                  <Button>{t("nav.orderNow")}</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" className="hidden md:inline-flex">
                    {t("nav.signIn")}
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button>{t("nav.orderNow")}</Button>
                </Link>
              </>
            )}
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
