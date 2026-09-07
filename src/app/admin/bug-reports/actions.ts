"use server"

import { revalidatePath } from "next/cache"
import { createAdminClient } from "@/lib/supabase/admin"

export async function deleteBugReport(id: string) {
  const supabase = createAdminClient()
  await supabase.from("bug_reports").delete().eq("id", id)
  revalidatePath("/admin/bug-reports")
}
