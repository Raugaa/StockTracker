"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowUp, ArrowDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useStockSearch, getTopStocks, type Stock } from "../utils/stockData"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface StockListProps {
  limit?: number
}

export default function StockList({ limit }: StockListProps) {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [displayedStocks, setDisplayedStocks] = useState<Stock[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1)
  const searchResults = useStockSearch(searchQuery)
  const { ref, inView } = useInView()
  const itemsPerPage = 20

  useEffect(() => {
    setStocks(getTopStocks(limit || 100))
  }, [limit])

  useEffect(() => {
    if (searchQuery) {
      setDisplayedStocks(searchResults.slice(0, page * itemsPerPage))
    } else {
      setDisplayedStocks(stocks.slice(0, page * itemsPerPage))
    }
  }, [searchQuery, searchResults, stocks, page])

  useEffect(() => {
    if (inView && !searchQuery && !limit) {
      setPage((prevPage) => prevPage + 1)
    }
  }, [inView, searchQuery, limit])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setPage(1)
  }

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  return (
    <div className="space-y-4">
      {!limit && (
        <Input
          type="text"
          placeholder="Search for a stock..."
          value={searchQuery}
          onChange={handleSearch}
          className="mb-4"
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayedStocks.map((stock, index) => (
          <motion.div
            key={stock.symbol}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link href={`/stock/${stock.symbol}`} passHref>
              <Card className="hover:bg-accent transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={stock.logo || "/placeholder.svg"}
                      alt={`${stock.name} logo`}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold">{stock.name}</h2>
                      <p className="text-sm text-muted-foreground">{stock.symbol}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold">₹{(Math.random() * 1000 + 100).toFixed(2)}</span>
                    <span className={`flex items-center ${Math.random() > 0.5 ? "text-green-500" : "text-red-500"}`}>
                      {Math.random() > 0.5 ? (
                        <ArrowUp size={16} className="mr-1" />
                      ) : (
                        <ArrowDown size={16} className="mr-1" />
                      )}
                      {(Math.random() * 5).toFixed(2)}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
      {!searchQuery && !limit && (
        <div className="flex justify-center mt-4">
          <Button onClick={loadMore} ref={ref}>
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}

