"use client"

import { useState, useEffect } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Holding {
  symbol: string
  name: string
  quantity: number
  avgCost: number
  currentPrice: number
  change: number
}

export default function PortfolioHoldings() {
  const [holdings, setHoldings] = useState<Holding[]>([])

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    const mockHoldings: Holding[] = [
      { symbol: "RELIANCE", name: "Reliance Industries", quantity: 10, avgCost: 2000, currentPrice: 2500, change: 25 },
      {
        symbol: "TCS",
        name: "Tata Consultancy Services",
        quantity: 5,
        avgCost: 3000,
        currentPrice: 3200,
        change: 6.67,
      },
      { symbol: "HDFCBANK", name: "HDFC Bank", quantity: 15, avgCost: 1400, currentPrice: 1450, change: 3.57 },
    ]
    setHoldings(mockHoldings)
  }, [])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Symbol</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Quantity</TableHead>
          <TableHead className="text-right">Avg Cost</TableHead>
          <TableHead className="text-right">Current Price</TableHead>
          <TableHead className="text-right">Change</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {holdings.map((holding) => (
          <TableRow key={holding.symbol}>
            <TableCell className="font-medium">{holding.symbol}</TableCell>
            <TableCell>{holding.name}</TableCell>
            <TableCell className="text-right">{holding.quantity}</TableCell>
            <TableCell className="text-right">₹{holding.avgCost.toFixed(2)}</TableCell>
            <TableCell className="text-right">₹{holding.currentPrice.toFixed(2)}</TableCell>
            <TableCell className="text-right">
              <span
                className={`flex items-center justify-end ${holding.change >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {holding.change >= 0 ? (
                  <ArrowUp size={16} className="mr-1" />
                ) : (
                  <ArrowDown size={16} className="mr-1" />
                )}
                {Math.abs(holding.change).toFixed(2)}%
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

