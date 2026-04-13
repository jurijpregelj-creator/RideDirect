import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, Calendar, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { formatPrice } from "@/lib/utils"
import { CONDITION_LABELS } from "@/data/mock"

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

export async function FeaturedListings() {
  const listings = await getLatestListings()

  if (listings.length === 0) return null

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0D2A5E] mb-2">
              Latest Listings
            </h2>
            <p className="text-gray-500">
              Recently listed amusement rides available across Europe
            </p>
          </div>
          <Link href="/marketplace">
            <Button variant="outline" className="shrink-0">
              View all listings
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map((listing) => {
            const images = listing.listing_images ?? []
            const firstImage = images.sort((a: any, b: any) => a.sort_order - b.sort_order)[0]

            return (
              <Link
                key={listing.id}
                href={`/listings/${listing.id}`}
                className="group block bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  {firstImage ? (
                    <Image
                      src={firstImage.image_url}
                      alt={listing.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-300 text-4xl">
                      🎡
                    </div>
                  )}
                  {listing.ce_docs_available && (
                    <div className="absolute top-2 left-2">
                      <Badge variant="success" className="text-xs flex items-center gap-1">
                        <CheckCircle2 size={10} />
                        CE Docs
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="blue" className="text-xs">{listing.category}</Badge>
                  </div>
                  <h3 className="font-semibold text-[#0D2A5E] text-sm leading-tight mb-3 group-hover:text-[#1E88E5] transition-colors line-clamp-2">
                    {listing.title}
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
                    {CONDITION_LABELS[listing.condition as keyof typeof CONDITION_LABELS]}
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
