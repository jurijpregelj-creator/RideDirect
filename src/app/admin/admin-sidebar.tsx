"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Menu, X } from "lucide-react"

function Badge({ count }: { count: number }) {
  if (!count) return null
  return (
    <span className="ml-auto bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
      {count > 99 ? "99+" : count}
    </span>
  )
}

const NAV_LINKS = [
  { href: "/admin", icon: "📊", label: "Dashboard" },
  { href: "/admin/listings", icon: "📋", label: "Listings", countKey: "pendingListings" },
  { href: "/admin/users", icon: "👥", label: "Users" },
  { href: "/admin/leads", icon: "📥", label: "Leads", countKey: "pendingLeads" },
  { href: "/admin/outreach", icon: "📣", label: "Outreach", countKey: "outreachContacts" },
  { href: "/admin/bug-reports", icon: "🐞", label: "Bug Reports", countKey: "bugReports" },
] as const

interface AdminSidebarProps {
  pendingListings: number
  pendingLeads: number
  bugReports: number
  outreachContacts: number
}

export function AdminSidebar({ pendingListings, pendingLeads, bugReports, outreachContacts }: AdminSidebarProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const counts: Record<string, number> = { pendingListings, pendingLeads, bugReports, outreachContacts }

  // Close the mobile dropdown on route change (matches the site header's mobile nav).
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const nav = (
    <>
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <span className="text-base">{link.icon}</span> {link.label}
          {"countKey" in link && <Badge count={counts[link.countKey] ?? 0} />}
        </Link>
      ))}
    </>
  )

  return (
    <>
      {/* Mobile top bar — static (not fixed): the site's own public Header
          already sits above this on every /admin page, so pinning this to
          the viewport too would overlap it instead of stacking below it. */}
      <div className="md:hidden bg-[#0D2A5E] text-white flex items-center justify-between px-4 py-3">
        <div>
          <div className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">Admin Panel</div>
          <div className="font-bold">RideDirect.eu</div>
        </div>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle admin menu"
          className="p-2 rounded-md hover:bg-white/10"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown nav */}
      {open && (
        <div className="md:hidden bg-[#0D2A5E] border-t border-white/10 px-3 py-3 space-y-0.5 shadow-lg">
          {nav}
          <div className="pt-2 mt-2 border-t border-white/10 space-y-1">
            <Link href="/dashboard" className="block px-3 py-2 text-xs text-white/40 hover:text-white/70">
              → My Dashboard
            </Link>
            <Link href="/" className="block px-3 py-2 text-xs text-white/40 hover:text-white/70">
              ← Back to site
            </Link>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 bg-[#0D2A5E] text-white flex-col shrink-0 fixed inset-y-0 left-0 z-40">
        <div className="p-5 border-b border-white/10">
          <div className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-1">Admin Panel</div>
          <div className="text-white font-bold text-lg">RideDirect.eu</div>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">{nav}</nav>
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link href="/dashboard" className="block text-xs text-white/40 hover:text-white/70 transition-colors">
            → My Dashboard
          </Link>
          <Link href="/" className="block text-xs text-white/40 hover:text-white/70 transition-colors">
            ← Back to site
          </Link>
        </div>
      </aside>
    </>
  )
}
