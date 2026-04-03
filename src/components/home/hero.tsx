import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck, Globe2, TrendingUp } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0F1B3D] via-[#1a2d5a] to-[#1B4FD8]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#F97316]/30 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-sm text-blue-100 mb-8">
            <Globe2 size={14} />
            <span>Europe's #1 Amusement Ride Marketplace</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
            The European Marketplace for{" "}
            <span className="text-[#F97316]">Amusement Rides</span> &amp; Attractions
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl mx-auto">
            Buy, sell, and discover funfair equipment across Europe. Connect directly with verified sellers and buyers in the amusement industry.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace">
              <Button variant="brand-orange" size="xl" className="w-full sm:w-auto shadow-lg shadow-orange-500/25">
                View Listings
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/sell">
              <Button
                size="xl"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur"
              >
                Sell With Us
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-14 pt-10 border-t border-white/10">
            <div className="flex items-center gap-2 text-blue-200 text-sm">
              <ShieldCheck size={16} className="text-[#F97316]" />
              <span>Verified B2B sellers only</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2 text-blue-200 text-sm">
              <Globe2 size={16} className="text-[#F97316]" />
              <span>29 European countries</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2 text-blue-200 text-sm">
              <TrendingUp size={16} className="text-[#F97316]" />
              <span>Free to list &amp; browse</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
