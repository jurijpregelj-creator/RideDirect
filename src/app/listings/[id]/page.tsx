import Link from "next/link"
import { notFound } from "next/navigation"
import {
  MapPin,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  ChevronLeft,
  Globe,
  Factory,
  Tag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CONDITION_LABELS } from "@/data/mock"
import { formatPrice } from "@/lib/utils"
import type { Metadata } from "next"
import { InquiryForm } from "@/components/listing/inquiry-form"
import { createClient } from "@/lib/supabase/server"
import { ImageGallery } from "@/components/listing/image-gallery"
import { ViewCounter } from "@/components/listing/view-counter"
import type { Listing } from "@/types"

interface ListingDetailPageProps {
  params: { id: string }
}

async function getListing(id: string): Promise<Listing | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("listings")
    .select("*, listing_images(id, listing_id, image_url, sort_order), views")
    .eq("id", id)
    .single()

  if (error || !data) return null

  return {
    ...data,
    images: (data.listing_images || []).sort((a: any, b: any) => a.sort_order - b.sort_order),
  } as Listing
}

export async function generateMetadata({ params }: ListingDetailPageProps): Promise<Metadata> {
  const listing = await getListing(params.id)
  if (!listing) return { title: "Listing not found" }
  return {
    title: listing.title,
    description: listing.description?.slice(0, 160),
  }
}

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const listing = await getListing(params.id)

  if (!listing) {
    notFound()
  }

  const details = [
    { label: "Category", value: listing.category, icon: Tag },
    { label: "Country", value: listing.country, icon: MapPin },
    { label: "Condition", value: CONDITION_LABELS[listing.condition], icon: ShieldCheck },
    ...(listing.manufacturer
      ? [{ label: "Manufacturer", value: listing.manufacturer, icon: Factory }]
      : []),
    ...(listing.year
      ? [{ label: "Year", value: String(listing.year), icon: Calendar }]
      : []),
    ...(listing.original_language
      ? [
          {
            label: "Original Language",
            value: listing.original_language.toUpperCase(),
            icon: Globe,
          },
        ]
      : []),
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link
            href="/marketplace"
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#1B4FD8] transition-colors"
          >
            <ChevronLeft size={16} />
            Back to listings
          </Link>
        </div>

        <div className="flex items-center justify-between mb-2">
          <ViewCounter listingId={listing.id} initialViews={listing.views ?? 0} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Images + Description */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image gallery */}
            <ImageGallery images={listing.images || []} title={listing.title} />

            {/* Listing info */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="text-sm">{listing.category}</Badge>
                {listing.ce_docs_available && (
                  <Badge variant="success" className="flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    CE Documentation Available
                  </Badge>
                )}
                {listing.inspection_available && (
                  <Badge variant="blue" className="flex items-center gap-1">
                    <ShieldCheck size={12} />
                    Inspection Available
                  </Badge>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-[#0F1B3D] mb-4 leading-tight">
                {listing.title}
              </h1>

              <Separator className="my-4" />

              <h2 className="font-semibold text-gray-700 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {listing.description}
              </p>
            </div>

            {/* Details grid */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-700 mb-4">Listing Details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {details.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-[#1B4FD8]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-0.5">{label}</div>
                      <div className="text-sm font-medium text-gray-700">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Price + Inquiry */}
          <div className="space-y-5">
            {/* Price card */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <div className="text-3xl font-bold text-[#1B4FD8] mb-1">
                {formatPrice(listing.price, listing.currency)}
              </div>
              <div className="text-sm text-gray-400 mb-4">
                {CONDITION_LABELS[listing.condition]} · {listing.country}
              </div>
              <div className="space-y-2 text-sm text-gray-500">
                {listing.ce_docs_available && (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-500" />
                    CE documentation available
                  </div>
                )}
                {listing.inspection_available && (
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-blue-500" />
                    Pre-purchase inspection possible
                  </div>
                )}
              </div>
            </div>

            {/* Inquiry form */}
            <InquiryForm listingId={listing.id} sellerId={listing.seller_id} listingTitle={listing.title} />
          </div>
        </div>
      </div>
    </div>
  )
}
