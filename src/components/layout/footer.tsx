import Link from "next/link"
import { Separator } from "@/components/ui/separator"

const FOOTER_LINKS = {
  Marketplace: [
    { href: "/marketplace", label: "Browse All Listings" },
    { href: "/marketplace?category=major-rides", label: "Major Rides" },
    { href: "/marketplace?category=family-rides", label: "Family Rides" },
    { href: "/marketplace?category=inflatables-soft-play", label: "Inflatables & Soft Play" },
  ],
  Sellers: [
    { href: "/sell", label: "Sell With Us" },
    { href: "/auth/signup", label: "Create Account" },
    { href: "/auth/login", label: "Seller Login" },
  ],
  Company: [
    { href: "/contact", label: "Contact Us" },
    { href: "/about", label: "About RideDirect" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#0F1B3D] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#1B4FD8] text-white font-bold text-sm">
                AR
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-white text-base tracking-tight">RideDirect</span>
                <span className="text-[10px] text-blue-300 tracking-widest uppercase">.eu</span>
              </div>
            </Link>
            <p className="text-sm text-blue-200 leading-relaxed mb-4">
              Europe's dedicated B2B marketplace for buying and selling amusement rides and attractions.
            </p>
            <p className="text-xs text-blue-300">
              Connecting sellers and buyers across Europe since 2024.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-blue-200 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-blue-300">
          <p>© {new Date().getFullYear()} RideDirect.eu — All rights reserved.</p>
          <p>Built for the European amusement industry.</p>
        </div>
      </div>
    </footer>
  )
}
