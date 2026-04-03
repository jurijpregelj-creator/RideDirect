import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, Calendar, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MOCK_LISTINGS, CONDITION_LABELS } from "@/data/mock"
import { formatPrice } from "@/lib/utils"

export function FeaturedListings() {
  const featured = MOCK_LISTINGS.slice(0, 4)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0F1B3D] mb-2">
              Featured Listings
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
          {featured.map((listing) => (
            <Link
              key={listing.id}
              href={`/listings/${listing.id}`}
              className="group block bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                {listing.images?.[0] ? (
                  <Image
                    src={listing.images[0].image_url}
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
                <h3 className="font-semibold text-[#0F1B3D] text-sm leading-tight mb-3 group-hover:text-[#1B4FD8] transition-colors line-clamp-2">
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
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-[#1B4FD8]">
                      {formatPrice(listing.price, listing.currency)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {CONDITION_LABELS[listing.condition]}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
