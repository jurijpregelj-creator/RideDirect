import type { MetadataRoute } from "next"

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

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/marketplace`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/sell`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/legal/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/legal/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ]

  const categoryPages: MetadataRoute.Sitemap = CATEGORY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/marketplace?category=${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...categoryPages]
}
