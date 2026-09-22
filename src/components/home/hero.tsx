import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Globe2, TrendingUp } from "lucide-react"
import { getTranslations } from "next-intl/server"
import type { ListingLocale } from "@/lib/translate-listing"
import { SITE_T } from "@/components/home/site-content-translations"
import { buildPageUrl } from "@/lib/site-locale-urls"
import { HeroScene } from "@/components/home/hero-scene"

export async function Hero({ locale }: { locale?: ListingLocale } = {}) {
  const t = locale
    ? (key: keyof (typeof SITE_T)["en"]["hero"]) => SITE_T[locale].hero[key]
    : await getTranslations("hero")
  const marketplaceHref = locale ? buildPageUrl("/marketplace", locale) : "/marketplace"
  const sellHref = locale ? buildPageUrl("/sell", locale) : "/sell"

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#071023] via-[#0B1730] to-[#0D2A5E] text-white">
      <HeroScene />

      <div className="relative container mx-auto px-4 py-20 lg:py-28">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#F2A03D]/45 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#F2A03D]">
            <Globe2 size={13} />
            {t("badge")}
          </div>

          <h1 className="font-heading mt-5 text-[clamp(40px,6vw,72px)] font-bold leading-[1.03] text-[#F5EEDD] [text-wrap:balance]">
            {t("title1")} <span className="text-[#F5821F]">{t("title2")}</span> {t("title3")}
          </h1>

          <p className="mt-4 max-w-xl text-[clamp(16px,1.4vw,19px)] leading-relaxed text-white/78 [text-wrap:pretty]">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="brand-orange" size="xl" className="rounded-md font-bold uppercase tracking-wide">
              <Link href={marketplaceHref}>{t("viewListings")}</Link>
            </Button>
            <Button asChild size="xl" className="rounded-md border border-white/35 bg-transparent font-bold uppercase tracking-wide text-white hover:bg-white/10">
              <Link href={sellHref}>{t("sellWithUs")}</Link>
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-5 border-t border-white/12 pt-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#F2A03D]" />
              <span>{t("trust1")}</span>
            </div>
            <div className="hidden h-4 w-px bg-white/20 sm:block" />
            <div className="flex items-center gap-2">
              <Globe2 size={16} className="text-[#F2A03D]" />
              <span>{t("trust2")}</span>
            </div>
            <div className="hidden h-4 w-px bg-white/20 sm:block" />
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-[#F2A03D]" />
              <span>{t("trust3")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
