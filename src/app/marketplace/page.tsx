import { MarketplacePageContent } from "@/components/marketplace/marketplace-page-content"
import { buildPageAlternates } from "@/lib/site-locale-urls"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Browse Listings",
  description: "Browse amusement rides and attractions for sale across Europe.",
  alternates: buildPageAlternates("/marketplace", "en"),
  openGraph: { url: "https://ridedirect.eu/marketplace" },
}

interface MarketplacePageProps {
  searchParams: {
    q?: string
    category?: string
    country?: string
    condition?: string
  }
}

export default function MarketplacePage({ searchParams }: MarketplacePageProps) {
  return <MarketplacePageContent searchParams={searchParams} />
}
