"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, MailOpen, Phone, Send, Loader2, CheckCircle2 } from "lucide-react"
import { markInquiryRead, replyToInquiry } from "@/app/dashboard/inbox/actions"

export function InquiryCard({ inquiry }: { inquiry: any }) {
  const listing = inquiry.listings
  const isUnread = !inquiry.is_read
  const [showReply, setShowReply] = useState(false)
  const [replySent, setReplySent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleReply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    await replyToInquiry(formData)
    setLoading(false)
    setReplySent(true)
    setShowReply(false)
  }

  return (
    <div className={`bg-white rounded-xl border transition-all ${isUnread ? "border-[#1B4FD8]/30 shadow-sm" : "border-gray-100"}`}>
      <div className="p-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${isUnread ? "bg-[#1B4FD8] text-white" : "bg-gray-100 text-gray-400"}`}>
              {isUnread ? <Mail size={16} /> : <MailOpen size={16} />}
            </div>
            <div>
              <div className="font-semibold text-[#0F1B3D]">{inquiry.buyer_name}</div>
              <div className="text-sm text-[#1B4FD8]">{inquiry.buyer_email}</div>
            </div>
          </div>
          <div className="text-xs text-gray-400 shrink-0 mt-1">
            {new Date(inquiry.created_at).toLocaleDateString("en-GB", {
              day: "numeric", month: "short", year: "numeric"
            })}
          </div>
        </div>

        {/* Listing */}
        {listing && (
          <div className="mb-3">
            <Link href={`/listings/${listing.id}`} className="text-xs text-gray-400 hover:text-[#1B4FD8] transition-colors">
              📋 {listing.title}
            </Link>
          </div>
        )}

        {/* Message */}
        <div className="bg-gray-50 rounded-lg px-4 py-3 text-sm text-gray-700 whitespace-pre-line">
          {inquiry.message}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          <div>
            {inquiry.buyer_phone && (
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <Phone size={12} />
                {inquiry.buyer_phone}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isUnread && !replySent && (
              <form action={markInquiryRead.bind(null, inquiry.id)}>
                <button type="submit" className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors">
                  Mark as read
                </button>
              </form>
            )}
            {replySent ? (
              <span className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                <CheckCircle2 size={13} /> Replied
              </span>
            ) : (
              <button
                onClick={() => setShowReply(!showReply)}
                className="inline-flex items-center gap-1.5 text-xs font-medium bg-[#1B4FD8] text-white px-3 py-1.5 rounded-lg hover:bg-[#1B4FD8]/90 transition-colors"
              >
                <Mail size={12} />
                Reply
              </button>
            )}
          </div>
        </div>

        {/* Inline reply form */}
        {showReply && (
          <form onSubmit={handleReply} className="mt-4 border-t border-gray-100 pt-4 space-y-3">
            <input type="hidden" name="inquiry_id" value={inquiry.id} />
            <textarea
              name="message"
              required
              rows={3}
              placeholder={`Reply to ${inquiry.buyer_name}...`}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B4FD8]/20 focus:border-[#1B4FD8] resize-none"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowReply(false)}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-1.5 text-xs font-medium bg-[#1B4FD8] text-white px-3 py-1.5 rounded-lg hover:bg-[#1B4FD8]/90 transition-colors disabled:opacity-60"
              >
                {loading ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
                {loading ? "Sending..." : "Send reply"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
