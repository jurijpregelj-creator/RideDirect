"use client"

import { useState } from "react"
import { Mail, Globe2, MessageSquare, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { sendContactMessage } from "@/app/contact/actions"
import type { ListingLocale } from "@/lib/locales"
import { CONTACT_T } from "@/app/contact/contact-translations"
import { AUTH_T } from "@/components/auth/auth-translations"

export function ContactPageContent({ locale }: { locale: ListingLocale }) {
  const t = CONTACT_T[locale]
  const authT = AUTH_T[locale]
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [subject, setSubject] = useState("")

  const CONTACT_INFO = [
    { icon: Mail, label: t.emailLabel, value: "info@ridedirect.eu", description: t.emailDesc },
    { icon: Globe2, label: t.coverageLabel, value: t.coverageValue, description: t.coverageDesc },
    { icon: MessageSquare, label: t.languagesLabel, value: t.languagesValue, description: t.languagesDesc },
  ]

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const name = (form.elements.namedItem("name") as HTMLInputElement).value
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const company = (form.elements.namedItem("company") as HTMLInputElement).value
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value

    const result = await sendContactMessage({ name, email, company, subject, message })

    if (result.success) {
      setSubmitted(true)
    } else {
      setError(t.errorGeneric)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#0D2A5E] mb-3">
            {t.headerTitle}
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            {t.headerSub}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {/* Contact info */}
          <div className="space-y-6">
            <div>
              <h2 className="font-semibold text-[#0D2A5E] text-lg mb-1">{t.getInTouchTitle}</h2>
              <p className="text-sm text-gray-500">
                {t.getInTouchSub}
              </p>
            </div>

            {CONTACT_INFO.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <item.icon size={18} className="text-[#1E88E5]" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">{item.label}</div>
                  <div className="font-medium text-[#0D2A5E] text-sm">{item.value}</div>
                  <div className="text-xs text-gray-400">{item.description}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white rounded-xl border border-gray-100 p-10 text-center">
                <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#0D2A5E] mb-2">{t.messageSentTitle}</h3>
                <p className="text-gray-500">
                  {t.messageSentDesc}
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="font-semibold text-[#0D2A5E] text-lg mb-6">{t.sendMessageTitle}</h2>

                {error && (
                  <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">{authT.fullName} *</Label>
                      <Input id="name" name="name" placeholder="John Smith" required className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="email">{authT.emailAddress} *</Label>
                      <Input id="email" name="email" type="email" placeholder="john@company.com" required className="mt-1.5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">{t.company}</Label>
                      <Input id="company" name="company" placeholder={t.companyPlaceholder} className="mt-1.5" />
                    </div>
                    <div>
                      <Label>{t.subject} *</Label>
                      <Select onValueChange={setSubject} required>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder={t.selectATopic} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buying">{t.subjectOptions.buying}</SelectItem>
                          <SelectItem value="selling">{t.subjectOptions.selling}</SelectItem>
                          <SelectItem value="account">{t.subjectOptions.account}</SelectItem>
                          <SelectItem value="listing_issue">{t.subjectOptions.listingIssue}</SelectItem>
                          <SelectItem value="partnership">{t.subjectOptions.partnership}</SelectItem>
                          <SelectItem value="other">{t.subjectOptions.other}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">{t.message} *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={t.messagePlaceholder}
                      required
                      rows={5}
                      className="mt-1.5"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="brand"
                    className="w-full"
                    disabled={loading || !subject}
                  >
                    {loading ? (
                      <><Loader2 size={16} className="animate-spin" /> {t.sending}</>
                    ) : (
                      t.sendMessage
                    )}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
