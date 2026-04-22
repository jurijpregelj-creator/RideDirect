import { redirect } from "next/navigation"
import Link from "next/link"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

const ADMIN_EMAILS = ["jurijpregelj@gmail.com"]

function Badge({ count }: { count: number }) {
  if (!count) return null
  return (
    <span className="ml-auto bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
      {count > 99 ? "99+" : count}
    </span>
  )
}

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
  const [{ count: pendingListings }, { count: pendingLeads }] = await Promise.all([
    admin.from("listings").select("id", { count: "exact", head: true }).eq("status", "pending"),
    admin.from("leads").select("id", { count: "exact", head: true }),
  ])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-56 bg-[#0D2A5E] text-white flex flex-col shrink-0 fixed inset-y-0 left-0 z-40">
        <div className="p-5 border-b border-white/10">
          <div className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-1">Admin Panel</div>
          <div className="text-white font-bold text-lg">RideDirect.eu</div>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors">
            <span className="text-base">📊</span> Dashboard
          </Link>
          <Link href="/admin/listings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors">
            <span className="text-base">📋</span> Listings
            <Badge count={pendingListings ?? 0} />
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors">
            <span className="text-base">👥</span> Users
          </Link>
          <Link href="/admin/leads" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors">
            <span className="text-base">📥</span> Leads
            <Badge count={pendingLeads ?? 0} />
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link href="/dashboard" className="block text-xs text-white/40 hover:text-white/70 transition-colors">
            → My Dashboard
          </Link>
          <Link href="/" className="block text-xs text-white/40 hover:text-white/70 transition-colors">
            ← Back to site
          </Link>
        </div>
      </aside>
      <main className="flex-1 ml-56 min-h-screen">{children}</main>
    </div>
  )
}
