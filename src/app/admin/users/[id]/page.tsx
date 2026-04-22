import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft, Mail, MapPin, Calendar, Tag } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { formatPrice } from "@/lib/utils"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Admin — User Detail" }

const ROLE_COLORS: Record<string, string> = {
  admin: "bg-purple-100 text-purple-700",
  seller: "bg-blue-100 text-blue-700",
  buyer: "bg-gray-100 text-gray-500",
}

const STATUS_COLORS: Record<string, string> = {
  approved: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  rejected: "bg-red-100 text-red-700",
  expired: "bg-gray-100 text-gray-500",
  draft: "bg-gray-100 text-gray-400",
}

export default async function AdminUserDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  const [{ data: user }, { data: listings }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", params.id).single(),
    supabase.from("listings").select("id, title, status, price, currency, category, created_at, views").eq("seller_id", params.id).order("created_at", { ascending: false }),
  ])

  if (!user) notFound()

  const initials = user.full_name
    ? user.full_name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
    : user.email.slice(0, 2).toUpperCase()

  return (
    <div className="p-8 max-w-4xl">
      {/* Back */}
      <Link href="/admin/users" className="flex items-center gap-1 text-sm text-gray-400 hover:text-[#1E88E5] mb-6 transition-colors">
        <ChevronLeft size={16} /> Back to Users
      </Link>

      {/* Profile card */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6 flex items-start gap-5">
        <div className="w-16 h-16 rounded-full bg-[#1E88E5] text-white font-bold text-xl flex items-center justify-center shrink-0">
          {initials}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-bold text-[#0D2A5E]">{user.full_name || "No name"}</h1>
            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${ROLE_COLORS[user.role] || "bg-gray-100"}`}>
              {user.role}
            </span>
          </div>
          <div className="mt-3 space-y-1.5 text-sm text-gray-500">
            <div className="flex items-center gap-2"><Mail size={14} />{user.email}</div>
            {user.country && <div className="flex items-center gap-2"><MapPin size={14} />{user.country}</div>}
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              Registered {new Date(user.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </div>
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <h2 className="font-semibold text-gray-700">Listings</h2>
          <span className="text-sm text-gray-400">{listings?.length ?? 0} total</span>
        </div>
        {!listings?.length ? (
          <div className="py-12 text-center text-gray-400 text-sm">No listings yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Title</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Category</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Price</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Views</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {listings.map((listing: any) => (
                <tr key={listing.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    <Link href={`/listings/${listing.id}`} target="_blank" className="font-medium text-[#1E88E5] hover:underline">
                      {listing.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    <div className="flex items-center gap-1.5"><Tag size={12} />{listing.category}</div>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700">{formatPrice(listing.price, listing.currency)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[listing.status] || "bg-gray-100"}`}>
                      {listing.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{listing.views ?? 0}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(listing.created_at).toLocaleDateString("en-GB")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
