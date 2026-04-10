"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export async function markInquiryRead(inquiryId: string) {
  const supabase = createClient()
  await supabase
    .from("inquiries")
    .update({ is_read: true })
    .eq("id", inquiryId)
  revalidatePath("/dashboard/inbox")
}
