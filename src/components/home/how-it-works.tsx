import { getTranslations } from "next-intl/server"
import type { ListingLocale } from "@/lib/translate-listing"
import { SITE_T } from "@/components/home/site-content-translations"
import { ScallopDivider } from "@/components/home/section-divider"

function BrowseIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="26" cy="26" r="17" stroke="#0B1730" strokeWidth="2" />
      <circle cx="26" cy="26" r="20" stroke="#0B1730" strokeWidth="1" strokeOpacity=".28" />
      <path d="M38.5 38.5 L54 54" stroke="#F5821F" strokeWidth="3" strokeLinecap="round" />
      <circle cx="26" cy="23" r="9.5" stroke="#0B1730" strokeWidth="1.3" />
      <path d="M16.5 23 H35.5 M32.7 16.3 L19.3 29.7 M19.3 16.3 L32.7 29.7 M26 13.5 V32.5" stroke="#0B1730" strokeWidth=".9" strokeOpacity=".45" />
      <circle cx="26" cy="23" r="2.2" fill="#F5821F" />
      <path d="M26 25.5 L21 37 M26 25.5 L31 37 M22.5 33 H29.5" stroke="#0B1730" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function ContactIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M6 14 H38 Q42 14 42 18 V34 Q42 38 38 38 H20 L11 47 V38 H10 Q6 38 6 34 Z" stroke="#0B1730" strokeWidth="2" strokeLinejoin="round" />
      <path d="M14 22 H34 M14 29 H27" stroke="#0B1730" strokeWidth="1.6" strokeOpacity=".5" strokeLinecap="round" />
      <circle cx="52" cy="14" r="7" stroke="#F5821F" strokeWidth="2" />
      <path d="M52 11 V17 M49 14 H55" stroke="#F5821F" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function DealIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M12 6 H40 L52 18 V58 H12 Z" stroke="#0B1730" strokeWidth="2" strokeLinejoin="round" />
      <path d="M40 6 V18 H52" stroke="#0B1730" strokeWidth="1.4" strokeOpacity=".5" strokeLinejoin="round" />
      <path d="M20 26 H42 M20 34 H36 M20 42 H30" stroke="#0B1730" strokeWidth="1.6" strokeOpacity=".5" strokeLinecap="round" />
      <circle cx="46" cy="46" r="11" stroke="#F5821F" strokeWidth="2" fill="#FFFFFF" />
      <path d="M40.5 46.5 L44.5 50.5 L51.5 42.5" stroke="#F5821F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

export async function HowItWorks({ locale }: { locale?: ListingLocale } = {}) {
  const t = locale
    ? (key: string) => (SITE_T[locale].howItWorks as Record<string, string>)[key]
    : await getTranslations("howItWorks")

  const STEPS = [
    { icon: BrowseIcon, step: "01", titleKey: "step1Title", descKey: "step1Desc" },
    { icon: ContactIcon, step: "02", titleKey: "step2Title", descKey: "step2Desc" },
    { icon: DealIcon, step: "03", titleKey: "step3Title", descKey: "step3Desc" },
  ]

  return (
    <>
      <ScallopDivider bg="#F7F8FA" />
      <section className="bg-[#F7F8FA] py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-[clamp(28px,3.4vw,42px)] font-bold text-[#0B1730]">{t("title")}</h2>
            <p className="mx-auto mt-3 max-w-xl text-lg text-gray-500">{t("subtitle")}</p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
            {STEPS.map((item) => (
              <div key={item.step} className="rounded-md border border-[#E4E7EE] bg-white p-7">
                <div className="flex items-center gap-3">
                  <item.icon />
                  <span className="font-heading text-sm font-bold tracking-[0.16em] text-[#F5821F]">
                    {t("step")} {item.step}
                  </span>
                </div>
                <h3 className="font-heading mt-4 text-xl font-bold text-[#0B1730]">{t(item.titleKey as any)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{t(item.descKey as any)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
