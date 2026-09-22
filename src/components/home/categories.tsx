import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { CATEGORIES } from "@/data/mock"
import type { ListingLocale } from "@/lib/translate-listing"
import { SITE_T } from "@/components/home/site-content-translations"
import { buildPageUrl } from "@/lib/site-locale-urls"
import { CATEGORY_ICONS } from "@/components/home/category-icons"
import { WaveLightsDivider } from "@/components/home/section-divider"

export async function Categories({ locale }: { locale?: ListingLocale } = {}) {
  const t = locale
    ? (key: string) => (SITE_T[locale].categories as Record<string, string>)[key]
    : await getTranslations("categories")

  return (
    <>
      <WaveLightsDivider bg="#FFFFFF" />
      <section className="bg-white py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-[clamp(28px,3.4vw,42px)] font-bold text-[#0B1730]">
              {t("title")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-lg text-gray-500">{t("subtitle")}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {CATEGORIES.map((category) => {
              const Icon = CATEGORY_ICONS[category.slug]
              return (
                <Link
                  key={category.slug}
                  href={locale ? buildPageUrl(`/marketplace?category=${category.slug}`, locale) : `/marketplace?category=${category.slug}`}
                  className="group block rounded-md border border-[#E4E7EE] bg-[#F7F8FA] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#F2A03D] hover:bg-white hover:shadow-[0_10px_24px_rgba(11,23,48,0.09)]"
                >
                  {Icon && <Icon className="h-12 w-12 text-[#0B1730]" />}
                  <h3 className="font-heading mt-3 text-lg font-bold leading-tight text-[#0B1730]">
                    {t(category.slug as any) || category.name}
                  </h3>
                  <p className="mt-1 text-xs leading-tight text-gray-500 line-clamp-2">
                    {t(`${category.slug}-desc` as any) || category.description}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
