import type { Metadata } from "next"
import { AboutPageContent } from "@/components/about/about-page-content"
import { buildPageAlternates } from "@/lib/site-locale-urls"
import { ABOUT_T } from "@/app/about/about-translations"

const t = ABOUT_T.it

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: buildPageAlternates("/about", "it"),
  openGraph: { url: "https://ridedirect.eu/it/about", title: t.metaTitle, description: t.metaDescription },
}

export default function AboutItPage() {
  return <AboutPageContent locale="it" />
}
