"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowUp, ArrowDown, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useWatchlist } from "./WatchlistContext"
import { fetchStockQuote } from "../utils/api"
import { Skeleton } from "@/components/ui/skeleton"

interface WatchlistItem {
  symbol: string
  price: number
  change: number
  changePercent: number
}

export default function WatchlistWidget() {
  const { watchlist, removeFromWatchlist } = useWatchlist()
  const [watchlistData, setWatchlistData] = useState<WatchlistItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await Promise.all(
          watchlist.map(async (symbol) => {
            try {
              const quote = await fetchStockQuote(symbol)
              return {
                symbol,
                price: Number.parseFloat(quote.price),
                change: Number.parseFloat(quote.change),
                changePercent: Number.parseFloat(quote.change_percent),
              }
            } catch (error) {
              console.error(`Error fetching data for ${symbol}:`, error)
              return {
                symbol,
                price: Number.NaN,
                change: Number.NaN,
                changePercent: Number.NaN,
              }
            }
          }),
        )
        setWatchlistData(data)
      } catch (error) {
        console.error("Error fetching watchlist data:", error)
      }
      setLoading(false)
    }

    if (watchlist.length > 0) {
      fetchData()
    } else {
      setWatchlistData([])
      setLoading(false)
    }
  }, [watchlist])

  if (loading) {
    return <WatchlistSkeleton />
  }

  if (watchlistData.length === 0) {
    return <div>No stocks in watchlist. Add some stocks to track them here.</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Symbol</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Change</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {watchlistData.map((item) => (
          <TableRow key={item.symbol}>
            <TableCell className="font-medium">
              <Link href={`/stock/${item.symbol}`} className="hover:underline">
                {item.symbol}
              </Link>
            </TableCell>
            <TableCell className="text-right">{isNaN(item.price) ? "N/A" : `₹${item.price.toFixed(2)}`}</TableCell>
            <TableCell className="text-right">
              {isNaN(item.change) || isNaN(item.changePercent) ? (
                "N/A"
              ) : (
                <span
                  className={`flex items-center justify-end ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {item.change >= 0 ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
                  {Math.abs(item.changePercent).toFixed(2)}%
                </span>
              )}
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm" onClick={() => removeFromWatchlist(item.symbol)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function WatchlistSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Symbol</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Change</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 w-20" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 w-16 ml-auto" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 w-12 ml-auto" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-8 w-8 rounded-full ml-auto" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

