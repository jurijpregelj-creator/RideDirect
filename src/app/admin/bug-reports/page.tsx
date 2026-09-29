import { createAdminClient } from "@/lib/supabase/admin"
import { DeleteBugReportButton } from "./delete-bug-report-button"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Bug Reports | Admin" }

export default async function AdminBugReportsPage() {
  const supabase = createAdminClient()

  const { data: reports } = await supabase
    .from("bug_reports")
    .select("*")
    .order("created_at", { ascending: false })

  const total = reports?.length ?? 0

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0D2A5E]">Bug Reports</h1>
        <p className="text-gray-500 text-sm mt-1">
          Submitted through the bug-report widget on the live site.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <h2 className="font-semibold text-[#0D2A5E]">Reports</h2>
          <span className="text-xs text-gray-400">{total} total</span>
        </div>

        {!total ? (
          <div className="py-16 text-center text-gray-400 text-sm">
            No bug reports yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {reports!.map((report) => (
              <div key={report.id} className="px-6 py-4 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 whitespace-pre-line">{report.message}</p>
                  {report.page_url && (
                    <a
                      href={report.page_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#1E88E5] hover:underline block mt-1 truncate"
                    >
                      {report.page_url}
                    </a>
                  )}
                  {report.context && (
                    <details className="mt-2 text-xs text-gray-500">
                      <summary className="cursor-pointer select-none">
                        {report.context.errors?.length
                          ? <span className="text-red-600 font-medium">{report.context.errors.length} JS error(s) captured</span>
                          : "No JS errors captured"}
                        {report.context.viewport && <> · {report.context.viewport}</>}
                      </summary>
                      <div className="mt-1 space-y-1">
                        {report.context.errors?.map((err: { at: string; message: string; source?: string }, i: number) => (
                          <div key={i} className="font-mono bg-red-50 text-red-700 rounded px-2 py-1 break-all">
                            {new Date(err.at).toLocaleTimeString("en-GB")} {err.source ? `[${err.source}] ` : ""}{err.message}
                          </div>
                        ))}
                        {report.context.userAgent && <div className="break-all text-gray-400">{report.context.userAgent}</div>}
                      </div>
                    </details>
                  )}
                </div>

                {report.screenshot_url && (
                  <a
                    href={report.screenshot_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0"
                  >
                    <img
                      src={report.screenshot_url}
                      alt="Screenshot"
                      className="w-16 h-16 rounded-lg object-cover border border-gray-100 hover:opacity-80 transition-opacity"
                    />
                  </a>
                )}

                <div className="shrink-0 min-w-[180px]">
                  {report.email ? (
                    <a
                      href={`mailto:${report.email}`}
                      className="text-sm text-[#1E88E5] hover:underline font-medium"
                    >
                      {report.email}
                    </a>
                  ) : (
                    <span className="text-xs text-gray-300 italic">no email</span>
                  )}
                  {report.user_email && report.user_email !== report.email && (
                    <div className="text-xs text-gray-400 mt-0.5">signed in: {report.user_email}</div>
                  )}
                </div>

                <div className="text-xs text-gray-400 shrink-0">
                  {new Date(report.created_at).toLocaleDateString("en-GB", {
                    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                  })}
                </div>

                <DeleteBugReportButton id={report.id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
