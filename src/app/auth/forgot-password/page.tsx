"use client"

import Link from "next/link"
import { useState } from "react"
import { Loader2, CheckCircle2, ArrowLeft } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value
    const supabase = createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md text-center">
          <CheckCircle2 size={56} className="text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#0D2A5E] mb-3">Check your email</h1>
          <p className="text-gray-500 mb-6">
            We've sent a password reset link to your email address. Click the link to set a new password.
          </p>
          <Link href="/auth/login">
            <Button variant="brand">Back to Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#1E88E5] text-white font-bold flex items-center justify-center text-sm">
              RD
            </div>
            <span className="font-bold text-[#0D2A5E] text-xl">RideDirect<span className="text-gray-400">.eu</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-[#0D2A5E] mt-6 mb-1">Reset your password</h1>
          <p className="text-gray-500 text-sm">Enter your email and we'll send you a reset link.</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@company.com"
                required
                className="mt-1.5"
              />
            </div>
            <Button type="submit" variant="brand" className="w-full" disabled={loading}>
              {loading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : "Send Reset Link"}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          <Link href="/auth/login" className="inline-flex items-center gap-1 text-[#1E88E5] hover:underline font-medium">
            <ArrowLeft size={14} />
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
