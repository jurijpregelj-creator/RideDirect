"use server"

import { revalidatePath } from "next/cache"
import { createAdminClient } from "@/lib/supabase/admin"

export async function deleteLead(leadId: string) {
  const supabase = createAdminClient()
  await supabase.from("leads").delete().eq("id", leadId)
  revalidatePath("/admin/leads")
}
