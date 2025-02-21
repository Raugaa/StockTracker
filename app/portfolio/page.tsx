"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown } from "lucide-react"
import { usePortfolio } from "../components/PortfolioContext"
import { fetchStockQuote } from "../utils/api"
import { useStockSearch } from "../utils/stockData"

interface PortfolioHolding {
  symbol: string
  shares: number
  averageCost: number
}

interface PortfolioItem extends PortfolioHolding {
  currentPrice: number
  totalValue: number
  profitLoss: number
  profitLossPercentage: number
}

export default function PortfolioPage() {
  const { portfolio, addToPortfolio, removeFromPortfolio, updateShares } = usePortfolio()
  const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [totalValue, setTotalValue] = useState(0)
  const [totalProfitLoss, setTotalProfitLoss] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [shares, setShares] = useState("")
  const [averageCost, setAverageCost] = useState("")
  const searchResults = useStockSearch(searchQuery)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await Promise.all(
          portfolio.map(async (holding) => {
            const quote = await fetchStockQuote(holding.symbol)
            const currentPrice = Number.parseFloat(quote.price)
            const totalValue = currentPrice * holding.shares
            const profitLoss = totalValue - holding.averageCost * holding.shares
            const profitLossPercentage = (profitLoss / (holding.averageCost * holding.shares)) * 100

            return {
              ...holding,
              currentPrice,
              totalValue,
              profitLoss,
              profitLossPercentage,
            }
          }),
        )
        setPortfolioData(data)
        const newTotalValue = data.reduce((sum, item) => sum + item.totalValue, 0)
        const newTotalProfitLoss = data.reduce((sum, item) => sum + item.profitLoss, 0)
        setTotalValue(newTotalValue)
        setTotalProfitLoss(newTotalProfitLoss)
      } catch (error) {
        console.error("Error fetching portfolio data:", error)
      }
      setLoading(false)
    }

    fetchData()
    const interval = setInterval(fetchData, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [portfolio])

  const handleAddStock = (symbol: string) => {
    const sharesNum = Number.parseInt(shares)
    const costNum = Number.parseFloat(averageCost)
    if (isNaN(sharesNum) || isNaN(costNum)) {
      alert("Please enter valid numbers for shares and average cost.")
      return
    }
    addToPortfolio(symbol, sharesNum, costNum)
    setSearchQuery("")
    setShares("")
    setAverageCost("")
  }

  if (loading) {
    return <div>Loading portfolio data...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Portfolio</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-2xl font-bold">₹{totalValue.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Profit/Loss</p>
              <p className={`text-2xl font-bold ${totalProfitLoss >= 0 ? "text-green-500" : "text-red-500"}`}>
                ₹{totalProfitLoss.toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add Stock to Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Input
              type="text"
              placeholder="Search for a stock..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex space-x-2">
              <Input type="number" placeholder="Shares" value={shares} onChange={(e) => setShares(e.target.value)} />
              <Input
                type="number"
                placeholder="Average Cost"
                value={averageCost}
                onChange={(e) => setAverageCost(e.target.value)}
              />
            </div>
            {searchResults.length > 0 && (
              <ul className="space-y-2">
                {searchResults.map((stock) => (
                  <li key={stock.symbol} className="flex justify-between items-center p-2 hover:bg-accent rounded-md">
                    <span>
                      {stock.name} ({stock.symbol})
                    </span>
                    <Button onClick={() => handleAddStock(stock.symbol)}>Add to Portfolio</Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Your Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead className="text-right">Shares</TableHead>
                <TableHead className="text-right">Avg Cost</TableHead>
                <TableHead className="text-right">Current Price</TableHead>
                <TableHead className="text-right">Total Value</TableHead>
                <TableHead className="text-right">Profit/Loss</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolioData.map((item) => (
                <TableRow key={item.symbol}>
                  <TableCell className="font-medium">{item.symbol}</TableCell>
                  <TableCell className="text-right">{item.shares}</TableCell>
                  <TableCell className="text-right">₹{item.averageCost.toFixed(2)}</TableCell>
                  <TableCell className="text-right">₹{item.currentPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-right">₹{item.totalValue.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`flex items-center justify-end ${item.profitLoss >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {item.profitLoss >= 0 ? (
                        <ArrowUp size={16} className="mr-1" />
                      ) : (
                        <ArrowDown size={16} className="mr-1" />
                      )}
                      ₹{Math.abs(item.profitLoss).toFixed(2)} ({Math.abs(item.profitLossPercentage).toFixed(2)}%)
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => removeFromPortfolio(item.symbol)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

