"use client"

import { useTransition } from "react"
import { approveListing, rejectListing, deleteListing, extendListing } from "../../actions"

interface ListingActionsProps {
  listingId: string
  status: string
}

export function ListingActions({ listingId, status }: ListingActionsProps) {
  const [isPending, startTransition] = useTransition()

  const run = (fn: () => Promise<void>) => startTransition(fn)

  return (
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
          onClick={() => {
            if (confirm("Reject this listing?")) run(() => rejectListing(listingId))
          }}
          disabled={isPending}
          className="px-2.5 py-1 text-xs font-medium bg-amber-500 text-white rounded-md hover:bg-amber-600 disabled:opacity-50 transition-colors"
        >
          Reject
        </button>
      )}
      <button
        onClick={() => {
          if (confirm("Permanently delete this listing? This cannot be undone."))
            run(() => deleteListing(listingId))
        }}
        disabled={isPending}
        className="px-2.5 py-1 text-xs font-medium bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
      >
        Delete
      </button>
    </div>
  )
}
