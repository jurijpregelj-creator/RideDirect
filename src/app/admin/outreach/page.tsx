import { createAdminClient } from "@/lib/supabase/admin"
import { ConvertButton } from "./convert-button"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Outreach | Admin" }

export default async function AdminOutreachPage() {
  const supabase = createAdminClient()

  const { data: contacts } = await supabase
    .from("outreach_contacts")
    .select("*")
    .order("created_at", { ascending: false })

  const rows = contacts ?? []
  const total = rows.length
  const sent = rows.filter((c) => c.status === "sent").length
  const converted = rows.filter((c) => c.converted_at).length

  const groupCounts = rows.reduce((acc: Record<string, number>, c) => {
    if (c.source_group) acc[c.source_group] = (acc[c.source_group] || 0) + 1
    return acc
  }, {})
  const groups = Object.entries(groupCounts).sort((a, b) => b[1] - a[1])

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0D2A5E]">Outreach</h1>
        <p className="text-gray-500 text-sm mt-1">
          Sellers cold-messaged on Facebook to invite them to list on RideDirect.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <div className="text-3xl font-bold text-[#0D2A5E]">{total}</div>
          <div className="text-xs text-gray-400 mt-1">Contacted</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <div className="text-3xl font-bold text-blue-600">{sent}</div>
          <div className="text-xs text-gray-400 mt-1">Replied / sent</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <div className="text-3xl font-bold text-green-600">{converted}</div>
          <div className="text-xs text-gray-400 mt-1">Converted (listed)</div>
        </div>
      </div>

      {/* Groups already covered */}
      {groups.length > 0 && (
        <div className="mb-6 bg-white rounded-2xl border border-gray-100 p-4">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Facebook groups already worked
          </div>
          <div className="flex flex-wrap gap-2">
            {groups.map(([group, count]) => (
              <span
                key={group}
                className="text-xs bg-gray-50 border border-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
              >
                {group} <span className="text-gray-400">({count})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <h2 className="font-semibold text-[#0D2A5E]">Contacted sellers</h2>
          <span className="text-xs text-gray-400">{total} total</span>
        </div>

        {!total ? (
          <div className="py-16 text-center text-gray-400 text-sm">
            No outreach contacts yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {rows.map((c) => (
              <div key={c.id} className="px-6 py-4 flex items-start gap-4">
                {/* Main info */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-[#0D2A5E] truncate">{c.seller_name}</div>
                  <div className="text-xs text-gray-400 mt-0.5 truncate">
                    {c.item || "—"}
                    {c.notes ? ` · ${c.notes}` : ""}
                  </div>
                  {c.source_group && (
                    <div className="text-[11px] text-gray-300 mt-0.5 truncate">
                      via {c.source_group}
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div className="shrink-0 min-w-[140px] text-sm text-gray-600">
                  {c.phone ? (
                    <a
                      href={`https://web.whatsapp.com/send?phone=${c.phone}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#1E88E5] hover:underline font-medium"
                    >
                      {c.phone}
                    </a>
                  ) : (
                    <span className="text-xs text-gray-300 italic">no phone</span>
                  )}
                </div>

                {/* Status badge */}
                <div className="shrink-0">
                  <span
                    className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                      c.status === "sent"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {c.status}
                  </span>
                  {c.link_sent && (
                    <span className="ml-1 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-600">
                      link sent
                    </span>
                  )}
                </div>

                {/* Date */}
                <div className="text-xs text-gray-400 shrink-0">
                  {new Date(c.contacted_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                  })}
                </div>

                {/* Lang badge */}
                <div className="shrink-0">
                  <span className="text-[10px] font-bold uppercase bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                    {c.language || "?"}
                  </span>
                </div>

                <ConvertButton contactId={c.id} converted={!!c.converted_at} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
