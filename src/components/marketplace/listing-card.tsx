import Link from "next/link"
import Image from "next/image"
import { MapPin, Calendar, CheckCircle2, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { type Listing } from "@/types"
import { formatPrice } from "@/lib/utils"
import { CONDITION_LABELS } from "@/data/mock"

interface ListingCardProps {
  listing: Listing
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link
      href={`/listings/${listing.id}`}
      className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
        {listing.images?.[0] ? (
          <Image
            src={listing.images[0].image_url}
            alt={listing.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-300 text-5xl">
            🎡
          </div>
        )}
        <div className="absolute top-2 left-2 flex gap-1.5 flex-wrap">
          {listing.ce_docs_available && (
            <Badge variant="success" className="text-xs flex items-center gap-1">
              <CheckCircle2 size={10} />
              CE Docs
            </Badge>
          )}
          {listing.inspection_available && (
            <Badge variant="blue" className="text-xs flex items-center gap-1">
              <ShieldCheck size={10} />
              Inspection
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs text-gray-500">{listing.category}</Badge>
        </div>

        <h3 className="font-semibold text-[#0F1B3D] leading-snug mb-3 group-hover:text-[#1B4FD8] transition-colors line-clamp-2 flex-1">
          {listing.title}
        </h3>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400 mb-4">
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {listing.country}
          </span>
          {listing.year && (
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {listing.year}
            </span>
          )}
          {listing.manufacturer && (
            <span className="text-gray-400">{listing.manufacturer}</span>
          )}
        </div>

        <div className="flex items-end justify-between pt-3 border-t border-gray-50">
          <div>
            <div className="text-xl font-bold text-[#1B4FD8]">
              {formatPrice(listing.price, listing.currency)}
            </div>
            <div className="text-xs text-gray-400 mt-0.5">
              {CONDITION_LABELS[listing.condition]}
            </div>
          </div>
          <div className="text-xs text-gray-300 text-right">
            {new Date(listing.created_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
      </div>
    </Link>
  )
}
