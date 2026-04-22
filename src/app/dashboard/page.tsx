import { redirect } from "next/navigation"
import Link from "next/link"
import { Plus, Eye, MessageSquare, Pencil, Settings, Package } from "lucide-react"
import { DeleteListingButton } from "@/components/dashboard/delete-listing-button"
import { getTranslations } from "next-intl/server"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { AvatarUpload } from "@/components/profile/avatar-upload"
import { ClaimLeadOnLoad } from "@/components/funnel/claim-lead-on-load"
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
  searchParams: { status?: string; submitted?: string }
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const supabase = createClient()
  const tDash = await getTranslations("dashboard")
  const tCommon = await getTranslations("common")
  const { data: { user } } = await supabase.auth.getUser()
  const isFunnelSubmit = searchParams.submitted === "1"
  if (!user) {
    const next = isFunnelSubmit ? "/dashboard?submitted=1" : "/dashboard"
    redirect(`/auth/login?next=${encodeURIComponent(next)}`)
  }
  const statusFilter = searchParams.status || "all"

  const [{ data: profile }, { data: allListings }, { count: unreadCount }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase
      .from("listings")
      .select("id, title, status, price, currency, category, country, created_at, views")
      .eq("seller_id", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("inquiries")
      .select("id", { count: "exact", head: true })
      .or(`seller_id.eq.${user.id},buyer_id.eq.${user.id}`)
      .eq("is_read", false),
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
    { label: tDash("total"), value: allListings?.length ?? 0, color: "text-[#0D2A5E]", filter: "all" },
    { label: tDash("active"), value: counts["approved"] ?? 0, color: "text-green-600", filter: "approved" },
    { label: tDash("pending"), value: counts["pending"] ?? 0, color: "text-amber-600", filter: "pending" },
    { label: tDash("rejected"), value: counts["rejected"] ?? 0, color: "text-red-500", filter: "rejected" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10 max-w-4xl">

        {/* Funnel claim banner — checks localStorage for pending lead on every load */}
        <ClaimLeadOnLoad />

        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 flex items-center gap-5">
          <AvatarUpload userId={user.id} currentUrl={profile?.avatar_url} initials={initials} />
          <div className="flex-1 min-w-0">
            <div className="font-bold text-[#0D2A5E] text-xl">{profile?.full_name || "—"}</div>
            <div className="text-gray-400 text-sm">{user.email}</div>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              {profile?.country && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  📍 {profile.country}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Link href="/dashboard/profile">
              <Button variant="outline" size="sm">
                <Settings size={15} />
                Edit Profile
              </Button>
            </Link>
            <Link href="/dashboard/messages" className="relative">
              <Button variant="outline" size="sm">
                <MessageSquare size={15} />
                Messages
                {(unreadCount ?? 0) > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/dashboard/create">
              <Button variant="brand" size="sm">
                <Plus size={15} />
                {tDash("postARide")}
              </Button>
            </Link>
          </div>
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
                  isActive ? "border-[#1E88E5] ring-1 ring-[#1E88E5]" : "border-gray-100"
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
            <h2 className="font-semibold text-[#0D2A5E]">
              {statusFilter === "all" ? tDash("myListings") : tCommon(`status.${statusFilter}` as any)}
            </h2>
          </div>

          {!listings.length ? (
            <div className="py-16 text-center">
              <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center mb-3 mx-auto" aria-hidden="true"><Package size={24} className="text-gray-300" /></div>
              <p className="text-gray-400 text-sm mb-4">
                {statusFilter === "all" ? tDash("noListings") : tDash("noListingsStatus")}
              </p>
              {statusFilter === "all" && (
                <Link href="/dashboard/create">
                  <Button variant="brand" size="sm">{tDash("postFirst")}</Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {listings.map((listing) => (
                <div key={listing.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50/50 transition-colors">
                  <Link href={`/listings/${listing.id}`} className="flex-1 min-w-0">
                    <div className="font-medium text-[#0D2A5E] hover:text-[#1E88E5] truncate transition-colors">
                      {listing.title}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {listing.category} · {listing.country} · {new Date(listing.created_at).toLocaleDateString("en-GB")}
                    </div>
                  </Link>
                  <div className="text-sm font-semibold text-gray-700 shrink-0">
                    {formatPrice(listing.price, listing.currency)}
                  </div>
                  <span className={`shrink-0 inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[listing.status] || "bg-gray-100"}`}>
                    {STATUS_LABELS[listing.status] || listing.status}
                  </span>
                  <span className="shrink-0 flex items-center gap-1 text-xs text-gray-400">
                    <Eye size={12} />
                    {listing.views ?? 0}
                  </span>
                  <Link href={`/dashboard/listings/${listing.id}/edit`} className="shrink-0">
                    <Button variant="outline" size="sm" className="h-7 px-2">
                      <Pencil size={12} />
                    </Button>
                  </Link>
                  <DeleteListingButton listingId={listing.id} />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
