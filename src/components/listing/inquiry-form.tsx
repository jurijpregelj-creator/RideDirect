"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Loader2, MessageSquare } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface InquiryFormProps {
  listingId: string
  sellerId: string
  listingTitle: string
}

export function InquiryForm({ listingId, sellerId, listingTitle }: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const buyer_name = (form.elements.namedItem("buyer_name") as HTMLInputElement).value
    const buyer_email = (form.elements.namedItem("buyer_email") as HTMLInputElement).value
    const buyer_phone = (form.elements.namedItem("buyer_phone") as HTMLInputElement).value
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value

    const supabase = createClient()
    const { error: insertError } = await supabase.from("inquiries").insert({
      listing_id: listingId,
      seller_id: sellerId,
      buyer_name,
      buyer_email,
      buyer_phone: buyer_phone || null,
      message,
    })

    if (insertError) {
      setError("Failed to send inquiry. Please try again.")
      setLoading(false)
      return
    }

    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-100 rounded-xl p-6 text-center">
        <CheckCircle2 size={40} className="text-green-500 mx-auto mb-3" />
        <h3 className="font-semibold text-green-800 mb-1">Inquiry Sent!</h3>
        <p className="text-sm text-green-600">
          The seller will be in touch with you shortly.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-5">
        <MessageSquare size={18} className="text-[#1B4FD8]" />
        <h3 className="font-semibold text-gray-800">Contact the Seller</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        <div>
          <Label htmlFor="buyer_name">Your Name *</Label>
          <Input id="buyer_name" name="buyer_name" placeholder="John Smith" required className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="buyer_email">Email Address *</Label>
          <Input id="buyer_email" name="buyer_email" type="email" placeholder="john@company.com" required className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="buyer_phone">Phone Number</Label>
          <Input id="buyer_phone" name="buyer_phone" type="tel" placeholder="+44 7700 900000" className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="message">Message *</Label>
          <Textarea
            id="message"
            name="message"
            placeholder={`Hi, I'm interested in your listing "${listingTitle.slice(0, 40)}...". Could you please provide more details?`}
            required
            rows={4}
            className="mt-1.5"
          />
        </div>

        <Button
          type="submit"
          variant="brand"
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending...
            </>
          ) : (
            "Send Inquiry"
          )}
        </Button>

        <p className="text-xs text-gray-400 text-center">
          Your details will only be shared with the seller of this listing.
        </p>
      </form>
    </div>
  )
}
