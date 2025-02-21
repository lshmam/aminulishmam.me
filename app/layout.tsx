import type React from "react"
import "./globals.css"
import "@/styles/scrollbar.css"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster" // Add this import

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Tony B. Portfolio",
  description: "Product Designer Portfolio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-black text-white p-6">
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">{children}</div>
          <Toaster /> {/* Add this component */}
        </div>
      </body>
    </html>
  )
}

