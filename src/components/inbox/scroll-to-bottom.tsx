"use client"

import { useEffect, useRef } from "react"

export function ScrollToBottom() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const scrollParent = ref.current.closest(".overflow-y-auto")
    if (scrollParent) {
      scrollParent.scrollTop = scrollParent.scrollHeight
    } else {
      ref.current.scrollIntoView({ behavior: "instant" })
    }
  }, [])

  return <div ref={ref} />
}
