"use client"

import { useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export function MarkReadOnMount({ inquiryId, isSeller }: { inquiryId: string; isSeller: boolean }) {
  useEffect(() => {
    const supabase = createClient()
    if (isSeller) {
      supabase.from("inquiries").update({ is_read: true }).eq("id", inquiryId).then(() => {})
    } else {
      supabase.from("inquiries").update({ unread_for_buyer: false }).eq("id", inquiryId).then(() => {})
    }
  }, [inquiryId, isSeller])

  return null
}
