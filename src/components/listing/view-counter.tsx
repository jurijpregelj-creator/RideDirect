"use client"

import { useEffect, useState } from "react"
import { Eye } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface ViewCounterProps {
  listingId: string
  initialViews: number
}

export function ViewCounter({ listingId, initialViews }: ViewCounterProps) {
  const [views, setViews] = useState(initialViews)

  useEffect(() => {
    const supabase = createClient()
    supabase.rpc("increment_listing_view", { listing_id: listingId }).then(() => {
      setViews((v) => v + 1)
    })
  }, [listingId])

  return (
    <div className="flex items-center gap-1.5 text-sm text-gray-400">
      <Eye size={14} />
      <span>{views.toLocaleString()} {views === 1 ? "view" : "views"}</span>
    </div>
  )
}
