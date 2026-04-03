import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Admin Dashboard" }

export default async function AdminDashboardPage() {
  const supabase = createClient()

  const [
    { count: totalUsers },
    { data: listings },
  ] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("listings").select("status"),
  ])

  const counts = (listings || []).reduce(
    (acc: Record<string, number>, l: { status: string }) => {
      acc[l.status] = (acc[l.status] || 0) + 1
      return acc
    },
    {}
  )

  const stats = [
    { label: "Total Users", value: totalUsers ?? 0, bg: "bg-blue-50", text: "text-blue-700", icon: "👥" },
    { label: "Active Listings", value: counts["approved"] ?? 0, bg: "bg-green-50", text: "text-green-700", icon: "✅" },
    { label: "Pending Review", value: counts["pending"] ?? 0, bg: "bg-amber-50", text: "text-amber-700", icon: "⏳" },
    { label: "Rejected", value: counts["rejected"] ?? 0, bg: "bg-red-50", text: "text-red-700", icon: "❌" },
    { label: "Expired", value: counts["expired"] ?? 0, bg: "bg-gray-50", text: "text-gray-600", icon: "🕐" },
    { label: "Draft", value: counts["draft"] ?? 0, bg: "bg-gray-50", text: "text-gray-500", icon: "📝" },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0F1B3D]">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Overview of RideDirect.eu activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-6 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center text-xl shrink-0`}>
              {s.icon}
            </div>
            <div>
              <div className="text-sm text-gray-500 font-medium">{s.label}</div>
              <div className={`text-3xl font-bold ${s.text} mt-0.5`}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
