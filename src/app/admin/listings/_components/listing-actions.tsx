"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { approveListing, rejectListing, deleteListing, extendListing, sendAdminMessage } from "../../actions"

interface ListingActionsProps {
  listingId: string
  sellerId: string
  status: string
}

export function ListingActions({ listingId, sellerId, status }: ListingActionsProps) {
  const [isPending, startTransition] = useTransition()
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  const run = (fn: () => Promise<void>) => startTransition(fn)

  function handleSendMessage() {
    if (!message.trim()) return
    startTransition(async () => {
      await sendAdminMessage(listingId, sellerId, message)
      setMessage("")
      setShowMessage(false)
      setSent(true)
      setTimeout(() => setSent(false), 3000)
    })
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {status !== "approved" && (
          <button
            onClick={() => run(() => approveListing(listingId))}
            disabled={isPending}
            className="px-2.5 py-1 text-xs font-medium bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            Approve
          </button>
        )}
        {(status === "approved" || status === "expired") && (
          <button
            onClick={() => run(() => extendListing(listingId))}
            disabled={isPending}
            className="px-2.5 py-1 text-xs font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            Extend
          </button>
        )}
        {status !== "rejected" && (
          <button
            onClick={() => { if (confirm("Reject this listing?")) run(() => rejectListing(listingId)) }}
            disabled={isPending}
            className="px-2.5 py-1 text-xs font-medium bg-amber-500 text-white rounded-md hover:bg-amber-600 disabled:opacity-50 transition-colors"
          >
            Reject
          </button>
        )}
        <button
          onClick={() => { if (confirm("Permanently delete this listing?")) run(() => deleteListing(listingId)) }}
          disabled={isPending}
          className="px-2.5 py-1 text-xs font-medium bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
        >
          Delete
        </button>
        <Link
          href={`/admin/listings/${listingId}/edit`}
          className="px-2.5 py-1 text-xs font-medium bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          Edit
        </Link>
        <button
          onClick={() => setShowMessage(!showMessage)}
          className="px-2.5 py-1 text-xs font-medium bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          {showMessage ? "Cancel" : "Message"}
        </button>
        {sent && <span className="text-xs text-green-600 self-center">✓ Sent</span>}
      </div>

      {showMessage && (
        <div className="flex gap-2 mt-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message to the seller..."
            rows={2}
            className="flex-1 text-xs border border-gray-200 rounded-md px-2 py-1.5 resize-none focus:outline-none focus:ring-1 focus:ring-indigo-400"
          />
          <button
            onClick={handleSendMessage}
            disabled={isPending || !message.trim()}
            className="px-3 py-1 text-xs font-medium bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 self-end transition-colors"
          >
            Send
          </button>
        </div>
      )}
    </div>
  )
}
