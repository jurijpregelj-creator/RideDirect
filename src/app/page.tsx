import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Hero } from "@/components/home/hero"
import { Categories } from "@/components/home/categories"
import { HowItWorks } from "@/components/home/how-it-works"
import { FeaturedListings } from "@/components/home/featured-listings"

const ADMIN_EMAILS = ["jurijpregelj@gmail.com"]

export default async function HomePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user && ADMIN_EMAILS.includes(user.email ?? "")) {
    redirect("/admin")
  }

  return (
    <>
      <Hero />
      <Categories />
      <HowItWorks />
      <FeaturedListings />
    </>
  )
}
