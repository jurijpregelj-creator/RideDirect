"use client"

import { useState, useTransition } from "react"
import { Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deleteListing } from "@/app/dashboard/listings/actions"
import { useRouter } from "next/navigation"

export function DeleteListingButton({ listingId }: { listingId: string }) {
  const [confirming, setConfirming] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleClick() {
    if (!confirming) {
      setConfirming(true)
      // Auto-reset after 3s if no second click
      setTimeout(() => setConfirming(false), 3000)
      return
    }
    startTransition(async () => {
      await deleteListing(listingId)
      router.refresh()
    })
  }

  if (confirming) {
    return (
      <Button
        variant="destructive"
        size="sm"
        className="h-7 px-2 text-xs"
        onClick={handleClick}
        disabled={isPending}
      >
        {isPending ? <Loader2 size={12} className="animate-spin" /> : "Sure?"}
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="h-7 px-2 text-gray-400 hover:text-red-500 hover:border-red-200"
      onClick={handleClick}
    >
      <Trash2 size={12} />
    </Button>
  )
}
