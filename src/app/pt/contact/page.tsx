import type { Metadata } from "next"
import { ContactPageContent } from "@/components/contact/contact-page-content"
import { buildPageAlternates } from "@/lib/site-locale-urls"
import { CONTACT_T } from "@/app/contact/contact-translations"

const t = CONTACT_T.pt

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: buildPageAlternates("/contact", "pt"),
  openGraph: { url: "https://ridedirect.eu/pt/contact", title: t.metaTitle, description: t.metaDescription },
}

export default function ContactPtPage() {
  return <ContactPageContent locale="pt" />
}
