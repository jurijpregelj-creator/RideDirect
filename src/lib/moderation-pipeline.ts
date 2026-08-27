import { createAdminClient } from "@/lib/supabase/admin"
import { classifyListing } from "@/lib/moderate-listing"
import { approveListingCore } from "@/lib/approve-listing"
import { notifyAdminFlaggedListing } from "@/lib/admin-notify"
import { revalidatePath } from "next/cache"

// Runs right after a listing is submitted (status "pending"): AI classifies
// it, clear-cut legitimate listings are auto-approved (same path as the
// admin "Approve" button, incl. translation), anything flagged stays
// pending and the admin gets an email with the AI's reason instead of a
// generic "new listing" notification for every submission.
export async function runListingModeration(listingId: string) {
  const supabase = createAdminClient()

  const { data: listing } = await supabase
    .from("listings")
    .select("title, description, category, country, price, currency, manufacturer, condition")
    .eq("id", listingId)
    .single()
  if (!listing) return

  const result = await classifyListing(listing)

  if (result.verdict === "approve") {
    await approveListingCore(supabase, listingId)
    revalidatePath("/admin/listings")
    revalidatePath("/marketplace")
  } else {
    await notifyAdminFlaggedListing({ id: listingId, title: listing.title, reason: result.reason })
  }
}
