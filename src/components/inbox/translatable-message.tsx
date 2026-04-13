"use client"

import { useState, useEffect } from "react"
import { Languages, Loader2, RotateCcw } from "lucide-react"
import { translateText } from "@/app/actions/translate"

const LANGUAGE_NAMES: Record<string, string> = {
  BG: "Bulgarian", CS: "Czech", DA: "Danish", DE: "Deutsch",
  EL: "Greek", EN: "English", ES: "Spanish", ET: "Estonian",
  FI: "Finnish", FR: "French", HU: "Hungarian", IT: "Italiano",
  JA: "Japanese", KO: "Korean", LT: "Lithuanian", LV: "Latvian",
  NB: "Norwegian", NL: "Dutch", PL: "Polish", PT: "Portuguese",
  RO: "Romanian", RU: "Russian", SK: "Slovak", SL: "Slovenian",
  SV: "Swedish", TR: "Turkish", UK: "Ukrainian", ZH: "Chinese",
}

interface Props {
  message: string
  isMe: boolean
}

export function TranslatableMessage({ message, isMe }: Props) {
  const [translated, setTranslated] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [targetLang, setTargetLang] = useState("EN")

  useEffect(() => {
    const lang = navigator.language.split("-")[0].toUpperCase()
    if (LANGUAGE_NAMES[lang]) setTargetLang(lang)
  }, [])

  async function handleTranslate() {
    setLoading(true)
    const result = await translateText(message, targetLang)
    if (result.success && result.translated) setTranslated(result.translated)
    setLoading(false)
  }

  const displayText = translated ?? message
  const langName = LANGUAGE_NAMES[targetLang] || targetLang

  return (
    <div className="flex flex-col gap-1">
      <div className={`px-4 py-3 rounded-2xl text-sm whitespace-pre-line ${
        isMe
          ? "bg-[#1E88E5] text-white rounded-br-sm"
          : "bg-white border border-gray-100 text-gray-700 rounded-bl-sm"
      }`}>
        {displayText}
      </div>

      {/* Translate button */}
      <div className={`flex ${isMe ? "justify-end" : "justify-start"} px-1`}>
        {!translated ? (
          <button
            onClick={handleTranslate}
            disabled={loading}
            className={`flex items-center gap-1 text-[11px] disabled:opacity-50 transition-opacity ${
              isMe ? "text-blue-200 hover:text-white" : "text-gray-400 hover:text-[#1E88E5]"
            }`}
          >
            {loading
              ? <><Loader2 size={11} className="animate-spin" /> Translating...</>
              : <><Languages size={11} /> Translate to {langName}</>
            }
          </button>
        ) : (
          <button
            onClick={() => setTranslated(null)}
            className={`flex items-center gap-1 text-[11px] ${
              isMe ? "text-blue-200 hover:text-white" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <RotateCcw size={11} /> Show original
          </button>
        )}
      </div>
    </div>
  )
}
