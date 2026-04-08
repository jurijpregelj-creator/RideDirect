"use client"

import { useState } from "react"
import { TranslateButton } from "./translate-button"

interface ListingDescriptionProps {
  description: string
}

export function ListingDescription({ description }: ListingDescriptionProps) {
  const [displayText, setDisplayText] = useState<string>(description)

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-gray-700">Description</h2>
        <TranslateButton
          originalText={description}
          onTranslated={(text) => setDisplayText(text ?? description)}
        />
      </div>
      <p className="text-gray-600 leading-relaxed whitespace-pre-line">{displayText}</p>
    </div>
  )
}
