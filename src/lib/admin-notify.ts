import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const ADMIN_RECIPIENTS = ["info@ridedirect.eu", "jurijpregelj@gmail.com"]

// Admin-only internal notifications — always English, not part of the
// site's 8-locale translation surface (same reasoning as reportListing
// and sendContactMessage in listings/[id]/actions.ts and contact/actions.ts).

interface NewLeadInfo {
  title: string
  category: string
  country: string
  price: number
  currency: string
  email?: string | null
}

export async function notifyAdminNewLead(lead: NewLeadInfo) {
  if (!process.env.RESEND_API_KEY) return
  try {
    await resend.emails.send({
      from: "RideDirect <noreply@ridedirect.eu>",
      to: ADMIN_RECIPIENTS,
      subject: `[New Lead] ${lead.title}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0D2A5E;">New lead started (not yet completed)</h2>
          <p style="color: #666;">Someone started listing a ride but hasn't finished registration yet.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #999; width: 120px;">Title</td><td style="padding: 8px 0; font-weight: 600;">${lead.title}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Category</td><td style="padding: 8px 0;">${lead.category}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Country</td><td style="padding: 8px 0;">${lead.country}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Price</td><td style="padding: 8px 0;">${lead.price} ${lead.currency}</td></tr>
            ${lead.email ? `<tr><td style="padding: 8px 0; color: #999;">Email</td><td style="padding: 8px 0;"><a href="mailto:${lead.email}" style="color: #1E88E5;">${lead.email}</a></td></tr>` : ""}
          </table>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <a href="https://ridedirect.eu/admin/leads" style="display:inline-block;background:#1E88E5;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;">View in Admin</a>
        </div>
      `,
    })
  } catch (err) {
    console.error("[Email] Failed to send new-lead admin notification:", err)
  }
}

interface FlaggedListingInfo {
  id: string
  title: string
  reason: string
}

export async function notifyAdminFlaggedListing(listing: FlaggedListingInfo) {
  if (!process.env.RESEND_API_KEY) return
  try {
    await resend.emails.send({
      from: "RideDirect <noreply@ridedirect.eu>",
      to: ADMIN_RECIPIENTS,
      subject: `[Review Needed] ${listing.title}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #B71C1C;">A listing needs your review</h2>
          <p style="color: #666;">AI moderation flagged this one instead of auto-approving it. Everything else gets approved automatically — this is the only kind of listing email you'll get now.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #999; width: 120px;">Title</td><td style="padding: 8px 0; font-weight: 600;">${listing.title}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Why</td><td style="padding: 8px 0;">${listing.reason}</td></tr>
          </table>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <a href="https://ridedirect.eu/admin/listings/${listing.id}/edit" style="display:inline-block;background:#1E88E5;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;">Review in Admin</a>
        </div>
      `,
    })
  } catch (err) {
    console.error("[Email] Failed to send flagged-listing admin notification:", err)
  }
}
