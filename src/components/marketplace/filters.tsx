"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { Search } from "lucide-react"
import { useTranslations } from "next-intl"
import { Input } from "@/components/ui/input"
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
  const t = useTranslations("marketplace")
  const tCat = useTranslations("categories")
  const tCond = useTranslations("common.condition")

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
            placeholder={t("searchPlaceholder")}
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
            <SelectValue placeholder={t("allCategories")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allCategories")}</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.slug} value={cat.slug}>
                <cat.icon size={14} className="inline-block shrink-0 mr-1" />
                {tCat(cat.slug)}
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
            <SelectValue placeholder={t("allCountries")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allCountries")}</SelectItem>
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
            <SelectValue placeholder={t("anyCondition")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("anyCondition")}</SelectItem>
            <SelectItem value="new">{tCond("new")}</SelectItem>
            <SelectItem value="like_new">{tCond("like_new")}</SelectItem>
            <SelectItem value="good">{tCond("good")}</SelectItem>
            <SelectItem value="fair">{tCond("fair")}</SelectItem>
            <SelectItem value="parts_only">{tCond("parts_only")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
