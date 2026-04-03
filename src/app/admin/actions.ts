"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

async function requireAdmin() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()
  if (profile?.role !== "admin") throw new Error("Forbidden")
  return supabase
}

export async function approveListing(listingId: string) {
  const supabase = await requireAdmin()
  const expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
  await supabase
    .from("listings")
    .update({ status: "approved", expires_at: expiresAt })
    .eq("id", listingId)
  revalidatePath("/admin/listings")
  revalidatePath("/marketplace")
}

export async function rejectListing(listingId: string) {
  const supabase = await requireAdmin()
  await supabase
    .from("listings")
    .update({ status: "rejected", expires_at: null })
    .eq("id", listingId)
  revalidatePath("/admin/listings")
  revalidatePath("/marketplace")
}

export async function extendListing(listingId: string) {
  const supabase = await requireAdmin()
  // Extend 90 days from now (or from current expires_at if it's in the future)
  const { data } = await supabase.from("listings").select("expires_at").eq("id", listingId).single()
  const base = data?.expires_at && new Date(data.expires_at) > new Date()
    ? new Date(data.expires_at)
    : new Date()
  const expiresAt = new Date(base.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString()
  await supabase
    .from("listings")
    .update({ status: "approved", expires_at: expiresAt })
    .eq("id", listingId)
  revalidatePath("/admin/listings")
}

export async function deleteListing(listingId: string) {
  const supabase = await requireAdmin()
  await supabase.from("listings").delete().eq("id", listingId)
  revalidatePath("/admin/listings")
  revalidatePath("/marketplace")
}
