import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { CreateListingForm } from "@/components/listing/create-listing-form"
import { SUPPORTED_LISTING_LOCALES, type ListingLocale } from "@/lib/locales"
import { SITE_T } from "@/components/home/site-content-translations"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Post a Ride",
  description: "List your amusement ride for sale on RideDirect.eu",
}

export default async function CreateListingPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?next=/dashboard/create")
  }

  const cookieLocale = cookies().get("NEXT_LOCALE")?.value
  const locale: ListingLocale = (SUPPORTED_LISTING_LOCALES as readonly string[]).includes(cookieLocale ?? "")
    ? (cookieLocale as ListingLocale)
    : "en"

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-[#0D2A5E] mb-1">{SITE_T[locale].nav.postARide}</h1>
          <p className="text-gray-500">Fill in the details below to list your ride on RideDirect.eu</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <CreateListingForm userId={user.id} locale={locale} />
      </div>
    </div>
  )
}
