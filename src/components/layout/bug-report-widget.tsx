"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Bug, X } from "lucide-react"
import { sendBugReport } from "@/app/actions/bug-report"
import { BUG_REPORT_T } from "@/lib/bug-report-translations"
import type { ListingLocale } from "@/lib/locales"

interface BugReportWidgetProps {
  urlLocale?: ListingLocale
}

export function BugReportWidget({ urlLocale }: BugReportWidgetProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const t = BUG_REPORT_T[urlLocale ?? "en"]

  // Internal tools, not for the public/seller audience this is aimed at.
  if (pathname?.startsWith("/admin")) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim() || sending) return
    setSending(true)
    const pageUrl = typeof window !== "undefined" ? window.location.href : pathname || ""
    const result = await sendBugReport({ message, email: email || undefined, pageUrl })
    setSending(false)
    if (result.success) {
      setSent(true)
      setMessage("")
      setEmail("")
      setTimeout(() => {
        setSent(false)
        setOpen(false)
      }, 2000)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {open && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-[#0D2A5E] text-sm">{t.heading}</h3>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          </div>
          {sent ? (
            <p className="text-sm text-gray-600 py-2">{t.thanks}</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.placeholder}
                rows={4}
                required
                className="w-full text-sm rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-[#1E88E5]/30 resize-none"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="w-full text-sm rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E88E5]/30"
              />
              <button
                type="submit"
                disabled={sending}
                className="w-full bg-[#1E88E5] hover:bg-[#1E88E5]/90 text-white text-sm font-medium rounded-lg py-2.5 transition-colors disabled:opacity-60"
              >
                {sending ? t.sending : t.submit}
              </button>
            </form>
          )}
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        title={t.buttonLabel}
        aria-label={t.buttonLabel}
        className="w-12 h-12 rounded-full bg-[#0D2A5E] hover:bg-[#0D2A5E]/90 text-white shadow-xl flex items-center justify-center transition-colors"
      >
        <Bug size={20} />
      </button>
    </div>
  )
}
