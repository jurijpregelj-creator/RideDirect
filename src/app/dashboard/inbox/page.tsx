import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Mail, MailOpen, Phone, MessageSquare } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { createClient } from "@/lib/supabase/server"
import { markInquiryRead } from "./actions"
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
              <InquiryCard key={inquiry.id} inquiry={inquiry} t={t} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function InquiryCard({ inquiry, t }: { inquiry: any; t: any }) {
  const listing = inquiry.listings
  const isUnread = !inquiry.is_read

  return (
    <div className={`bg-white rounded-xl border transition-all ${isUnread ? "border-[#1B4FD8]/30 shadow-sm" : "border-gray-100"}`}>
      <div className="p-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${isUnread ? "bg-[#1B4FD8] text-white" : "bg-gray-100 text-gray-400"}`}>
              {isUnread ? <Mail size={16} /> : <MailOpen size={16} />}
            </div>
            <div>
              <div className="font-semibold text-[#0F1B3D]">{inquiry.buyer_name}</div>
              <a href={`mailto:${inquiry.buyer_email}`} className="text-sm text-[#1B4FD8] hover:underline">
                {inquiry.buyer_email}
              </a>
            </div>
          </div>
          <div className="text-xs text-gray-400 shrink-0 mt-1">
            {new Date(inquiry.created_at).toLocaleDateString("en-GB", {
              day: "numeric", month: "short", year: "numeric"
            })}
          </div>
        </div>

        {/* Listing */}
        {listing && (
          <div className="mb-3">
            <Link href={`/listings/${listing.id}`} className="text-xs text-gray-400 hover:text-[#1B4FD8] transition-colors">
              📋 {listing.title}
            </Link>
          </div>
        )}

        {/* Message */}
        <div className="bg-gray-50 rounded-lg px-4 py-3 text-sm text-gray-700 whitespace-pre-line">
          {inquiry.message}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4">
            {inquiry.buyer_phone && (
              <a href={`tel:${inquiry.buyer_phone}`} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#1B4FD8] transition-colors">
                <Phone size={12} />
                {inquiry.buyer_phone}
              </a>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isUnread && (
              <form action={markInquiryRead.bind(null, inquiry.id)}>
                <button type="submit" className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors">
                  {t("markRead")}
                </button>
              </form>
            )}
            <a
              href={`mailto:${inquiry.buyer_email}?subject=Re: ${listing?.title || "Your inquiry"}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium bg-[#1B4FD8] text-white px-3 py-1.5 rounded-lg hover:bg-[#1B4FD8]/90 transition-colors"
            >
              <Mail size={12} />
              {t("reply")}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
