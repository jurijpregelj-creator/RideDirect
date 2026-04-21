"use client"

import Link from "next/link"
import { useState } from "react"
import { Loader2, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const password = (form.elements.namedItem("password") as HTMLInputElement).value
    const confirm = (form.elements.namedItem("confirm") as HTMLInputElement).value

    if (password !== confirm) {
      setError("Passwords do not match.")
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
    } else {
      setDone(true)
      setTimeout(() => router.push("/dashboard"), 2000)
    }
    setLoading(false)
  }

  if (done) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md text-center">
          <CheckCircle2 size={56} className="text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#0D2A5E] mb-3">Password updated!</h1>
          <p className="text-gray-500">Redirecting you to your dashboard...</p>
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
          <h1 className="text-2xl font-bold text-[#0D2A5E] mt-6 mb-1">Set new password</h1>
          <p className="text-gray-500 text-sm">Choose a strong password for your account.</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Min. 8 characters"
                minLength={8}
                required
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input
                id="confirm"
                name="confirm"
                type="password"
                placeholder="Repeat password"
                minLength={8}
                required
                className="mt-1.5"
              />
            </div>
            <Button type="submit" variant="brand" className="w-full" disabled={loading}>
              {loading ? <><Loader2 size={16} className="animate-spin" /> Updating...</> : "Update Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
