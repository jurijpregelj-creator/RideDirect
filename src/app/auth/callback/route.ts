import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/marketplace"

  if (code) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error && data.user) {
      const avatarUrl =
        data.user.user_metadata?.avatar_url ||
        data.user.user_metadata?.picture ||
        null

      // Always sync email + avatar_url to profiles
      const termsAcceptedAt = data.user.user_metadata?.terms_accepted_at || null
      await supabase
        .from("profiles")
        .update({
          email: data.user.email,
          ...(avatarUrl ? { avatar_url: avatarUrl } : {}),
          ...(termsAcceptedAt ? { terms_accepted_at: termsAcceptedAt } : {}),
        })
        .eq("id", data.user.id)

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`)
}
