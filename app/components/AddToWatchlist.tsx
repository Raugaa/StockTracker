"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useStockSearch } from "../utils/stockData"
import { useWatchlist } from "./WatchlistContext"

export default function AddToWatchlist() {
  const [searchQuery, setSearchQuery] = useState("")
  const searchResults = useStockSearch(searchQuery)
  const { addToWatchlist, isInWatchlist } = useWatchlist()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add to Watchlist</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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
                  <Button onClick={() => addToWatchlist(stock.symbol)} disabled={isInWatchlist(stock.symbol)}>
                    {isInWatchlist(stock.symbol) ? "Added" : "Add"}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

