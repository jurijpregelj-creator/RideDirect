import { createClient } from "@supabase/supabase-js"

// Service role client — bypasses RLS, only use in server-side admin code
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// Nothing ever flips a listing's status to "expired" once its expires_at
// passes — sellers can't (RLS only allows updates while draft/pending), and
// there's no cron job. Call this before reading listings so pages don't show
// a stale "Active" status for listings past their expiry date.
export async function expireStaleListings() {
  await createAdminClient()
    .from("listings")
    .update({ status: "expired" })
    .eq("status", "approved")
    .lt("expires_at", new Date().toISOString())
}
