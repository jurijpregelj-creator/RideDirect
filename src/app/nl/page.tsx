import type { Metadata } from "next"
import { Hero } from "@/components/home/hero"
import { Categories } from "@/components/home/categories"
import { HowItWorks } from "@/components/home/how-it-works"
import { FeaturedListings } from "@/components/home/featured-listings"
import { buildPageAlternates } from "@/lib/site-locale-urls"
import { SITE_T } from "@/components/home/site-content-translations"

const hero = SITE_T.nl.hero

export const metadata: Metadata = {
  title: [hero.title1, hero.title2, hero.title3].filter(Boolean).join(" "),
  description: hero.subtitle,
  alternates: buildPageAlternates("", "nl"),
  openGraph: { title: [hero.title1, hero.title2, hero.title3].filter(Boolean).join(" "), description: hero.subtitle },
}

export default function HomePage() {
  return (
    <>
      <Hero locale="nl" />
      <Categories locale="nl" />
      <HowItWorks locale="nl" />
      <FeaturedListings locale="nl" />
    </>
  )
}
