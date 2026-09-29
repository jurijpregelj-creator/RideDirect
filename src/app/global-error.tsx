"use client"

import "./globals.css"
import { useEffect } from "react"
import { BugReportWidget } from "@/components/layout/bug-report-widget"
import { recordClientError, openBugReport } from "@/lib/client-error-log"

// Last-resort boundary for crashes in the root layout itself. It replaces the
// whole document, so it brings its own <html> and its own bug report widget.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    recordClientError(error.message + (error.digest ? ` (digest ${error.digest})` : ""), "global error boundary")
  }, [error])

  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#f9fafb", margin: 0 }}>
        <div style={{ maxWidth: 480, margin: "0 auto", padding: "96px 16px", textAlign: "center" }}>
          <h1 style={{ color: "#0D2A5E", fontSize: 24, marginBottom: 12 }}>Something went wrong</h1>
          <p style={{ color: "#4b5563", marginBottom: 32 }}>
            The page ran into an error. Try again, and if it keeps happening, please tell us so we can fix it.
          </p>
          <button
            onClick={reset}
            style={{ padding: "10px 20px", borderRadius: 8, border: 0, background: "#1E88E5", color: "#fff", fontSize: 14, cursor: "pointer", marginRight: 8 }}
          >
            Try again
          </button>
          <button
            onClick={() => openBugReport(`[Crash] ${error.message}${error.digest ? ` (digest ${error.digest})` : ""}\n\n`)}
            style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", color: "#0D2A5E", fontSize: 14, cursor: "pointer" }}
          >
            Report this problem
          </button>
        </div>
        <BugReportWidget />
      </body>
    </html>
  )
}
