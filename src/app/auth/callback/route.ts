import { createServerClient } from "@supabase/ssr"
import { createClient as createAdminClient } from "@supabase/supabase-js"
import { NextResponse, type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/dashboard"

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`)
  }

  // Collect cookies written during session exchange so we can attach them to the redirect
  const cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[] = []

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookies) { cookiesToSet.push(...cookies) },
      },
    }
  )

  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !data.user) {
    return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`)
  }

  // Sync email + avatar + terms to profile
  const avatarUrl =
    data.user.user_metadata?.avatar_url ||
    data.user.user_metadata?.picture ||
    null
  const termsAcceptedAt =
    data.user.user_metadata?.terms_accepted_at || new Date().toISOString()

  await supabase
    .from("profiles")
    .update({
      email: data.user.email,
      ...(avatarUrl ? { avatar_url: avatarUrl } : {}),
      terms_accepted_at: termsAcceptedAt,
    })
    .eq("id", data.user.id)

  // Use service role to read role — bypasses RLS, always reliable
  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const { data: profile } = await admin
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single()

  // Don't override next= for password reset flow
  const redirectTo =
    profile?.role === "admin" && next !== "/auth/reset-password" ? "/admin" : next

  // Build the redirect and attach session cookies to it
  const response = NextResponse.redirect(`${origin}${redirectTo}`)
  cookiesToSet.forEach(({ name, value, options }) => {
    response.cookies.set(name, value, options as Parameters<typeof response.cookies.set>[2])
  })
  return response
}
