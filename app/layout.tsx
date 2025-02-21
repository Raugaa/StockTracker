import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import Navbar from "./components/Navbar"
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "./components/ThemeProvider"
import { AuthProvider } from "./components/AuthProvider"
import { WatchlistProvider } from "./components/WatchlistContext"
import { PortfolioProvider } from "./components/PortfolioContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Stock Market Platform",
  description: "A comprehensive stock market tracking and trading platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider>
            <WatchlistProvider>
              <PortfolioProvider>
                <Navbar />
                <main className="min-h-screen bg-background">{children}</main>
                <Toaster position="bottom-right" />
              </PortfolioProvider>
            </WatchlistProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'