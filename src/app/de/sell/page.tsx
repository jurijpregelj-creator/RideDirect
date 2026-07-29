import { SellPageContent } from "@/components/sell/sell-page-content"
import { buildPageAlternates } from "@/lib/site-locale-urls"
import { SELL_T } from "@/app/sell/sell-translations"
import type { Metadata } from "next"

const t = SELL_T.de

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: buildPageAlternates("/sell", "de"),
  openGraph: { url: "https://ridedirect.eu/de/sell", title: t.metaTitle, description: t.metaDescription },
}

export default function SellWithUsDePage() {
  return <SellPageContent locale="de" />
}
