import type { SupabaseClient } from "@supabase/supabase-js"
import { translateListingToAllLocales } from "@/lib/translate-listing"
import { notifySellerListingApproved } from "@/lib/seller-notify"

// Shared by the admin "Approve" button and the AI moderation pipeline —
// both need the exact same approve + translate + notify behavior, just
// triggered by a different caller (an authenticated admin vs. the AI verdict).
export async function approveListingCore(supabase: SupabaseClient, listingId: string) {
  const expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
  await supabase
    .from("listings")
    .update({ status: "approved", expires_at: expiresAt })
    .eq("id", listingId)

  const { data: listing } = await supabase
    .from("listings")
    .select("seller_id, title, description")
    .eq("id", listingId)
    .single()
  if (!listing) return

  try {
    await translateListingToAllLocales(listingId, listing.title, listing.description)
  } catch (e) {
    console.error("Listing translation failed for", listingId, e)
  }

  try {
    await notifySellerListingApproved(listingId, listing.seller_id, listing.title)
  } catch (e) {
    console.error("Seller approval notification failed for", listingId, e)
  }
}
