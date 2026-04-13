import { Search, MessageSquare, Handshake } from "lucide-react"
import { getTranslations } from "next-intl/server"

export async function HowItWorks() {
  const t = await getTranslations("howItWorks")

  const STEPS = [
    { icon: Search, step: "01", titleKey: "step1Title", descKey: "step1Desc", color: "bg-blue-50 text-[#1E88E5]" },
    { icon: MessageSquare, step: "02", titleKey: "step2Title", descKey: "step2Desc", color: "bg-orange-50 text-[#FF6D00]" },
    { icon: Handshake, step: "03", titleKey: "step3Title", descKey: "step3Desc", color: "bg-green-50 text-green-600" },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0D2A5E] mb-4">{t("title")}</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {STEPS.map((item, index) => (
            <div key={item.step} className="relative">
              {index < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-gray-200 z-0" />
              )}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${item.color} mb-5 shadow-sm`}>
                  <item.icon size={32} />
                </div>
                <div className="text-xs font-bold text-gray-300 tracking-widest uppercase mb-2">
                  {t("step")} {item.step}
                </div>
                <h3 className="text-lg font-bold text-[#0D2A5E] mb-3">{t(item.titleKey as any)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t(item.descKey as any)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
