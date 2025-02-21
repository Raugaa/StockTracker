"use client"

import { useState, useEffect } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"

interface IndexData {
  name: string
  value: number
  change: number
  changePercent: number
}

const indices = [
  "NIFTY 50",
  "SENSEX",
  "NIFTY BANK",
  "NIFTY IT",
  "NIFTY AUTO",
  "NIFTY PHARMA",
  "NIFTY FMCG",
  "NIFTY METAL",
  "NIFTY REALTY",
]

export default function MarketOverview() {
  const [indexData, setIndexData] = useState<IndexData[]>([])

  useEffect(() => {
    const fetchIndexData = () => {
      const mockData = indices.map((name) => ({
        name,
        value: Math.random() * 10000 + 10000,
        change: Math.random() * 200 - 100,
        changePercent: Math.random() * 2 - 1,
      }))
      setIndexData(mockData)
    }

    fetchIndexData()
    const interval = setInterval(fetchIndexData, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {indexData.map((index) => (
        <div key={index.name} className="bg-card p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">{index.name}</h2>
          <div className="flex justify-between items-center">
            <span className="text-2xl">₹{index.value.toFixed(2)}</span>
            <span className={`flex items-center ${index.change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {index.change >= 0 ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
              {Math.abs(index.change).toFixed(2)} ({Math.abs(index.changePercent).toFixed(2)}%)
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

