"use server"

import { createClient } from "@/lib/supabase/server"
import { createClient as createAdminClient } from "@supabase/supabase-js"
import { Resend } from "resend"

function getAdminClient() {
  return createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitInquiry(formData: {
  listingId: string
  sellerId: string
  listingTitle: string
  buyerName: string
  buyerEmail: string
  buyerPhone?: string
  message: string
}) {
  const supabase = createClient()

  // Get logged in user if any
  const { data: { user } } = await supabase.auth.getUser()

  // Save inquiry to DB
  const { error: dbError } = await supabase.from("inquiries").insert({
    listing_id: formData.listingId,
    seller_id: formData.sellerId,
    buyer_id: user?.id || null,
    buyer_name: formData.buyerName,
    buyer_email: formData.buyerEmail,
    buyer_phone: formData.buyerPhone || null,
    message: formData.message,
    is_read: false,
    unread_for_buyer: false,
  })

  if (dbError) {
    return { success: false, error: "Failed to save inquiry." }
  }

  // Get seller email — use admin client to read from auth.users reliably
  const admin = getAdminClient()
  const { data: sellerAuth } = await admin.auth.admin.getUserById(formData.sellerId)
  const { data: seller } = await supabase
    .from("profiles")
    .select("email, full_name")
    .eq("id", formData.sellerId)
    .single()

  const sellerEmail = sellerAuth?.user?.email || seller?.email

  if (!process.env.RESEND_API_KEY) {
    console.error("[Email] RESEND_API_KEY is not set")
    return { success: true }
  }

  if (!sellerEmail) {
    console.error("[Email] Seller email not found for seller_id:", formData.sellerId)
    return { success: true }
  }

  try {
    const result = await resend.emails.send({
      from: "RideDirect <noreply@ridedirect.eu>",
      to: sellerEmail,
      replyTo: formData.buyerEmail,
      subject: `New inquiry for: ${formData.listingTitle}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0D2A5E;">New inquiry for your listing</h2>
          <p style="color: #666;">Someone is interested in: <strong>${formData.listingTitle}</strong></p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #999; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${formData.buyerName}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Email</td><td style="padding: 8px 0;"><a href="mailto:${formData.buyerEmail}" style="color: #1E88E5;">${formData.buyerEmail}</a></td></tr>
            ${formData.buyerPhone ? `<tr><td style="padding: 8px 0; color: #999;">Phone</td><td style="padding: 8px 0;">${formData.buyerPhone}</td></tr>` : ""}
          </table>
          <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin-top: 16px;">
            <p style="margin: 0; color: #374151; white-space: pre-line;">${formData.message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <a href="https://ridedirect.eu/dashboard/messages" style="display:inline-block;background:#1E88E5;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;">View in RideDirect</a>
        </div>
      `,
    })
    console.log("[Email] Inquiry email sent:", result)
  } catch (err) {
    console.error("[Email] Failed to send inquiry email:", err)
  }

  return { success: true }
}
