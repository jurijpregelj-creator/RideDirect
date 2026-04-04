"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Menu, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

const NAV_LINKS = [
  { href: "/marketplace", label: "Browse Listings" },
  { href: "/sell", label: "Sell With Us" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    // Get initial session
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

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
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="w-8 h-8 rounded-full bg-[#1B4FD8] text-white text-xs font-bold flex items-center justify-center hover:bg-[#1a45c0] transition-colors"
                title="My Dashboard"
              >
                {user.email?.slice(0, 2).toUpperCase()}
              </Link>
              <Link href="/dashboard/create">
                <Button variant="brand" size="sm">
                  <Plus size={16} />
                  Post a Ride
                </Button>
              </Link>
              <button
                onClick={handleSignOut}
                className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="text-gray-600">
                  Log in
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="brand" size="sm">
                  Sign up free
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
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
            {user ? (
              <>
                <Link href="/dashboard/create" onClick={() => setMobileOpen(false)}>
                  <Button variant="brand" size="sm" className="w-full">
                    <Plus size={16} />
                    Post a Ride
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="w-full" onClick={handleSignOut}>
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/signup" onClick={() => setMobileOpen(false)}>
                  <Button variant="brand" size="sm" className="w-full">
                    Sign up free
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
