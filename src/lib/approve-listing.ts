import type { SupabaseClient } from "@supabase/supabase-js"
import { translateListingToAllLocales } from "@/lib/translate-listing"

// Shared by the admin "Approve" button and the AI moderation pipeline —
// both need the exact same approve + translate behavior, just triggered
// by a different caller (an authenticated admin vs. the AI verdict).
export async function approveListingCore(supabase: SupabaseClient, listingId: string) {
  const expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
  await supabase
    .from("listings")
    .update({ status: "approved", expires_at: expiresAt })
    .eq("id", listingId)

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
