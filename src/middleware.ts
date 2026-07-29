import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { updateSession } from "@/lib/supabase/middleware"

// Kept as a plain literal (not imported from src/lib/translate-listing.ts)
// because that file pulls in deepl-node / the Supabase admin client, which
// are not safe to bundle into the Edge middleware runtime.
const URL_LOCALE_PATTERN = /^\/(de|it|fr|es|nl|pl|pt)(\/|$)/

export async function middleware(request: NextRequest) {
  // 0. Detect a locale prefix (/de/..., /fr, etc.) and expose it to Server
  // Components downstream via a request header — Header/Footer live in the
  // root layout, shared by every route, and need to know whether the current
  // page is one of the URL-localized ones (public marketing pages) or a
  // cookie-driven one (dashboard/admin/auth) that should be left alone.
  const urlLocaleMatch = request.nextUrl.pathname.match(URL_LOCALE_PATTERN)
  if (urlLocaleMatch) {
    request.headers.set("x-url-locale", urlLocaleMatch[1])
  }

  // 1. Handle Supabase session
  const supabaseResponse = await updateSession(request)

  // 2. Protect /admin routes (but not /admin-key/<secret>, the bootstrap route
  // that ISSUES the admin_pass cookie — startsWith("/admin") would otherwise
  // match "/admin-key/..." too and redirect it to login before it ever runs)
  const path = request.nextUrl.pathname
  if (path === "/admin" || path.startsWith("/admin/")) {
    // Backdoor cookie bypasses Supabase entirely
    if (request.cookies.get("admin_pass")?.value === "1") {
      // cookie present — allow through, layout will render
    } else {
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
  }

  // 3. Sync NEXT_LOCALE to a URL-locale prefix whenever one is present, so
  // cookie-driven pages reached by clicking through from a localized page
  // (e.g. /pl/sell -> /auth/signup) inherit the same language instead of
  // falling back to whatever the cookie previously held.
  if (urlLocaleMatch) {
    supabaseResponse.cookies.set("NEXT_LOCALE", urlLocaleMatch[1], {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    })
  } else if (!request.cookies.get("NEXT_LOCALE")) {
    // Auto-detect locale on first visit to a non-prefixed page
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
