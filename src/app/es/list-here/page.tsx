import type { Metadata } from "next"
import { OutreachLandingContent } from "@/components/outreach/outreach-landing-content"
import { LIST_HERE_T } from "@/app/list-here/list-here-translations"

const t = LIST_HERE_T.es

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  robots: { index: false, follow: false },
}

export default function ListHereEsPage() {
  return <OutreachLandingContent locale="es" />
}
