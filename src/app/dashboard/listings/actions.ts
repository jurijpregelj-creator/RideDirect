"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function deleteListing(listingId: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  // Fetch images so we can delete from storage too
  const { data: images } = await supabase
    .from("listing_images")
    .select("image_url")
    .eq("listing_id", listingId)

  // Delete listing (RLS ensures only owner can delete)
  const { error } = await supabase
    .from("listings")
    .delete()
    .eq("id", listingId)
    .eq("seller_id", user.id)

  if (error) return { success: false }

  // Clean up images from storage (best-effort)
  if (images?.length) {
    const paths = images
      .map((img) => {
        try {
          const url = new URL(img.image_url)
          // path after /object/public/listing-images/
          const match = url.pathname.match(/\/object\/public\/listing-images\/(.+)/)
          return match?.[1] ?? null
        } catch {
          return null
        }
      })
      .filter(Boolean) as string[]

    if (paths.length) {
      await supabase.storage.from("listing-images").remove(paths)
    }
  }

  return { success: true }
}
