// Pure constants/URL-builders with zero dependencies — safe to import from
// client components, Edge middleware, or anywhere else, unlike
// translate-listing.ts (which pulls in deepl-node, a Node-only package that
// breaks both the client bundle and the Edge middleware runtime).

export const SUPPORTED_LISTING_LOCALES = ["en", "de", "it", "fr", "es", "nl", "pl", "pt"] as const
export type ListingLocale = (typeof SUPPORTED_LISTING_LOCALES)[number]

const BASE_URL = "https://ridedirect.eu"

export function buildListingUrl(id: string, locale: ListingLocale): string {
  return locale === "en"
    ? `${BASE_URL}/listings/${id}`
    : `${BASE_URL}/${locale}/listings/${id}`
}

export function buildListingAlternates(id: string, locale: ListingLocale) {
  return {
    canonical: buildListingUrl(id, locale),
    languages: {
      "x-default": buildListingUrl(id, "en"),
      ...Object.fromEntries(SUPPORTED_LISTING_LOCALES.map((l) => [l, buildListingUrl(id, l)])),
    },
  }
}
