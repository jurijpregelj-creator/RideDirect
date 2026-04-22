"use client"

import { useState } from "react"
import { Trash2, Loader2 } from "lucide-react"
import { deleteLead } from "./actions"

export function DeleteLeadButton({ leadId }: { leadId: string }) {
  const [confirm, setConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    if (!confirm) {
      setConfirm(true)
      setTimeout(() => setConfirm(false), 3000)
      return
    }
    setLoading(true)
    await deleteLead(leadId)
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`shrink-0 flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors ${
        confirm
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500"
      }`}
    >
      {loading ? (
        <Loader2 size={12} className="animate-spin" />
      ) : (
        <Trash2 size={12} />
      )}
      {confirm ? "Sure?" : "Delete"}
    </button>
  )
}
