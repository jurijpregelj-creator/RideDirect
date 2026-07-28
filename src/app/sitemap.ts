import type { MetadataRoute } from "next"
import { createClient } from "@/lib/supabase/server"
import { SUPPORTED_LISTING_LOCALES, buildListingUrl } from "@/lib/translate-listing"
import { buildPageUrl } from "@/lib/site-locale-urls"

const BASE_URL = "https://ridedirect.eu"

const CATEGORY_SLUGS = [
  "major-rides",
  "family-rides",
  "kiddie-rides",
  "inflatables-soft-play",
  "arcade-coin-machines",
  "go-karts-track-attractions",
  "event-mobile-attractions",
  "games-prize-booths",
  "indoor-parks-playgrounds",
  "equipment-parts",
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const homepagePages: MetadataRoute.Sitemap = SUPPORTED_LISTING_LOCALES.map((locale) => ({
    url: buildPageUrl("", locale),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: locale === "en" ? 1.0 : 0.9,
  }))

  const marketplacePages: MetadataRoute.Sitemap = SUPPORTED_LISTING_LOCALES.map((locale) => ({
    url: buildPageUrl("/marketplace", locale),
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: locale === "en" ? 0.9 : 0.8,
  }))

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/sell`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/legal/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/legal/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    // Seller funnel landing pages
    { url: `${BASE_URL}/list-your-ride`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/it/pubblica-il-tuo-annuncio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/de/inserat-erstellen`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ]

  const categoryPages: MetadataRoute.Sitemap = CATEGORY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/marketplace?category=${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  // Fetch all approved listings for individual listing pages
  let listingPages: MetadataRoute.Sitemap = []
  try {
    const supabase = createClient()
    const { data: listings } = await supabase
      .from("listings")
      .select("id, updated_at")
      .eq("status", "approved")
      .order("updated_at", { ascending: false })

    if (listings) {
      listingPages = listings.flatMap((listing) =>
        SUPPORTED_LISTING_LOCALES.map((locale) => ({
          url: buildListingUrl(listing.id, locale),
          lastModified: new Date(listing.updated_at),
          changeFrequency: "weekly" as const,
          priority: locale === "en" ? 0.8 : 0.7,
        }))
      )
    }
  } catch {
    // Silently fail — sitemap still works without individual listings
  }

  return [...homepagePages, ...marketplacePages, ...staticPages, ...categoryPages, ...listingPages]
}
