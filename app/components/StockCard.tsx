"use client"

import { useState, useEffect } from "react"
import { ArrowUp, ArrowDown, Star } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface StockData {
  symbol: string
  companyName: string
  lastPrice: number
  change: number
  changePercent: number
}

export default function StockCard({ symbol }: { symbol: string }) {
  const [stockData, setStockData] = useState<StockData | null>(null)
  const [isWatchlisted, setIsWatchlisted] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchStockData = async () => {
      // In a real application, you would fetch this data from an API
      // For demonstration, we're using mock data
      const mockData: StockData = {
        symbol: symbol,
        companyName: "Mock Company Ltd.",
        lastPrice: Math.random() * 1000 + 100,
        change: Math.random() * 20 - 10,
        changePercent: Math.random() * 5 - 2.5,
      }
      setStockData(mockData)
    }

    fetchStockData()
    const interval = setInterval(fetchStockData, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [symbol])

  const toggleWatchlist = () => {
    setIsWatchlisted(!isWatchlisted)
    toast({
      title: isWatchlisted ? "Removed from Watchlist" : "Added to Watchlist",
      description: `${symbol} has been ${isWatchlisted ? "removed from" : "added to"} your watchlist.`,
    })
  }

  if (!stockData) return <Card className="h-[150px] animate-pulse" />

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <Link href={`/stock/${stockData.symbol}`} className="text-xl font-semibold hover:underline">
              {stockData.companyName}
            </Link>
            <p className="text-sm text-muted-foreground">{stockData.symbol}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleWatchlist}>
            <Star className={`h-5 w-5 ${isWatchlisted ? "fill-yellow-400" : ""}`} />
          </Button>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold">₹{stockData.lastPrice.toFixed(2)}</span>
          <span className={`flex items-center ${stockData.change >= 0 ? "text-green-500" : "text-red-500"}`}>
            {stockData.change >= 0 ? <ArrowUp className="mr-1" size={16} /> : <ArrowDown className="mr-1" size={16} />}
            {Math.abs(stockData.change).toFixed(2)} ({Math.abs(stockData.changePercent).toFixed(2)}%)
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

