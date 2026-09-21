"use server"

import { revalidatePath } from "next/cache"
import { createAdminClient } from "@/lib/supabase/admin"

export async function markConverted(contactId: string) {
  const supabase = createAdminClient()
  await supabase
    .from("outreach_contacts")
    .update({ converted_at: new Date().toISOString() })
    .eq("id", contactId)
  revalidatePath("/admin/outreach")
}

export async function unmarkConverted(contactId: string) {
  const supabase = createAdminClient()
  await supabase
    .from("outreach_contacts")
    .update({ converted_at: null })
    .eq("id", contactId)
  revalidatePath("/admin/outreach")
}

export async function deleteOutreachContact(contactId: string) {
  const supabase = createAdminClient()
  await supabase.from("outreach_contacts").delete().eq("id", contactId)
  revalidatePath("/admin/outreach")
}
