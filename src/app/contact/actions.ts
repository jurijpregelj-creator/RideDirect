"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const SUBJECT_LABELS: Record<string, string> = {
  buying: "Buying a ride",
  selling: "Selling / listing a ride",
  account: "Account support",
  listing_issue: "Issue with a listing",
  partnership: "Partnership enquiry",
  other: "Other",
}

export async function sendContactMessage(formData: {
  name: string
  email: string
  company?: string
  subject: string
  message: string
}) {
  try {
    console.log("[Contact] Sending email from:", formData.email, "subject:", formData.subject)
    const result = await resend.emails.send({
      from: "RideDirect <noreply@ridedirect.eu>",
      to: ["info@ridedirect.eu", "jurijpregelj@gmail.com"],
      replyTo: formData.email,
      subject: `[Contact] ${SUBJECT_LABELS[formData.subject] || formData.subject} — ${formData.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0D2A5E;">New Contact Form Submission</h2>
          <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #999; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${formData.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Email</td><td style="padding: 8px 0;"><a href="mailto:${formData.email}" style="color: #1E88E5;">${formData.email}</a></td></tr>
            ${formData.company ? `<tr><td style="padding: 8px 0; color: #999;">Company</td><td style="padding: 8px 0;">${formData.company}</td></tr>` : ""}
            <tr><td style="padding: 8px 0; color: #999;">Topic</td><td style="padding: 8px 0;">${SUBJECT_LABELS[formData.subject] || formData.subject}</td></tr>
          </table>
          <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin-top: 16px;">
            <p style="margin: 0; color: #374151; white-space: pre-line;">${formData.message}</p>
          </div>
        </div>
      `,
    })
    console.log("[Contact] Email sent, id:", result.data?.id, "error:", result.error)
    return { success: true }
  } catch (err) {
    console.error("[Contact] Failed to send email:", err)
    return { success: false }
  }
}
