import { SellPageContent } from "@/components/sell/sell-page-content"
import { buildPageAlternates } from "@/lib/site-locale-urls"
import { SELL_T } from "@/app/sell/sell-translations"
import type { Metadata } from "next"

const t = SELL_T.fr

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: buildPageAlternates("/sell", "fr"),
  openGraph: { url: "https://ridedirect.eu/fr/sell", title: t.metaTitle, description: t.metaDescription },
}

export default function SellWithUsFrPage() {
  return <SellPageContent locale="fr" />
}
