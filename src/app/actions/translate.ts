"use server"

import * as deepl from "deepl-node"

const SUPPORTED_LANGUAGES: Record<string, string> = {
  BG: "Bulgarian", CS: "Czech", DA: "Danish", DE: "German",
  EL: "Greek", EN: "English", ES: "Spanish", ET: "Estonian",
  FI: "Finnish", FR: "French", HU: "Hungarian", ID: "Indonesian",
  IT: "Italian", JA: "Japanese", KO: "Korean", LT: "Lithuanian",
  LV: "Latvian", NB: "Norwegian", NL: "Dutch", PL: "Polish",
  PT: "Portuguese", RO: "Romanian", RU: "Russian", SK: "Slovak",
  SL: "Slovenian", SV: "Swedish", TR: "Turkish", UK: "Ukrainian",
  ZH: "Chinese",
}

export async function translateText(text: string, targetLang: string) {
  const apiKey = process.env.DEEPL_API_KEY
  if (!apiKey) return { success: false, error: "Translation not configured." }

  const lang = targetLang.toUpperCase().split("-")[0]
  if (!SUPPORTED_LANGUAGES[lang]) return { success: false, error: "Language not supported." }

  try {
    const translator = new deepl.Translator(apiKey)
    const result = await translator.translateText(
      text,
      null,
      lang === "EN" ? "EN-US" : (lang as deepl.TargetLanguageCode)
    )
    return {
      success: true,
      translated: Array.isArray(result) ? result[0].text : result.text,
      detectedLang: Array.isArray(result) ? result[0].detectedSourceLang : result.detectedSourceLang,
    }
  } catch (e: any) {
    return { success: false, error: e.message || "Translation failed." }
  }
}

export async function getSupportedLanguages() {
  return SUPPORTED_LANGUAGES
}
