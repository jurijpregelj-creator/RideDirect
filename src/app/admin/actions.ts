"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { createClient as createAdminClient } from "@supabase/supabase-js"
import { translateListingToAllLocales, SUPPORTED_LISTING_LOCALES } from "@/lib/translate-listing"

async function requireAdmin() {
  // Accept backdoor cookie OR Supabase admin session
  const adminPass = cookies().get("admin_pass")?.value
  if (adminPass === "1") {
    // Use service role for mutations when using backdoor
    return createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
  }
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()
  if (profile?.role !== "admin") throw new Error("Forbidden")
  return supabase
}

export async function approveListing(listingId: string) {
  const supabase = await requireAdmin()
  const expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
  await supabase
    .from("listings")
    .update({ status: "approved", expires_at: expiresAt })
    .eq("id", listingId)
  revalidatePath("/admin/listings")
  revalidatePath("/marketplace")

  // Fire-and-catch: translation into all supported locales must never block approval.
  try {
    const { data: listing } = await supabase
      .from("listings")
      .select("title, description")
      .eq("id", listingId)
      .single()
    if (listing) {
      await translateListingToAllLocales(listingId, listing.title, listing.description)
    }
  } catch (e) {
    console.error("Listing translation failed for", listingId, e)
  }
}

export async function rejectListing(listingId: string) {
  const supabase = await requireAdmin()
  await supabase
    .from("listings")
    .update({ status: "rejected", expires_at: null })
    .eq("id", listingId)
  revalidatePath("/admin/listings")
  revalidatePath("/marketplace")
}

export async function extendListing(listingId: string) {
  const supabase = await requireAdmin()
  const { data } = await supabase.from("listings").select("expires_at").eq("id", listingId).single()
  const base = data?.expires_at && new Date(data.expires_at) > new Date()
    ? new Date(data.expires_at)
    : new Date()
  const expiresAt = new Date(base.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString()
  await supabase
    .from("listings")
    .update({ status: "approved", expires_at: expiresAt })
    .eq("id", listingId)
  revalidatePath("/admin/listings")
}

export async function deleteListing(listingId: string) {
  const supabase = await requireAdmin()
  await supabase.from("listings").delete().eq("id", listingId)
  revalidatePath("/admin/listings")
  revalidatePath("/marketplace")
}

export async function sendAdminMessage(listingId: string, sellerId: string, message: string) {
  await requireAdmin()
  // Use service role for insert since admin might not have a session
  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  await admin.from("inquiries").insert({
    listing_id: listingId,
    seller_id: sellerId,
    buyer_name: "RideDirect Admin",
    buyer_email: "admin@ridedirect.eu",
    message,
    is_read: false,
    unread_for_buyer: false,
  })
  revalidatePath("/admin/listings")
}

export async function backfillMissingTranslations() {
  const supabase = await requireAdmin()
  const { data: listings } = await supabase
    .from("listings")
    .select("id, title, description")
    .eq("status", "approved")

  // Skip listings that already have every locale translated — re-running
  // this repeatedly shouldn't burn DeepL quota on listings that don't need it.
  const { data: existing } = await supabase.from("listing_translations").select("listing_id, locale")
  const localeCountByListing = new Map<string, number>()
  for (const row of existing || []) {
    localeCountByListing.set(row.listing_id, (localeCountByListing.get(row.listing_id) ?? 0) + 1)
  }
  const needsTranslation = (listings || []).filter(
    (l) => (localeCountByListing.get(l.id) ?? 0) < SUPPORTED_LISTING_LOCALES.length
  )

  let translated = 0
  for (const listing of needsTranslation) {
    try {
      await translateListingToAllLocales(listing.id, listing.title, listing.description)
      translated++
    } catch (e) {
      console.error("Backfill translation failed for", listing.id, e)
    }
  }
  revalidatePath("/admin/listings")
  return { translated, total: needsTranslation.length }
}

export async function adminUpdateListing(
  listingId: string,
  data: {
    title?: string
    description?: string
    category?: string
    country?: string
    price?: number
    currency?: string
    condition?: string
    manufacturer?: string
    year?: number
  }
) {
  await requireAdmin()
  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  await admin.from("listings").update({ ...data, updated_at: new Date().toISOString() }).eq("id", listingId)
  revalidatePath("/admin/listings")
  revalidatePath(`/listings/${listingId}`)
}
