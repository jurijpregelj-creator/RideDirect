"use client"

import { useState } from "react"
import { Loader2, CheckCircle2 } from "lucide-react"
import { saveOutreachLead } from "@/app/list-here/actions"

export function OutreachLeadForm() {
  const [itemDescription, setItemDescription] = useState("")
  const [listingUrl, setListingUrl] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!email.trim() && !phone.trim()) {
      setError("Please leave at least an email or a phone number so we can reach you.")
      return
    }

    setSending(true)
    const result = await saveOutreachLead({
      itemDescription,
      listingUrl,
      name: name || null,
      email: email || null,
      phone: phone || null,
    })
    setSending(false)

    if (result.success) {
      setSent(true)
    } else {
      setError("Something went wrong. Please try again, or just reply to the message we sent you.")
    }
  }

  if (sent) {
    return (
      <div className="text-center py-10">
        <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-[#0D2A5E] mb-2">Thanks — we've got it!</h3>
        <p className="text-gray-500">We'll reach out shortly to get your listing live on RideDirect.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          What are you selling? <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
          placeholder="e.g. Jumping / Bungee Trampoline"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E88E5]/30"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Link to your existing listing <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={listingUrl}
          onChange={(e) => setListingUrl(e.target.value)}
          placeholder="Paste the Facebook post or group listing link"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E88E5]/30"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Your name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Optional"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E88E5]/30"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+34 600 000 000"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E88E5]/30"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E88E5]/30"
          />
        </div>
      </div>
      <p className="text-xs text-gray-400">Leave at least a phone or email — whichever you check more often.</p>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={sending}
        className="w-full bg-[#1E88E5] hover:bg-[#1E88E5]/90 text-white font-medium rounded-xl py-3.5 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {sending ? <Loader2 size={18} className="animate-spin" /> : null}
        {sending ? "Sending..." : "Send — takes 30 seconds"}
      </button>

      <p className="text-xs text-gray-400 text-center">
        No account needed. We'll never share your contact info publicly.
      </p>
    </form>
  )
}
