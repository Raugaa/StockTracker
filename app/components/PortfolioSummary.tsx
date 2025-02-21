"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface PortfolioItem {
  name: string
  value: number
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function PortfolioSummary() {
  const [portfolioValue, setPortfolioValue] = useState(100000)
  const [todayChange, setTodayChange] = useState(1500)
  const [totalGain, setTotalGain] = useState(10000)
  const [holdings, setHoldings] = useState<PortfolioItem[]>([
    { name: "Reliance", value: 25000 },
    { name: "TCS", value: 20000 },
    { name: "HDFC Bank", value: 15000 },
    { name: "Infosys", value: 10000 },
    { name: "Others", value: 30000 },
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Current Value</h3>
            <p className="text-3xl font-bold mb-4">₹{portfolioValue.toLocaleString()}</p>
            <div className="space-y-2">
              <p className={`flex items-center ${todayChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                {todayChange >= 0 ? <ArrowUp size={16} className="mr-2" /> : <ArrowDown size={16} className="mr-2" />}₹
                {Math.abs(todayChange).toLocaleString()} ({((todayChange / portfolioValue) * 100).toFixed(2)}%)
                <span className="ml-2 text-sm text-muted-foreground">Today</span>
              </p>
              <p className={`flex items-center ${totalGain >= 0 ? "text-green-500" : "text-red-500"}`}>
                {totalGain >= 0 ? <ArrowUp size={16} className="mr-2" /> : <ArrowDown size={16} className="mr-2" />}₹
                {Math.abs(totalGain).toLocaleString()} ({((totalGain / portfolioValue) * 100).toFixed(2)}%)
                <span className="ml-2 text-sm text-muted-foreground">Overall gain</span>
              </p>
            </div>
          </div>
          <div className="h-64 md:h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={holdings}
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  fill="#8884d8"
                  dataKey="value"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {holdings.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

