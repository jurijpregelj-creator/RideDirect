import type { Metadata } from "next"
import { ListingPageContent, getListingPageMeta } from "@/components/listing/listing-page-content"
import { buildListingAlternates } from "@/lib/translate-listing"

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = await getListingPageMeta(params.id, "pl")
  if (!meta) return { title: "Listing not found" }
  return {
    title: meta.title,
    description: meta.description,
    alternates: buildListingAlternates(params.id, "pl"),
  }
}

export default function ListingPage({ params }: Props) {
  return <ListingPageContent id={params.id} locale="pl" />
}
