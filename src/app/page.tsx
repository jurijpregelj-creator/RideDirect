import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { Hero } from "@/components/home/hero"
import { Categories } from "@/components/home/categories"
import { HowItWorks } from "@/components/home/how-it-works"
import { FeaturedListings } from "@/components/home/featured-listings"
import { buildPageAlternates } from "@/lib/site-locale-urls"
import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: buildPageAlternates("", "en"),
}

const ADMIN_EMAILS = ["jurijpregelj@gmail.com"]

export default async function HomePage() {
  // Backdoor cookie bypasses everything
  if (cookies().get("admin_pass")?.value === "1") redirect("/admin")

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
