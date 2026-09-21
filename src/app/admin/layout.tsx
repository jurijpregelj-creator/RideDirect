import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { AdminSidebar } from "./admin-sidebar"

const ADMIN_EMAILS = ["jurijpregelj@gmail.com"]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Path 1: backdoor cookie (bypasses Supabase entirely — bulletproof)
  const hasAdminPass = cookies().get("admin_pass")?.value === "1"

  // Path 2: regular Supabase admin email check
  let isSupabaseAdmin = false
  if (!hasAdminPass) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect("/auth/login?next=/admin")
    isSupabaseAdmin = ADMIN_EMAILS.includes(user.email ?? "")
  }

  if (!hasAdminPass && !isSupabaseAdmin) redirect("/")

  // Fetch notification counts
  const admin = createAdminClient()
  const [{ count: pendingListings }, { count: pendingLeads }, { count: bugReports }, { count: outreachContacts }] = await Promise.all([
    admin.from("listings").select("id", { count: "exact", head: true }).eq("status", "pending"),
    admin.from("leads").select("id", { count: "exact", head: true }),
    admin.from("bug_reports").select("id", { count: "exact", head: true }),
    admin.from("outreach_contacts").select("id", { count: "exact", head: true }).eq("status", "drafted"),
  ])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <AdminSidebar
        pendingListings={pendingListings ?? 0}
        pendingLeads={pendingLeads ?? 0}
        bugReports={bugReports ?? 0}
        outreachContacts={outreachContacts ?? 0}
      />
      <main className="flex-1 md:ml-56 min-h-screen">{children}</main>
    </div>
  )
}
