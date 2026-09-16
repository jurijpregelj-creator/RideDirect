import Link from "next/link"
import { Zap, MousePointerClick, Globe2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import type { ListingLocale } from "@/lib/locales"
import { LIST_HERE_T } from "@/app/list-here/list-here-translations"

const TRUST_ICONS = [Zap, MousePointerClick, Globe2]

export async function OutreachLandingContent({ locale }: { locale: ListingLocale }) {
  const t = LIST_HERE_T[locale]

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  // Auth pages are cookie-driven (not URL-prefixed); the middleware syncs
  // NEXT_LOCALE from the URL prefix so this still lands in the right language.
  const ctaHref = user ? "/dashboard/create" : "/auth/signup"

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0D2A5E] via-[#1a2d5a] to-[#1E88E5]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#FF6D00]/30 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 py-20 lg:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-sm text-blue-100 mb-6">
            <Globe2 size={14} />
            <span>{t.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5 max-w-2xl mx-auto">
            {t.heroTitle1} <span className="text-[#FF6D00]">{t.heroTitleHighlight}</span>
          </h1>

          <p className="text-lg text-blue-100 leading-relaxed max-w-xl mx-auto mb-10">
            {t.heroSub}
          </p>

          <Button asChild variant="brand-orange" size="xl" className="shadow-lg shadow-orange-500/25">
            <Link href={ctaHref}>
              {user ? t.postARide : t.createFreeAccount}
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </section>

      {/* Trust bullets */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {t.trust.map((item, i) => {
              const Icon = TRUST_ICONS[i]
              return (
                <div key={item.title} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-[#1E88E5]" />
                  </div>
                  <h3 className="font-semibold text-[#0D2A5E] mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#0D2A5E]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t.ctaTitle}</h2>
          <p className="text-blue-200 mb-8 max-w-xl mx-auto">{t.ctaSub}</p>
          <Button asChild variant="brand-orange" size="xl" className="shadow-lg shadow-orange-500/25">
            <Link href={ctaHref}>
              {user ? t.postARide : t.createFreeAccount}
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
