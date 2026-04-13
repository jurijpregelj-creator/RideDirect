"use client"

import { useState, useRef } from "react"
import { Camera, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface AvatarUploadProps {
  userId: string
  currentUrl?: string | null
  initials: string
}

export function AvatarUpload({ userId, currentUrl, initials }: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentUrl || null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Preview immediately
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    setUploading(true)

    const supabase = createClient()
    const ext = file.name.split(".").pop()
    const path = `${userId}/avatar.${ext}`

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true })

    if (uploadError) {
      setUploading(false)
      setPreview(currentUrl || null)
      return
    }

    const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path)

    await supabase.from("profiles").update({ avatar_url: publicUrl }).eq("id", userId)

    setUploading(false)
    router.refresh()
  }

  return (
    <div className="relative group cursor-pointer" onClick={() => inputRef.current?.click()}>
      <div className="w-16 h-16 rounded-full overflow-hidden bg-[#1E88E5] text-white font-bold text-xl flex items-center justify-center shrink-0">
        {preview ? (
          <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          initials
        )}
      </div>
      <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        {uploading ? (
          <Loader2 size={18} className="text-white animate-spin" />
        ) : (
          <Camera size={18} className="text-white" />
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  )
}
