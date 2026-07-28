"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { X } from "lucide-react"
import type { ListingLocale } from "@/lib/translate-listing"

const LOCALIZABLE_BASE_PATTERNS = [/^\/$/, /^\/marketplace$/, /^\/listings\/[^/]+$/, /^\/sell$/, /^\/about$/, /^\/contact$/]

function stripLocalePrefix(pathname: string): string {
  return pathname.replace(/^\/(de|it|fr|es|nl|pl|pt)(?=\/|$)/, "") || "/"
}

// Written in the SUGGESTED language, not the page's current one — a Polish
// suggestion should read in Polish, not in whatever language the visitor
// happens to be looking at right now.
const BANNER_T: Record<Exclude<ListingLocale, "en">, { text: string; view: string }> & { en: { text: string; view: string } } = {
  en: { text: "This page is also available in English.", view: "Switch to English" },
  de: { text: "Diese Seite ist auch auf Deutsch verfügbar.", view: "Auf Deutsch anzeigen" },
  it: { text: "Questa pagina è disponibile anche in italiano.", view: "Vedi in italiano" },
  fr: { text: "Cette page est aussi disponible en français.", view: "Voir en français" },
  es: { text: "Esta página también está disponible en español.", view: "Ver en español" },
  nl: { text: "Deze pagina is ook beschikbaar in het Nederlands.", view: "Bekijk in het Nederlands" },
  pl: { text: "Ta strona jest dostępna również po polsku.", view: "Zobacz po polsku" },
  pt: { text: "Esta página também está disponível em português.", view: "Ver em português" },
}

const BROWSER_LANG_TO_LOCALE: Record<string, ListingLocale> = {
  de: "de", it: "it", fr: "fr", es: "es", nl: "nl", pl: "pl", pt: "pt", en: "en",
}

interface LanguageSuggestionBannerProps {
  urlLocale?: ListingLocale
}

export function LanguageSuggestionBanner({ urlLocale }: LanguageSuggestionBannerProps = {}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [suggested, setSuggested] = useState<ListingLocale | null>(null)

  useEffect(() => {
    if (!LOCALIZABLE_BASE_PATTERNS.some((r) => r.test(stripLocalePrefix(pathname)))) return
    if (localStorage.getItem("hideLanguageSuggestion") === "1") return

    const browserLang = navigator.language.split("-")[0].toLowerCase()
    const detected = BROWSER_LANG_TO_LOCALE[browserLang]
    const current = urlLocale ?? "en"
    if (detected && detected !== current) setSuggested(detected)
  }, [pathname, urlLocale])

  if (!suggested) return null

  const base = stripLocalePrefix(pathname)
  const target = suggested === "en" ? base : `/${suggested}${base === "/" ? "" : base}`
  const qs = searchParams.toString()
  const href = qs ? `${target}?${qs}` : target
  const t = BANNER_T[suggested]

  function dismiss() {
    localStorage.setItem("hideLanguageSuggestion", "1")
    setSuggested(null)
  }

  return (
    <div className="bg-[#0D2A5E] text-white text-sm">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-3">
        <span>{t.text}</span>
        <div className="flex items-center gap-3 shrink-0">
          <a href={href} className="font-semibold underline hover:no-underline">
            {t.view}
          </a>
          <button onClick={dismiss} aria-label="Dismiss" className="text-blue-200 hover:text-white">
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
