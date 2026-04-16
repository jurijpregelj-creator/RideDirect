"use client"

import { useEffect, useState } from "react"
import { redirect, useRouter } from "next/navigation"
import { Loader2, Save, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
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
import type { Metadata } from "next"

const LANGUAGES = [
  { code: "en", label: "English 🇬🇧" },
  { code: "de", label: "Deutsch 🇩🇪" },
  { code: "it", label: "Italiano 🇮🇹" },
]

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [fullName, setFullName] = useState("")
  const [country, setCountry] = useState("")
  const [language, setLanguage] = useState("en")
  const [email, setEmail] = useState("")

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push("/auth/login"); return }

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, country, preferred_language, email")
        .eq("id", user.id)
        .single()

      setEmail(user.email || "")
      setFullName(profile?.full_name || "")
      setCountry(profile?.country || "")
      setLanguage(profile?.preferred_language || "en")
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
      setError("Failed to save changes. Please try again.")
    } else {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
    setSaving(false)
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
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h1 className="text-2xl font-bold text-[#0D2A5E] mb-1">Edit Profile</h1>
          <p className="text-sm text-gray-400 mb-8">Update your account details</p>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-100 text-green-600 text-sm px-4 py-3 rounded-xl mb-6">
              ✓ Changes saved successfully
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <Label>Email</Label>
              <Input value={email} disabled className="mt-1.5 bg-gray-50 text-gray-400 cursor-not-allowed" />
              <p className="text-xs text-gray-400 mt-1">Email cannot be changed here. Contact support if needed.</p>
            </div>

            <div>
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                required
                className="mt-1.5"
              />
            </div>

            <div>
              <Label>Country *</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {EUROPEAN_COUNTRIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Preferred Language</Label>
              <Select value={language} onValueChange={setLanguage}>
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

            <Button type="submit" variant="brand" className="w-full" disabled={saving}>
              {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> Save Changes</>}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
