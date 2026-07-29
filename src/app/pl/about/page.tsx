import type { Metadata } from "next"
import { AboutPageContent } from "@/components/about/about-page-content"
import { buildPageAlternates } from "@/lib/site-locale-urls"
import { ABOUT_T } from "@/app/about/about-translations"

const t = ABOUT_T.pl

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: buildPageAlternates("/about", "pl"),
  openGraph: { url: "https://ridedirect.eu/pl/about", title: t.metaTitle, description: t.metaDescription },
}

export default function AboutPlPage() {
  return <AboutPageContent locale="pl" />
}
