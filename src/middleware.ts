import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import createIntlMiddleware from "next-intl/middleware"
import { updateSession } from "@/lib/supabase/middleware"
import { routing } from "@/i18n/routing"

const intlMiddleware = createIntlMiddleware(routing)

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

  // 3. Run intl middleware (locale detection + NEXT_LOCALE cookie)
  const intlResponse = intlMiddleware(request)

  // 4. Copy locale header so next-intl server components can read it
  const locale = intlResponse.headers.get("x-next-intl-locale")
  if (locale) {
    supabaseResponse.headers.set("x-next-intl-locale", locale)
  }

  // 5. Copy locale cookie if set by intl middleware
  for (const cookie of intlResponse.cookies.getAll()) {
    supabaseResponse.cookies.set(cookie.name, cookie.value, {
      path: cookie.path || "/",
      maxAge: cookie.maxAge,
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
