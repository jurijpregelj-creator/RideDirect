import type { Metadata } from "next"
import { Hero } from "@/components/home/hero"
import { Categories } from "@/components/home/categories"
import { HowItWorks } from "@/components/home/how-it-works"
import { FeaturedListings } from "@/components/home/featured-listings"
import { buildPageAlternates } from "@/lib/site-locale-urls"

export const metadata: Metadata = {
  alternates: buildPageAlternates("", "it"),
}

export default function HomePage() {
  return (
    <>
      <Hero locale="it" />
      <Categories locale="it" />
      <HowItWorks locale="it" />
      <FeaturedListings locale="it" />
    </>
  )
}
