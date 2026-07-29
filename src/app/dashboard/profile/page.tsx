"use client"

import { useEffect, useState } from "react"
import { redirect, useRouter } from "next/navigation"
import { Loader2, Save, ArrowLeft, ShieldCheck, Trash2 } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { setLocale } from "@/app/actions/locale"
import { AvatarUpload } from "@/components/profile/avatar-upload"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { EUROPEAN_COUNTRIES } from "@/data/mock"
import { SUPPORTED_LISTING_LOCALES, PREFERRED_LANGUAGES, type ListingLocale } from "@/lib/locales"
import { PROFILE_T } from "@/app/dashboard/dashboard-translations"
import { AUTH_T } from "@/components/auth/auth-translations"
import { COUNTRY_NAMES } from "@/components/listing/listing-form-translations"
import type { Metadata } from "next"

function readLocaleCookie(): ListingLocale {
  if (typeof document === "undefined") return "en"
  const match = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]+)/)
  const value = match ? decodeURIComponent(match[1]) : ""
  return (SUPPORTED_LISTING_LOCALES as readonly string[]).includes(value) ? (value as ListingLocale) : "en"
}

export default function ProfilePage() {
  const router = useRouter()
  const [pageLocale, setPageLocale] = useState<ListingLocale>("en")
  const t = PROFILE_T[pageLocale]
  const authT = AUTH_T[pageLocale]
  const countryNames = COUNTRY_NAMES[pageLocale]
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [userId, setUserId] = useState("")
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [fullName, setFullName] = useState("")
  const [country, setCountry] = useState("")
  const [language, setLanguage] = useState("en")
  const [email, setEmail] = useState("")

  useEffect(() => {
    setPageLocale(readLocaleCookie())
  }, [])

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push("/auth/login"); return }

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, country, preferred_language, email, avatar_url")
        .eq("id", user.id)
        .single()

      setUserId(user.id)
      setEmail(user.email || "")
      setFullName(profile?.full_name || "")
      setCountry(profile?.country || "")
      setLanguage(profile?.preferred_language || "en")
      setAvatarUrl(profile?.avatar_url || null)
      setLoading(false)
    }
    load()
  }, [router])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        country,
        preferred_language: language,
      })
      .eq("id", user.id)

    if (updateError) {
      setError(t.failedToSave)
      setSaving(false)
    } else {
      // Apply language change immediately via cookie
      await setLocale(language)
      setSuccess(true)
      // Reload so next-intl picks up the new locale
      setTimeout(() => window.location.reload(), 800)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-[#1E88E5]" size={32} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 max-w-lg">
        <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1E88E5] transition-colors mb-6">
          <ArrowLeft size={16} />
          {t.backToDashboard}
        </Link>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="flex items-center gap-4 mb-8">
            <AvatarUpload
              userId={userId}
              currentUrl={avatarUrl}
              initials={(fullName || email || "U").split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)}
            />
            <div>
              <h1 className="text-2xl font-bold text-[#0D2A5E]">{t.editProfileTitle}</h1>
              <p className="text-sm text-gray-400">{t.avatarHint}</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-100 text-green-600 text-sm px-4 py-3 rounded-xl mb-6">
              {t.changesSavedSuccess}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <Label>{t.emailLabel}</Label>
              <Input value={email} disabled className="mt-1.5 bg-gray-50 text-gray-400 cursor-not-allowed" />
              <p className="text-xs text-gray-400 mt-1">{t.emailCannotChange}</p>
            </div>

            <div>
              <Label htmlFor="full_name">{authT.fullName} *</Label>
              <Input
                id="full_name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t.fullNamePlaceholder}
                required
                className="mt-1.5"
              />
            </div>

            <div>
              <Label>{authT.country} *</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder={authT.selectCountry} />
                </SelectTrigger>
                <SelectContent>
                  {EUROPEAN_COUNTRIES.map((c) => (
                    <SelectItem key={c} value={c}>{countryNames[c] || c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>{authT.preferredLanguage}</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PREFERRED_LANGUAGES.map((l) => (
                    <SelectItem key={l.code} value={l.code}>{l.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" variant="brand" className="w-full" disabled={saving}>
              {saving ? <><Loader2 size={16} className="animate-spin" /> {t.saving}</> : <><Save size={16} /> {t.saveChanges}</>}
            </Button>
          </form>
        </div>

        {/* GDPR rights */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mt-6">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck size={18} className="text-[#1E88E5]" />
            <h2 className="text-base font-semibold text-[#0D2A5E]">{t.privacyRightsTitle}</h2>
          </div>
          <p className="text-xs text-gray-400 mb-5">
            {t.privacyRightsDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`mailto:info@ridedirect.eu?subject=Data export request&body=Hi, I would like to request an export of all personal data associated with my account (${email}).`}
              className="flex-1"
            >
              <Button type="button" variant="outline" className="w-full text-sm gap-2">
                <ShieldCheck size={15} />
                {t.requestMyData}
              </Button>
            </a>
            <a
              href={`mailto:info@ridedirect.eu?subject=Account deletion request&body=Hi, I would like to permanently delete my RideDirect account and all associated data (${email}).`}
              className="flex-1"
            >
              <Button type="button" variant="outline" className="w-full text-sm gap-2 text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300">
                <Trash2 size={15} />
                {t.deleteMyAccount}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
