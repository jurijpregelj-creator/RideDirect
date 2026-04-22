import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const leadId = form.get("leadId") as string
    const claimToken = form.get("claimToken") as string
    const file = form.get("file") as File
    const index = parseInt((form.get("index") as string) || "0")

    if (!leadId || !claimToken || !file) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Verify lead exists with matching claim token (anti-abuse)
    const { data: lead } = await supabase
      .from("leads")
      .select("id")
      .eq("id", leadId)
      .eq("claim_token", claimToken)
      .single()

    if (!lead) {
      return NextResponse.json({ error: "Invalid lead" }, { status: 403 })
    }

    const ext = file.name.split(".").pop() || "jpg"
    const path = `leads/${leadId}/${index}-${Date.now()}.${ext}`
    const buffer = Buffer.from(await file.arrayBuffer())

    const { error: uploadError } = await supabase.storage
      .from("listing-images")
      .upload(path, buffer, { contentType: file.type, upsert: false })

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    const { data: { publicUrl } } = supabase.storage
      .from("listing-images")
      .getPublicUrl(path)

    return NextResponse.json({ url: publicUrl })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 })
  }
}
