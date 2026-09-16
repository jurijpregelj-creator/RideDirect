"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { notifyAdminNewOutreachLead } from "@/lib/admin-notify"

export async function saveOutreachLead(data: {
  itemDescription: string
  listingUrl: string
  name?: string | null
  email?: string | null
  phone?: string | null
}): Promise<{ success: boolean }> {
  if (!data.itemDescription.trim() || !data.listingUrl.trim()) {
    return { success: false }
  }
  if (!data.email && !data.phone) {
    return { success: false }
  }

  const supabase = createAdminClient()

  const { error } = await supabase.from("leads").insert({
    title: data.itemDescription,
    description: `Existing listing: ${data.listingUrl}`,
    email: data.email || null,
    phone: data.phone || null,
    lang: "en",
    source: "outreach",
  })

  if (error) {
    console.error("[Outreach] Failed to save lead:", error)
    return { success: false }
  }

  await notifyAdminNewOutreachLead({
    itemDescription: data.itemDescription,
    listingUrl: data.listingUrl,
    name: data.name,
    email: data.email,
    phone: data.phone,
  })

  return { success: true }
}
