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
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"
import { InquiryForm } from "@/components/listing/inquiry-form"
import { ReportListingButton } from "@/components/listing/report-listing-button"
import { createClient } from "@/lib/supabase/server"
import { ImageGallery } from "@/components/listing/image-gallery"
import { ViewCounter } from "@/components/listing/view-counter"
import type { Listing } from "@/types"
import type { ListingLocale } from "@/lib/translate-listing"
import { getListingTranslation } from "@/lib/translate-listing"
import { LISTING_PAGE_T, categorySlugFromName } from "@/components/listing/listing-page-translations"

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

export async function getListingPageMeta(id: string, locale: ListingLocale) {
  const listing = await getListing(id)
  if (!listing) return null
  const translation = await getListingTranslation(id, locale)
  return {
    title: translation?.title || listing.title,
    description: (translation?.description || listing.description)?.slice(0, 160),
  }
}

export async function ListingPageContent({ id, locale }: { id: string; locale: ListingLocale }) {
  const listing = await getListing(id)
  if (!listing) notFound()

  const translation = await getListingTranslation(id, locale)
  const title = translation?.title || listing.title
  const description = translation?.description || listing.description

  const t = LISTING_PAGE_T[locale]
  const categorySlug = categorySlugFromName(listing.category)
  const categoryLabel = categorySlug ? t.categories[categorySlug] : listing.category
  const conditionLabel = t.conditions[listing.condition]

  const details = [
    { label: t.category, value: categoryLabel, icon: Tag },
    { label: t.country, value: listing.country, icon: MapPin },
    { label: t.condition, value: conditionLabel, icon: ShieldCheck },
    ...(listing.manufacturer ? [{ label: t.manufacturer, value: listing.manufacturer, icon: Factory }] : []),
    ...(listing.year ? [{ label: t.year, value: String(listing.year), icon: Calendar }] : []),
    ...(listing.original_language
      ? [{ label: t.originalLanguage, value: listing.original_language.toUpperCase(), icon: Globe }]
      : []),
  ]

  const supabase2 = createClient()
  const { data: { user: currentUser } } = await supabase2.auth.getUser()
  let currentProfile = null
  if (currentUser) {
    const { data } = await supabase2.from("profiles").select("full_name, email").eq("id", currentUser.id).single()
    currentProfile = data
  }

  const localizedUrl = `https://ridedirect.eu/${locale}/listings/${listing.id}`
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description: description?.slice(0, 5000),
    category: listing.category,
    ...(listing.manufacturer ? { brand: { "@type": "Brand", name: listing.manufacturer } } : {}),
    ...(listing.images?.length ? { image: listing.images.map((img) => img.image_url) } : {}),
    offers: {
      "@type": "Offer",
      url: localizedUrl,
      priceCurrency: listing.currency,
      price: listing.price,
      itemCondition:
        listing.condition === "new" ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition",
      availability: "https://schema.org/InStock",
      areaServed: listing.country,
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link
            href="/marketplace"
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#1E88E5] transition-colors"
          >
            <ChevronLeft size={16} />
            {t.backToListings}
          </Link>
        </div>

        <div className="flex items-center justify-between mb-2">
          <ViewCounter listingId={listing.id} initialViews={listing.views ?? 0} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Images + Description */}
          <div className="lg:col-span-2 space-y-6">
            <ImageGallery images={listing.images || []} title={title} />

            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="text-sm">{categoryLabel}</Badge>
                {listing.ce_docs_available && (
                  <Badge variant="success" className="flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    {t.ceDocsAvailable}
                  </Badge>
                )}
                {listing.inspection_available && (
                  <Badge variant="blue" className="flex items-center gap-1">
                    <ShieldCheck size={12} />
                    {t.inspectionAvailable}
                  </Badge>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-[#0D2A5E] mb-4 leading-tight">
                {title}
              </h1>

              <Separator className="my-4" />

              <div>
                <h2 className="font-semibold text-gray-700 mb-3">{t.description}</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{description}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-700 mb-4">{t.details}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {details.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-[#1E88E5]" />
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
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <div className="text-3xl font-bold text-[#1E88E5] mb-1">
                {formatPrice(listing.price, listing.currency)}
              </div>
              <div className="text-sm text-gray-400 mb-4">
                {conditionLabel} · {listing.country}
              </div>
              <div className="space-y-2 text-sm text-gray-500">
                {listing.ce_docs_available && (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-500" />
                    {t.ceDocsAvailable}
                  </div>
                )}
                {listing.inspection_available && (
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-blue-500" />
                    {t.inspectionAvailable}
                  </div>
                )}
              </div>
            </div>

            {currentUser?.id === listing.seller_id ? (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-center text-sm text-blue-600">
                {t.yourListingNotice}
              </div>
            ) : (
              <InquiryForm
                listingId={listing.id}
                sellerId={listing.seller_id}
                listingTitle={title}
                loggedInUser={currentProfile ? { name: currentProfile.full_name, email: currentProfile.email || currentUser?.email || "" } : null}
              />
            )}

            <div className="flex justify-center">
              <ReportListingButton listingId={listing.id} listingTitle={title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
