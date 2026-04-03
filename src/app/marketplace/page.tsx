import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { MarketplaceFilters } from "@/components/marketplace/filters"
import { ListingCard } from "@/components/marketplace/listing-card"
import { CATEGORIES } from "@/data/mock"
import type { Listing } from "@/types"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Browse Listings",
  description: "Browse amusement rides and attractions for sale across Europe.",
}

interface MarketplacePageProps {
  searchParams: {
    q?: string
    category?: string
    country?: string
    condition?: string
  }
}

async function getListings(params: MarketplacePageProps["searchParams"]): Promise<Listing[]> {
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

export default async function MarketplacePage({ searchParams }: MarketplacePageProps) {
  const listings = await getListings(searchParams)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-[#0F1B3D] mb-1">
            Browse Listings
          </h1>
          <p className="text-gray-500">
            Amusement rides and attractions for sale across Europe
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Suspense>
          <div className="mb-6">
            <MarketplaceFilters />
          </div>
        </Suspense>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          {listings.length} listing{listings.length !== 1 ? "s" : ""} found
        </p>

        {/* Listings grid */}
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">🎡</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No listings found
            </h3>
            <p className="text-gray-400 text-sm max-w-md">
              Try adjusting your filters or search terms to find what you&apos;re looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
