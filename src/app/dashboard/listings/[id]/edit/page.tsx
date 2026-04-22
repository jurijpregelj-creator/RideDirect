"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { Loader2, Upload, X, ArrowLeft, Save, Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { CATEGORIES, EUROPEAN_COUNTRIES } from "@/data/mock"

const CURRENCIES = ["EUR", "GBP", "PLN", "CHF", "SEK", "DKK", "NOK"]
const CONDITIONS = [
  { value: "new", label: "New" },
  { value: "like_new", label: "Like New" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "parts_only", label: "Parts Only" },
]

export default function EditListingPage() {
  const router = useRouter()
  const params = useParams()
  const listingId = params.id as string
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Form fields
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [currency, setCurrency] = useState("EUR")
  const [category, setCategory] = useState("")
  const [country, setCountry] = useState("")
  const [condition, setCondition] = useState("")
  const [manufacturer, setManufacturer] = useState("")
  const [year, setYear] = useState("")

  // Images
  const [existingImages, setExistingImages] = useState<{ id: string; image_url: string; sort_order: number }[]>([])
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [newPreviews, setNewPreviews] = useState<string[]>([])
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([])
  const [coverImageId, setCoverImageId] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push("/auth/login"); return }

      const { data: listing, error } = await supabase
        .from("listings")
        .select("*, listing_images(id, image_url, sort_order)")
        .eq("id", listingId)
        .eq("seller_id", user.id)
        .single()

      if (error || !listing) {
        router.push("/dashboard")
        return
      }

      setTitle(listing.title || "")
      setDescription(listing.description || "")
      setPrice(String(listing.price || ""))
      setCurrency(listing.currency || "EUR")
      setCategory(listing.category || "")
      setCountry(listing.country || "")
      setCondition(listing.condition || "")
      setManufacturer(listing.manufacturer || "")
      setYear(listing.year ? String(listing.year) : "")
      const sorted = (listing.listing_images || []).sort((a: any, b: any) => a.sort_order - b.sort_order)
      setExistingImages(sorted)
      if (sorted.length > 0) setCoverImageId(sorted[0].id)
      setLoading(false)
    }
    load()
  }, [listingId, router])

  function handleNewImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    const total = existingImages.length - deletedImageIds.length + newFiles.length + files.length
    if (total > 8) { setError("Maximum 8 images total."); return }
    const previews = files.map((f) => URL.createObjectURL(f))
    setNewFiles((prev) => [...prev, ...files])
    setNewPreviews((prev) => [...prev, ...previews])
    setError(null)
  }

  function removeExisting(id: string) {
    setDeletedImageIds((prev) => [...prev, id])
    // If the deleted image was the cover, pick the next available one
    if (coverImageId === id) {
      const next = existingImages.find((img) => img.id !== id && !deletedImageIds.includes(img.id))
      setCoverImageId(next?.id ?? null)
    }
  }

  function removeNew(index: number) {
    URL.revokeObjectURL(newPreviews[index])
    setNewFiles((prev) => prev.filter((_, i) => i !== index))
    setNewPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!category || !country || !condition) { setError("Please fill in all required fields."); return }
    setSaving(true)
    setError(null)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // 1. Update listing fields
    const { error: updateError } = await supabase
      .from("listings")
      .update({
        title,
        description,
        price: parseFloat(price),
        currency,
        category,
        country,
        condition,
        manufacturer: manufacturer || null,
        year: year ? parseInt(year) : null,
        status: "pending", // re-submit for review
      })
      .eq("id", listingId)
      .eq("seller_id", user.id)

    if (updateError) { setError("Failed to save. Please try again."); setSaving(false); return }

    // 2. Delete removed images
    for (const imgId of deletedImageIds) {
      await supabase.from("listing_images").delete().eq("id", imgId)
    }

    // 3. Update sort_order for remaining existing images (cover = 0)
    const remaining = existingImages.filter((img) => !deletedImageIds.includes(img.id))
    const ordered = coverImageId
      ? [
          ...remaining.filter((img) => img.id === coverImageId),
          ...remaining.filter((img) => img.id !== coverImageId),
        ]
      : remaining
    for (let i = 0; i < ordered.length; i++) {
      await supabase.from("listing_images").update({ sort_order: i }).eq("id", ordered[i].id)
    }

    // 4. Upload new images
    const baseOrder = ordered.length
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i]
      const ext = file.name.split(".").pop()
      const path = `${user.id}/${listingId}/${Date.now()}-${i}.${ext}`
      const { error: uploadErr } = await supabase.storage.from("listing-images").upload(path, file)
      if (uploadErr) continue
      const { data: { publicUrl } } = supabase.storage.from("listing-images").getPublicUrl(path)
      await supabase.from("listing_images").insert({
        listing_id: listingId,
        image_url: publicUrl,
        sort_order: baseOrder + i,
      })
    }

    setSuccess(true)
    setSaving(false)
    setTimeout(() => router.push("/dashboard"), 1500)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-[#1E88E5]" size={32} />
      </div>
    )
  }

  const visibleExisting = existingImages.filter((img) => !deletedImageIds.includes(img.id))
  const totalImages = visibleExisting.length + newFiles.length

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1E88E5] transition-colors mb-6">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <h1 className="text-2xl font-bold text-[#0D2A5E] mb-1">Edit Listing</h1>
        <p className="text-sm text-gray-400 mb-8">Changes will be re-submitted for review before going live.</p>

        {error && <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">{error}</div>}
        {success && <div className="bg-green-50 border border-green-100 text-green-600 text-sm px-4 py-3 rounded-xl mb-6">✓ Saved! Redirecting to dashboard...</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic info */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
            <h2 className="font-semibold text-[#0D2A5E]">Basic Information</h2>
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={120} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={6} className="mt-1.5" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label>Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.slug} value={cat.name}><cat.icon size={14} className="inline-block shrink-0 mr-1" />{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Country *</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select country" /></SelectTrigger>
                  <SelectContent>
                    {EUROPEAN_COUNTRIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
            <h2 className="font-semibold text-[#0D2A5E]">Pricing</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price *</Label>
                <Input id="price" type="number" min="1" value={price} onChange={(e) => setPrice(e.target.value)} required className="mt-1.5" />
              </div>
              <div>
                <Label>Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
            <h2 className="font-semibold text-[#0D2A5E]">Ride Details</h2>
            <div>
              <Label>Condition *</Label>
              <Select value={condition} onValueChange={setCondition}>
                <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select condition" /></SelectTrigger>
                <SelectContent>
                  {CONDITIONS.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="manufacturer">Manufacturer</Label>
                <Input id="manufacturer" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} placeholder="e.g. Zamperla" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="year">Year</Label>
                <Input id="year" type="number" min="1950" max={new Date().getFullYear()} value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g. 2015" className="mt-1.5" />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
            <div>
              <h2 className="font-semibold text-[#0D2A5E]">Photos</h2>
              <p className="text-xs text-gray-400 mt-0.5">Click an image to set it as the cover photo.</p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {visibleExisting.map((img) => {
                const isCover = img.id === coverImageId
                return (
                  <div
                    key={img.id}
                    onClick={() => setCoverImageId(img.id)}
                    className={`relative aspect-square rounded-lg overflow-hidden bg-gray-100 group cursor-pointer ring-2 transition-all ${isCover ? "ring-[#1E88E5]" : "ring-transparent hover:ring-gray-300"}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    {isCover ? (
                      <div className="absolute bottom-1 left-1 bg-[#1E88E5] text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <Star size={8} className="fill-white" />Cover
                      </div>
                    ) : (
                      <div className="absolute bottom-1 left-1 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Set cover
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeExisting(img.id) }}
                      className="absolute top-1 right-1 w-6 h-6 bg-black/60 hover:bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )
              })}
              {newPreviews.map((src, i) => (
                <div key={`new-${i}`} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute bottom-1 left-1 bg-blue-600/80 text-white text-[10px] px-1.5 py-0.5 rounded">New</div>
                  <button type="button" onClick={() => removeNew(i)} className="absolute top-1 right-1 w-6 h-6 bg-black/60 hover:bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={12} />
                  </button>
                </div>
              ))}
              {totalImages < 8 && (
                <button type="button" onClick={() => fileInputRef.current?.click()} className="aspect-square rounded-lg border-2 border-dashed border-gray-200 hover:border-[#1E88E5] flex flex-col items-center justify-center text-gray-400 hover:text-[#1E88E5] transition-colors">
                  <Upload size={18} />
                  <span className="text-xs mt-1">Add</span>
                </button>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleNewImages} />
          </div>

          <div className="flex gap-3">
            <Button type="submit" variant="brand" size="lg" className="flex-1" disabled={saving}>
              {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> Save Changes</>}
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={() => router.push("/dashboard")} disabled={saving}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
