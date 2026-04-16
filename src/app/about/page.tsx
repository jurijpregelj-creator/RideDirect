import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = { title: "About RideDirect" }

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">

          {/* Header */}
          <h1 className="text-3xl font-bold text-[#0D2A5E] mb-3">About RideDirect</h1>
          <p className="text-gray-500 text-base mb-10 leading-relaxed">
            The first dedicated European marketplace for buying and selling amusement rides — built by operators, for operators.
          </p>

          {/* Our Mission */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#0D2A5E] mb-3">Our Mission</h2>
            <div className="text-gray-600 leading-relaxed space-y-3">
              <p>
                Buying and selling amusement rides in Europe has always been a pain. Deals happened through WhatsApp groups,
                word of mouth, and industry contacts you had to already know. There was no central place to search, no way
                to reach the whole European market, and no professional standard for listings.
              </p>
              <p>
                We built RideDirect to fix that. One platform, all of Europe, zero middlemen. Whether you&apos;re
                offloading a carousel after a season or hunting for a specific dark ride, this is where the deal starts.
              </p>
              <p>
                RideDirect is operated by <strong className="text-gray-700">Orbito d.o.o.</strong>, a company based in Slovenia.
                We&apos;re a small team with direct ties to the amusement industry — we know this market because we&apos;ve
                worked in it.
              </p>
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#0D2A5E] mb-4">How It Works</h2>
            <div className="space-y-4">
              <Step number={1} title="List your ride">
                Create a listing in minutes. Add photos, specs, asking price, and location. Your ride is instantly
                visible to buyers across Europe — no brokers, no commissions, no waiting.
              </Step>
              <Step number={2} title="Find what you need">
                Browse or search the full catalogue. Filter by type, country, price, or condition. Every listing is
                from a verified business — no consumers, no time-wasters.
              </Step>
              <Step number={3} title="Connect directly">
                Contact the seller straight from the listing. No hidden routing, no platform in the middle. You
                negotiate and close on your terms.
              </Step>
            </div>
          </section>

          {/* Why RideDirect */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#0D2A5E] mb-4">Why RideDirect</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <Pillar title="No middlemen">
                Deals happen between buyer and seller — directly. We don&apos;t take a cut of transactions and we don&apos;t
                insert ourselves into negotiations.
              </Pillar>
              <Pillar title="Europe-wide reach">
                Listings are visible across the entire European market from day one. No more being limited to your
                local network or a single country&apos;s Facebook group.
              </Pillar>
              <Pillar title="Professional community">
                The platform is B2B only. Everyone on RideDirect is a business or professional in the amusement
                industry — that means serious inquiries and real deals.
              </Pillar>
            </div>
          </section>

          {/* CTA */}
          <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
            <Link
              href="/marketplace"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#0D2A5E] text-white font-semibold text-sm hover:bg-[#1E88E5] transition-colors"
            >
              Browse Listings
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[#0D2A5E] text-[#0D2A5E] font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              Get in Touch
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1E88E5] text-white text-sm font-bold flex items-center justify-center mt-0.5">
        {number}
      </div>
      <div>
        <h3 className="font-semibold text-[#0D2A5E] mb-1">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  )
}

function Pillar({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
      <h3 className="font-semibold text-[#0D2A5E] mb-2 text-sm">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{children}</p>
    </div>
  )
}
