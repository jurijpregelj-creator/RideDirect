import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MessageToaster } from "@/components/notifications/message-toaster"
import { CookieBanner } from "@/components/layout/cookie-banner"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: {
    default: "RideDirect.eu — European Amusement Ride Marketplace",
    template: "%s | RideDirect.eu",
  },
  description:
    "Europe's dedicated B2B marketplace for buying and selling amusement rides, funfair equipment, and attractions. Connect with verified sellers across 29 European countries.",
  keywords: [
    "amusement rides", "funfair equipment", "buy amusement rides",
    "sell amusement rides", "Europe", "B2B marketplace",
    "roller coasters", "carousel", "bumper cars", "inflatables",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://ridedirect.eu",
    siteName: "RideDirect.eu",
    title: "RideDirect.eu — European Amusement Ride Marketplace",
    description: "Buy, sell, and discover funfair equipment across Europe.",
    images: [{ url: "https://ridedirect.eu/opengraph-image", width: 1200, height: 630, alt: "RideDirect.eu" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RideDirect.eu — European Amusement Ride Marketplace",
    description: "Buy, sell, and discover funfair equipment across Europe.",
    images: ["https://ridedirect.eu/opengraph-image"],
  },
  alternates: {
    canonical: "https://ridedirect.eu",
  },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RideDirect.eu",
  url: "https://ridedirect.eu",
  logo: "https://ridedirect.eu/logo.svg",
  description:
    "Europe's dedicated B2B marketplace for buying and selling amusement rides, funfair equipment, and attractions.",
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RideDirect.eu",
  url: "https://ridedirect.eu",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://ridedirect.eu/marketplace?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages()
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <MessageToaster />
            <CookieBanner />
          </div>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
