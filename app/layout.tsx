import type React from "react"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, JetBrains_Mono, Syne, Bebas_Neue } from "next/font/google"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Providers } from "@/components/providers"
import { DemoBanner } from "@/components/demo-banner"
import "./globals.css"

// DEMO MODE: BotID client-side protection removed.
// In production, this component injects bot detection scripts:
//   import { BotIdClient } from "botid/client"
//   const protectedRoutes = [
//     { path: "/api/register", method: "POST" },
//     { path: "/api/pitch", method: "POST" },
//     { path: "/api/newsletter", method: "POST" },
//     { path: "/api/sponsor-contact", method: "POST" },
//   ]

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
})

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
})

export const metadata: Metadata = {
  title: "Tech Day 2026 | Invented Here - San Antonio",
  description:
    "Join San Antonio's premier technology conference celebrating innovation, founders, and the tech community. November 2026.",
  keywords: ["Tech Day", "San Antonio", "technology conference", "Tech Fuel", "startup", "innovation"],
  openGraph: {
    title: "Tech Day 2026 | Invented Here",
    description: "San Antonio's premier technology conference",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* DEMO MODE: BotIdClient and Vercel Analytics removed.
            In production:
              <BotIdClient protect={protectedRoutes} />
            And in body:
              <Analytics /> from @vercel/analytics
        */}
      </head>
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${syne.variable} ${bebasNeue.variable} font-sans antialiased`}>
        <Providers>
          <DemoBanner />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
