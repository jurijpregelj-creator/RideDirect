"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Menu, X, Plus, MessageCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { LanguageSwitcher } from "@/components/language-switcher"
import type { User } from "@supabase/supabase-js"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [unread, setUnread] = useState(0)
  const router = useRouter()
  const t = useTranslations("nav")

  const NAV_LINKS = [
    { href: "/marketplace", label: t("browse") },
    { href: "/sell", label: t("sell") },
    { href: "/contact", label: t("contact") },
  ]

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      if (user) fetchUnread(user.id, supabase)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchUnread(session.user.id, supabase)
      else setUnread(0)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function fetchUnread(userId: string, supabase: any) {
    // Unread as seller
    const { count: sellerUnread } = await supabase
      .from("inquiries")
      .select("id", { count: "exact", head: true })
      .eq("seller_id", userId)
      .eq("is_read", false)
    // Unread as buyer
    const { count: buyerUnread } = await supabase
      .from("inquiries")
      .select("id", { count: "exact", head: true })
      .eq("buyer_id", userId)
      .eq("unread_for_buyer", true)
    setUnread((sellerUnread ?? 0) + (buyerUnread ?? 0))

    // Subscribe to realtime changes
    supabase
      .channel("unread-inquiries")
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "inquiries",
        filter: `seller_id=eq.${userId}`,
      }, () => fetchUnread(userId, supabase))
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "replies",
      }, () => fetchUnread(userId, supabase))
      .subscribe()
  }

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    setMobileOpen(false)
    router.push("/")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#1B4FD8] text-white font-bold text-sm">
            AR
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-bold text-[#0F1B3D] text-base tracking-tight">RideDirect</span>
            <span className="text-[10px] text-gray-400 tracking-widest uppercase">.eu</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#1B4FD8] rounded-md hover:bg-blue-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          {user ? (
            <>
              {/* Notification bell */}
              <Link href="/dashboard/messages" className="relative p-1.5 text-gray-500 hover:text-[#1B4FD8] transition-colors">
                <MessageCircle size={20} />
                {unread > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {unread > 9 ? "9+" : unread}
                  </span>
                )}
              </Link>
              <Link
                href="/dashboard"
                className="w-8 h-8 rounded-full bg-[#1B4FD8] text-white text-xs font-bold flex items-center justify-center hover:bg-[#1a45c0] transition-colors"
                title={t("myDashboard")}
              >
                {user.email?.slice(0, 2).toUpperCase()}
              </Link>
              <Link href="/dashboard/create">
                <Button variant="brand" size="sm">
                  <Plus size={16} />
                  {t("postARide")}
                </Button>
              </Link>
              <button
                onClick={handleSignOut}
                className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
              >
                {t("signOut")}
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="text-gray-600">
                  {t("logIn")}
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="brand" size="sm">
                  {t("signUpFree")}
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-2">
          {user && (
            <Link href="/dashboard/messages" className="relative p-1.5 text-gray-500">
              <MessageCircle size={20} />
              {unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {unread > 9 ? "9+" : unread}
                </span>
              )}
            </Link>
          )}
          <button
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-[#1B4FD8] hover:bg-blue-50 rounded-md"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2 border-t mt-3">
            <LanguageSwitcher />
            {user ? (
              <>
                <Link href="/dashboard/create" onClick={() => setMobileOpen(false)}>
                  <Button variant="brand" size="sm" className="w-full">
                    <Plus size={16} />
                    {t("postARide")}
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="w-full" onClick={handleSignOut}>
                  {t("signOut")}
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    {t("logIn")}
                  </Button>
                </Link>
                <Link href="/auth/signup" onClick={() => setMobileOpen(false)}>
                  <Button variant="brand" size="sm" className="w-full">
                    {t("signUpFree")}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
