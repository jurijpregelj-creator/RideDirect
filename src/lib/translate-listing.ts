import * as deepl from "deepl-node"
import { createAdminClient } from "@/lib/supabase/admin"
import { SUPPORTED_LISTING_LOCALES, type ListingLocale } from "@/lib/locales"

export { SUPPORTED_LISTING_LOCALES, buildListingUrl, buildListingAlternates } from "@/lib/locales"
export type { ListingLocale } from "@/lib/locales"

const DEEPL_TARGET: Record<ListingLocale, deepl.TargetLanguageCode> = {
  en: "en-US",
  de: "de",
  it: "it",
  fr: "fr",
  es: "es",
  nl: "nl",
  pl: "pl",
  pt: "pt-PT",
}

let translatorInstance: deepl.Translator | null = null
function getTranslator(): deepl.Translator | null {
  const apiKey = process.env.DEEPL_API_KEY
  if (!apiKey) return null
  if (!translatorInstance) translatorInstance = new deepl.Translator(apiKey)
  return translatorInstance
}

interface TranslationRow {
  listing_id: string
  locale: ListingLocale
  title: string
  description: string
}

/**
 * Translates a listing's title+description into every locale in
 * SUPPORTED_LISTING_LOCALES and upserts the results into
 * listing_translations. The locale DeepL detects as the source is stored
 * as a passthrough (no translation call) to preserve the seller's exact
 * wording. Each locale is translated independently — one DeepL failure
 * does not affect the others or block the caller.
 */
export async function translateListingToAllLocales(
  listingId: string,
  title: string,
  description: string
): Promise<{ succeeded: ListingLocale[]; failed: ListingLocale[] }> {
  const translator = getTranslator()
  const succeeded: ListingLocale[] = []
  const failed: ListingLocale[] = []

  if (!translator) {
    return { succeeded, failed: [...SUPPORTED_LISTING_LOCALES] }
  }

  let detectedLocale: ListingLocale | null = null
  const rows: TranslationRow[] = []

  // Translate title first to detect the source language before firing the rest in parallel.
  const firstTarget = SUPPORTED_LISTING_LOCALES[0]
  try {
    const titleResult = await translator.translateText(title, null, DEEPL_TARGET[firstTarget])
    const detected = titleResult.detectedSourceLang?.toLowerCase()
    if (detected && (SUPPORTED_LISTING_LOCALES as readonly string[]).includes(detected)) {
      detectedLocale = detected as ListingLocale
    }
    if (detectedLocale === firstTarget) {
      rows.push({ listing_id: listingId, locale: firstTarget, title, description })
      succeeded.push(firstTarget)
    } else {
      const descResult = await translator.translateText(description, null, DEEPL_TARGET[firstTarget])
      rows.push({ listing_id: listingId, locale: firstTarget, title: titleResult.text, description: descResult.text })
      succeeded.push(firstTarget)
    }
  } catch {
    failed.push(firstTarget)
  }

  const remaining = SUPPORTED_LISTING_LOCALES.filter((l) => l !== firstTarget)
  await Promise.all(
    remaining.map(async (locale) => {
      if (locale === detectedLocale) {
        rows.push({ listing_id: listingId, locale, title, description })
        succeeded.push(locale)
        return
      }
      try {
        const [titleResult, descResult] = await Promise.all([
          translator.translateText(title, null, DEEPL_TARGET[locale]),
          translator.translateText(description, null, DEEPL_TARGET[locale]),
        ])
        rows.push({ listing_id: listingId, locale, title: titleResult.text, description: descResult.text })
        succeeded.push(locale)
      } catch {
        failed.push(locale)
      }
    })
  )

  if (rows.length) {
    const admin = createAdminClient()
    await admin.from("listing_translations").upsert(rows, { onConflict: "listing_id,locale" })
  }

  return { succeeded, failed }
}

export async function getListingTranslation(listingId: string, locale: ListingLocale) {
  const admin = createAdminClient()
  const { data } = await admin
    .from("listing_translations")
    .select("title, description")
    .eq("listing_id", listingId)
    .eq("locale", locale)
    .maybeSingle()
  return data
}
