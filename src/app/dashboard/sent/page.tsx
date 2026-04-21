import { redirect } from "next/navigation"

// Sent inquiries are now part of /dashboard/messages (full two-way chat)
export default function SentRedirect() {
  redirect("/dashboard/messages")
}
