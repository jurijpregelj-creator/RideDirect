"use server"

import { cookies } from "next/headers"

const VALID_LOCALES = ["en", "de", "it"]

export async function setLocale(locale: string) {
  if (!VALID_LOCALES.includes(locale)) return
  const cookieStore = await cookies()
  cookieStore.set("NEXT_LOCALE", locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  })
}
