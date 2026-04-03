import { redirect } from "next/navigation"
import Link from "next/link"
import { Plus } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "My Dashboard" }

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending review",
  approved: "Active",
  rejected: "Rejected",
  expired: "Expired",
  draft: "Draft",
}
const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  expired: "bg-gray-100 text-gray-500",
  draft: "bg-gray-100 text-gray-400",
}

interface PageProps {
  searchParams: { status?: string }
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login?next=/dashboard")

  const statusFilter = searchParams.status || "all"

  const [{ data: profile }, { data: allListings }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase
      .from("listings")
      .select("id, title, status, price, currency, category, country, created_at")
      .eq("seller_id", user.id)
      .order("created_at", { ascending: false }),
  ])

  const counts = (allListings || []).reduce((acc: Record<string, number>, l) => {
    acc[l.status] = (acc[l.status] || 0) + 1
    return acc
  }, {})

  const listings = statusFilter === "all"
    ? (allListings || [])
    : (allListings || []).filter((l) => l.status === statusFilter)

  const initials = (profile?.full_name || user.email || "U")
    .split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2)

  const stats = [
    { label: "Total", value: allListings?.length ?? 0, color: "text-[#0F1B3D]", filter: "all" },
    { label: "Active", value: counts["approved"] ?? 0, color: "text-green-600", filter: "approved" },
    { label: "Pending", value: counts["pending"] ?? 0, color: "text-amber-600", filter: "pending" },
    { label: "Rejected", value: counts["rejected"] ?? 0, color: "text-red-500", filter: "rejected" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10 max-w-4xl">

        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-[#1B4FD8] text-white font-bold text-xl flex items-center justify-center shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-[#0F1B3D] text-xl">{profile?.full_name || "—"}</div>
            <div className="text-gray-400 text-sm">{user.email}</div>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              {profile?.country && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  📍 {profile.country}
                </span>
              )}
              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full capitalize">
                {profile?.role || "buyer"}
              </span>
            </div>
          </div>
          <Link href="/dashboard/create">
            <Button variant="brand" size="sm">
              <Plus size={15} />
              Post a Ride
            </Button>
          </Link>
        </div>

        {/* Stats — clickable filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {stats.map((s) => {
            const isActive = statusFilter === s.filter
            return (
              <Link
                key={s.label}
                href={s.filter === "all" ? "/dashboard" : `/dashboard?status=${s.filter}`}
                className={`bg-white rounded-xl border p-4 text-center transition-all hover:shadow-sm ${
                  isActive ? "border-[#1B4FD8] ring-1 ring-[#1B4FD8]" : "border-gray-100"
                }`}
              >
                <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-gray-400 mt-1">{s.label}</div>
              </Link>
            )
          })}
        </div>

        {/* Listings */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="font-semibold text-[#0F1B3D]">
              {statusFilter === "all" ? "My Listings" : `${STATUS_LABELS[statusFilter] || statusFilter} Listings`}
            </h2>
          </div>

          {!listings.length ? (
            <div className="py-16 text-center">
              <div className="text-4xl mb-3">🎡</div>
              <p className="text-gray-400 text-sm mb-4">
                {statusFilter === "all" ? "You haven't posted any listings yet." : "No listings with this status."}
              </p>
              {statusFilter === "all" && (
                <Link href="/dashboard/create">
                  <Button variant="brand" size="sm">Post your first ride</Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {listings.map((listing) => (
                <Link
                  key={listing.id}
                  href={`/listings/${listing.id}`}
                  className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-[#0F1B3D] hover:text-[#1B4FD8] truncate transition-colors">
                      {listing.title}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {listing.category} · {listing.country} · {new Date(listing.created_at).toLocaleDateString("en-GB")}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-gray-700 shrink-0">
                    {formatPrice(listing.price, listing.currency)}
                  </div>
                  <span className={`shrink-0 inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[listing.status] || "bg-gray-100"}`}>
                    {STATUS_LABELS[listing.status] || listing.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
