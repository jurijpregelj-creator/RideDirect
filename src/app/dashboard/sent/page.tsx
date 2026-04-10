import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Send, ExternalLink } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Sent Inquiries — RideDirect" }

export default async function SentPage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login?next=/dashboard/sent")

  const { data: inquiries } = await supabase
    .from("inquiries")
    .select("*, listings(title, id)")
    .eq("buyer_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10 max-w-3xl">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#0F1B3D]">Sent Inquiries</h1>
            {(inquiries?.length ?? 0) > 0 && (
              <p className="text-sm text-gray-400">{inquiries?.length} sent</p>
            )}
          </div>
        </div>

        {/* List */}
        {!inquiries?.length ? (
          <div className="bg-white rounded-2xl border border-gray-100 py-20 text-center">
            <Send size={40} className="text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400">You haven't sent any inquiries yet.</p>
            <Link href="/marketplace" className="inline-block mt-4 text-sm text-[#1B4FD8] hover:underline">
              Browse listings
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {inquiries.map((inquiry) => {
              const listing = inquiry.listings
              return (
                <div key={inquiry.id} className="bg-white rounded-xl border border-gray-100 p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                        <Send size={15} className="text-gray-400" />
                      </div>
                      <div>
                        {listing ? (
                          <Link href={`/listings/${listing.id}`} className="font-semibold text-[#0F1B3D] hover:text-[#1B4FD8] transition-colors flex items-center gap-1">
                            {listing.title}
                            <ExternalLink size={12} className="text-gray-400" />
                          </Link>
                        ) : (
                          <div className="font-semibold text-gray-400">Listing removed</div>
                        )}
                        <div className="text-xs text-gray-400 mt-0.5">
                          {new Date(inquiry.created_at).toLocaleDateString("en-GB", {
                            day: "numeric", month: "short", year: "numeric"
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg px-4 py-3 text-sm text-gray-700 whitespace-pre-line">
                    {inquiry.message}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
