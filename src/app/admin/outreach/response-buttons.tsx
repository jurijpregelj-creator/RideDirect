"use client"

import { useState, useTransition } from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { setOutreachResponse } from "./actions"

export function ResponseButtons({
  contactId,
  response,
}: {
  contactId: string
  response: "positive" | "negative" | null
}) {
  const [isPending, startTransition] = useTransition()
  const [optimistic, setOptimistic] = useState(response)

  function toggle(value: "positive" | "negative") {
    const next = optimistic === value ? null : value
    setOptimistic(next)
    startTransition(async () => {
      await setOutreachResponse(contactId, next)
    })
  }

  return (
    <div className="shrink-0 flex items-center gap-1">
      <button
        onClick={() => toggle("positive")}
        disabled={isPending}
        title="Mark positive reply"
        className={`p-1.5 rounded-lg transition-colors ${
          optimistic === "positive"
            ? "bg-green-500 text-white"
            : "bg-gray-100 text-gray-400 hover:bg-green-50 hover:text-green-600"
        }`}
      >
        <ThumbsUp size={12} />
      </button>
      <button
        onClick={() => toggle("negative")}
        disabled={isPending}
        title="Mark negative reply — will not be re-contacted"
        className={`p-1.5 rounded-lg transition-colors ${
          optimistic === "negative"
            ? "bg-red-500 text-white"
            : "bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-600"
        }`}
      >
        <ThumbsDown size={12} />
      </button>
    </div>
  )
}
