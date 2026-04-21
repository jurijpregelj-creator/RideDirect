import Link from "next/link"
import { SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-6 mx-auto" aria-hidden="true">
        <SearchX size={36} className="text-gray-300" />
      </div>
      <h1 className="text-4xl font-bold text-[#0D2A5E] mb-3">Page not found</h1>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-3">
        <Button asChild variant="brand">
          <Link href="/">Go Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/marketplace">Browse Listings</Link>
        </Button>
      </div>
    </div>
  )
}
