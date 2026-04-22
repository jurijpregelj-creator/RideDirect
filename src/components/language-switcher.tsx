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
