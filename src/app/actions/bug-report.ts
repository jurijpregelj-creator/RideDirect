"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendBugReport(formData: {
  message: string
  email?: string
  pageUrl: string
}) {
  if (!formData.message.trim()) return { success: false }

  try {
    await resend.emails.send({
      from: "RideDirect <noreply@ridedirect.eu>",
      to: ["info@ridedirect.eu", "jurijpregelj@gmail.com"],
      replyTo: formData.email || undefined,
      subject: "[Bug Report] Something on RideDirect",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0D2A5E;">Bug report / suggestion</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #999; width: 100px;">Page</td><td style="padding: 8px 0;"><a href="${formData.pageUrl}" style="color: #1E88E5;">${formData.pageUrl}</a></td></tr>
            ${formData.email ? `<tr><td style="padding: 8px 0; color: #999;">Email</td><td style="padding: 8px 0;"><a href="mailto:${formData.email}" style="color: #1E88E5;">${formData.email}</a></td></tr>` : ""}
          </table>
          <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin-top: 16px;">
            <p style="margin: 0; color: #374151; white-space: pre-line;">${formData.message}</p>
          </div>
        </div>
      `,
    })
    return { success: true }
  } catch (err) {
    console.error("[Email] Failed to send bug report:", err)
    return { success: false }
  }
}
