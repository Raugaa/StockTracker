"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"

interface SectorData {
  name: string
  change: number
}

export default function SectorPerformance() {
  const [sectors, setSectors] = useState<SectorData[]>([])

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    const mockSectors: SectorData[] = [
      { name: "Technology", change: 1.5 },
      { name: "Finance", change: -0.8 },
      { name: "Healthcare", change: 2.1 },
      { name: "Consumer Goods", change: 0.5 },
      { name: "Energy", change: -1.2 },
    ]
    setSectors(mockSectors)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sector Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {sectors.map((sector) => (
            <li key={sector.name} className="flex justify-between items-center">
              <span>{sector.name}</span>
              <span className={`flex items-center ${sector.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {sector.change >= 0 ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
                {Math.abs(sector.change).toFixed(2)}%
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

