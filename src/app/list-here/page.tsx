import type { Metadata } from "next"
import { Globe2, ShieldCheck, Zap } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { OutreachLeadForm } from "@/components/outreach/outreach-lead-form"

export const metadata: Metadata = {
  title: "List Your Equipment on RideDirect",
  robots: { index: false, follow: false },
}

export default async function ListHerePage() {
  const supabase = createClient()
  const { count } = await supabase
    .from("listings")
    .select("id", { count: "exact", head: true })
    .eq("status", "approved")

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0D2A5E] via-[#1a2d5a] to-[#1E88E5]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#FF6D00]/30 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 py-16 lg:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-sm text-blue-100 mb-6">
              <Globe2 size={14} />
              <span>For sellers already listing in Facebook groups & marketplaces</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
              Already selling your ride or attraction?{" "}
              <span className="text-[#FF6D00]">List it here too.</span>
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed max-w-xl mx-auto">
              Free, and it takes less than a minute — just send us the link to your existing
              listing and we'll help get it in front of buyers across Europe.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Trust column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <Zap size={16} className="text-[#1E88E5]" />
              </div>
              <div>
                <div className="font-semibold text-[#0D2A5E]">Free, no obligation</div>
                <p className="text-sm text-gray-500">No listing fees, no account required to get started.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <Globe2 size={16} className="text-[#1E88E5]" />
              </div>
              <div>
                <div className="font-semibold text-[#0D2A5E]">Buyers across Europe</div>
                <p className="text-sm text-gray-500">
                  {count && count > 0
                    ? `Join ${count}+ active listings from sellers across Europe.`
                    : "A dedicated marketplace for amusement rides and fairground equipment."}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <ShieldCheck size={16} className="text-[#1E88E5]" />
              </div>
              <div>
                <div className="font-semibold text-[#0D2A5E]">Your info stays private</div>
                <p className="text-sm text-gray-500">We'll only use it to help set up your listing — never shared or shown publicly.</p>
              </div>
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <OutreachLeadForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
