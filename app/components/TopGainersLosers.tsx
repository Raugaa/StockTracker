"use client"

import { useState, useEffect } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getTopStocks } from "../utils/stockData"

interface StockData {
  symbol: string
  name: string
  change: number
  changePercent: number
}

export default function TopGainersLosers() {
  const [topGainers, setTopGainers] = useState<StockData[]>([])
  const [topLosers, setTopLosers] = useState<StockData[]>([])

  useEffect(() => {
    const fetchData = () => {
      const allStocks = getTopStocks(100)
      const mockStocks = allStocks.map((stock) => ({
        ...stock,
        change: Math.random() * 20 - 10,
        changePercent: Math.random() * 5 - 2.5,
      }))

      setTopGainers(
        mockStocks
          .filter((stock) => stock.change > 0)
          .sort((a, b) => b.change - a.change)
          .slice(0, 10),
      )
      setTopLosers(
        mockStocks
          .filter((stock) => stock.change < 0)
          .sort((a, b) => a.change - b.change)
          .slice(0, 10),
      )
    }

    fetchData()
    const interval = setInterval(fetchData, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const renderStockList = (stocks: StockData[]) => (
    <ul>
      {stocks.map((stock) => (
        <li key={stock.symbol} className="flex justify-between items-center py-2 border-b last:border-b-0">
          <div>
            <span className="font-semibold">{stock.symbol}</span>
            <span className="text-sm text-muted-foreground ml-2">{stock.name}</span>
          </div>
          <span className={`flex items-center ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}>
            {stock.change >= 0 ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
            {Math.abs(stock.changePercent).toFixed(2)}%
          </span>
        </li>
      ))}
    </ul>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Gainers & Losers</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gainers">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
            <TabsTrigger value="losers">Top Losers</TabsTrigger>
          </TabsList>
          <TabsContent value="gainers">{renderStockList(topGainers)}</TabsContent>
          <TabsContent value="losers">{renderStockList(topLosers)}</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

