import type { Metadata } from "next"
import { ContactPageContent } from "@/components/contact/contact-page-content"
import { buildPageAlternates } from "@/lib/site-locale-urls"
import { CONTACT_T } from "@/app/contact/contact-translations"

const t = CONTACT_T.it

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: buildPageAlternates("/contact", "it"),
  openGraph: { url: "https://ridedirect.eu/it/contact", title: t.metaTitle, description: t.metaDescription },
}

export default function ContactItPage() {
  return <ContactPageContent locale="it" />
}
