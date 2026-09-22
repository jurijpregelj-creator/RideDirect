"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X, Plus, MessageCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { LanguageSwitcher } from "@/components/language-switcher"
import { RideDirectLogo } from "@/components/ui/logo"
import type { User } from "@supabase/supabase-js"
import type { ListingLocale } from "@/lib/translate-listing"
import { buildPageUrl } from "@/lib/site-locale-urls"
import { SITE_T } from "@/components/home/site-content-translations"

interface HeaderProps {
  urlLocale?: ListingLocale
}

export function Header({ urlLocale }: HeaderProps = {}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [unread, setUnread] = useState(0)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const cookieT = useTranslations("nav")
  const t = urlLocale ? (key: keyof (typeof SITE_T)["en"]["nav"]) => SITE_T[urlLocale].nav[key] : cookieT

  const NAV_LINKS = [
    { href: urlLocale ? buildPageUrl("/marketplace", urlLocale) : "/marketplace", label: t("browse") },
    { href: urlLocale ? buildPageUrl("/sell", urlLocale) : "/sell", label: t("sell") },
    { href: urlLocale ? buildPageUrl("/contact", urlLocale) : "/contact", label: t("contact") },
  ]

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const supabase = createClient()
    let userId: string | null = null
    let interval: ReturnType<typeof setInterval> | null = null

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      if (user) {
        userId = user.id
        fetchUnread(user.id, supabase)
        supabase.from("profiles").select("avatar_url").eq("id", user.id).single()
          .then(({ data }) => setAvatarUrl(data?.avatar_url || null))
        // Poll every 15s — more reliable than realtime websockets
        interval = setInterval(() => {
          if (userId) fetchUnread(userId, supabase)
        }, 15000)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        userId = session.user.id
        fetchUnread(session.user.id, supabase)
      } else {
        userId = null
        setUnread(0)
        if (interval) clearInterval(interval)
      }
    })

    return () => {
      subscription.unsubscribe()
      if (interval) clearInterval(interval)
    }
  }, [])

  async function fetchUnread(userId: string, supabase: any) {
    const { count: sellerUnread } = await supabase
      .from("inquiries")
      .select("id", { count: "exact", head: true })
      .eq("seller_id", userId)
      .eq("is_read", false)
    const { count: buyerUnread } = await supabase
      .from("inquiries")
      .select("id", { count: "exact", head: true })
      .eq("buyer_id", userId)
      .eq("unread_for_buyer", true)
    setUnread((sellerUnread ?? 0) + (buyerUnread ?? 0))
  }

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    setMobileOpen(false)
    router.push("/")
    router.refresh()
  }

  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B1730]/[.97] backdrop-blur">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href={urlLocale ? buildPageUrl("", urlLocale) : "/"} className="flex items-center group">
          <img src="/logo.svg" alt="RideDirect.eu" style={{height: '52px', width: 'auto'}} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/")
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? "text-[#F5821F] bg-white/5"
                    : "text-white/[.72] hover:text-[#F5821F] hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher urlLocale={urlLocale} />
          {user ? (
            <>
              {/* Notification bell */}
              <Link href="/dashboard/messages" className="relative p-1.5 text-white/70 hover:text-[#F5821F] transition-colors">
                <MessageCircle size={20} />
                {unread > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {unread > 9 ? "9+" : unread}
                  </span>
                )}
              </Link>
              <Link
                href="/dashboard"
                className="w-8 h-8 rounded-full bg-[#F5821F] text-[#0B1730] text-xs font-bold flex items-center justify-center hover:bg-[#e07419] transition-colors overflow-hidden shrink-0"
                title={t("myDashboard")}
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  user.email?.slice(0, 2).toUpperCase()
                )}
              </Link>
              <Link href="/dashboard/create">
                <Button variant="brand-orange" size="sm" className="rounded-[3px] font-bold whitespace-nowrap">
                  <Plus size={16} />
                  {t("postARide")}
                </Button>
              </Link>
              <button
                onClick={handleSignOut}
                className="text-sm text-white/60 hover:text-white transition-colors shrink-0 whitespace-nowrap"
              >
                {t("signOut")}
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="text-white/[.72] hover:text-white hover:bg-white/5">
                  {t("logIn")}
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="brand-orange" size="sm" className="rounded-[3px] font-bold whitespace-nowrap">
                  {t("signUpFree")}
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-2">
          {user && (
            <Link href="/dashboard/messages" className="relative p-1.5 text-white/70">
              <MessageCircle size={20} />
              {unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {unread > 9 ? "9+" : unread}
                </span>
              )}
            </Link>
          )}
          <button
            className="p-2 rounded-md text-white/[.72] hover:bg-white/5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

    </header>

      {/* Mobile Nav — fixed below header, outside <header> to avoid backdrop-filter clipping */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-16 z-40 border-t border-b border-white/10 bg-[#0B1730] shadow-lg px-4 py-4 space-y-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/")
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`block px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive ? "text-[#F5821F] bg-white/5" : "text-white/80 hover:text-[#F5821F] hover:bg-white/5"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          })}
          <div className="pt-3 flex flex-col gap-2 border-t border-white/10 mt-3">
            <LanguageSwitcher urlLocale={urlLocale} />
            {user ? (
              <>
                <Link href="/dashboard/create" onClick={() => setMobileOpen(false)}>
                  <Button variant="brand-orange" size="sm" className="w-full rounded-[3px] font-bold uppercase tracking-wide">
                    <Plus size={16} />
                    {t("postARide")}
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="w-full bg-transparent border-white/25 text-white hover:bg-white/10" onClick={handleSignOut}>
                  {t("signOut")}
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full bg-transparent border-white/25 text-white hover:bg-white/10">
                    {t("logIn")}
                  </Button>
                </Link>
                <Link href="/auth/signup" onClick={() => setMobileOpen(false)}>
                  <Button variant="brand-orange" size="sm" className="w-full rounded-[3px] font-bold uppercase tracking-wide">
                    {t("signUpFree")}
                  </Button>
                </Link>
              </>
            )}
          </div>

        </div>
      )}
    </>
  )
}
