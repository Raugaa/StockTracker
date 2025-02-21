"use client"

import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts"
import { ArrowUp, ArrowDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchStockQuote, fetchStockTimeSeries, fetchCompanyOverview } from "../utils/api"

interface StockData {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

const timeframes = ["1D", "1W", "1M", "3M", "6M", "1Y", "5Y"]
const chartTypes = ["line", "area", "combo", "bar"] as const

export default function StockDetail({ symbol }: { symbol: string }) {
  const [stockData, setStockData] = useState<StockData[]>([])
  const [chartType, setChartType] = useState<(typeof chartTypes)[number]>("line")
  const [timeframe, setTimeframe] = useState("1M")
  const [quote, setQuote] = useState<any>(null)
  const [companyInfo, setCompanyInfo] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch current quote
        const quoteData = await fetchStockQuote(symbol)
        setQuote(quoteData)

        // Fetch company overview
        const overview = await fetchCompanyOverview(symbol)
        setCompanyInfo(overview)

        // Fetch historical data
        const interval = timeframe === "1D" ? "daily" : timeframe === "1W" ? "weekly" : "monthly"
        const timeSeriesData = await fetchStockTimeSeries(symbol, interval)

        const formattedData = Object.entries(timeSeriesData).map(([date, values]) => ({
          date,
          open: Number.parseFloat(values["1. open"]),
          high: Number.parseFloat(values["2. high"]),
          low: Number.parseFloat(values["3. low"]),
          close: Number.parseFloat(values["4. close"]),
          volume: Number.parseInt(values["5. volume"]),
        }))

        setStockData(formattedData)
      } catch (err) {
        setError("Failed to fetch stock data. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [symbol, timeframe])

  if (loading) {
    return <StockDetailSkeleton />
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!quote || !companyInfo || stockData.length === 0) {
    return (
      <Alert>
        <AlertTitle>No Data Available</AlertTitle>
        <AlertDescription>No data available for this stock symbol.</AlertDescription>
      </Alert>
    )
  }

  const price = Number.parseFloat(quote.price)
  const change = Number.parseFloat(quote.change)
  const changePercent = Number.parseFloat(quote.change_percent)

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div className="ml-4">
                <h1 className="text-3xl font-bold">{companyInfo.Name || symbol}</h1>
                <p className="text-xl text-muted-foreground">{symbol}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">₹{isNaN(price) ? "N/A" : price.toFixed(2)}</p>
              <p
                className={`flex items-center justify-end text-lg ${isNaN(change) ? "text-gray-500" : change >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {isNaN(change) ? (
                  "N/A"
                ) : (
                  <>
                    {change >= 0 ? <ArrowUp size={24} className="mr-1" /> : <ArrowDown size={24} className="mr-1" />}
                    {Math.abs(change).toFixed(2)} ({Math.abs(changePercent).toFixed(2)}%)
                  </>
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Chart</CardTitle>
          <div className="flex space-x-2">
            <Select value={chartType} onValueChange={(value) => setChartType(value as (typeof chartTypes)[number])}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select chart type" />
              </SelectTrigger>
              <SelectContent>
                {chartTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)} Chart
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                {timeframes.map((tf) => (
                  <SelectItem key={tf} value={tf}>
                    {tf}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "line" && (
                <LineChart data={stockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={["auto", "auto"]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="close" stroke="#8884d8" dot={false} />
                </LineChart>
              )}
              {chartType === "area" && (
                <AreaChart data={stockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={["auto", "auto"]} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="close" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              )}
              {chartType === "combo" && (
                <ComposedChart data={stockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" domain={["auto", "auto"]} />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="volume" fill="#82ca9d" yAxisId="right" />
                  <Line type="monotone" dataKey="close" stroke="#8884d8" yAxisId="left" dot={false} />
                </ComposedChart>
              )}
              {chartType === "bar" && (
                <BarChart data={stockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="volume" fill="#8884d8" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Open</dt>
                <dd className="text-lg font-semibold">
                  ₹{isNaN(Number.parseFloat(quote.open)) ? "N/A" : Number.parseFloat(quote.open).toFixed(2)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Previous Close</dt>
                <dd className="text-lg font-semibold">
                  ₹
                  {isNaN(Number.parseFloat(quote.previous_close))
                    ? "N/A"
                    : Number.parseFloat(quote.previous_close).toFixed(2)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">High</dt>
                <dd className="text-lg font-semibold">
                  ₹{isNaN(Number.parseFloat(quote.high)) ? "N/A" : Number.parseFloat(quote.high).toFixed(2)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Low</dt>
                <dd className="text-lg font-semibold">
                  ₹{isNaN(Number.parseFloat(quote.low)) ? "N/A" : Number.parseFloat(quote.low).toFixed(2)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Volume</dt>
                <dd className="text-lg font-semibold">
                  {isNaN(Number.parseInt(quote.volume)) ? "N/A" : Number.parseInt(quote.volume).toLocaleString()}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Sector</dt>
                <dd className="text-lg">{companyInfo.Sector || "N/A"}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Industry</dt>
                <dd className="text-lg">{companyInfo.Industry || "N/A"}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Description</dt>
                <dd className="text-sm text-muted-foreground">
                  {companyInfo.Description || "No description available."}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StockDetailSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="ml-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-24 mt-2" />
              </div>
            </div>
            <div className="text-right">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-24 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-24 mt-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full mt-2" />
            <Skeleton className="h-4 w-2/3 mt-2" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

