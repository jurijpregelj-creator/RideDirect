import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { Separator } from "@/components/ui/separator"
import type { ListingLocale } from "@/lib/translate-listing"
import { buildPageUrl } from "@/lib/site-locale-urls"
import { SITE_T } from "@/components/home/site-content-translations"

interface FooterProps {
  locale?: ListingLocale
}

export async function Footer({ locale }: FooterProps = {}) {
  const t = locale
    ? (key: keyof (typeof SITE_T)["en"]["footer"]) => SITE_T[locale].footer[key]
    : await getTranslations("footer")
  const mp = (path: string) => (locale ? buildPageUrl(path, locale) : path || "/")

  const FOOTER_LINKS = {
    [t("marketplace")]: [
      { href: mp("/marketplace"), label: t("browseAll") },
      { href: `${mp("/marketplace")}?category=major-rides`, label: t("majorRides") },
      { href: `${mp("/marketplace")}?category=family-rides`, label: t("familyRides") },
      { href: `${mp("/marketplace")}?category=inflatables-soft-play`, label: t("inflatables") },
    ],
    [t("sellers")]: [
      { href: mp("/sell"), label: t("sellWithUs") },
      { href: "/auth/signup", label: t("createAccount") },
      { href: "/auth/login", label: t("sellerLogin") },
    ],
    [t("company")]: [
      { href: mp("/contact"), label: t("contactUs") },
      { href: mp("/about"), label: t("about") },
      { href: "/legal/privacy", label: t("privacy") },
      { href: "/legal/terms", label: t("terms") },
    ],
  }

  return (
    <footer className="bg-[#0D2A5E] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <Link href={mp("")} className="flex items-center gap-2 mb-4">
              <img src="/logo.svg" alt="RideDirect.eu" style={{ height: "36px", width: "auto" }} />
            </Link>
            <p className="text-sm text-blue-200 leading-relaxed mb-4">{t("description")}</p>
            <p className="text-xs text-blue-300">{t("tagline")}</p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-blue-200 hover:text-white transition-colors">
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
          <p>© {new Date().getFullYear()} RideDirect.eu — {t("copyright")}</p>
          <p>{t("builtFor")}</p>
        </div>
      </div>
    </footer>
  )
}
