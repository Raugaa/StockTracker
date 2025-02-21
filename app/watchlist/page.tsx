"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import WatchlistWidget from "../components/WatchlistWidget"
import { useStockSearch } from "../utils/stockData"
import { useWatchlist } from "../components/WatchlistContext"

export default function WatchlistPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const searchResults = useStockSearch(searchQuery)
  const { addToWatchlist, isInWatchlist } = useWatchlist()

  const handleAddStock = (symbol: string) => {
    addToWatchlist(symbol)
    setSearchQuery("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Watchlist</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add Stock to Watchlist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Input
              type="text"
              placeholder="Search for a stock..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchResults.length > 0 && (
              <ul className="space-y-2">
                {searchResults.map((stock) => (
                  <li key={stock.symbol} className="flex justify-between items-center p-2 hover:bg-accent rounded-md">
                    <span>
                      {stock.name} ({stock.symbol})
                    </span>
                    <Button onClick={() => handleAddStock(stock.symbol)} disabled={isInWatchlist(stock.symbol)}>
                      {isInWatchlist(stock.symbol) ? "Added" : "Add"}
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Watched Stocks</CardTitle>
        </CardHeader>
        <CardContent>
          <WatchlistWidget />
        </CardContent>
      </Card>
    </div>
  )
}

