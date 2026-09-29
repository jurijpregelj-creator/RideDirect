"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"

export async function sendBugReport(formData: {
  message: string
  email?: string
  pageUrl: string
  screenshotUrl?: string
  context?: Record<string, unknown>
}) {
  if (!formData.message.trim()) return { success: false }

  // Record who was signed in (seller or admin) so reports can be followed up
  // even when they skip the optional email field.
  let userEmail: string | null = null
  try {
    const { data: { user } } = await createClient().auth.getUser()
    userEmail = user?.email ?? null
  } catch {}

  const supabase = createAdminClient()
  const { error } = await supabase.from("bug_reports").insert({
    message: formData.message.slice(0, 5000),
    email: formData.email || null,
    page_url: formData.pageUrl,
    screenshot_url: formData.screenshotUrl || null,
    user_email: userEmail,
    context: formData.context ?? null,
  })

  if (error) {
    console.error("[BugReport] Failed to save report:", error)
    return { success: false }
  }

  return { success: true }
}
