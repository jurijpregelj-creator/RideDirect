import { Hero } from "@/components/home/hero"
import { Categories } from "@/components/home/categories"
import { HowItWorks } from "@/components/home/how-it-works"
import { FeaturedListings } from "@/components/home/featured-listings"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <HowItWorks />
      <FeaturedListings />
    </>
  )
}
