import type { Metadata } from "next"
import { Hero } from "@/components/home/hero"
import { Categories } from "@/components/home/categories"
import { HowItWorks } from "@/components/home/how-it-works"
import { FeaturedListings } from "@/components/home/featured-listings"
import { buildPageAlternates } from "@/lib/site-locale-urls"

export const metadata: Metadata = {
  alternates: buildPageAlternates("", "nl"),
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
