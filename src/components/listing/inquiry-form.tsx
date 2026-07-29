"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Loader2, MessageSquare } from "lucide-react"
import { useTranslations } from "next-intl"
import { submitInquiry } from "@/app/listings/[id]/actions"
import type { ListingLocale } from "@/lib/locales"
import { LISTING_PAGE_T } from "@/components/listing/listing-page-translations"

interface InquiryFormProps {
  listingId: string
  sellerId: string
  listingTitle: string
  loggedInUser?: { name: string; email: string } | null
  locale?: ListingLocale
}

const ERROR_SEND_FAILED: Record<ListingLocale, string> = {
  en: "Failed to send inquiry.", de: "Anfrage konnte nicht gesendet werden.", it: "Impossibile inviare la richiesta.",
  fr: "Échec de l'envoi de la demande.", es: "No se pudo enviar la consulta.", nl: "Aanvraag kon niet worden verzonden.",
  pl: "Nie udało się wysłać zapytania.", pt: "Falha ao enviar o pedido.",
}

const GREETING_TEMPLATE: Record<ListingLocale, (title: string) => string> = {
  en: (title) => `Hi, I'm interested in your listing "${title}..."`,
  de: (title) => `Hallo, ich interessiere mich für Ihr Inserat „${title}...“`,
  it: (title) => `Ciao, sono interessato/a al tuo annuncio "${title}..."`,
  fr: (title) => `Bonjour, je suis intéressé(e) par votre annonce « ${title}... »`,
  es: (title) => `Hola, estoy interesado/a en tu anuncio "${title}..."`,
  nl: (title) => `Hallo, ik ben geïnteresseerd in uw advertentie "${title}..."`,
  pl: (title) => `Dzień dobry, jestem zainteresowany/a Państwa ogłoszeniem "${title}..."`,
  pt: (title) => `Olá, tenho interesse no seu anúncio "${title}..."`,
}

export function InquiryForm({ listingId, sellerId, listingTitle, loggedInUser, locale }: InquiryFormProps) {
  const cookieT = useTranslations("listing")
  const t = locale
    ? (key: keyof (typeof LISTING_PAGE_T)["en"]) => LISTING_PAGE_T[locale][key] as string
    : cookieT
  const errorSendFailed = ERROR_SEND_FAILED[locale ?? "en"]
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value

    const result = await submitInquiry({
      listingId,
      sellerId,
      listingTitle,
      buyerName: loggedInUser?.name || (form.elements.namedItem("buyer_name") as HTMLInputElement)?.value || "",
      buyerEmail: loggedInUser?.email || (form.elements.namedItem("buyer_email") as HTMLInputElement)?.value || "",
      buyerPhone: !loggedInUser ? ((form.elements.namedItem("buyer_phone") as HTMLInputElement)?.value || undefined) : undefined,
      message,
    })

    if (!result.success) {
      setError(result.error || errorSendFailed)
      setLoading(false)
      return
    }

    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-100 rounded-xl p-6 text-center">
        <CheckCircle2 size={40} className="text-green-500 mx-auto mb-3" />
        <h3 className="font-semibold text-green-800 mb-1">{t("inquirySent")}</h3>
        <p className="text-sm text-green-600">{t("inquirySentDesc")}</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-5">
        <MessageSquare size={18} className="text-[#1E88E5]" />
        <h3 className="font-semibold text-gray-800">{t("contactSeller")}</h3>
      </div>

      {loggedInUser && (
        <div className="flex items-center gap-2 mb-4 bg-blue-50 rounded-lg px-3 py-2">
          <div className="w-7 h-7 rounded-full bg-[#1E88E5] text-white text-xs font-bold flex items-center justify-center shrink-0">
            {loggedInUser.name?.charAt(0).toUpperCase() || "?"}
          </div>
          <div>
            <div className="text-sm font-medium text-[#0D2A5E]">{loggedInUser.name}</div>
            <div className="text-xs text-gray-400">{loggedInUser.email}</div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {!loggedInUser && (
          <>
            <div>
              <Label htmlFor="buyer_name">{t("yourName")} *</Label>
              <Input id="buyer_name" name="buyer_name" placeholder="John Smith" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="buyer_email">{t("emailAddress")} *</Label>
              <Input id="buyer_email" name="buyer_email" type="email" placeholder="john@company.com" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="buyer_phone">{t("phone")} <span className="text-gray-400 font-normal">{t("phoneOptional")}</span></Label>
              <Input id="buyer_phone" name="buyer_phone" type="tel" placeholder="+44 7700 900000" className="mt-1.5" />
            </div>
          </>
        )}

        <div>
          {!loggedInUser && <Label htmlFor="message">{t("message")} *</Label>}
          <Textarea
            id="message"
            name="message"
            placeholder={!loggedInUser ? GREETING_TEMPLATE[locale ?? "en"](listingTitle.slice(0, 40)) : undefined}
            defaultValue={loggedInUser ? GREETING_TEMPLATE[locale ?? "en"](listingTitle.slice(0, 40)) : undefined}
            required
            rows={4}
            className={loggedInUser ? "" : "mt-1.5"}
          />
        </div>

        <Button type="submit" variant="brand" className="w-full" disabled={loading}>
          {loading ? (<><Loader2 size={16} className="animate-spin" /> {t("sending")}</>) : t("sendInquiry")}
        </Button>

        <p className="text-xs text-gray-400 text-center">{t("privacyNote")}</p>
      </form>
    </div>
  )
}
