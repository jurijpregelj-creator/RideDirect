"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, Loader2 } from "lucide-react"
import { claimLead } from "@/app/funnel/actions"

/**
 * Mounts on the dashboard when ?submitted=1 is in the URL.
 * Reads funnel_claim_token from localStorage, calls claimLead(),
 * then shows a success banner. Cleans up localStorage after claim.
 */
export function ClaimLeadOnLoad() {
  const [state, setState] = useState<"loading" | "success" | "error" | "done">("loading")

  useEffect(() => {
    async function run() {
      try {
        const token = localStorage.getItem("funnel_claim_token")
        if (!token) {
          setState("done")
          return
        }

        const result = await claimLead(token)

        if ("error" in result) {
          console.error("Claim lead failed:", result.error)
          setState("error")
        } else {
          localStorage.removeItem("funnel_claim_token")
          localStorage.removeItem("funnel_lead_id")
          setState("success")
        }
      } catch (err) {
        setState("error")
      }

      // Auto-dismiss after 6 s
      setTimeout(() => setState("done"), 6000)
    }

    run()
  }, [])

  if (state === "done") return null

  if (state === "loading") {
    return (
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-2xl px-5 py-4 flex items-center gap-3">
        <Loader2 size={18} className="text-[#1E88E5] animate-spin shrink-0" />
        <p className="text-sm text-[#0D2A5E] font-medium">Publishing your listing…</p>
      </div>
    )
  }

  if (state === "success") {
    return (
      <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl px-5 py-4 flex items-center gap-3">
        <CheckCircle2 size={20} className="text-green-600 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-green-800">Your listing is submitted for review!</p>
          <p className="text-xs text-green-600 mt-0.5">We'll notify you as soon as it goes live. Usually within 24 hours.</p>
        </div>
      </div>
    )
  }

  if (state === "error") {
    return (
      <div className="mb-6 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4">
        <p className="text-sm font-semibold text-amber-800">Couldn't publish automatically</p>
        <p className="text-xs text-amber-600 mt-0.5">Your listing data is saved. Please contact support and we'll publish it for you.</p>
      </div>
    )
  }

  return null
}
