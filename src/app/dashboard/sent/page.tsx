import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Send } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { SentInquiryCard } from "@/components/inbox/sent-inquiry-card"
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
            {inquiries.map((inquiry) => (
              <SentInquiryCard key={inquiry.id} inquiry={inquiry} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
