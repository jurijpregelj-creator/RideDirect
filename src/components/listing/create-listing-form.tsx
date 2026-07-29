"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
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
import type { ListingLocale } from "@/lib/locales"
import { LISTING_FORM_T, COUNTRY_NAMES, CONDITION_VALUES } from "@/components/listing/listing-form-translations"
import { LISTING_PAGE_T } from "@/components/listing/listing-page-translations"

const CURRENCIES = ["EUR", "GBP", "PLN", "CHF", "SEK", "DKK", "NOK"]

interface CreateListingFormProps {
  userId: string
  locale?: ListingLocale
}

export function CreateListingForm({ userId, locale = "en" }: CreateListingFormProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const t = LISTING_FORM_T[locale]
  const CONDITIONS = CONDITION_VALUES.map((value) => ({ value, label: LISTING_PAGE_T[locale].conditions[value] }))

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
      setError(t.errorMaxImages)
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
      setError(t.errorRequiredFields)
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
          status: "pending",
        })
        .select()
        .single()

      if (listingError || !listing) {
        throw new Error(listingError?.message || t.errorCreateFailed)
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

      router.push(`/dashboard/create/success?id=${listing.id}`)
    } catch (err: any) {
      setError(err.message || t.errorGeneric)
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
        <h2 className="font-semibold text-[#0D2A5E] text-lg">{t.sectionBasicInfo}</h2>

        <div>
          <Label htmlFor="title">{t.titleLabel}</Label>
          <Input
            id="title"
            name="title"
            placeholder={t.titlePlaceholder}
            required
            maxLength={120}
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="description">{t.descriptionLabel}</Label>
          <Textarea
            id="description"
            name="description"
            placeholder={t.descriptionPlaceholder}
            required
            rows={6}
            className="mt-1.5"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <Label>{t.categoryLabel}</Label>
            <Select onValueChange={setCategory} required>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder={t.categoryPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.slug} value={cat.name}>
                    <cat.icon size={14} className="inline-block shrink-0 mr-1" />
                    {LISTING_PAGE_T[locale].categories[cat.slug as keyof typeof LISTING_PAGE_T["en"]["categories"]] ?? cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>{t.countryLabel}</Label>
            <Select onValueChange={setCountry} required>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder={t.countryPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {EUROPEAN_COUNTRIES.map((c) => (
                  <SelectItem key={c} value={c}>{COUNTRY_NAMES[locale][c] ?? c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
        <h2 className="font-semibold text-[#0D2A5E] text-lg">{t.sectionPricing}</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">{t.priceLabel}</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="1"
              step="1"
              placeholder={t.pricePlaceholder}
              required
              className="mt-1.5"
            />
          </div>
          <div>
            <Label>{t.currencyLabel}</Label>
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
        <h2 className="font-semibold text-[#0D2A5E] text-lg">{t.sectionRideDetails}</h2>

        <div>
          <Label>{t.conditionLabel}</Label>
          <Select onValueChange={setCondition} required>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder={t.conditionPlaceholder} />
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
            <Label htmlFor="manufacturer">{t.manufacturerLabel}</Label>
            <Input
              id="manufacturer"
              name="manufacturer"
              placeholder={t.manufacturerPlaceholder}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="year">{t.yearLabel}</Label>
            <Input
              id="year"
              name="year"
              type="number"
              min="1950"
              max={new Date().getFullYear()}
              placeholder={t.yearPlaceholder}
              className="mt-1.5"
            />
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h2 className="font-semibold text-[#0D2A5E] text-lg">{t.sectionPhotos}</h2>
        <p className="text-sm text-gray-500">
          {t.photosHint}
        </p>

        {/* Previews */}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {imagePreviews.map((src, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Preview ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
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
                    {t.coverBadge}
                  </div>
                )}
              </div>
            ))}
            {imagePreviews.length < 8 && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-lg border-2 border-dashed border-gray-200 hover:border-[#1E88E5] flex flex-col items-center justify-center text-gray-400 hover:text-[#1E88E5] transition-colors"
              >
                <Upload size={18} />
                <span className="text-xs mt-1">{t.addPhoto}</span>
              </button>
            )}
          </div>
        )}

        {/* Upload button */}
        {imagePreviews.length === 0 && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-32 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#1E88E5] flex flex-col items-center justify-center text-gray-400 hover:text-[#1E88E5] transition-colors gap-2"
          >
            <Upload size={24} />
            <span className="text-sm font-medium">{t.clickToUpload}</span>
            <span className="text-xs">{t.fileTypesHint}</span>
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
              {t.submitting}
            </>
          ) : (
            <>
              <CheckCircle2 size={18} />
              {t.submit}
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
          {t.cancel}
        </Button>
      </div>

      <p className="text-xs text-gray-400 text-center">
        {t.reviewNote}
      </p>
    </form>
  )
}
