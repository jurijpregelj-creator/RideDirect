"use client"

import { useState } from "react"
import { Loader2, CheckCircle2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { EUROPEAN_COUNTRIES } from "@/data/mock"
import type { FUNNEL_T, FunnelLang } from "./funnel-translations"

interface FunnelRegisterProps {
  t: typeof FUNNEL_T[FunnelLang]
  listingId: string
  onBack: () => void
}

export function FunnelRegister({ t, listingId, onBack }: FunnelRegisterProps) {
  const r = t.register
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [emailSent, setEmailSent] = useState<string | null>(null)
  const [country, setCountry] = useState("")

  const redirectTo = typeof window !== "undefined"
    ? `${window.location.origin}/auth/callback?next=/dashboard?submitted=1`
    : "/auth/callback?next=/dashboard?submitted=1"

  async function handleGoogle() {
    setLoading(true)
    const supabase = createClient()
    // linkIdentity keeps the same user_id → draft listing stays connected
    await supabase.auth.linkIdentity({
      provider: "google",
      options: { redirectTo },
    })
  }

  async function handleFacebook() {
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.linkIdentity({
      provider: "facebook",
      options: { redirectTo },
    })
  }

  async function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const form = e.currentTarget
    const fullName = (form.elements.namedItem("full_name") as HTMLInputElement).value
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const password = (form.elements.namedItem("password") as HTMLInputElement).value

    if (!country) {
      setError("Please select your country.")
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()

      // Convert anonymous user → real user (same user_id, draft listing stays linked)
      // Also update profile metadata
      const { error: updateError } = await supabase.auth.updateUser(
        {
          email,
          password,
          data: {
            full_name: fullName,
            country,
            terms_accepted_at: new Date().toISOString(),
          },
        },
        {
          emailRedirectTo: redirectTo,
        }
      )

      if (updateError) throw updateError

      // Update profile with name + country immediately
      await supabase.from("profiles").update({
        full_name: fullName,
        country,
        email,
      }).eq("id", (await supabase.auth.getUser()).data.user?.id ?? "")

      setEmailSent(email)
    } catch (err: any) {
      setError(err.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  // Email sent confirmation screen
  if (emailSent) {
    return (
      <div className="text-center py-8 px-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-[#0D2A5E] mb-2">{r.checkEmail}</h2>
        <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
          {r.checkEmailSub(emailSent)}
        </p>
        <p className="text-xs text-gray-400 mt-6">
          Your listing is saved and will be published as soon as you verify your email.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          <CheckCircle2 size={11} />
          Listing saved — Step 2 of 2
        </div>
        <h2 className="text-xl font-bold text-[#0D2A5E] leading-snug">{r.title}</h2>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">{r.sub}</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* OAuth buttons */}
      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          className="w-full h-12 rounded-xl text-sm font-medium"
          onClick={handleGoogle}
          disabled={loading}
        >
          <svg className="w-4 h-4 mr-2 shrink-0" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          {r.google}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full h-12 rounded-xl text-sm font-medium"
          onClick={handleFacebook}
          disabled={loading}
        >
          <svg className="w-4 h-4 mr-2 shrink-0" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          {r.facebook}
        </Button>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 text-gray-400">{r.orEmail}</span>
        </div>
      </div>

      {/* Email form */}
      <form onSubmit={handleEmailSubmit} className="space-y-3">
        <div>
          <Label htmlFor="full_name">{r.name} *</Label>
          <Input id="full_name" name="full_name" placeholder="John Smith" required className="mt-1.5 rounded-xl" />
        </div>
        <div>
          <Label htmlFor="email">{r.email} *</Label>
          <Input id="email" name="email" type="email" placeholder="john@company.com" required className="mt-1.5 rounded-xl" />
        </div>
        <div>
          <Label htmlFor="password">{r.password} *</Label>
          <Input id="password" name="password" type="password" placeholder={r.passwordHint} minLength={8} required className="mt-1.5 rounded-xl" />
        </div>
        <div>
          <Label>{r.country} *</Label>
          <Select onValueChange={setCountry}>
            <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue placeholder="Select…" /></SelectTrigger>
            <SelectContent>
              {EUROPEAN_COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <p className="text-xs text-gray-400 leading-relaxed">
          {r.terms}{" "}
          <Link href="/legal/terms" target="_blank" className="underline hover:text-[#1E88E5]">Terms</Link>
          {" & "}
          <Link href="/legal/privacy" target="_blank" className="underline hover:text-[#1E88E5]">Privacy</Link>.
        </p>

        <Button type="submit" variant="brand" className="w-full h-12 rounded-xl" disabled={loading}>
          {loading ? <><Loader2 size={16} className="animate-spin" />{r.creating}</> : r.createBtn}
        </Button>
      </form>

      {/* Already have account */}
      <p className="text-center text-xs text-gray-400">
        {r.alreadyHave}{" "}
        <Link href={`/auth/login?next=/dashboard`} className="text-[#1E88E5] hover:underline font-medium">
          {r.signIn}
        </Link>
      </p>

      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors mx-auto"
      >
        <ArrowLeft size={12} />{r.backToForm}
      </button>
    </div>
  )
}
