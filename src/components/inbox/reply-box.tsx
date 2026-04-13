"use client"

import { useState, useRef } from "react"
import { Send, Loader2 } from "lucide-react"
import { sendReply } from "@/app/dashboard/messages/actions"

export function ReplyBox({ inquiryId }: { inquiryId: string }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!message.trim()) return
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    await sendReply(formData)
    setMessage("")
    setLoading(false)
    textareaRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-3 flex items-end gap-3 shadow-sm">
      <input type="hidden" name="inquiry_id" value={inquiryId} />
      <textarea
        ref={textareaRef}
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write a message..."
        rows={2}
        required
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            e.currentTarget.form?.requestSubmit()
          }
        }}
        className="flex-1 text-sm border-0 outline-none resize-none text-gray-700 placeholder-gray-300"
      />
      <button
        type="submit"
        disabled={loading || !message.trim()}
        className="w-9 h-9 rounded-xl bg-[#1E88E5] text-white flex items-center justify-center hover:bg-[#1E88E5]/90 transition-colors disabled:opacity-40 shrink-0"
      >
        {loading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
      </button>
    </form>
  )
}
