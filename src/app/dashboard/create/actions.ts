"use server"

import { createClient } from "@/lib/supabase/server"
import { notifyAdminNewListing } from "@/lib/admin-notify"

export async function notifyNewListingSubmitted(listing: {
  id: string
  title: string
  category: string
  country: string
  price: number
  currency: string
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single()

  await notifyAdminNewListing({
    ...listing,
    sellerEmail: user.email,
    sellerName: profile?.full_name,
  })
}
