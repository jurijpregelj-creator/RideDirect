import { createAdminClient } from "@/lib/supabase/admin"
import { formatPrice } from "@/lib/utils"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Leads | Admin" }

export default async function AdminLeadsPage() {
  const supabase = createAdminClient()

  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })

  const total = leads?.length ?? 0
  const withEmail = leads?.filter(l => l.email).length ?? 0

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0D2A5E]">Leads</h1>
        <p className="text-gray-500 text-sm mt-1">
          Users who filled the listing form but haven't registered yet.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <div className="text-3xl font-bold text-[#0D2A5E]">{total}</div>
          <div className="text-xs text-gray-400 mt-1">Total leads</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <div className="text-3xl font-bold text-green-600">{withEmail}</div>
          <div className="text-xs text-gray-400 mt-1">With email</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <div className="text-3xl font-bold text-amber-600">{total - withEmail}</div>
          <div className="text-xs text-gray-400 mt-1">Without email</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <h2 className="font-semibold text-[#0D2A5E]">Pending leads</h2>
          <span className="text-xs text-gray-400">{total} total</span>
        </div>

        {!total ? (
          <div className="py-16 text-center text-gray-400 text-sm">
            No leads yet. They appear here when someone fills the listing form without registering.
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {leads!.map((lead) => (
              <div key={lead.id} className="px-6 py-4 flex items-start gap-4">
                {/* Main info */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-[#0D2A5E] truncate">{lead.title || "—"}</div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {lead.category} · {lead.country} · {lead.condition}
                    {lead.manufacturer ? ` · ${lead.manufacturer}` : ""}
                    {lead.year ? ` · ${lead.year}` : ""}
                  </div>
                </div>

                {/* Price */}
                <div className="text-sm font-semibold text-gray-700 shrink-0">
                  {lead.price ? formatPrice(lead.price, lead.currency || "EUR") : "—"}
                </div>

                {/* Email */}
                <div className="shrink-0 min-w-[180px]">
                  {lead.email ? (
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-sm text-[#1E88E5] hover:underline font-medium"
                    >
                      {lead.email}
                    </a>
                  ) : (
                    <span className="text-xs text-gray-300 italic">no email</span>
                  )}
                </div>

                {/* Images count */}
                {lead.image_urls?.length > 0 && (
                  <div className="shrink-0 text-xs text-gray-400">
                    🖼 {lead.image_urls.length}
                  </div>
                )}

                {/* Date */}
                <div className="text-xs text-gray-400 shrink-0">
                  {new Date(lead.created_at).toLocaleDateString("en-GB", {
                    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
                  })}
                </div>

                {/* Lang badge */}
                <div className="shrink-0">
                  <span className="text-[10px] font-bold uppercase bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                    {lead.lang}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
