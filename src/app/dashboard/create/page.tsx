import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { CreateListingForm } from "@/components/listing/create-listing-form"
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-[#0F1B3D] mb-1">Post a Ride</h1>
          <p className="text-gray-500">Fill in the details below to list your ride on RideDirect.eu</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <CreateListingForm userId={user.id} />
      </div>
    </div>
  )
}
