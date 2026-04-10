import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { ReplyBox } from "@/components/inbox/reply-box"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Conversation — RideDirect" }

export default async function ConversationPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: inquiry } = await supabase
    .from("inquiries")
    .select("*, listings(title, id)")
    .eq("id", params.id)
    .single()

  if (!inquiry) notFound()

  // Only participants can view
  if (inquiry.seller_id !== user.id && inquiry.buyer_id !== user.id) notFound()

  // Get all replies
  const { data: replies } = await supabase
    .from("replies")
    .select("*, profiles(full_name)")
    .eq("inquiry_id", params.id)
    .order("created_at", { ascending: true })

  // Get other participant name
  const isSeller = inquiry.seller_id === user.id
  const otherName = isSeller ? inquiry.buyer_name : inquiry.listings?.title

  // Mark as read
  if (isSeller && !inquiry.is_read) {
    await supabase.from("inquiries").update({ is_read: true }).eq("id", params.id)
  }

  // Build thread: first message + replies
  const thread = [
    {
      id: "initial",
      sender_id: inquiry.buyer_id,
      sender_name: inquiry.buyer_name,
      message: inquiry.message,
      created_at: inquiry.created_at,
      isMe: inquiry.buyer_id === user.id,
    },
    ...(replies || []).map((r) => ({
      id: r.id,
      sender_id: r.sender_id,
      sender_name: r.profiles?.full_name || "—",
      message: r.message,
      created_at: r.created_at,
      isMe: r.sender_id === user.id,
    })),
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto px-4 py-8 max-w-2xl flex flex-col flex-1">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard/messages" className="text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-[#0F1B3D] truncate">{otherName}</div>
            {inquiry.listings && (
              <Link
                href={`/listings/${inquiry.listings.id}`}
                className="text-xs text-gray-400 hover:text-[#1B4FD8] flex items-center gap-1 transition-colors"
              >
                {inquiry.listings.title}
                <ExternalLink size={11} />
              </Link>
            )}
          </div>
        </div>

        {/* Thread */}
        <div className="flex-1 space-y-4 mb-6">
          {thread.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] ${msg.isMe ? "items-end" : "items-start"} flex flex-col gap-1`}>
                {!msg.isMe && (
                  <span className="text-xs text-gray-400 px-1">{msg.sender_name}</span>
                )}
                <div className={`px-4 py-3 rounded-2xl text-sm whitespace-pre-line ${
                  msg.isMe
                    ? "bg-[#1B4FD8] text-white rounded-br-sm"
                    : "bg-white border border-gray-100 text-gray-700 rounded-bl-sm"
                }`}>
                  {msg.message}
                </div>
                <span className="text-[10px] text-gray-300 px-1">
                  {new Date(msg.created_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                  {" · "}
                  {new Date(msg.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Reply box */}
        <ReplyBox inquiryId={params.id} />
      </div>
    </div>
  )
}
