"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { claimLead } from "@/app/funnel/actions"
import { FunnelForm } from "./funnel-form"
import { FunnelRegister } from "./funnel-register"
import { FUNNEL_T, type FunnelLang } from "./funnel-translations"

interface ListingFunnelProps {
  lang: FunnelLang
}

type Step = "form" | "register" | "claiming" | "done"

export function ListingFunnel({ lang }: ListingFunnelProps) {
  const t = FUNNEL_T[lang]
  const [step, setStep] = useState<Step>("form")
  const [claimError, setClaimError] = useState<string | null>(null)

  // If the user is already logged in when they reach step 2,
  // skip registration and claim the lead immediately.
  async function handleFormSuccess() {
    setStep("register")
    window.scrollTo({ top: 0, behavior: "smooth" })

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        // Already logged in → claim right now, no registration needed
        const token = typeof window !== "undefined"
          ? localStorage.getItem("funnel_claim_token")
          : null

        if (token) {
          setStep("claiming")
          const result = await claimLead(token)
          if ("listingId" in result) {
            localStorage.removeItem("funnel_claim_token")
            localStorage.removeItem("funnel_lead_id")
            setStep("done")
          } else {
            setClaimError(result.error)
            setStep("register")
          }
        }
      }
    } catch {
      // Not logged in — show registration step as normal
      setStep("register")
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        <div className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${step === "form" ? "text-[#1E88E5]" : "text-green-600"}`}>
          {step !== "form" ? (
            <CheckCircle2 size={14} className="text-green-500" />
          ) : (
            <span className="w-5 h-5 rounded-full bg-[#1E88E5] text-white flex items-center justify-center text-[10px] font-bold">1</span>
          )}
          {t.step1}
        </div>
        <div className="flex-1 h-px bg-gray-200" />
        <div className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${step !== "form" ? "text-[#1E88E5]" : "text-gray-300"}`}>
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step !== "form" ? "bg-[#1E88E5] text-white" : "bg-gray-200 text-gray-400"}`}>2</span>
          {t.step2}
        </div>
      </div>

      {/* Step content */}
      {step === "form" && (
        <FunnelForm t={t} lang={lang} onSuccess={handleFormSuccess} />
      )}

      {step === "claiming" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
          <Loader2 size={32} className="animate-spin text-[#1E88E5] mx-auto mb-4" />
          <p className="font-semibold text-[#0D2A5E]">Publishing your listing…</p>
          <p className="text-sm text-gray-400 mt-1">Just a moment</p>
        </div>
      )}

      {step === "done" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-[#0D2A5E] mb-2">Listing submitted!</h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
            Your listing is pending review. We'll notify you when it goes live — usually within 24 hours.
          </p>
          <a
            href="/dashboard"
            className="inline-block mt-6 bg-[#1E88E5] text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-[#1565C0] transition-colors"
          >
            Go to Dashboard →
          </a>
        </div>
      )}

      {(step === "register") && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          {claimError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
              {claimError}
            </div>
          )}
          <FunnelRegister
            t={t}
            onBack={() => setStep("form")}
          />
        </div>
      )}
    </div>
  )
}
