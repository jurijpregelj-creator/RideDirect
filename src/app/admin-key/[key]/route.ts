import { NextResponse, type NextRequest } from "next/server"

// Bulletproof admin access: bypasses Supabase auth entirely.
// Visit /admin-key/<SECRET> once → cookie set → /admin accessible for 30 days.
const SECRET = "rd2026-jp-master-key-x9q7"

export async function GET(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  const { origin } = new URL(request.url)

  if (params.key !== SECRET) {
    return NextResponse.redirect(`${origin}/`)
  }

  const response = NextResponse.redirect(`${origin}/admin`)
  response.cookies.set("admin_pass", "1", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
  return response
}
