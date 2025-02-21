"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Bell, User } from "lucide-react"
import { useStockSearch } from "../utils/stockData"
import { useAuth } from "./AuthProvider"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const searchResults = useStockSearch(searchQuery)
  const { user } = useAuth()

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push("/dashboard")
  }

  return (
    <nav className="bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-2xl font-bold" onClick={handleLogoClick}>
              StockTracker
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <NavLink href="/dashboard" active={pathname === "/dashboard"}>
                  Dashboard
                </NavLink>
                <NavLink href="/market" active={pathname === "/market"}>
                  Market
                </NavLink>
                <NavLink href="/watchlist" active={pathname === "/watchlist"}>
                  Watchlist
                </NavLink>
                <NavLink href="/portfolio" active={pathname === "/portfolio"}>
                  Portfolio
                </NavLink>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search stocks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
              {searchResults.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-lg">
                  {searchResults.map((result) => (
                    <Link
                      key={result.symbol}
                      href={`/stock/${result.symbol}`}
                      className="block px-4 py-2 hover:bg-accent"
                    >
                      {result.name} ({result.symbol})
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      {children}
    </Link>
  )
}

