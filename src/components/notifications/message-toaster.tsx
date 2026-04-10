"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MessageSquare, X } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Toast {
  id: string
  title: string
  body: string
  href: string
}

export function MessageToaster() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return

      // Listen for new inquiries (seller)
      supabase
        .channel("new-inquiries")
        .on("postgres_changes", {
          event: "INSERT",
          schema: "public",
          table: "inquiries",
          filter: `seller_id=eq.${user.id}`,
        }, (payload: any) => {
          addToast({
            id: payload.new.id,
            title: "New inquiry",
            body: payload.new.buyer_name + ": " + payload.new.message,
            href: `/dashboard/messages/${payload.new.id}`,
          })
        })
        // Listen for new replies (both sides)
        .on("postgres_changes", {
          event: "INSERT",
          schema: "public",
          table: "replies",
        }, async (payload: any) => {
          // Only show if sender is NOT the current user
          if (payload.new.sender_id === user.id) return

          // Check if user is participant
          const { data: inquiry } = await supabase
            .from("inquiries")
            .select("id, buyer_name, seller_id, buyer_id, listings(title)")
            .eq("id", payload.new.inquiry_id)
            .single()

          if (!inquiry) return
          if (inquiry.seller_id !== user.id && inquiry.buyer_id !== user.id) return

          const senderIsseller = payload.new.sender_id === inquiry.seller_id
          const senderLabel = senderIsseller ? "Seller" : inquiry.buyer_name

          addToast({
            id: payload.new.id,
            title: `New message from ${senderLabel}`,
            body: payload.new.message,
            href: `/dashboard/messages/${inquiry.id}`,
          })
        })
        .subscribe()
    })
  }, [])

  function addToast(toast: Toast) {
    setToasts((prev) => [...prev, toast])
    setTimeout(() => removeToast(toast.id), 6000)
  }

  function removeToast(id: string) {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  if (!toasts.length) return null

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-white border border-gray-100 rounded-xl shadow-lg p-4 flex items-start gap-3 pointer-events-auto animate-in slide-in-from-bottom-2 duration-300"
        >
          <div className="w-9 h-9 rounded-full bg-[#1B4FD8] text-white flex items-center justify-center shrink-0">
            <MessageSquare size={16} />
          </div>
          <button
            className="flex-1 text-left min-w-0"
            onClick={() => { removeToast(toast.id); router.push(toast.href) }}
          >
            <div className="font-semibold text-sm text-[#0F1B3D]">{toast.title}</div>
            <div className="text-xs text-gray-500 truncate mt-0.5">{toast.body}</div>
          </button>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-gray-300 hover:text-gray-500 transition-colors shrink-0"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
