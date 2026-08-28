import { Resend } from "resend"
import { createAdminClient } from "@/lib/supabase/admin"
import { SUPPORTED_LISTING_LOCALES, type ListingLocale, buildListingUrl } from "@/lib/locales"
import { EMAIL_T } from "@/lib/email-translations"

const resend = new Resend(process.env.RESEND_API_KEY)

function resolveLocale(value: string | null | undefined): ListingLocale {
  return (SUPPORTED_LISTING_LOCALES as readonly string[]).includes(value ?? "")
    ? (value as ListingLocale)
    : "en"
}

async function getSellerContact(sellerId: string) {
  const admin = createAdminClient()
  const [{ data: authUser }, { data: profile }] = await Promise.all([
    admin.auth.admin.getUserById(sellerId),
    admin.from("profiles").select("preferred_language").eq("id", sellerId).single(),
  ])
  return {
    email: authUser?.user?.email ?? null,
    locale: resolveLocale(profile?.preferred_language),
  }
}

// Fired right after a listing (and its images) are saved, before AI
// moderation runs — the seller hears back immediately, independent of
// whether the listing ends up auto-approved or flagged for review.
export async function notifySellerListingSubmitted(listingId: string) {
  if (!process.env.RESEND_API_KEY) return
  try {
    const admin = createAdminClient()
    const { data: listing } = await admin
      .from("listings")
      .select("seller_id, title")
      .eq("id", listingId)
      .single()
    if (!listing) return

    const { email, locale } = await getSellerContact(listing.seller_id)
    if (!email) return
    const t = EMAIL_T[locale]

    await resend.emails.send({
      from: "RideDirect <noreply@ridedirect.eu>",
      to: email,
      subject: t.listingSubmittedSubject(listing.title),
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0D2A5E;">${t.listingSubmittedHeading}</h2>
          <p style="color: #666;">${t.listingSubmittedBody}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="font-weight: 600; color: #0D2A5E;">${listing.title}</p>
        </div>
      `,
    })
  } catch (err) {
    console.error("[Email] Failed to send listing-submitted confirmation:", err)
  }
}

// Fired from approveListingCore — covers both the admin "Approve" button
// and AI auto-approval, since both call that same function.
export async function notifySellerListingApproved(listingId: string, sellerId: string, title: string) {
  if (!process.env.RESEND_API_KEY) return
  try {
    const { email, locale } = await getSellerContact(sellerId)
    if (!email) return
    const t = EMAIL_T[locale]
    const url = buildListingUrl(listingId, locale)

    await resend.emails.send({
      from: "RideDirect <noreply@ridedirect.eu>",
      to: email,
      subject: t.listingApprovedSubject(title),
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0D2A5E;">${t.listingApprovedHeading}</h2>
          <p style="color: #666;">${t.listingApprovedBody}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="font-weight: 600; color: #0D2A5E;">${title}</p>
          <a href="${url}" style="display:inline-block;background:#1E88E5;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;margin-top:16px;">${t.viewYourListingButton}</a>
        </div>
      `,
    })
  } catch (err) {
    console.error("[Email] Failed to send listing-approved notification:", err)
  }
}
