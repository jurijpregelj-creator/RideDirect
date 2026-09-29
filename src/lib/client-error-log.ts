// Ring buffer of the most recent client-side errors on this page, attached to
// bug reports so we can see what actually broke instead of relying on the
// user's description alone.

export interface ClientErrorEntry {
  at: string
  message: string
  source?: string
}

const MAX_ENTRIES = 10
const entries: ClientErrorEntry[] = []
let installed = false

export function recordClientError(message: string, source?: string) {
  entries.push({ at: new Date().toISOString(), message: message.slice(0, 500), source })
  if (entries.length > MAX_ENTRIES) entries.shift()
}

export function installClientErrorLog() {
  if (installed || typeof window === "undefined") return
  installed = true

  window.addEventListener("error", (e) => {
    recordClientError(e.message || String(e.error), e.filename ? `${e.filename}:${e.lineno}` : undefined)
  })
  window.addEventListener("unhandledrejection", (e) => {
    const reason = e.reason
    recordClientError(reason?.message || String(reason), "unhandledrejection")
  })

  // console.error catches errors our own code handles and logs (e.g. failed
  // uploads), which never reach window.onerror.
  const original = console.error
  console.error = (...args: unknown[]) => {
    try {
      recordClientError(
        args.map((a) => (a instanceof Error ? a.message : typeof a === "string" ? a : JSON.stringify(a))).join(" "),
        "console.error",
      )
    } catch {}
    original.apply(console, args)
  }
}

export function getClientErrors(): ClientErrorEntry[] {
  return [...entries]
}

/** Opens the bug report widget, optionally with a prefilled message. */
export function openBugReport(prefill?: string) {
  window.dispatchEvent(new CustomEvent("open-bug-report", { detail: { prefill } }))
}
