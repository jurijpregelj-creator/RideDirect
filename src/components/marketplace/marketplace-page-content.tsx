import { Suspense } from "react"
import { Search } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { MarketplaceFilters } from "@/components/marketplace/filters"
import { ListingCard } from "@/components/marketplace/listing-card"
import { CATEGORIES } from "@/data/mock"
import type { Listing } from "@/types"
import type { ListingLocale } from "@/lib/translate-listing"
import { SITE_T } from "@/components/home/site-content-translations"

interface MarketplaceSearchParams {
  q?: string
  category?: string
  country?: string
  condition?: string
}

async function getListings(params: MarketplaceSearchParams): Promise<Listing[]> {
  const supabase = createClient()

  let query = supabase
    .from("listings")
    .select("*, listing_images(id, listing_id, image_url, sort_order)")
    .eq("status", "approved")
    .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
    .order("created_at", { ascending: false })

  if (params.q) {
    query = query.or(
      `title.ilike.%${params.q}%,description.ilike.%${params.q}%,manufacturer.ilike.%${params.q}%`
    )
  }

  if (params.category && params.category !== "all") {
    const match = CATEGORIES.find((c) => c.slug === params.category)
    if (match) query = query.eq("category", match.name)
  }

  if (params.country && params.country !== "all") {
    query = query.ilike("country", params.country)
  }

  if (params.condition && params.condition !== "all") {
    query = query.eq("condition", params.condition)
  }

  const { data, error } = await query
  if (error) {
    console.error("Error fetching listings:", error)
    return []
  }

  return (data || []).map((item: any) => ({
    ...item,
    images: (item.listing_images || []).sort((a: any, b: any) => a.sort_order - b.sort_order),
  })) as Listing[]
}

async function getTranslationsFor(listingIds: string[], locale: ListingLocale) {
  if (!listingIds.length) return {} as Record<string, string>
  const admin = createAdminClient()
  const { data } = await admin
    .from("listing_translations")
    .select("listing_id, title")
    .eq("locale", locale)
    .in("listing_id", listingIds)
  return Object.fromEntries((data ?? []).map((row) => [row.listing_id, row.title]))
}

export async function MarketplacePageContent({
  searchParams,
  locale,
}: {
  searchParams: MarketplaceSearchParams
  locale?: ListingLocale
}) {
  const [listings, t] = await Promise.all([
    getListings(searchParams),
    locale ? Promise.resolve(null) : getTranslations("marketplace"),
  ])
  const dict = locale ? SITE_T[locale].marketplace : null
  const tt = (key: string, values?: { count: number }) =>
    dict ? (dict as Record<string, string>)[key].replace("{count}", String(values?.count)) : (t as any)(key, values)

  const titleByListingId = locale ? await getTranslationsFor(listings.map((l) => l.id), locale) : {}

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-[#0D2A5E] mb-1">{tt("title")}</h1>
          <p className="text-gray-500">{tt("subtitle")}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Suspense>
          <div className="mb-6"><MarketplaceFilters /></div>
        </Suspense>

        <p className="text-sm text-gray-500 mb-6">
          {listings.length === 1
            ? tt("listingsFound_one", { count: 1 })
            : tt("listingsFound_other", { count: listings.length })}
        </p>

        {listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                locale={locale}
                translatedTitle={titleByListingId[listing.id]}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4 mx-auto" aria-hidden="true"><Search size={28} className="text-gray-300" /></div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{tt("noListings")}</h3>
            <p className="text-gray-400 text-sm max-w-md">{tt("noListingsDesc")}</p>
          </div>
        )}
      </div>
    </div>
  )
}
