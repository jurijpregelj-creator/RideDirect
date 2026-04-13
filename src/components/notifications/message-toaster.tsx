"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
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
  const lastSeenRef = useRef<string>(new Date().toISOString())
  const userIdRef = useRef<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      userIdRef.current = user.id

      // Poll every 10 seconds for new messages
      const interval = setInterval(() => checkNew(supabase, user.id), 10000)
      return () => clearInterval(interval)
    })
  }, [])

  async function checkNew(supabase: any, userId: string) {
    const since = lastSeenRef.current
    lastSeenRef.current = new Date().toISOString()

    // Don't show toast if already on messages page
    if (pathname?.startsWith("/dashboard/messages")) return

    // Check new inquiries as seller
    const { data: newInquiries } = await supabase
      .from("inquiries")
      .select("id, buyer_name, message")
      .eq("seller_id", userId)
      .eq("is_read", false)
      .gt("created_at", since)

    for (const inq of newInquiries || []) {
      addToast({
        id: `inq-${inq.id}`,
        title: `New inquiry from ${inq.buyer_name}`,
        body: inq.message,
        href: `/dashboard/messages/${inq.id}`,
      })
    }

    // Check new replies
    const { data: newReplies } = await supabase
      .from("replies")
      .select("id, message, sender_id, inquiry_id, profiles(full_name), inquiries!inner(seller_id, buyer_id)")
      .neq("sender_id", userId)
      .gt("created_at", since)
      .or(`seller_id.eq.${userId},buyer_id.eq.${userId}`, { foreignTable: "inquiries" })

    for (const reply of newReplies || []) {
      const senderName = reply.profiles?.full_name || "Someone"
      addToast({
        id: `reply-${reply.id}`,
        title: `New message from ${senderName}`,
        body: reply.message,
        href: `/dashboard/messages/${reply.inquiry_id}`,
      })
    }
  }

  function addToast(toast: Toast) {
    setToasts((prev) => {
      if (prev.find(t => t.id === toast.id)) return prev
      return [...prev, toast]
    })
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
          className="bg-white border border-gray-100 rounded-xl shadow-lg p-4 flex items-start gap-3 pointer-events-auto"
        >
          <div className="w-9 h-9 rounded-full bg-[#1E88E5] text-white flex items-center justify-center shrink-0">
            <MessageSquare size={16} />
          </div>
          <button
            className="flex-1 text-left min-w-0"
            onClick={() => { removeToast(toast.id); router.push(toast.href) }}
          >
            <div className="font-semibold text-sm text-[#0D2A5E]">{toast.title}</div>
            <div className="text-xs text-gray-500 truncate mt-0.5">{toast.body}</div>
          </button>
          <button onClick={() => removeToast(toast.id)} className="text-gray-300 hover:text-gray-500 transition-colors shrink-0">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
