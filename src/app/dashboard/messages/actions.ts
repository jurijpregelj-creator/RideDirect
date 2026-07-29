"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { createClient as createAdminClient } from "@supabase/supabase-js"
import { Resend } from "resend"
import { SUPPORTED_LISTING_LOCALES, type ListingLocale } from "@/lib/locales"
import { EMAIL_T } from "@/lib/email-translations"

function resolveLocale(value: string | null | undefined): ListingLocale {
  return (SUPPORTED_LISTING_LOCALES as readonly string[]).includes(value ?? "") ? (value as ListingLocale) : "en"
}

function getAdminClient() {
  return createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendReply(formData: FormData) {
  const supabase = createClient()
  const inquiryId = formData.get("inquiry_id") as string
  const message = formData.get("message") as string

  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !message.trim()) return { success: false }

  const attachmentUrl = formData.get("attachment_url") as string | null
  const attachmentType = formData.get("attachment_type") as string | null

  const { error } = await supabase.from("replies").insert({
    inquiry_id: inquiryId,
    sender_id: user.id,
    message: message.trim() || " ",
    ...(attachmentUrl ? { attachment_url: attachmentUrl } : {}),
    ...(attachmentType ? { attachment_type: attachmentType } : {}),
  })
  if (error) return { success: false }

  const { data: inquiry } = await supabase
    .from("inquiries")
    .select("*, listings(title, id)")
    .eq("id", inquiryId)
    .single()
  if (!inquiry) return { success: true }

  const { data: senderProfile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", user.id)
    .single()

  const listingTitle = inquiry.listings?.title || "a listing"
  const senderName = senderProfile?.full_name || "Someone"
  const isSeller = user.id === inquiry.seller_id

  // Set unread flags: sender's flag = false, recipient's flag = true
  if (isSeller) {
    // Seller sent → buyer has unread, seller is read
    await supabase.from("inquiries").update({
      is_read: true,
      unread_for_buyer: true,
    }).eq("id", inquiryId)
  } else {
    // Buyer sent → seller has unread, buyer is read
    await supabase.from("inquiries").update({
      is_read: false,
      unread_for_buyer: false,
    }).eq("id", inquiryId)
  }

  // Send email to other participant — use admin client for reliable email lookup
  const admin = getAdminClient()
  let recipientEmail: string | null = null
  let recipientLocale: string | null = null
  if (isSeller) {
    const { data: buyerAuth } = await admin.auth.admin.getUserById(inquiry.buyer_id)
    recipientEmail = buyerAuth?.user?.email || inquiry.buyer_email
    if (inquiry.buyer_id) {
      const { data: buyerProfile } = await supabase
        .from("profiles")
        .select("preferred_language")
        .eq("id", inquiry.buyer_id)
        .single()
      recipientLocale = buyerProfile?.preferred_language ?? null
    }
  } else {
    const { data: sellerAuth } = await admin.auth.admin.getUserById(inquiry.seller_id)
    recipientEmail = sellerAuth?.user?.email || null
    const { data: sellerProfile } = await supabase
      .from("profiles")
      .select("preferred_language")
      .eq("id", inquiry.seller_id)
      .single()
    recipientLocale = sellerProfile?.preferred_language ?? null
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("[Email] RESEND_API_KEY is not set")
  } else if (!recipientEmail) {
    console.error("[Email] Recipient email not found for inquiry:", inquiryId)
  } else {
    const t = EMAIL_T[resolveLocale(recipientLocale)]
    try {
      const result = await resend.emails.send({
        from: "RideDirect <noreply@ridedirect.eu>",
        to: recipientEmail,
        replyTo: senderProfile?.email,
        subject: t.newMessageSubject(senderName, listingTitle),
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0D2A5E;">${t.newMessageHeading(senderName)}</h2>
            <p style="color: #666;">${t.regarding} <strong>${listingTitle}</strong></p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
            <div style="background: #f9fafb; border-radius: 8px; padding: 16px;">
              <p style="margin: 0; color: #374151; white-space: pre-line;">${message}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
            <a href="https://ridedirect.eu/dashboard/messages/${inquiryId}" style="display:inline-block;background:#1E88E5;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;">${t.viewConversationButton}</a>
          </div>
        `,
      })
      console.log("[Email] Reply email sent:", result)
    } catch (err) {
      console.error("[Email] Failed to send reply email:", err)
    }
  }

  revalidatePath(`/dashboard/messages/${inquiryId}`)
  revalidatePath("/dashboard/messages")
  return { success: true }
}

export async function markConversationRead(inquiryId: string, isSeller: boolean) {
  const supabase = createClient()
  if (isSeller) {
    await supabase.from("inquiries").update({ is_read: true }).eq("id", inquiryId)
  } else {
    await supabase.from("inquiries").update({ unread_for_buyer: false }).eq("id", inquiryId)
  }
  revalidatePath(`/dashboard/messages/${inquiryId}`)
  revalidatePath("/dashboard/messages")
}
