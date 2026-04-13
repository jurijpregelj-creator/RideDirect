"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent")
    if (!consent) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem("cookie_consent", "accepted")
    setVisible(false)
  }

  function decline() {
    localStorage.setItem("cookie_consent", "declined")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-[#0D2A5E] text-white rounded-2xl shadow-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 text-sm text-blue-100 leading-relaxed">
            We use cookies to keep you signed in and improve the platform. No advertising or cross-site tracking.{" "}
            <Link href="/legal/privacy#cookies" className="underline text-blue-300 hover:text-white transition-colors">
              Learn more
            </Link>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={decline}
              className="px-4 py-2 rounded-xl text-sm text-blue-300 hover:text-white border border-blue-400/30 hover:border-blue-300 transition-colors"
            >
              Decline
            </button>
            <button
              onClick={accept}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-[#1E88E5] hover:bg-[#1E88E5]/90 text-white transition-colors"
            >
              Accept
            </button>
            <button onClick={decline} className="text-blue-400 hover:text-white transition-colors ml-1">
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
