"use client"

import { useState, useRef } from "react"
import { Send, Loader2, Paperclip, X, FileText, Image } from "lucide-react"
import { sendReply } from "@/app/dashboard/messages/actions"
import { createClient } from "@/lib/supabase/client"

export function ReplyBox({ inquiryId }: { inquiryId: string }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!message.trim() && !file) return
    setLoading(true)

    let attachmentUrl: string | null = null
    let attachmentType: string | null = null

    // Upload file if present
    if (file) {
      const supabase = createClient()
      const ext = file.name.split(".").pop()
      const path = `${inquiryId}/${Date.now()}.${ext}`
      const { data, error } = await supabase.storage
        .from("message-attachments")
        .upload(path, file, { upsert: false })

      if (!error && data) {
        const { data: urlData } = supabase.storage
          .from("message-attachments")
          .getPublicUrl(data.path)
        attachmentUrl = urlData.publicUrl
        attachmentType = file.type.startsWith("image/") ? "image" : "pdf"
      }
    }

    const formData = new FormData()
    formData.set("inquiry_id", inquiryId)
    formData.set("message", message.trim() || " ")
    if (attachmentUrl) formData.set("attachment_url", attachmentUrl)
    if (attachmentType) formData.set("attachment_type", attachmentType)

    await sendReply(formData)
    setMessage("")
    setFile(null)
    setLoading(false)
    textareaRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm flex flex-col gap-2">
      {/* File preview */}
      {file && (
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 text-sm text-gray-600">
          {file.type.startsWith("image/") ? <Image size={14} className="text-[#1E88E5]" /> : <FileText size={14} className="text-red-500" />}
          <span className="flex-1 truncate text-xs">{file.name}</span>
          <button type="button" onClick={() => setFile(null)} className="text-gray-400 hover:text-gray-600">
            <X size={14} />
          </button>
        </div>
      )}

      <div className="flex items-end gap-2">
        {/* Attach button */}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="text-gray-400 hover:text-[#1E88E5] transition-colors shrink-0 mb-1"
          title="Attach image or PDF"
        >
          <Paperclip size={18} />
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <textarea
          ref={textareaRef}
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a message..."
          rows={2}
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
          disabled={loading || (!message.trim() && !file)}
          className="w-9 h-9 rounded-xl bg-[#1E88E5] text-white flex items-center justify-center hover:bg-[#1E88E5]/90 transition-colors disabled:opacity-40 shrink-0"
        >
          {loading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
        </button>
      </div>
    </form>
  )
}
