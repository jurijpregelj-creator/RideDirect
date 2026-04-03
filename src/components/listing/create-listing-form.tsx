"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Loader2, Upload, X, CheckCircle2 } from "lucide-react"
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

interface CreateListingFormProps {
  userId: string
}

export function CreateListingForm({ userId }: CreateListingFormProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  // Controlled selects
  const [category, setCategory] = useState("")
  const [country, setCountry] = useState("")
  const [condition, setCondition] = useState("")
  const [currency, setCurrency] = useState("EUR")

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    if (imageFiles.length + files.length > 8) {
      setError("You can upload up to 8 images.")
      return
    }
    const newPreviews = files.map((f) => URL.createObjectURL(f))
    setImageFiles((prev) => [...prev, ...files])
    setImagePreviews((prev) => [...prev, ...newPreviews])
    setError(null)
  }

  function removeImage(index: number) {
    URL.revokeObjectURL(imagePreviews[index])
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (!category || !country || !condition) {
      setError("Please fill in all required fields.")
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()
      const form = e.currentTarget

      const title = (form.elements.namedItem("title") as HTMLInputElement).value
      const description = (form.elements.namedItem("description") as HTMLTextAreaElement).value
      const price = parseFloat((form.elements.namedItem("price") as HTMLInputElement).value)
      const manufacturer = (form.elements.namedItem("manufacturer") as HTMLInputElement).value
      const yearRaw = (form.elements.namedItem("year") as HTMLInputElement).value
      const year = yearRaw ? parseInt(yearRaw) : null

      // 1. Insert the listing
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
          status: "approved",
        })
        .select()
        .single()

      if (listingError || !listing) {
        throw new Error(listingError?.message || "Failed to create listing")
      }

      // 2. Upload images if any
      if (imageFiles.length > 0) {
        for (let i = 0; i < imageFiles.length; i++) {
          const file = imageFiles[i]
          const ext = file.name.split(".").pop()
          const path = `${userId}/${listing.id}/${i}-${Date.now()}.${ext}`

          const { error: uploadError } = await supabase.storage
            .from("listing-images")
            .upload(path, file, { upsert: false })

          if (uploadError) {
            // Non-fatal: listing is created, images just failed
            console.error("Image upload error:", uploadError)
            continue
          }

          const { data: { publicUrl } } = supabase.storage
            .from("listing-images")
            .getPublicUrl(path)

          await supabase.from("listing_images").insert({
            listing_id: listing.id,
            image_url: publicUrl,
            sort_order: i,
          })
        }
      }

      router.push(`/listings/${listing.id}`)
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Basic info */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
        <h2 className="font-semibold text-[#0F1B3D] text-lg">Basic Information</h2>

        <div>
          <Label htmlFor="title">Listing Title *</Label>
          <Input
            id="title"
            name="title"
            placeholder="e.g. Zamperla Mini Jet — 12 Seats, Excellent Condition"
            required
            maxLength={120}
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe the ride in detail: capacity, technical specs, history, condition notes, what's included in the sale..."
            required
            rows={6}
            className="mt-1.5"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <Label>Category *</Label>
            <Select onValueChange={setCategory} required>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.slug} value={cat.name}>
                    {cat.icon} {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Country *</Label>
            <Select onValueChange={setCountry} required>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
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
        <h2 className="font-semibold text-[#0F1B3D] text-lg">Pricing</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Asking Price *</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="1"
              placeholder="e.g. 25000"
              required
              className="mt-1.5"
            />
          </div>
          <div>
            <Label>Currency *</Label>
            <Select defaultValue="EUR" onValueChange={setCurrency}>
              <SelectTrigger className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Ride details */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
        <h2 className="font-semibold text-[#0F1B3D] text-lg">Ride Details</h2>

        <div>
          <Label>Condition *</Label>
          <Select onValueChange={setCondition} required>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              {CONDITIONS.map((c) => (
                <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="manufacturer">Manufacturer</Label>
            <Input
              id="manufacturer"
              name="manufacturer"
              placeholder="e.g. Zamperla, Huss, Bertazzon"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="year">Year of Manufacture</Label>
            <Input
              id="year"
              name="year"
              type="number"
              min="1950"
              max={new Date().getFullYear()}
              placeholder="e.g. 2015"
              className="mt-1.5"
            />
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h2 className="font-semibold text-[#0F1B3D] text-lg">Photos</h2>
        <p className="text-sm text-gray-500">
          Upload up to 8 photos. High-quality images significantly increase buyer interest.
        </p>

        {/* Previews */}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {imagePreviews.map((src, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group">
                <Image
                  src={src}
                  alt={`Preview ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="120px"
                  unoptimized
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 w-6 h-6 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
                {i === 0 && (
                  <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                    Cover
                  </div>
                )}
              </div>
            ))}
            {imagePreviews.length < 8 && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-lg border-2 border-dashed border-gray-200 hover:border-[#1B4FD8] flex flex-col items-center justify-center text-gray-400 hover:text-[#1B4FD8] transition-colors"
              >
                <Upload size={18} />
                <span className="text-xs mt-1">Add</span>
              </button>
            )}
          </div>
        )}

        {/* Upload button */}
        {imagePreviews.length === 0 && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-32 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#1B4FD8] flex flex-col items-center justify-center text-gray-400 hover:text-[#1B4FD8] transition-colors gap-2"
          >
            <Upload size={24} />
            <span className="text-sm font-medium">Click to upload photos</span>
            <span className="text-xs">JPG, PNG, WebP — max 8 files</span>
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageSelect}
        />
      </div>

      {/* Submit */}
      <div className="flex gap-3">
        <Button
          type="submit"
          variant="brand"
          size="lg"
          className="flex-1"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Publishing listing...
            </>
          ) : (
            <>
              <CheckCircle2 size={18} />
              Publish Listing
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>

      <p className="text-xs text-gray-400 text-center">
        Your listing will be published immediately and visible to all buyers on RideDirect.eu.
      </p>
    </form>
  )
}
