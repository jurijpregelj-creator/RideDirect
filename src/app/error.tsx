"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { AlertTriangle } from "lucide-react"
import { BUG_REPORT_T } from "@/lib/bug-report-translations"
import { SUPPORTED_LISTING_LOCALES, type ListingLocale } from "@/lib/locales"
import { openBugReport, recordClientError } from "@/lib/client-error-log"

// Rendered inside the root layout when a page crashes, so the header, footer
// and bug report widget are still there.
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const pathname = usePathname()
  const seg = pathname?.split("/")[1] as ListingLocale | undefined
  const locale: ListingLocale = seg && (SUPPORTED_LISTING_LOCALES as readonly string[]).includes(seg) ? seg : "en"
  const t = BUG_REPORT_T[locale]

  useEffect(() => {
    recordClientError(error.message + (error.digest ? ` (digest ${error.digest})` : ""), "error boundary")
  }, [error])

  return (
    <div className="container mx-auto max-w-lg px-4 py-24 text-center">
      <AlertTriangle className="mx-auto mb-4 text-amber-500" size={40} />
      <h1 className="text-2xl font-bold text-[#0D2A5E] mb-3">{t.errorHeading}</h1>
      <p className="text-gray-600 mb-8">{t.errorBody}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-lg bg-[#1E88E5] hover:bg-[#1E88E5]/90 text-white text-sm font-medium transition-colors"
        >
          {t.tryAgain}
        </button>
        <button
          onClick={() => openBugReport(`[${t.errorHeading}] ${error.message}${error.digest ? ` (digest ${error.digest})` : ""}\n\n`)}
          className="px-5 py-2.5 rounded-lg border border-gray-200 hover:border-[#1E88E5] text-[#0D2A5E] text-sm font-medium transition-colors"
        >
          {t.reportProblem}
        </button>
      </div>
    </div>
  )
}
