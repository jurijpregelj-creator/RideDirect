"use client"

import { useState, useTransition } from "react"
import { Check, Undo2 } from "lucide-react"
import { markConverted, unmarkConverted } from "./actions"

export function ConvertButton({ contactId, converted }: { contactId: string; converted: boolean }) {
  const [isPending, startTransition] = useTransition()
  const [optimistic, setOptimistic] = useState(converted)

  function handleClick() {
    setOptimistic(!optimistic)
    startTransition(async () => {
      if (optimistic) {
        await unmarkConverted(contactId)
      } else {
        await markConverted(contactId)
      }
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`shrink-0 flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors ${
        optimistic
          ? "bg-green-500 text-white hover:bg-green-600"
          : "bg-gray-100 text-gray-500 hover:bg-green-50 hover:text-green-600"
      }`}
    >
      {optimistic ? <Undo2 size={12} /> : <Check size={12} />}
      {optimistic ? "Converted" : "Mark converted"}
    </button>
  )
}
