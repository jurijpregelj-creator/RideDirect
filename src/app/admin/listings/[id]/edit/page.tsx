"use client"

import { useEffect, useState, useTransition } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { adminUpdateListing } from "../../../actions"
import { CATEGORIES, EUROPEAN_COUNTRIES } from "@/data/mock"

const CURRENCIES = ["EUR", "GBP", "PLN", "CHF", "SEK", "DKK", "NOK"]
const CONDITIONS = [
  { value: "new", label: "New" },
  { value: "like_new", label: "Like New" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "parts_only", label: "Parts Only" },
]

export default function AdminEditListingPage() {
  const params = useParams()
  const router = useRouter()
  const listingId = params.id as string
  const [isPending, startTransition] = useTransition()

  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [currency, setCurrency] = useState("EUR")
  const [category, setCategory] = useState("")
  const [country, setCountry] = useState("")
  const [condition, setCondition] = useState("")
  const [manufacturer, setManufacturer] = useState("")
  const [year, setYear] = useState("")

  useEffect(() => {
    const supabase = createClient()
    supabase.from("listings").select("*").eq("id", listingId).single().then(({ data }) => {
      if (data) {
        setTitle(data.title || "")
        setDescription(data.description || "")
        setPrice(String(data.price || ""))
        setCurrency(data.currency || "EUR")
        setCategory(data.category || "")
        setCountry(data.country || "")
        setCondition(data.condition || "")
        setManufacturer(data.manufacturer || "")
        setYear(data.year ? String(data.year) : "")
      }
      setLoading(false)
    })
  }, [listingId])

  function handleSave() {
    setError(null)
    startTransition(async () => {
      try {
        await adminUpdateListing(listingId, {
          title,
          description,
          category,
          country,
          price: parseFloat(price),
          currency,
          condition,
          manufacturer,
          year: year ? parseInt(year) : undefined,
        })
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      } catch (e: any) {
        setError(e.message || "Failed to save")
      }
    })
  }

  if (loading) return <div className="p-8 text-gray-400">Loading...</div>

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/listings">
          <Button variant="outline" size="sm"><ArrowLeft size={14} /></Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-[#0D2A5E]">Edit Listing</h1>
          <p className="text-xs text-gray-400">{listingId}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
        <div className="space-y-1.5">
          <Label>Title</Label>
          <Input value={title} onChange={e => setTitle(e.target.value)} />
        </div>

        <div className="space-y-1.5">
          <Label>Description</Label>
          <Textarea value={description} onChange={e => setDescription(e.target.value)} rows={5} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Price</Label>
            <Input type="number" value={price} onChange={e => setPrice(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{CURRENCIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Country</Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{EUROPEAN_COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Condition</Label>
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{CONDITIONS.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Year</Label>
            <Input type="number" value={year} onChange={e => setYear(e.target.value)} placeholder="e.g. 2020" />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Manufacturer</Label>
          <Input value={manufacturer} onChange={e => setManufacturer(e.target.value)} placeholder="e.g. Zamperla" />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex items-center gap-3 pt-2">
          <Button onClick={handleSave} disabled={isPending} variant="brand">
            {isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saved ? "Saved!" : "Save Changes"}
          </Button>
          <Link href="/admin/listings">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
