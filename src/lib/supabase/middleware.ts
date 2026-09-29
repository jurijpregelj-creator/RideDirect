import { createServerClient } from "@supabase/ssr"
import type { User } from "@supabase/supabase-js"
import { NextResponse, type NextRequest } from "next/server"

// Vercel kills middleware that doesn't respond within 25s. A slow Supabase
// auth call used to hang every page for the full 25s and then fail; now we
// give up after this long and serve the page as signed-out-for-this-request.
const AUTH_TIMEOUT_MS = 5000

export async function updateSession(request: NextRequest): Promise<{ response: NextResponse; user: User | null; timedOut: boolean }> {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session
  let user: User | null = null
  let timedOut = false
  try {
    const result = await Promise.race([
      supabase.auth.getUser(),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), AUTH_TIMEOUT_MS)),
    ])
    if (result === null) {
      timedOut = true
      console.warn("[middleware] Supabase getUser timed out after", AUTH_TIMEOUT_MS, "ms:", request.nextUrl.pathname)
    } else {
      user = result.data.user
      // A stale/rotated refresh token can never succeed again; clear the auth
      // cookies so the browser stops retrying it on every request and the
      // user just sees the normal signed-out state.
      if (result.error?.code === "refresh_token_not_found" || result.error?.code === "refresh_token_already_used") {
        for (const c of request.cookies.getAll()) {
          if (c.name.startsWith("sb-") && c.name.includes("-auth-token")) {
            supabaseResponse.cookies.set(c.name, "", { path: "/", maxAge: 0 })
          }
        }
      }
    }
  } catch (err) {
    console.error("[middleware] Supabase getUser failed:", err)
  }

  return { response: supabaseResponse, user, timedOut }
}
