"use client"

import { useState, useTransition } from "react"
import { Check, Undo2 } from "lucide-react"
import { markGroupWorkedToday, clearGroupWorked } from "./actions"

export function GroupStatusButton({ groupId, workedToday }: { groupId: string; workedToday: boolean }) {
  const [isPending, startTransition] = useTransition()
  const [optimistic, setOptimistic] = useState(workedToday)

  function handleClick() {
    setOptimistic(!optimistic)
    startTransition(async () => {
      if (optimistic) {
        await clearGroupWorked(groupId)
      } else {
        await markGroupWorkedToday(groupId)
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
      {optimistic ? "Worked today" : "Mark worked today"}
    </button>
  )
}
