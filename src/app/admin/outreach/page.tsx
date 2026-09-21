import { createAdminClient } from "@/lib/supabase/admin"
import { ConvertButton } from "./convert-button"
import { GroupStatusButton } from "./group-status-button"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Outreach | Admin" }

export default async function AdminOutreachPage() {
  const supabase = createAdminClient()

  const [{ data: contacts }, { data: targetGroups }] = await Promise.all([
    supabase.from("outreach_contacts").select("*").order("created_at", { ascending: false }),
    supabase.from("outreach_target_groups").select("*").order("added_at", { ascending: true }),
  ])

  const rows = contacts ?? []
  const pendingGroups = (targetGroups ?? []).filter((g) => g.status === "pending")
  const doneGroups = (targetGroups ?? []).filter((g) => g.status === "done")
  const total = rows.length
  const sent = rows.filter((c) => c.status === "sent").length
  const converted = rows.filter((c) => c.converted_at).length

  type GroupSummary = { count: number; first: string; last: string; url: string | null }
  const groupSummary = rows.reduce((acc: Record<string, GroupSummary>, c) => {
    if (!c.source_group) return acc
    const g = acc[c.source_group] ?? { count: 0, first: c.contacted_at, last: c.contacted_at, url: null }
    g.count += 1
    if (c.contacted_at < g.first) g.first = c.contacted_at
    if (c.contacted_at > g.last) g.last = c.contacted_at
    if (!g.url && c.source_group_url) g.url = c.source_group_url
    acc[c.source_group] = g
    return acc
  }, {})
  const groups = Object.entries(groupSummary).sort((a, b) => b[1].last.localeCompare(a[1].last))

  function fmtDate(d: string) {
    return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
  }

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

      {/* Groups to-do list */}
      {(targetGroups?.length ?? 0) > 0 && (
        <div className="mb-6 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="font-semibold text-[#0D2A5E]">Facebook groups to-do</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {pendingGroups.length} left to work through, {doneGroups.length} done.
            </p>
          </div>
          <div className="divide-y divide-gray-50">
            {[...pendingGroups, ...doneGroups].map((g) => (
              <div key={g.id} className="px-6 py-3 flex items-center gap-4">
                <div className="flex-1 min-w-0 flex items-center gap-2">
                  <span
                    className={`text-sm font-medium truncate ${
                      g.status === "done" ? "text-gray-400 line-through" : "text-gray-700"
                    }`}
                  >
                    {g.name}
                  </span>
                  {g.url && (
                    <a
                      href={g.url}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 text-xs text-[#1E88E5] hover:underline"
                    >
                      Open group ↗
                    </a>
                  )}
                </div>
                {g.member_count != null && (
                  <div className="shrink-0 text-xs text-gray-400">
                    {g.member_count.toLocaleString()} members
                  </div>
                )}
                <div className="shrink-0 text-xs text-gray-400">
                  {g.status === "done" && g.worked_at
                    ? `worked ${fmtDate(g.worked_at)}`
                    : `added ${fmtDate(g.added_at)}`}
                </div>
                <GroupStatusButton groupId={g.id} done={g.status === "done"} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Groups already covered */}
      {groups.length > 0 && (
        <div className="mb-6 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="font-semibold text-[#0D2A5E]">Facebook groups already worked</h2>
            <p className="text-xs text-gray-400 mt-0.5">So you know which group to pick up next.</p>
          </div>
          <div className="divide-y divide-gray-50">
            {groups.map(([group, s]) => (
              <div key={group} className="px-6 py-3 flex items-center gap-4">
                <div className="flex-1 min-w-0 flex items-center gap-2">
                  <span className="text-sm text-gray-700 font-medium truncate">{group}</span>
                  {s.url && (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 text-xs text-[#1E88E5] hover:underline"
                    >
                      Open group ↗
                    </a>
                  )}
                </div>
                <div className="shrink-0 text-xs text-gray-400">
                  {s.first === s.last ? fmtDate(s.first) : `${fmtDate(s.first)} – ${fmtDate(s.last)}`}
                </div>
                <div className="shrink-0 text-xs font-semibold text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full min-w-[70px] text-center">
                  {s.count} contacted
                </div>
              </div>
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
