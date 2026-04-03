"use client"

import Link from "next/link"
import { useState } from "react"
import { Loader2, CheckCircle2 } from "lucide-react"
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
import { EUROPEAN_COUNTRIES } from "@/data/mock"

export default function SignupPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [role, setRole] = useState<string>("buyer")
  const [country, setCountry] = useState<string>("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const password = (form.elements.namedItem("password") as HTMLInputElement).value
    const fullName = (form.elements.namedItem("full_name") as HTMLInputElement).value

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role,
          country,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  async function handleGoogleSignup() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md text-center">
          <CheckCircle2 size={56} className="text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#0F1B3D] mb-3">Check your email</h1>
          <p className="text-gray-500 mb-6">
            We&apos;ve sent a confirmation link to your email address. Click the link to activate your account.
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
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#1B4FD8] text-white font-bold flex items-center justify-center">
              AR
            </div>
            <span className="font-bold text-[#0F1B3D] text-xl">RideDirect<span className="text-gray-400">.eu</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-[#0F1B3D] mt-6 mb-1">Create your account</h1>
          <p className="text-gray-500 text-sm">Join Europe&apos;s amusement ride marketplace</p>
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
            Continue with Google
          </Button>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-gray-400">or sign up with email</span>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="full_name">Full Name *</Label>
              <Input id="full_name" name="full_name" placeholder="John Smith" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" name="email" type="email" placeholder="john@company.com" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="password">Password *</Label>
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
              <Label>I want to *</Label>
              <div className="grid grid-cols-2 gap-3 mt-1.5">
                <button
                  type="button"
                  onClick={() => setRole("buyer")}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors text-left ${
                    role === "buyer"
                      ? "border-[#1B4FD8] bg-blue-50 text-[#1B4FD8]"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  🛒 Buy rides
                </button>
                <button
                  type="button"
                  onClick={() => setRole("seller")}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors text-left ${
                    role === "seller"
                      ? "border-[#1B4FD8] bg-blue-50 text-[#1B4FD8]"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  🏷️ Sell rides
                </button>
              </div>
            </div>
            <div>
              <Label>Country *</Label>
              <Select onValueChange={setCountry} required>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {EUROPEAN_COUNTRIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" variant="brand" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Free Account"
              )}
            </Button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-4">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-gray-600">Terms of Service</Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-gray-600">Privacy Policy</Link>.
          </p>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#1B4FD8] hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
