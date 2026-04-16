"use client"

import Link from "next/link"
import { useState } from "react"
import { Loader2, CheckCircle2 } from "lucide-react"
import { useTranslations } from "next-intl"
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
import { createClient } from "@/lib/supabase/client"
import { setLocale } from "@/app/actions/locale"
import { EUROPEAN_COUNTRIES } from "@/data/mock"

const LANGUAGES = [
  { code: "en", label: "English 🇬🇧" },
  { code: "de", label: "Deutsch 🇩🇪" },
  { code: "it", label: "Italiano 🇮🇹" },
]

export default function SignupPage() {
  const t = useTranslations("auth.signup")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [country, setCountry] = useState<string>("")
  const [language, setLanguage] = useState<string>("en")
  const [termsAccepted, setTermsAccepted] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const password = (form.elements.namedItem("password") as HTMLInputElement).value
    const fullName = (form.elements.namedItem("full_name") as HTMLInputElement).value

    if (!termsAccepted) {
      setError("You must accept the Terms of Service and Privacy Policy to continue.")
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, country, preferred_language: language, terms_accepted_at: new Date().toISOString() },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
    } else {
      await setLocale(language)
      setSuccess(true)
    }
    setLoading(false)
  }

  async function handleGoogleSignup() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  async function handleFacebookSignup() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md text-center">
          <CheckCircle2 size={56} className="text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#0D2A5E] mb-3">{t("checkEmail")}</h1>
          <p className="text-gray-500 mb-6">{t("checkEmailDesc")}</p>
          <Link href="/auth/login">
            <Button variant="brand">{t("backToSignIn")}</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#1E88E5] text-white font-bold flex items-center justify-center">
              AR
            </div>
            <span className="font-bold text-[#0D2A5E] text-xl">RideDirect<span className="text-gray-400">.eu</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-[#0D2A5E] mt-6 mb-1">{t("title")}</h1>
          <p className="text-gray-500 text-sm">{t("subtitle")}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          {/* Google OAuth */}
          <Button
            type="button"
            variant="outline"
            className="w-full mb-4"
            onClick={handleGoogleSignup}
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            {t("withGoogle")}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full mb-4"
            onClick={handleFacebookSignup}
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continue with Facebook
          </Button>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-gray-400">{t("orEmail")}</span>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="full_name">{t("fullName")} *</Label>
              <Input id="full_name" name="full_name" placeholder="John Smith" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="email">{t("email")} *</Label>
              <Input id="email" name="email" type="email" placeholder="john@company.com" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="password">{t("password")} *</Label>
              <Input id="password" name="password" type="password" placeholder={t("passwordHint")} minLength={8} required className="mt-1.5" />
            </div>
            <div>
              <Label>{t("country")} *</Label>
              <Select onValueChange={setCountry} required>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder={t("selectCountry")} />
                </SelectTrigger>
                <SelectContent>
                  {EUROPEAN_COUNTRIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>{t("preferredLanguage")} *</Label>
              <Select onValueChange={setLanguage} defaultValue="en">
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((l) => (
                    <SelectItem key={l.code} value={l.code}>{l.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clickwrap */}
            <div className="flex items-start gap-3 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-[#1E88E5] cursor-pointer shrink-0"
              />
              <label htmlFor="terms" className="text-xs text-gray-500 leading-relaxed cursor-pointer">
                I have read and agree to the{" "}
                <Link href="/legal/terms" target="_blank" className="text-[#1E88E5] underline hover:text-[#1565C0]">Terms of Service</Link>{" "}
                and{" "}
                <Link href="/legal/privacy" target="_blank" className="text-[#1E88E5] underline hover:text-[#1565C0]">Privacy Policy</Link>.
              </label>
            </div>

            <Button type="submit" variant="brand" className="w-full" disabled={loading || !termsAccepted}>
              {loading ? (<><Loader2 size={16} className="animate-spin" /> {t("creating")}</>) : t("createAccount")}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          {t("alreadyAccount")}{" "}
          <Link href="/auth/login" className="text-[#1E88E5] hover:underline font-medium">
            {t("signIn")}
          </Link>
        </p>
      </div>
    </div>
  )
}
