"use client"

import { useState } from "react"
import StockCard from "./StockCard"

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState<string[]>(["RELIANCE", "TCS", "HDFCBANK", "INFY", "ICICIBANK"])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {watchlist.map((symbol) => (
        <StockCard key={symbol} symbol={symbol} />
      ))}
    </div>
  )
}

