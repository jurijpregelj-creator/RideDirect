"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import { notifyAdminNewLead, notifyAdminNewListing } from "@/lib/admin-notify"

export async function saveLead(data: {
  title: string
  description: string
  email?: string | null
  price: number
  currency: string
  category: string
  country: string
  condition: string
  manufacturer?: string | null
  year?: number | null
  lang: string
}): Promise<{ leadId: string; claimToken: string }> {
  const supabase = createAdminClient()

  const { data: lead, error } = await supabase
    .from("leads")
    .insert(data)
    .select("id, claim_token")
    .single()

  if (error || !lead) throw new Error(error?.message || "Failed to save lead")

  await notifyAdminNewLead({
    title: data.title,
    category: data.category,
    country: data.country,
    price: data.price,
    currency: data.currency,
    email: data.email,
  })

  return { leadId: lead.id, claimToken: lead.claim_token }
}

export async function updateLeadImages(
  leadId: string,
  claimToken: string,
  imageUrls: string[]
): Promise<void> {
  const supabase = createAdminClient()

  const { error } = await supabase
    .from("leads")
    .update({ image_urls: imageUrls })
    .eq("id", leadId)
    .eq("claim_token", claimToken)

  if (error) throw new Error(error.message)
}

export async function claimLead(
  claimToken: string
): Promise<{ listingId: string } | { error: string }> {
  const serverSupabase = createClient()
  const { data: { user } } = await serverSupabase.auth.getUser()
  if (!user) return { error: "Not authenticated" }

  const supabase = createAdminClient()

  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .select("*")
    .eq("claim_token", claimToken)
    .single()

  if (leadError || !lead) return { error: "Lead not found or already claimed" }

  // Create real listing from lead data
  const { data: listing, error: listingError } = await supabase
    .from("listings")
    .insert({
      seller_id: user.id,
      title: lead.title,
      description: lead.description,
      price: lead.price,
      currency: lead.currency,
      category: lead.category,
      country: lead.country,
      condition: lead.condition,
      manufacturer: lead.manufacturer || null,
      year: lead.year || null,
      status: "pending",
      ce_docs_available: false,
      inspection_available: false,
    })
    .select("id")
    .single()

  if (listingError || !listing) {
    return { error: listingError?.message || "Failed to create listing" }
  }

  const { data: sellerProfile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single()

  await notifyAdminNewListing({
    id: listing.id,
    title: lead.title,
    category: lead.category,
    country: lead.country,
    price: lead.price,
    currency: lead.currency,
    sellerEmail: user.email,
    sellerName: sellerProfile?.full_name,
  })

  // Attach images
  if (lead.image_urls?.length) {
    await supabase.from("listing_images").insert(
      lead.image_urls.map((url: string, i: number) => ({
        listing_id: listing.id,
        image_url: url,
        sort_order: i,
      }))
    )
  }

  // Delete the claimed lead so it can't be claimed twice
  await supabase.from("leads").delete().eq("id", lead.id)

  return { listingId: listing.id }
}
