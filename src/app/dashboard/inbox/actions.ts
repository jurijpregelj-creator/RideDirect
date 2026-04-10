"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function markInquiryRead(inquiryId: string) {
  const supabase = createClient()
  await supabase
    .from("inquiries")
    .update({ is_read: true })
    .eq("id", inquiryId)
  revalidatePath("/dashboard/inbox")
}

export async function replyToInquiry(formData: FormData) {
  const supabase = createClient()

  const inquiryId = formData.get("inquiry_id") as string
  const message = formData.get("message") as string

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false }

  const { data: inquiry } = await supabase
    .from("inquiries")
    .select("*, listings(title)")
    .eq("id", inquiryId)
    .single()

  if (!inquiry) return { success: false }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", user.id)
    .single()

  const senderName = profile?.full_name || "Seller"
  const senderEmail = profile?.email || user.email || ""
  const listingTitle = inquiry.listings?.title || "your inquiry"

  if (process.env.RESEND_API_KEY) {
    await resend.emails.send({
      from: "RideDirect <noreply@ridedirect.eu>",
      to: inquiry.buyer_email,
      replyTo: senderEmail,
      subject: `Re: ${listingTitle}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0F1B3D;">Reply from ${senderName}</h2>
          <p style="color: #666;">Regarding: <strong>${listingTitle}</strong></p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <div style="background: #f9fafb; border-radius: 8px; padding: 16px;">
            <p style="margin: 0; color: #374151; white-space: pre-line;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #999; font-size: 12px;">Reply directly to this email to continue the conversation.</p>
        </div>
      `,
    })
  }

  // Mark as read
  await supabase.from("inquiries").update({ is_read: true }).eq("id", inquiryId)
  revalidatePath("/dashboard/inbox")

  return { success: true }
}
