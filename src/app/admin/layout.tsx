import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login?next=/admin")

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") redirect("/")

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[#0F1B3D] text-white flex flex-col shrink-0 fixed inset-y-0 left-0 z-40">
        <div className="p-5 border-b border-white/10">
          <div className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-1">Admin Panel</div>
          <div className="text-white font-bold text-lg">RideDirect.eu</div>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <span className="text-base">📊</span> Dashboard
          </Link>
          <Link
            href="/admin/listings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <span className="text-base">📋</span> Listings
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <span className="text-base">👥</span> Users
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link href="/" className="text-xs text-white/40 hover:text-white/70 transition-colors">
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-56 min-h-screen">{children}</main>
    </div>
  )
}
