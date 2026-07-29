// Pure constants/URL-builders with zero dependencies — safe to import from
// client components, Edge middleware, or anywhere else, unlike
// translate-listing.ts (which pulls in deepl-node, a Node-only package that
// breaks both the client bundle and the Edge middleware runtime).

export const SUPPORTED_LISTING_LOCALES = ["en", "de", "it", "fr", "es", "nl", "pl", "pt"] as const
export type ListingLocale = (typeof SUPPORTED_LISTING_LOCALES)[number]

// Single shared source for the "Preferred Language" picker (signup + profile
// pages previously had two separate hardcoded en/de/it-only copies of this).
export const PREFERRED_LANGUAGES: { code: ListingLocale; label: string }[] = [
  { code: "en", label: "English 🇬🇧" },
  { code: "de", label: "Deutsch 🇩🇪" },
  { code: "it", label: "Italiano 🇮🇹" },
  { code: "fr", label: "Français 🇫🇷" },
  { code: "es", label: "Español 🇪🇸" },
  { code: "nl", label: "Nederlands 🇳🇱" },
  { code: "pl", label: "Polski 🇵🇱" },
  { code: "pt", label: "Português 🇵🇹" },
]

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
