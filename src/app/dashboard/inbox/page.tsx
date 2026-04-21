import { redirect } from "next/navigation"

// Old inbox — redirected to the new messages page
export default function InboxRedirect() {
  redirect("/dashboard/messages")
}
