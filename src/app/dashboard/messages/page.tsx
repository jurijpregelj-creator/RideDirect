import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MessageSquare, ChevronRight } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Messages — RideDirect" }

export default async function MessagesPage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login?next=/dashboard/messages")

  // Get all inquiries where user is buyer or seller
  const [{ data: asseller }, { data: asbuyer }] = await Promise.all([
    supabase
      .from("inquiries")
      .select("*, listings(title, id)")
      .eq("seller_id", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("inquiries")
      .select("*, listings(title, id)")
      .eq("buyer_id", user.id)
      .order("created_at", { ascending: false }),
  ])

  // Merge and sort by date
  const all = [...(asbuyer || []), ...(aseller || [])]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  const unreadCount = all.filter(i => !i.is_read && i.seller_id === user.id).length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10 max-w-3xl">

        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#0F1B3D]">Messages</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-400">{unreadCount} unread</p>
            )}
          </div>
        </div>

        {!all.length ? (
          <div className="bg-white rounded-2xl border border-gray-100 py-20 text-center">
            <MessageSquare size={40} className="text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400">No messages yet.</p>
            <Link href="/marketplace" className="inline-block mt-4 text-sm text-[#1B4FD8] hover:underline">
              Browse listings
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
            {all.map((inquiry) => {
              const isSeller = inquiry.seller_id === user.id
              const isUnread = !inquiry.is_read && isSeller
              const listing = inquiry.listings
              const otherName = isSeller ? inquiry.buyer_name : "Seller"

              return (
                <Link
                  key={inquiry.id}
                  href={`/dashboard/messages/${inquiry.id}`}
                  className={`flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors ${isUnread ? "bg-blue-50/40" : ""}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-semibold text-sm ${isUnread ? "bg-[#1B4FD8] text-white" : "bg-gray-100 text-gray-500"}`}>
                    {otherName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`font-semibold text-sm ${isUnread ? "text-[#0F1B3D]" : "text-gray-700"}`}>
                        {otherName}
                      </span>
                      <span className="text-xs text-gray-400 shrink-0">
                        {new Date(inquiry.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 truncate mt-0.5">
                      {listing?.title || "—"}
                    </div>
                    <div className="text-xs text-gray-500 truncate mt-0.5">
                      {inquiry.message}
                    </div>
                  </div>
                  {isUnread && (
                    <div className="w-2 h-2 rounded-full bg-[#1B4FD8] shrink-0" />
                  )}
                  <ChevronRight size={16} className="text-gray-300 shrink-0" />
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
