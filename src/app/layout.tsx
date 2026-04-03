import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "RideDirect.eu — European Amusement Ride Marketplace",
    template: "%s | RideDirect.eu",
  },
  description:
    "Europe's dedicated B2B marketplace for buying and selling amusement rides, funfair equipment, and attractions. Connect with verified sellers across 29 European countries.",
  keywords: [
    "amusement rides",
    "funfair equipment",
    "buy amusement rides",
    "sell amusement rides",
    "Europe",
    "B2B marketplace",
    "roller coasters",
    "carousel",
    "bumper cars",
    "inflatables",
  ],
  openGraph: {
    type: "website",
    locale: "en_EU",
    url: "https://ridedirect.eu",
    siteName: "RideDirect.eu",
    title: "RideDirect.eu — European Amusement Ride Marketplace",
    description:
      "Buy, sell, and discover funfair equipment across Europe.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
