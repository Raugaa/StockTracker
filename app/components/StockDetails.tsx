"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ArrowUp, ArrowDown } from "lucide-react"

interface StockData {
  date: string
  price: number
}

interface StockInfo {
  symbol: string
  name: string
  price: number
  change: number
  data: StockData[]
}

export default function StockDetails({ symbol }: { symbol: string }) {
  const [stockInfo, setStockInfo] = useState<StockInfo | null>(null)

  useEffect(() => {
    // Fetch stock data here
    // For now, we'll use mock data
    setStockInfo({
      symbol,
      name: "Apple Inc.",
      price: 150.25,
      change: 2.5,
      data: [
        { date: "2023-01-01", price: 140 },
        { date: "2023-02-01", price: 145 },
        { date: "2023-03-01", price: 148 },
        { date: "2023-04-01", price: 152 },
        { date: "2023-05-01", price: 150.25 },
      ],
    })
  }, [symbol])

  if (!stockInfo) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">{stockInfo.name}</h1>
      <p className="text-xl text-gray-400 mb-8">{stockInfo.symbol}</p>
      <div className="flex items-center mb-8">
        <span className="text-4xl mr-4">${stockInfo.price.toFixed(2)}</span>
        <span className={`flex items-center text-2xl ${stockInfo.change >= 0 ? "text-green-500" : "text-red-500"}`}>
          {stockInfo.change >= 0 ? <ArrowUp size={24} /> : <ArrowDown size={24} />}
          {Math.abs(stockInfo.change).toFixed(2)}%
        </span>
      </div>
      <div className="h-96 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={stockInfo.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip contentStyle={{ backgroundColor: "#333", border: "none" }} labelStyle={{ color: "#fff" }} />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

