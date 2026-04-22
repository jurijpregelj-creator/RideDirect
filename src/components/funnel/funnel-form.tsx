"use client"

import { useState, useRef } from "react"
import { Loader2, Upload, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { CATEGORIES, EUROPEAN_COUNTRIES } from "@/data/mock"
import type { FUNNEL_T, FunnelLang } from "./funnel-translations"

const CURRENCIES = ["EUR", "GBP", "PLN", "CHF", "SEK", "DKK", "NOK"]
const CONDITIONS = [
  { value: "new", label: "New" },
  { value: "like_new", label: "Like New" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "parts_only", label: "Parts Only" },
]

interface FunnelFormProps {
  t: typeof FUNNEL_T[FunnelLang]
  onSuccess: (listingId: string) => void
}

export function FunnelForm({ t, onSuccess }: FunnelFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [category, setCategory] = useState("")
  const [country, setCountry] = useState("")
  const [condition, setCondition] = useState("")
  const [currency, setCurrency] = useState("EUR")
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    if (imageFiles.length + files.length > 8) {
      setError("Maximum 8 photos.")
      return
    }
    setImageFiles(prev => [...prev, ...files])
    setImagePreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))])
    setError(null)
  }

  function removeImage(index: number) {
    URL.revokeObjectURL(imagePreviews[index])
    setImageFiles(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!category || !country || !condition) {
      setError("Please fill in all required fields.")
      return
    }

    // Read all form values BEFORE any async calls (React nullifies e.currentTarget after first await)
    const form = e.currentTarget
    const title = (form.elements.namedItem("title") as HTMLInputElement).value
    const description = (form.elements.namedItem("description") as HTMLTextAreaElement).value
    const price = parseFloat((form.elements.namedItem("price") as HTMLInputElement).value)
    const manufacturer = (form.elements.namedItem("manufacturer") as HTMLInputElement).value
    const yearRaw = (form.elements.namedItem("year") as HTMLInputElement).value
    const year = yearRaw ? parseInt(yearRaw) : null

    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      // Sign in anonymously if not already authenticated
      const { data: { user: existingUser } } = await supabase.auth.getUser()
      let userId = existingUser?.id

      if (!userId) {
        const { data: anonData, error: anonError } = await supabase.auth.signInAnonymously()
        if (anonError || !anonData.user) {
          throw new Error(anonError?.message || "Could not initialise session. Please try again.")
        }
        userId = anonData.user.id
      }

      // Create listing as draft
      const { data: listing, error: listingError } = await supabase
        .from("listings")
        .insert({
          seller_id: userId,
          title,
          description,
          category,
          country,
          price,
          currency,
          condition,
          manufacturer: manufacturer || null,
          year,
          ce_docs_available: false,
          inspection_available: false,
          status: "draft",
        })
        .select()
        .single()

      if (listingError || !listing) {
        throw new Error(listingError?.message || "Failed to save listing.")
      }

      // Upload images
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i]
        const ext = file.name.split(".").pop()
        const path = `${userId}/${listing.id}/${i}-${Date.now()}.${ext}`
        const { error: uploadError } = await supabase.storage
          .from("listing-images")
          .upload(path, file, { upsert: false })
        if (uploadError) continue
        const { data: { publicUrl } } = supabase.storage.from("listing-images").getPublicUrl(path)
        await supabase.from("listing_images").insert({
          listing_id: listing.id,
          image_url: publicUrl,
          sort_order: i,
        })
      }

      // Persist draft listing ID in case user refreshes before completing registration
      try { localStorage.setItem("funnel_listing_id", listing.id) } catch {}

      onSuccess(listing.id)
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Basic info */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4 shadow-sm">
        <h3 className="font-semibold text-[#0D2A5E]">{t.formTitle}</h3>

        <div>
          <Label htmlFor="title">Title *</Label>
          <Input id="title" name="title" placeholder="e.g. Zamperla Mini Jet — 12 Seats, Excellent Condition" required maxLength={120} className="mt-1.5" />
        </div>

        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea id="description" name="description" placeholder="Describe the ride: capacity, specs, history, condition…" required rows={5} className="mt-1.5" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Category *</Label>
            <Select onValueChange={setCategory}>
              <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select…" /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(cat => (
                  <SelectItem key={cat.slug} value={cat.name}>
                    <cat.icon size={13} className="inline-block shrink-0 mr-1" />{cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Country *</Label>
            <Select onValueChange={setCountry}>
              <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select…" /></SelectTrigger>
              <SelectContent>
                {EUROPEAN_COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4 shadow-sm">
        <h3 className="font-semibold text-[#0D2A5E]">Pricing</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="price">Asking Price *</Label>
            <Input id="price" name="price" type="number" min="1" placeholder="e.g. 25000" required className="mt-1.5" />
          </div>
          <div>
            <Label>Currency</Label>
            <Select defaultValue="EUR" onValueChange={setCurrency}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>{CURRENCIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Ride details */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4 shadow-sm">
        <h3 className="font-semibold text-[#0D2A5E]">Ride Details</h3>
        <div>
          <Label>Condition *</Label>
          <Select onValueChange={setCondition}>
            <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select condition…" /></SelectTrigger>
            <SelectContent>{CONDITIONS.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="manufacturer">Manufacturer</Label>
            <Input id="manufacturer" name="manufacturer" placeholder="e.g. Zamperla" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="year">Year</Label>
            <Input id="year" name="year" type="number" min="1950" max={new Date().getFullYear()} placeholder="e.g. 2015" className="mt-1.5" />
          </div>
        </div>
      </div>

      {/* Photos */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4 shadow-sm">
        <div>
          <h3 className="font-semibold text-[#0D2A5E]">Photos</h3>
          <p className="text-xs text-gray-400 mt-0.5">Up to 8 photos. High-quality images attract more buyers.</p>
        </div>

        {imagePreviews.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {imagePreviews.map((src, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
                {i === 0 && <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">Cover</div>}
                <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 w-6 h-6 bg-black/60 hover:bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <X size={12} />
                </button>
              </div>
            ))}
            {imagePreviews.length < 8 && (
              <button type="button" onClick={() => fileInputRef.current?.click()} className="aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-[#1E88E5] flex flex-col items-center justify-center text-gray-400 hover:text-[#1E88E5] transition-colors">
                <Upload size={16} /><span className="text-xs mt-1">Add</span>
              </button>
            )}
          </div>
        ) : (
          <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full h-28 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#1E88E5] flex flex-col items-center justify-center text-gray-400 hover:text-[#1E88E5] transition-colors gap-2">
            <Upload size={22} />
            <span className="text-sm font-medium">Click to upload photos</span>
            <span className="text-xs">JPG, PNG, WebP — up to 8</span>
          </button>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageSelect} />
      </div>

      <Button type="submit" variant="brand" size="lg" className="w-full text-base h-14 rounded-2xl" disabled={loading}>
        {loading ? (
          <><Loader2 size={18} className="animate-spin" />{t.submitting}</>
        ) : (
          <>{t.submitBtn}<ChevronRight size={18} /></>
        )}
      </Button>

      <p className="text-xs text-center text-gray-400">
        No account needed to submit. Your listing is saved before registration.
      </p>
    </form>
  )
}
