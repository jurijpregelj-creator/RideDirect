"use server"

import { createClient } from "@/lib/supabase/server"
import { Resend } from "resend"

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

  // Save inquiry to DB
  const { error: dbError } = await supabase.from("inquiries").insert({
    listing_id: formData.listingId,
    seller_id: formData.sellerId,
    buyer_name: formData.buyerName,
    buyer_email: formData.buyerEmail,
    buyer_phone: formData.buyerPhone || null,
    message: formData.message,
  })

  if (dbError) {
    return { success: false, error: "Failed to save inquiry." }
  }

  // Get seller email
  const { data: seller } = await supabase
    .from("profiles")
    .select("email, full_name")
    .eq("id", formData.sellerId)
    .single()

  if (seller?.email && process.env.RESEND_API_KEY) {
    await resend.emails.send({
      from: "RideDirect <noreply@ridedirect.eu>",
      to: seller.email,
      subject: `New inquiry for: ${formData.listingTitle}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0F1B3D;">New inquiry for your listing</h2>
          <p style="color: #666;">Someone is interested in: <strong>${formData.listingTitle}</strong></p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #999; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${formData.buyerName}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Email</td><td style="padding: 8px 0;"><a href="mailto:${formData.buyerEmail}" style="color: #1B4FD8;">${formData.buyerEmail}</a></td></tr>
            ${formData.buyerPhone ? `<tr><td style="padding: 8px 0; color: #999;">Phone</td><td style="padding: 8px 0;">${formData.buyerPhone}</td></tr>` : ""}
          </table>
          <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin-top: 16px;">
            <p style="margin: 0; color: #374151; white-space: pre-line;">${formData.message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #999; font-size: 12px;">Reply directly to ${formData.buyerEmail} to respond.</p>
        </div>
      `,
    })
  }

  return { success: true }
}
