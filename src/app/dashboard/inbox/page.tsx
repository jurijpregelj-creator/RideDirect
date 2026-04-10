import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MessageSquare } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { createClient } from "@/lib/supabase/server"
import { InquiryCard } from "@/components/inbox/inquiry-card"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Inbox — RideDirect" }

export default async function InboxPage() {
  const supabase = createClient()
  const t = await getTranslations("inbox")

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login?next=/dashboard/inbox")

  const { data: inquiries } = await supabase
    .from("inquiries")
    .select("*, listings(title, id)")
    .eq("seller_id", user.id)
    .order("created_at", { ascending: false })

  const unread = (inquiries || []).filter((i) => !i.is_read).length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10 max-w-3xl">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#0F1B3D]">{t("title")}</h1>
            {unread > 0 && (
              <p className="text-sm text-gray-400">{t("unread", { count: unread })}</p>
            )}
          </div>
        </div>

        {/* Inquiries */}
        {!inquiries?.length ? (
          <div className="bg-white rounded-2xl border border-gray-100 py-20 text-center">
            <MessageSquare size={40} className="text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400">{t("empty")}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {inquiries.map((inquiry) => (
              <InquiryCard key={inquiry.id} inquiry={inquiry} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
