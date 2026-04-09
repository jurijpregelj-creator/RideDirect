import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { updateSession } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  // 1. Handle Supabase session
  const supabaseResponse = await updateSession(request)

  // 2. Protect /admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return request.cookies.getAll() },
          setAll() {},
        },
      }
    )
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.redirect(new URL("/auth/login?next=/admin", request.url))
    }
  }

  // 3. Auto-detect locale on first visit (if no NEXT_LOCALE cookie yet)
  if (!request.cookies.get("NEXT_LOCALE")) {
    const acceptLang = request.headers.get("accept-language") ?? ""
    const detected = acceptLang.split(",")[0].split("-")[0].toLowerCase()
    const valid = ["en", "de", "it"].includes(detected) ? detected : "en"
    supabaseResponse.cookies.set("NEXT_LOCALE", valid, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    })
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
