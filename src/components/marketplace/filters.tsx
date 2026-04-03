"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CATEGORIES, EUROPEAN_COUNTRIES } from "@/data/mock"

export function MarketplaceFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value && value !== "all") {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`/marketplace?${params.toString()}`)
    },
    [router, searchParams]
  )

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search rides, brands, keywords..."
            className="pl-9"
            defaultValue={searchParams.get("q") || ""}
            onChange={(e) => {
              const params = new URLSearchParams(searchParams.toString())
              if (e.target.value) {
                params.set("q", e.target.value)
              } else {
                params.delete("q")
              }
              router.push(`/marketplace?${params.toString()}`)
            }}
          />
        </div>

        {/* Category */}
        <Select
          defaultValue={searchParams.get("category") || "all"}
          onValueChange={(v) => updateFilter("category", v)}
        >
          <SelectTrigger className="lg:w-52">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.slug} value={cat.slug}>
                {cat.icon} {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Country */}
        <Select
          defaultValue={searchParams.get("country") || "all"}
          onValueChange={(v) => updateFilter("country", v)}
        >
          <SelectTrigger className="lg:w-44">
            <SelectValue placeholder="All Countries" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {EUROPEAN_COUNTRIES.map((country) => (
              <SelectItem key={country} value={country.toLowerCase()}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Condition */}
        <Select
          defaultValue={searchParams.get("condition") || "all"}
          onValueChange={(v) => updateFilter("condition", v)}
        >
          <SelectTrigger className="lg:w-40">
            <SelectValue placeholder="Condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Condition</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="like_new">Like New</SelectItem>
            <SelectItem value="good">Good</SelectItem>
            <SelectItem value="fair">Fair</SelectItem>
            <SelectItem value="parts_only">Parts Only</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
