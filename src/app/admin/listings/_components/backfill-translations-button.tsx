"use client"

import { useState, useTransition } from "react"
import { backfillMissingTranslations } from "../../actions"

export function BackfillTranslationsButton() {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<string | null>(null)

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() =>
          startTransition(async () => {
            const res = await backfillMissingTranslations()
            setResult(`Translated ${res.translated}/${res.total} listings`)
          })
        }
        disabled={isPending}
        className="px-3 py-1.5 text-xs font-medium bg-[#1E88E5] text-white rounded-md hover:bg-[#1668b0] disabled:opacity-50 transition-colors"
      >
        {isPending ? "Translating…" : "Translate all listings"}
      </button>
      {result && <span className="text-xs text-gray-500">{result}</span>}
    </div>
  )
}
