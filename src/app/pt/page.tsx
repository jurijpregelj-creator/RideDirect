import type { Metadata } from "next"
import { Hero } from "@/components/home/hero"
import { Categories } from "@/components/home/categories"
import { HowItWorks } from "@/components/home/how-it-works"
import { FeaturedListings } from "@/components/home/featured-listings"
import { buildPageAlternates } from "@/lib/site-locale-urls"

export const metadata: Metadata = {
  alternates: buildPageAlternates("", "pt"),
}

export default function HomePage() {
  return (
    <>
      <Hero locale="pt" />
      <Categories locale="pt" />
      <HowItWorks locale="pt" />
      <FeaturedListings locale="pt" />
    </>
  )
}
