import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { CATEGORIES } from "@/data/mock"

export async function Categories() {
  const t = await getTranslations("categories")

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0D2A5E] mb-4">{t("title")}</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/marketplace?category=${category.slug}`}
              className="group relative bg-gray-50 hover:bg-[#1E88E5] rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 border border-gray-100 hover:border-[#1E88E5]"
            >
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center mb-3 group-hover:bg-white/20 transition-colors" aria-hidden="true">
                <category.icon size={20} className="text-[#1E88E5] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-[#0D2A5E] group-hover:text-white text-sm leading-tight mb-1.5 transition-colors">
                {t(category.slug as any) || category.name}
              </h3>
              <p className="text-xs text-gray-400 group-hover:text-blue-200 leading-tight transition-colors line-clamp-2">
                {t(`${category.slug}-desc` as any) || category.description}
              </p>
              <ArrowRight size={14} className="absolute top-4 right-4 text-gray-300 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
