import Link from "next/link"
import {
  CheckCircle2,
  Globe2,
  Users,
  TrendingUp,
  ShieldCheck,
  Star,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import type { ListingLocale } from "@/lib/locales"
import { SELL_T } from "@/app/sell/sell-translations"
import { LISTING_PAGE_T } from "@/components/listing/listing-page-translations"

const BENEFIT_ICONS = [Globe2, Users, TrendingUp, ShieldCheck]

const CATEGORY_KEYS = [
  "major-rides",
  "family-rides",
  "kiddie-rides",
  "inflatables-soft-play",
  "arcade-coin-machines",
  "go-karts-track-attractions",
  "event-mobile-attractions",
  "games-prize-booths",
  "indoor-parks-playgrounds",
  "equipment-parts",
] as const

export async function SellPageContent({ locale }: { locale: ListingLocale }) {
  const t = SELL_T[locale]
  const categories = LISTING_PAGE_T[locale].categories

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  // Auth pages are cookie-driven (not URL-prefixed); the middleware syncs
  // NEXT_LOCALE from the URL prefix so this still lands in the right language.
  const sellHref = user ? "/dashboard/create" : "/auth/signup"
  const contactHref = "/contact"

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0D2A5E] to-[#1E88E5] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-blue-100 mb-6">
            <Star size={14} className="fill-[#FF6D00] text-[#FF6D00]" />
            {t.badge}
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-5 leading-tight">
            {t.heroTitle1}<br />
            <span className="text-[#FF6D00]">{t.heroTitleHighlight}</span>
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            {t.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="brand-orange" size="xl" className="shadow-lg shadow-orange-500/25">
              <Link href={sellHref}>
                {t.startSellingFree}
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild size="xl" className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
              <Link href={contactHref}>
                {t.talkToTeam}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0D2A5E] mb-4">
              {t.whyTitle}
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              {t.whySub}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.benefits.map((benefit, i) => {
              const Icon = BENEFIT_ICONS[i]
              return (
                <div
                  key={benefit.title}
                  className="bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:bg-[#1E88E5] transition-colors">
                    <Icon size={22} className="text-[#1E88E5] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-[#0D2A5E] mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How to sell */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0D2A5E] mb-4">
              {t.howTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {t.steps.map((item, i) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#1E88E5] text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-[#0D2A5E] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you can sell */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#0D2A5E] mb-4">
                {t.whatTitle}
              </h2>
              <p className="text-gray-500">
                {t.whatSub}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CATEGORY_KEYS.map((key) => (
                <div
                  key={key}
                  className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3 text-sm font-medium text-gray-700"
                >
                  <CheckCircle2 size={16} className="text-[#1E88E5] shrink-0" />
                  {categories[key]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0D2A5E]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t.ctaTitle}
          </h2>
          <p className="text-blue-200 mb-8 max-w-xl mx-auto">
            {t.ctaSub}
          </p>
          <Button asChild variant="brand-orange" size="xl" className="shadow-lg shadow-orange-500/25">
            <Link href={sellHref}>
              {user ? t.postARide : t.createFreeAccount}
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
