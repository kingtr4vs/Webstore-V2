import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Manrope } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"
import { AuthProvider } from "@/contexts/auth-context"
import { Footer } from "@/components/footer"
import { WaterDropEffect } from "@/components/water-drop-effect"
import { AnnouncementPopup } from "@/components/announcement-popup"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "Frost Network - Premium Minecraft Server Store",
  description:
    "Level up your Minecraft experience with exclusive ranks, crate keys, and premium services from Frost Network.",
  generator: "v0.app",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${manrope.variable} dark`}>
      <head>
        <link rel="icon" href="/favicon.jpg" type="image/png" />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>
          <CartProvider>
            <WaterDropEffect />
            <AnnouncementPopup />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
