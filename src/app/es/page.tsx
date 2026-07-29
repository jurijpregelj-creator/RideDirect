import type { Metadata } from "next"
import { Hero } from "@/components/home/hero"
import { Categories } from "@/components/home/categories"
import { HowItWorks } from "@/components/home/how-it-works"
import { FeaturedListings } from "@/components/home/featured-listings"
import { buildPageAlternates } from "@/lib/site-locale-urls"
import { SITE_T } from "@/components/home/site-content-translations"

const hero = SITE_T.es.hero

export const metadata: Metadata = {
  title: [hero.title1, hero.title2, hero.title3].filter(Boolean).join(" "),
  description: hero.subtitle,
  alternates: buildPageAlternates("", "es"),
  openGraph: { title: [hero.title1, hero.title2, hero.title3].filter(Boolean).join(" "), description: hero.subtitle },
}

export default function HomePage() {
  return (
    <>
      <Hero locale="es" />
      <Categories locale="es" />
      <HowItWorks locale="es" />
      <FeaturedListings locale="es" />
    </>
  )
}
