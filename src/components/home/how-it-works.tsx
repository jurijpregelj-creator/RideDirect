import { Search, MessageSquare, Handshake } from "lucide-react"

const STEPS = [
  {
    icon: Search,
    step: "01",
    title: "Browse & Discover",
    description:
      "Search thousands of amusement ride listings across Europe. Filter by category, country, price, and condition to find your perfect match.",
    color: "bg-blue-50 text-[#1B4FD8]",
  },
  {
    icon: MessageSquare,
    step: "02",
    title: "Contact the Seller",
    description:
      "Send a direct inquiry to the seller. Get detailed information, arrange inspections, and request additional documentation.",
    color: "bg-orange-50 text-[#F97316]",
  },
  {
    icon: Handshake,
    step: "03",
    title: "Close the Deal",
    description:
      "Negotiate directly with verified B2B sellers. Complete the transaction and arrange logistics — all within the RideDirect network.",
    color: "bg-green-50 text-green-600",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0F1B3D] mb-4">
            How RideDirect Works
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            A streamlined process designed specifically for professionals in the amusement industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {STEPS.map((item, index) => (
            <div key={item.step} className="relative">
              {/* Connector line */}
              {index < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-gray-200 z-0" />
              )}

              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Icon */}
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${item.color} mb-5 shadow-sm`}>
                  <item.icon size={32} />
                </div>

                {/* Step number */}
                <div className="text-xs font-bold text-gray-300 tracking-widest uppercase mb-2">
                  Step {item.step}
                </div>

                <h3 className="text-lg font-bold text-[#0F1B3D] mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
