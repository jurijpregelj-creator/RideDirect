export type UserRole = "buyer" | "seller" | "admin"
export type ListingStatus = "draft" | "pending" | "approved" | "rejected" | "expired"
export type ListingCondition = "new" | "like_new" | "good" | "fair" | "parts_only"

export interface Profile {
  id: string
  email: string
  full_name: string
  role: UserRole
  country: string
  created_at: string
}

export interface Listing {
  id: string
  seller_id: string
  title: string
  description: string
  category: string
  country: string
  price: number
  currency: string
  condition: ListingCondition
  manufacturer?: string
  year?: number
  ce_docs_available: boolean
  inspection_available: boolean
  original_language?: string
  status: ListingStatus
  expires_at?: string | null
  created_at: string
  updated_at: string
  images?: ListingImage[]
}

export interface ListingImage {
  id: string
  listing_id: string
  image_url: string
  sort_order: number
}

export interface Inquiry {
  id: string
  listing_id: string
  seller_id: string
  buyer_name: string
  buyer_email: string
  buyer_phone?: string
  message: string
  created_at: string
}

export interface Category {
  name: string
  slug: string
  icon: string
  description: string
}
