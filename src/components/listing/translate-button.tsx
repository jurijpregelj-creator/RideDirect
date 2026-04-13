"use client"

import { useState, useEffect } from "react"
import { Languages, Loader2, RotateCcw } from "lucide-react"
import { useTranslations } from "next-intl"
import { translateText } from "@/app/actions/translate"

const LANGUAGE_NAMES: Record<string, string> = {
  BG: "Bulgarian", CS: "Czech", DA: "Danish", DE: "Deutsch",
  EL: "Greek", EN: "English", ES: "Spanish", ET: "Estonian",
  FI: "Finnish", FR: "French", HU: "Hungarian", ID: "Indonesian",
  IT: "Italiano", JA: "Japanese", KO: "Korean", LT: "Lithuanian",
  LV: "Latvian", NB: "Norwegian", NL: "Dutch", PL: "Polish",
  PT: "Portuguese", RO: "Romanian", RU: "Russian", SK: "Slovak",
  SL: "Slovenian", SV: "Swedish", TR: "Turkish", UK: "Ukrainian",
  ZH: "Chinese",
}

interface TranslateButtonProps {
  originalText: string
  onTranslated: (text: string | null) => void
}

export function TranslateButton({ originalText, onTranslated }: TranslateButtonProps) {
  const t = useTranslations("translate")
  const [loading, setLoading] = useState(false)
  const [translated, setTranslated] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [detectedLang, setDetectedLang] = useState<string | null>(null)
  const [targetLang, setTargetLang] = useState<string>("EN")

  useEffect(() => {
    const browserLang = navigator.language.split("-")[0].toUpperCase()
    if (LANGUAGE_NAMES[browserLang]) setTargetLang(browserLang)
  }, [])

  async function handleTranslate() {
    setLoading(true)
    setError(null)
    const result = await translateText(originalText, targetLang)
    if (result.success && result.translated) {
      onTranslated(result.translated)
      setTranslated(true)
      setDetectedLang(result.detectedLang?.toUpperCase() || null)
    } else {
      setError(result.error || "Translation failed.")
    }
    setLoading(false)
  }

  function handleRevert() {
    onTranslated(null)
    setTranslated(false)
    setDetectedLang(null)
  }

  if (translated && detectedLang === targetLang) return null

  const langName = LANGUAGE_NAMES[targetLang] || targetLang

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {!translated ? (
        <button onClick={handleTranslate} disabled={loading} className="flex items-center gap-1.5 text-xs text-[#1E88E5] hover:underline disabled:opacity-50">
          {loading
            ? <><Loader2 size={13} className="animate-spin" /> {t("translating")}</>
            : <><Languages size={13} /> {t("button", { language: langName })}</>
          }
        </button>
      ) : (
        <button onClick={handleRevert} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600">
          <RotateCcw size={13} /> {t("showOriginal")}
        </button>
      )}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
