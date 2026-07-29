import type { Metadata } from "next"
import { MarketplacePageContent } from "@/components/marketplace/marketplace-page-content"
import { buildPageAlternates } from "@/lib/site-locale-urls"
import { SITE_T } from "@/components/home/site-content-translations"

const mp = SITE_T.es.marketplace

export const metadata: Metadata = {
  title: mp.title,
  description: mp.subtitle,
  alternates: buildPageAlternates("/marketplace", "es"),
  openGraph: { title: mp.title, description: mp.subtitle },
}

interface Props {
  searchParams: { q?: string; category?: string; country?: string; condition?: string }
}

export default function MarketplacePage({ searchParams }: Props) {
  return <MarketplacePageContent searchParams={searchParams} locale="es" />
}
