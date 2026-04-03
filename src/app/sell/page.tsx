import Link from "next/link"
import {
  CheckCircle2,
  Globe2,
  Users,
  TrendingUp,
  ShieldCheck,
  Star,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sell With Us",
  description:
    "List your amusement rides on RideDirect.eu and reach verified buyers across Europe.",
}

const BENEFITS = [
  {
    icon: Globe2,
    title: "Pan-European Reach",
    description:
      "Reach buyers in 29 European countries. Your listing is visible to the entire European amusement industry.",
  },
  {
    icon: Users,
    title: "Verified B2B Buyers",
    description:
      "Every inquiry comes from a verified business. No time-wasters — only serious industry professionals.",
  },
  {
    icon: TrendingUp,
    title: "Fast Time-to-Sale",
    description:
      "Our targeted audience means faster deals. Sellers typically receive their first inquiries within days.",
  },
  {
    icon: ShieldCheck,
    title: "Full Control",
    description:
      "You manage your listing, set your price, and communicate directly with buyers. No middleman fees.",
  },
]

const HOW_TO_SELL = [
  {
    step: "1",
    title: "Create your account",
    description: "Sign up for a free seller account. Verification takes less than 24 hours.",
  },
  {
    step: "2",
    title: "Create your listing",
    description:
      "Add photos, description, CE documentation, condition, price, and all relevant details.",
  },
  {
    step: "3",
    title: "Get approved",
    description:
      "Our team reviews each listing to ensure quality. Approval typically happens within 1 business day.",
  },
  {
    step: "4",
    title: "Receive inquiries",
    description:
      "Qualified buyers contact you directly. You negotiate and close the deal on your own terms.",
  },
]

const CATEGORIES = [
  "Major Rides",
  "Family Rides",
  "Kiddie Rides",
  "Inflatables & Soft Play",
  "Arcade & Coin Machines",
  "Go-Karts & Track Attractions",
  "Event & Mobile Attractions",
  "Games & Prize Booths",
  "Indoor Parks & Playgrounds",
  "Equipment & Parts",
]

export default function SellWithUsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F1B3D] to-[#1B4FD8] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-blue-100 mb-6">
            <Star size={14} className="fill-[#F97316] text-[#F97316]" />
            Join 100+ active sellers across Europe
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-5 leading-tight">
            Sell Your Amusement Rides<br />
            <span className="text-[#F97316]">Across Europe</span>
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            RideDirect.eu connects you with serious, verified buyers across 29 European countries. List your rides for free and reach the entire European amusement industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button variant="brand-orange" size="xl" className="shadow-lg shadow-orange-500/25">
                Start Selling Free
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="xl" className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
                Talk to Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F1B3D] mb-4">
              Why Sell on RideDirect?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              The only marketplace built specifically for the European amusement industry.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:bg-[#1B4FD8] transition-colors">
                  <benefit.icon size={22} className="text-[#1B4FD8] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-[#0F1B3D] mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to sell */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F1B3D] mb-4">
              How to List Your Ride
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {HOW_TO_SELL.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#1B4FD8] text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-[#0F1B3D] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you can sell */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#0F1B3D] mb-4">
                What You Can List
              </h2>
              <p className="text-gray-500">
                We accept all professional amusement equipment across these categories:
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat}
                  className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3 text-sm font-medium text-gray-700"
                >
                  <CheckCircle2 size={16} className="text-[#1B4FD8] shrink-0" />
                  {cat}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0F1B3D]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Sell Your Rides?
          </h2>
          <p className="text-blue-200 mb-8 max-w-xl mx-auto">
            Create your free account today and list your first ride in under 10 minutes.
          </p>
          <Link href="/auth/signup">
            <Button variant="brand-orange" size="xl" className="shadow-lg shadow-orange-500/25">
              Create Free Account
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
