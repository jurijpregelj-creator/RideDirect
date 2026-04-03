import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Listing Submitted" }

export default function SubmitSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-10 max-w-md w-full text-center shadow-sm">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={32} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-[#0F1B3D] mb-3">Listing Submitted!</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Your listing has been submitted for review. Our team will approve it within 24 hours and it will become visible on the marketplace.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="brand">
            <Link href="/marketplace">Browse Marketplace</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/create">Post Another</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
