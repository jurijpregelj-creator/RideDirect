import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, Calendar, CheckCircle2, ImageOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { formatPrice } from "@/lib/utils"
import { CONDITION_LABELS } from "@/data/mock"
import type { ListingLocale } from "@/lib/translate-listing"
import { buildListingUrl } from "@/lib/translate-listing"
import { buildPageUrl } from "@/lib/site-locale-urls"
import { LISTING_PAGE_T, categorySlugFromName } from "@/components/listing/listing-page-translations"
import { SITE_T } from "@/components/home/site-content-translations"

async function getLatestListings() {
  const supabase = createClient()
  const { data } = await supabase
    .from("listings")
    .select("*, listing_images(id, listing_id, image_url, sort_order)")
    .eq("status", "approved")
    .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
    .order("created_at", { ascending: false })
    .limit(4)

  return data ?? []
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

export async function FeaturedListings({ locale }: { locale?: ListingLocale } = {}) {
  const listings = await getLatestListings()

  if (listings.length === 0) return null

  const titleByListingId = locale ? await getTranslationsFor(listings.map((l) => l.id), locale) : {}
  const t = locale ? SITE_T[locale].featuredListings : { title: "Latest Listings", subtitle: "Recently listed amusement rides available across Europe", viewAll: "View all listings" }
  const badges = locale ? SITE_T[locale].listingCard : { ceDocs: "CE Docs", inspection: "Inspection" }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0D2A5E] mb-2">
              {t.title}
            </h2>
            <p className="text-gray-500">
              {t.subtitle}
            </p>
          </div>
          <Link href={locale ? buildPageUrl("/marketplace", locale) : "/marketplace"}>
            <Button variant="outline" className="shrink-0">
              {t.viewAll}
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map((listing) => {
            const images = listing.listing_images ?? []
            const firstImage = images.sort((a: any, b: any) => a.sort_order - b.sort_order)[0]
            const title = titleByListingId[listing.id] ?? listing.title
            const categorySlug = categorySlugFromName(listing.category)
            const categoryLabel = locale && categorySlug ? LISTING_PAGE_T[locale].categories[categorySlug] : listing.category
            const conditionLabel = locale
              ? LISTING_PAGE_T[locale].conditions[listing.condition as keyof typeof LISTING_PAGE_T["en"]["conditions"]]
              : CONDITION_LABELS[listing.condition as keyof typeof CONDITION_LABELS]

            return (
              <Link
                key={listing.id}
                href={locale ? buildListingUrl(listing.id, locale) : `/listings/${listing.id}`}
                className="group block bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  {firstImage ? (
                    <Image
                      src={firstImage.image_url}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full" aria-hidden="true">
                      <ImageOff size={32} className="text-gray-200" />
                    </div>
                  )}
                  {listing.ce_docs_available && (
                    <div className="absolute top-2 left-2">
                      <Badge variant="success" className="text-xs flex items-center gap-1">
                        <CheckCircle2 size={10} />
                        {badges.ceDocs}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="blue" className="text-xs">{categoryLabel}</Badge>
                  </div>
                  <h3 className="font-semibold text-[#0D2A5E] text-sm leading-tight mb-3 group-hover:text-[#1E88E5] transition-colors line-clamp-2">
                    {title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <MapPin size={12} />
                    <span>{listing.country}</span>
                    {listing.year && (
                      <>
                        <span>·</span>
                        <Calendar size={12} />
                        <span>{listing.year}</span>
                      </>
                    )}
                  </div>
                  <div className="text-lg font-bold text-[#1E88E5]">
                    {formatPrice(listing.price, listing.currency)}
                  </div>
                  <div className="text-xs text-gray-400">
                    {conditionLabel}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
