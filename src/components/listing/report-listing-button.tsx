"use client"

import { useState } from "react"
import { Flag, X, Loader2 } from "lucide-react"
import { reportListing } from "@/app/listings/[id]/actions"

const REASONS = [
  { value: "fraudulent", label: "Fraudulent or scam listing" },
  { value: "wrong_category", label: "Wrong category" },
  { value: "duplicate", label: "Duplicate listing" },
  { value: "sold", label: "Item already sold" },
  { value: "other", label: "Other" },
]

export function ReportListingButton({ listingId, listingTitle }: { listingId: string; listingTitle: string }) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState("")
  const [details, setDetails] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!reason) return
    setLoading(true)
    await reportListing({ listingId, listingTitle, reason, details })
    setLoading(false)
    setDone(true)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors mt-2"
      >
        <Flag size={12} />
        Report listing
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[#0D2A5E] text-lg">Report Listing</h2>
              <button onClick={() => { setOpen(false); setDone(false); setReason(""); setDetails("") }} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            {done ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <Flag size={20} className="text-green-600" />
                </div>
                <p className="font-medium text-gray-700 mb-1">Report submitted</p>
                <p className="text-sm text-gray-400">Thank you. We'll review this listing shortly.</p>
                <button
                  onClick={() => { setOpen(false); setDone(false); setReason(""); setDetails("") }}
                  className="mt-4 px-4 py-2 rounded-xl bg-[#1E88E5] text-white text-sm hover:bg-[#1E88E5]/90 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-sm text-gray-500">
                  Reporting: <span className="font-medium text-gray-700">{listingTitle}</span>
                </p>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Reason *</label>
                  {REASONS.map((r) => (
                    <label key={r.value} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-[#1E88E5]/30 hover:bg-blue-50/30 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="reason"
                        value={r.value}
                        checked={reason === r.value}
                        onChange={() => setReason(r.value)}
                        className="accent-[#1E88E5]"
                      />
                      <span className="text-sm text-gray-600">{r.label}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Additional details <span className="text-gray-400 font-normal">(optional)</span></label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows={3}
                    placeholder="Describe the issue..."
                    className="mt-1.5 w-full text-sm border border-gray-200 rounded-xl px-3 py-2 resize-none outline-none focus:border-[#1E88E5] transition-colors text-gray-700 placeholder-gray-300"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!reason || loading}
                  className="w-full py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  {loading ? <><Loader2 size={14} className="animate-spin" /> Sending...</> : "Submit Report"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
