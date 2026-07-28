import { SUPPORTED_LISTING_LOCALES, type ListingLocale } from "@/lib/locales"

const BASE_URL = "https://ridedirect.eu"

export function buildPageUrl(path: string, locale: ListingLocale): string {
  return locale === "en" ? `${BASE_URL}${path}` : `${BASE_URL}/${locale}${path}`
}

export function buildPageAlternates(path: string, locale: ListingLocale) {
  return {
    canonical: buildPageUrl(path, locale),
    languages: {
      "x-default": buildPageUrl(path, "en"),
      ...Object.fromEntries(SUPPORTED_LISTING_LOCALES.map((l) => [l, buildPageUrl(path, l)])),
    },
  }
}

export { SUPPORTED_LISTING_LOCALES }
export type { ListingLocale }
