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

  const [{ data: asSeller }, { data: asBuyer }] = await Promise.all([
    supabase
      .from("inquiries")
      .select("*, listings(title, id), replies(message, created_at, sender_id)")
      .eq("seller_id", user.id),
    supabase
      .from("inquiries")
      .select("*, listings(title, id), replies(message, created_at, sender_id)")
      .eq("buyer_id", user.id),
  ])

  const seen = new Set<string>()
  const all = [...(asBuyer || []), ...(asSeller || [])]
    .filter((i) => { if (seen.has(i.id)) return false; seen.add(i.id); return true })
    .map((inquiry) => {
      const replies = (inquiry.replies || []).sort(
        (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      const lastReply = replies[0]
      const lastMessage = lastReply?.message || inquiry.message
      const lastDate = lastReply?.created_at || inquiry.created_at
      const lastSenderId = lastReply?.sender_id || inquiry.buyer_id
      const isSeller = inquiry.seller_id === user.id
      const isUnread = isSeller ? !inquiry.is_read : inquiry.unread_for_buyer
      return { ...inquiry, lastMessage, lastDate, lastSenderId, isSeller, isUnread }
    })
    .sort((a, b) => new Date(b.lastDate).getTime() - new Date(a.lastDate).getTime())

  const unreadCount = all.filter(i => i.isUnread).length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10 max-w-3xl">

        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#0D2A5E]">Messages</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-400">{unreadCount} unread</p>
            )}
          </div>
        </div>

        {!all.length ? (
          <div className="bg-white rounded-2xl border border-gray-100 py-20 text-center">
            <MessageSquare size={40} className="text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400">No messages yet.</p>
            <Link href="/marketplace" className="inline-block mt-4 text-sm text-[#1E88E5] hover:underline">
              Browse listings
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
            {all.map((inquiry) => {
              const listing = inquiry.listings
              const otherName = inquiry.isSeller ? inquiry.buyer_name : (listing?.title || "Seller")
              const isMe = inquiry.lastSenderId === user.id

              return (
                <Link
                  key={inquiry.id}
                  href={`/dashboard/messages/${inquiry.id}`}
                  className={`flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors ${inquiry.isUnread ? "bg-blue-50/50" : ""}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-semibold text-sm ${inquiry.isUnread ? "bg-[#1E88E5] text-white" : "bg-gray-100 text-gray-500"}`}>
                    {otherName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-sm ${inquiry.isUnread ? "font-bold text-[#0D2A5E]" : "font-medium text-gray-700"}`}>
                        {otherName}
                      </span>
                      <span className="text-xs text-gray-400 shrink-0">
                        {new Date(inquiry.lastDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 truncate mt-0.5">
                      {listing?.title || "—"}
                    </div>
                    <div className={`text-xs truncate mt-0.5 ${inquiry.isUnread ? "text-gray-800 font-medium" : "text-gray-400"}`}>
                      {isMe && <span className="text-gray-400 font-normal">You: </span>}
                      {inquiry.lastMessage}
                    </div>
                  </div>
                  {inquiry.isUnread && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1E88E5] shrink-0" />
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
