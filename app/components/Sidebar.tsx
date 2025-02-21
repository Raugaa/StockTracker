"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, TrendingUp, List, Settings, User, Bell, Info } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { name: "Dashboard", icon: Home, link: "/" },
  { name: "Market Overview", icon: TrendingUp, link: "/market-overview" },
  { name: "Watchlist", icon: List, link: "/watchlist" },
  { name: "Profile", icon: User, link: "/profile" },
  { name: "Notifications", icon: Bell, link: "/notifications" },
  { name: "Settings", icon: Settings, link: "/settings" },
  { name: "About Us", icon: Info, link: "/about" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="bg-card text-card-foreground w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <h2 className="text-2xl font-semibold text-center mb-6 text-primary">Stock Tracker</h2>
      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            className={cn(
              "block py-2.5 px-4 rounded transition duration-200 flex items-center",
              pathname === item.link ? "bg-primary/10 text-primary" : "hover:bg-primary/10",
            )}
          >
            <item.icon className="h-5 w-5 mr-2" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}

