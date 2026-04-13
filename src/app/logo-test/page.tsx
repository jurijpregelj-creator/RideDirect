import { RideDirectLogo } from "@/components/ui/logo"
import Image from "next/image"

export default function LogoTestPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-16 p-12">
      <h1 className="text-2xl font-bold text-gray-700">Logo primerjava</h1>

      {/* Original ChatGPT PNG/SVG */}
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Original (ChatGPT PNG v SVG, 326KB)</p>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <img src="/logo-original.svg" alt="Original logo" className="h-40 w-auto" />
        </div>
        <div className="bg-[#0D2A5E] rounded-2xl shadow-lg p-8">
          <img src="/logo-original.svg" alt="Original logo dark" className="h-40 w-auto" />
        </div>
      </div>

      {/* My SVG vector */}
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Moj SVG vektor (3KB, pravi vektor)</p>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <RideDirectLogo className="h-40 w-auto" />
        </div>
        <div className="bg-[#0D2A5E] rounded-2xl shadow-lg p-8">
          <RideDirectLogo className="h-40 w-auto" />
        </div>
      </div>

      {/* Header size comparison */}
      <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Kot v headerju (h-10)</p>
        <div className="bg-white rounded-xl shadow-lg px-6 py-3 flex items-center gap-8 w-full">
          <span className="text-xs text-gray-400">Original:</span>
          <img src="/logo-original.svg" alt="Original small" className="h-10 w-auto" />
          <span className="text-xs text-gray-400 ml-8">Moj SVG:</span>
          <RideDirectLogo className="h-10 w-auto" />
        </div>
      </div>
    </div>
  )
}
