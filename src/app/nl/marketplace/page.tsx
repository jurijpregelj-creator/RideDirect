import type { Metadata } from "next"
import { MarketplacePageContent } from "@/components/marketplace/marketplace-page-content"
import { buildPageAlternates } from "@/lib/site-locale-urls"

export const metadata: Metadata = {
  alternates: buildPageAlternates("/marketplace", "nl"),
}

interface Props {
  searchParams: { q?: string; category?: string; country?: string; condition?: string }
}

export default function MarketplacePage({ searchParams }: Props) {
  return <MarketplacePageContent searchParams={searchParams} locale="nl" />
}
