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

export async function markGroupDone(groupId: string) {
  const supabase = createAdminClient()
  await supabase
    .from("outreach_target_groups")
    .update({ status: "done", worked_at: new Date().toISOString().slice(0, 10) })
    .eq("id", groupId)
  revalidatePath("/admin/outreach")
}

export async function markGroupPending(groupId: string) {
  const supabase = createAdminClient()
  await supabase
    .from("outreach_target_groups")
    .update({ status: "pending", worked_at: null })
    .eq("id", groupId)
  revalidatePath("/admin/outreach")
}

export async function deleteTargetGroup(groupId: string) {
  const supabase = createAdminClient()
  await supabase.from("outreach_target_groups").delete().eq("id", groupId)
  revalidatePath("/admin/outreach")
}
