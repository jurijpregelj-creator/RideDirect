import type { Metadata } from "next"
import { AboutPageContent } from "@/components/about/about-page-content"
import { buildPageAlternates } from "@/lib/site-locale-urls"
import { ABOUT_T } from "@/app/about/about-translations"

const t = ABOUT_T.pt

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: buildPageAlternates("/about", "pt"),
  openGraph: { url: "https://ridedirect.eu/pt/about", title: t.metaTitle, description: t.metaDescription },
}

export default function AboutPtPage() {
  return <AboutPageContent locale="pt" />
}
