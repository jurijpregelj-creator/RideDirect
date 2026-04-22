"use client"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { FunnelForm } from "./funnel-form"
import { FunnelRegister } from "./funnel-register"
import { FUNNEL_T, type FunnelLang } from "./funnel-translations"

interface ListingFunnelProps {
  lang: FunnelLang
}

type Step = "form" | "register"

export function ListingFunnel({ lang }: ListingFunnelProps) {
  const t = FUNNEL_T[lang]
  const [step, setStep] = useState<Step>("form")
  const [leadSaved, setLeadSaved] = useState(false)

  function handleFormSuccess() {
    setLeadSaved(true)
    setStep("register")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        <div className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${step === "form" ? "text-[#1E88E5]" : "text-green-600"}`}>
          {step === "register" ? (
            <CheckCircle2 size={14} className="text-green-500" />
          ) : (
            <span className="w-5 h-5 rounded-full bg-[#1E88E5] text-white flex items-center justify-center text-[10px] font-bold">1</span>
          )}
          {t.step1}
        </div>
        <div className="flex-1 h-px bg-gray-200" />
        <div className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${step === "register" ? "text-[#1E88E5]" : "text-gray-300"}`}>
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step === "register" ? "bg-[#1E88E5] text-white" : "bg-gray-200 text-gray-400"}`}>2</span>
          {t.step2}
        </div>
      </div>

      {/* Step content */}
      {step === "form" && (
        <FunnelForm t={t} lang={lang} onSuccess={handleFormSuccess} />
      )}

      {step === "register" && leadSaved && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <FunnelRegister
            t={t}
            onBack={() => setStep("form")}
          />
        </div>
      )}
    </div>
  )
}
