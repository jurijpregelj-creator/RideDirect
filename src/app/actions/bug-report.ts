"use server"

import { createAdminClient } from "@/lib/supabase/admin"

export async function sendBugReport(formData: {
  message: string
  email?: string
  pageUrl: string
}) {
  if (!formData.message.trim()) return { success: false }

  const supabase = createAdminClient()
  const { error } = await supabase.from("bug_reports").insert({
    message: formData.message,
    email: formData.email || null,
    page_url: formData.pageUrl,
  })

  if (error) {
    console.error("[BugReport] Failed to save report:", error)
    return { success: false }
  }

  return { success: true }
}
