"use client"

import { useState, useEffect } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface IndexData {
  name: string
  value: number
  change: number
  changePercent: number
}

const indices = ["NIFTY 50", "SENSEX", "NIFTY BANK"]

export default function MarketOverviewWidget() {
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
    <Card>
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {indexData.map((index) => (
          <div key={index.name} className="flex justify-between items-center py-2 border-b last:border-b-0">
            <div>
              <p className="font-semibold">{index.name}</p>
              <p className="text-sm text-muted-foreground">₹{index.value.toFixed(2)}</p>
            </div>
            <span className={`flex items-center ${index.change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {index.change >= 0 ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
              {Math.abs(index.change).toFixed(2)} ({Math.abs(index.changePercent).toFixed(2)}%)
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

