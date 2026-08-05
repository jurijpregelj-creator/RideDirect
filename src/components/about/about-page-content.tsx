import Link from "next/link"
import type { ListingLocale } from "@/lib/locales"
import { buildPageUrl } from "@/lib/site-locale-urls"
import { ABOUT_T } from "@/app/about/about-translations"

export function AboutPageContent({ locale }: { locale: ListingLocale }) {
  const t = ABOUT_T[locale]
  const marketplaceHref = buildPageUrl("/marketplace", locale)
  const contactHref = buildPageUrl("/contact", locale)

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">

          {/* Header */}
          <h1 className="text-3xl font-bold text-[#0D2A5E] mb-3">{t.title}</h1>
          <p className="text-gray-500 text-base mb-10 leading-relaxed">
            {t.subtitle}
          </p>

          {/* Our Mission */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#0D2A5E] mb-3">{t.missionTitle}</h2>
            <div className="text-gray-600 leading-relaxed space-y-3">
              <p>{t.missionP1}</p>
              <p>{t.missionP2}</p>
              <p>
                {t.missionP3Pre} <strong className="text-gray-700">Orbito d.o.o.</strong>{t.missionP3Post}
              </p>
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#0D2A5E] mb-4">{t.howItWorksTitle}</h2>
            <div className="space-y-4">
              {t.steps.map((step, i) => (
                <Step key={step.title} number={i + 1} title={step.title}>
                  {step.description}
                </Step>
              ))}
            </div>
          </section>

          {/* Why RideDirect */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#0D2A5E] mb-4">{t.whyTitle}</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {t.pillars.map((pillar) => (
                <Pillar key={pillar.title} title={pillar.title}>
                  {pillar.description}
                </Pillar>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
            <Link
              href={marketplaceHref}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#0D2A5E] text-white font-semibold text-sm hover:bg-[#1E88E5] transition-colors"
            >
              {t.browseListings}
            </Link>
            <Link
              href={contactHref}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[#0D2A5E] text-[#0D2A5E] font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              {t.getInTouch}
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1E88E5] text-white text-sm font-bold flex items-center justify-center mt-0.5">
        {number}
      </div>
      <div>
        <h3 className="font-semibold text-[#0D2A5E] mb-1">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  )
}

function Pillar({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
      <h3 className="font-semibold text-[#0D2A5E] mb-2 text-sm">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{children}</p>
    </div>
  )
}
