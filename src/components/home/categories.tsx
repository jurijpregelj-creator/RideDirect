import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CATEGORIES } from "@/data/mock"

export function Categories() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0F1B3D] mb-4">
            Browse by Category
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Find exactly what you&apos;re looking for across all segments of the amusement industry.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/marketplace?category=${category.slug}`}
              className="group relative bg-gray-50 hover:bg-[#1B4FD8] rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 border border-gray-100 hover:border-[#1B4FD8]"
            >
              <div className="text-3xl mb-3">{category.icon}</div>
              <h3 className="font-semibold text-[#0F1B3D] group-hover:text-white text-sm leading-tight mb-1.5 transition-colors">
                {category.name}
              </h3>
              <p className="text-xs text-gray-400 group-hover:text-blue-200 leading-tight transition-colors line-clamp-2">
                {category.description}
              </p>
              <ArrowRight
                size={14}
                className="absolute top-4 right-4 text-gray-300 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
