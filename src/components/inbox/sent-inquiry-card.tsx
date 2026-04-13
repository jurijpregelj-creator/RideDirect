"use client"

import { useState } from "react"
import Link from "next/link"
import { Send, ExternalLink, Loader2, CheckCircle2 } from "lucide-react"
import { sendFollowUp } from "@/app/dashboard/sent/actions"

export function SentInquiryCard({ inquiry }: { inquiry: any }) {
  const listing = inquiry.listings
  const [showReply, setShowReply] = useState(false)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    await sendFollowUp(formData)
    setLoading(false)
    setSent(true)
    setShowReply(false)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <Send size={15} className="text-gray-400" />
          </div>
          <div>
            {listing ? (
              <Link href={`/listings/${listing.id}`} className="font-semibold text-[#0D2A5E] hover:text-[#1E88E5] transition-colors flex items-center gap-1">
                {listing.title}
                <ExternalLink size={12} className="text-gray-400" />
              </Link>
            ) : (
              <div className="font-semibold text-gray-400">Listing removed</div>
            )}
            <div className="text-xs text-gray-400 mt-0.5">
              {new Date(inquiry.created_at).toLocaleDateString("en-GB", {
                day: "numeric", month: "short", year: "numeric"
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg px-4 py-3 text-sm text-gray-700 whitespace-pre-line mb-4">
        {inquiry.message}
      </div>

      <div className="flex justify-end">
        {sent ? (
          <span className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
            <CheckCircle2 size={13} /> Follow-up sent
          </span>
        ) : (
          <button
            onClick={() => setShowReply(!showReply)}
            className="inline-flex items-center gap-1.5 text-xs font-medium bg-[#1E88E5] text-white px-3 py-1.5 rounded-lg hover:bg-[#1E88E5]/90 transition-colors"
          >
            <Send size={12} />
            Follow up
          </button>
        )}
      </div>

      {showReply && (
        <form onSubmit={handleSubmit} className="mt-4 border-t border-gray-100 pt-4 space-y-3">
          <input type="hidden" name="inquiry_id" value={inquiry.id} />
          <textarea
            name="message"
            required
            rows={3}
            placeholder="Send a follow-up message to the seller..."
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1E88E5]/20 focus:border-[#1E88E5] resize-none"
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
              className="inline-flex items-center gap-1.5 text-xs font-medium bg-[#1E88E5] text-white px-3 py-1.5 rounded-lg hover:bg-[#1E88E5]/90 transition-colors disabled:opacity-60"
            >
              {loading ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
