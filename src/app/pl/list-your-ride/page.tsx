import type { Metadata } from "next"
import { ListingFunnel } from "@/components/funnel/listing-funnel"
import { FUNNEL_T, funnelAlternates } from "@/components/funnel/funnel-translations"

export const metadata: Metadata = {
  title: "Dodaj swoją atrakcję za darmo | RideDirect",
  description: "Sprzedaj swoją atrakcję szybko. Wystaw za darmo i dotrzyj do poważnych kupujących w całej Europie. Bez prowizji, bez karty kredytowej.",
  alternates: funnelAlternates("pl"),
  openGraph: {
    type: "website",
    url: "https://ridedirect.eu/pl/list-your-ride",
    title: "Dodaj swoją atrakcję za darmo | RideDirect",
    description: "Sprzedaj swoją atrakcję szybko. Wystaw za darmo i dotrzyj do poważnych kupujących w całej Europie. Bez prowizji, bez karty kredytowej.",
  },
}

const t = FUNNEL_T.pl

const TRUST = [
  { icon: "✅", text: "Bezpłatne wystawianie" },
  { icon: "🌍", text: "Kupujący z całej Europy" },
  { icon: "📩", text: "Bezpośrednie zapytania" },
  { icon: "💸", text: "Zero prowizji" },
]

export default function ListYourRidePlPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EEF4FF] to-white">
      <nav className="px-4 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <a href="/pl" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#1E88E5] text-white font-bold text-sm flex items-center justify-center">RD</div>
          <span className="font-bold text-[#0D2A5E] text-base">RideDirect<span className="text-gray-400 font-normal">.eu</span></span>
        </a>
        <a href="/auth/login" className="text-xs text-gray-500 hover:text-[#1E88E5] transition-colors">
          Zaloguj się →
        </a>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="lg:pt-4 lg:sticky lg:top-8">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              {t.badge}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-[#0D2A5E] leading-tight mb-4">
              {t.hero}
            </h1>

            <p className="text-gray-500 text-base leading-relaxed mb-6">
              {t.sub}
            </p>

            <div className="bg-[#1E88E5]/8 border border-[#1E88E5]/20 rounded-2xl p-4 mb-8">
              <p className="text-[#0D2A5E] font-semibold text-sm">{t.earlyBird}</p>
              <p className="text-gray-500 text-xs mt-1">
                Dołącz do pierwszych sprzedawców na europejskim rynku atrakcji.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {TRUST.map((item) => (
                <div key={item.text} className="flex items-center gap-2 bg-white rounded-xl border border-gray-100 px-3 py-2.5 shadow-sm">
                  <span className="text-base">{item.icon}</span>
                  <span className="text-xs font-medium text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400 mt-6">
              Dołącz do sprzedawców z 🇩🇪 🇮🇹 🇵🇱 🇳🇱 🇪🇸 i ponad 20 innych krajów europejskich.
            </p>
          </div>

          <div>
            <ListingFunnel lang="pl" />
          </div>
        </div>
      </div>

      <footer className="border-t border-gray-100 mt-12 py-6 text-center">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} RideDirect.eu ·{" "}
          <a href="/legal/terms" className="hover:text-[#1E88E5]">Regulamin</a>
          {" · "}
          <a href="/legal/privacy" className="hover:text-[#1E88E5]">Prywatność</a>
        </p>
      </footer>
    </div>
  )
}
