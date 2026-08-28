"use server"

import { runListingModeration } from "@/lib/moderation-pipeline"
import { notifySellerListingSubmitted } from "@/lib/seller-notify"

export async function onListingSubmitted(listingId: string) {
  await notifySellerListingSubmitted(listingId)
  await runListingModeration(listingId)
}
