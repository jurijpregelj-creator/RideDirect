"use client"

import { useEffect, useState, useTransition } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { setLocale } from "@/app/actions/locale"
import type { ListingLocale } from "@/lib/translate-listing"

const LOCALES: { code: ListingLocale; flag: string; label: string; ariaLabel: string }[] = [
  { code: "en", flag: "🇬🇧", label: "EN", ariaLabel: "Switch to English" },
  { code: "de", flag: "🇩🇪", label: "DE", ariaLabel: "Auf Deutsch wechseln" },
  { code: "it", flag: "🇮🇹", label: "IT", ariaLabel: "Passa all'italiano" },
  { code: "fr", flag: "🇫🇷", label: "FR", ariaLabel: "Passer en français" },
  { code: "es", flag: "🇪🇸", label: "ES", ariaLabel: "Cambiar a español" },
  { code: "nl", flag: "🇳🇱", label: "NL", ariaLabel: "Overschakelen naar Nederlands" },
  { code: "pl", flag: "🇵🇱", label: "PL", ariaLabel: "Przełącz na polski" },
  { code: "pt", flag: "🇵🇹", label: "PT", ariaLabel: "Mudar para português" },
]

const LOCALIZABLE_BASE_PATTERNS = [/^\/$/, /^\/marketplace$/, /^\/listings\/[^/]+$/, /^\/sell$/, /^\/about$/, /^\/contact$/]

function stripLocalePrefix(pathname: string): string {
  return pathname.replace(/^\/(de|it|fr|es|nl|pl|pt)(?=\/|$)/, "") || "/"
}

function isLocalizablePath(pathname: string): boolean {
  const base = stripLocalePrefix(pathname)
  return LOCALIZABLE_BASE_PATTERNS.some((r) => r.test(base))
}

interface LanguageSwitcherProps {
  urlLocale?: ListingLocale
}

export function LanguageSwitcher({ urlLocale }: LanguageSwitcherProps = {}) {
  const [cookieLocale, setCookieLocale] = useState<ListingLocale>("en")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const current = urlLocale ?? cookieLocale

  useEffect(() => {
    if (urlLocale) return
    const match = document.cookie.match(/NEXT_LOCALE=([^;]+)/)
    if (match && LOCALES.some((l) => l.code === match[1])) {
      setCookieLocale(match[1] as ListingLocale)
    }
  }, [urlLocale])

  function handleChange(locale: ListingLocale) {
    // Keep the cookie in sync regardless, so cookie-driven areas (dashboard,
    // auth) match whatever the visitor last picked on the public pages too.
    startTransition(() => {
      setLocale(locale)
    })

    if (isLocalizablePath(pathname)) {
      const base = stripLocalePrefix(pathname)
      const target = locale === "en" ? base : `/${locale}${base === "/" ? "" : base}`
      const qs = searchParams.toString()
      router.push(qs ? `${target}?${qs}` : target)
    } else {
      setCookieLocale(locale)
      router.refresh()
    }
  }

  return (
    <div className="flex items-center gap-0.5 flex-wrap" role="group" aria-label="Language selection">
      {LOCALES.map((l) => (
        <button
          key={l.code}
          onClick={() => handleChange(l.code)}
          disabled={isPending}
          aria-label={l.ariaLabel}
          aria-pressed={current === l.code}
          className={`text-lg px-1 py-0.5 rounded transition-opacity ${
            current === l.code
              ? "opacity-100 ring-2 ring-blue-200 ring-offset-1"
              : "opacity-40 hover:opacity-80"
          }`}
        >
          {l.flag}
        </button>
      ))}
    </div>
  )
}
