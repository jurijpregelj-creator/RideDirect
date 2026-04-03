import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { ListingActions } from "./_components/listing-actions"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Admin — Listings" }

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
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

export default async function AdminListingsPage({ searchParams }: PageProps) {
  const supabase = createClient()
  const statusFilter = searchParams.status || "all"

  let query = supabase
    .from("listings")
    .select("id, title, status, price, currency, country, category, created_at, expires_at, seller_id")
    .order("created_at", { ascending: false })

  if (statusFilter !== "all") {
    query = query.eq("status", statusFilter)
  }

  const { data: listings } = await query

  // Fetch seller emails separately
  const sellerIds = Array.from(new Set((listings || []).map((l: any) => l.seller_id as string)))
  const { data: profiles } = sellerIds.length
    ? await supabase.from("profiles").select("id, email, full_name").in("id", sellerIds)
    : { data: [] }
  const profileMap = Object.fromEntries((profiles || []).map((p: any) => [p.id, p]))

  const tabs = ["all", "pending", "approved", "rejected", "expired"]

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F1B3D]">Listings</h1>
        <p className="text-sm text-gray-400 mt-1">{listings?.length ?? 0} listings found</p>
      </div>

      {/* Status tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        {tabs.map((tab) => (
          <Link
            key={tab}
            href={`/admin/listings${tab !== "all" ? `?status=${tab}` : ""}`}
            className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${
              statusFilter === tab
                ? "bg-white text-[#0F1B3D] shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "approved" ? "Active" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {!listings?.length ? (
          <div className="py-16 text-center text-gray-400">No listings found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Listing</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Seller</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Price</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Expires</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {listings.map((listing: any) => {
                const seller = profileMap[listing.seller_id]
                return (
                  <tr key={listing.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-[#0F1B3D] max-w-xs truncate">{listing.title}</div>
                      <div className="text-xs text-gray-400">{listing.category} · {listing.country}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-gray-700">{seller?.full_name || "—"}</div>
                      <div className="text-xs text-gray-400">{seller?.email || listing.seller_id.slice(0, 8)}</div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-700">
                      {listing.price.toLocaleString()} {listing.currency}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[listing.status] || "bg-gray-100"}`}>
                        {STATUS_LABELS[listing.status] || listing.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {listing.expires_at
                        ? new Date(listing.expires_at).toLocaleDateString("en-GB")
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <ListingActions listingId={listing.id} status={listing.status} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
