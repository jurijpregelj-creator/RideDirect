"use client"

import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { setLocale } from "@/app/actions/locale"

const LOCALES = [
  { code: "en", flag: "🇬🇧", label: "EN", ariaLabel: "Switch to English" },
  { code: "de", flag: "🇩🇪", label: "DE", ariaLabel: "Auf Deutsch wechseln" },
  { code: "it", flag: "🇮🇹", label: "IT", ariaLabel: "Passa all'italiano" },
]

export function LanguageSwitcher() {
  const [current, setCurrent] = useState("en")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  useEffect(() => {
    const match = document.cookie.match(/NEXT_LOCALE=([^;]+)/)
    if (match && LOCALES.some((l) => l.code === match[1])) {
      setCurrent(match[1])
    }
  }, [])

  function handleChange(locale: string) {
    setCurrent(locale)
    startTransition(async () => {
      await setLocale(locale)
      router.refresh()
    })
  }

  return (
    <div className="flex items-center gap-0.5" role="group" aria-label="Language selection">
      {LOCALES.map((l) => (
        <button
          key={l.code}
          onClick={() => handleChange(l.code)}
          disabled={isPending}
          aria-label={l.ariaLabel}
          aria-pressed={current === l.code}
          className={`text-xs px-1.5 py-0.5 rounded transition-colors ${
            current === l.code
              ? "bg-blue-100 text-[#1E88E5] font-bold"
              : "text-gray-400 hover:text-gray-700"
          }`}
        >
          {l.flag} {l.label}
        </button>
      ))}
    </div>
  )
}
