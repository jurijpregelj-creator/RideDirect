"use server"

import { runListingModeration } from "@/lib/moderation-pipeline"

export async function moderateNewListing(listingId: string) {
  await runListingModeration(listingId)
}
