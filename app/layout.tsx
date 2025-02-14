import "./globals.css"
import { Afacad } from "next/font/google"
import type React from "react"

const afacad = Afacad({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

export const metadata = {
  title: "Exon Enterprise",
  description: "Building Tomorrow's Technology",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={afacad.className}>{children}</body>
    </html>
  )
}



import './globals.css'