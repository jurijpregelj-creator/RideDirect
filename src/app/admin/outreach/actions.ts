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

// Marks whether the seller's reply was positive (interested) or negative
// (declined). Negative sellers should never be re-contacted. Clicking the
// same value again clears it back to "no clear reply yet".
export async function setOutreachResponse(contactId: string, response: "positive" | "negative" | null) {
  const supabase = createAdminClient()
  await supabase.from("outreach_contacts").update({ response }).eq("id", contactId)
  revalidatePath("/admin/outreach")
}

// Groups get worked again and again over time, not just once — this just
// stamps "worked today" and drops it to the bottom of the queue until it's
// due again. It never locks the group into a permanent "done" state.
export async function markGroupWorkedToday(groupId: string) {
  const supabase = createAdminClient()
  await supabase
    .from("outreach_target_groups")
    .update({ last_worked_at: new Date().toISOString() })
    .eq("id", groupId)
  revalidatePath("/admin/outreach")
}

export async function clearGroupWorked(groupId: string) {
  const supabase = createAdminClient()
  await supabase
    .from("outreach_target_groups")
    .update({ last_worked_at: null })
    .eq("id", groupId)
  revalidatePath("/admin/outreach")
}

export async function deleteTargetGroup(groupId: string) {
  const supabase = createAdminClient()
  await supabase.from("outreach_target_groups").delete().eq("id", groupId)
  revalidatePath("/admin/outreach")
}
