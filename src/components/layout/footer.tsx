import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { Separator } from "@/components/ui/separator"

export async function Footer() {
  const t = await getTranslations("footer")

  const FOOTER_LINKS = {
    [t("marketplace")]: [
      { href: "/marketplace", label: t("browseAll") },
      { href: "/marketplace?category=major-rides", label: t("majorRides") },
      { href: "/marketplace?category=family-rides", label: t("familyRides") },
      { href: "/marketplace?category=inflatables-soft-play", label: t("inflatables") },
    ],
    [t("sellers")]: [
      { href: "/sell", label: t("sellWithUs") },
      { href: "/auth/signup", label: t("createAccount") },
      { href: "/auth/login", label: t("sellerLogin") },
    ],
    [t("company")]: [
      { href: "/contact", label: t("contactUs") },
      { href: "/about", label: t("about") },
      { href: "/legal/privacy", label: t("privacy") },
      { href: "/legal/terms", label: t("terms") },
    ],
  }

  return (
    <footer className="bg-[#0D2A5E] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#1E88E5] text-white font-bold text-sm">AR</div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-white text-base tracking-tight">RideDirect</span>
                <span className="text-[10px] text-blue-300 tracking-widest uppercase">.eu</span>
              </div>
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
