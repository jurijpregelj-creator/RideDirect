import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-6xl mb-4">🎡</div>
      <h1 className="text-4xl font-bold text-[#0F1B3D] mb-3">Page not found</h1>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-3">
        <Link href="/">
          <Button variant="brand">Go Home</Button>
        </Link>
        <Link href="/marketplace">
          <Button variant="outline">Browse Listings</Button>
        </Link>
      </div>
    </div>
  )
}
