import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import StockList from "../components/StockList"
import MarketOverviewWidget from "../components/MarketOverviewWidget"
import TopGainersLosers from "../components/TopGainersLosers"
import SectorPerformance from "../components/SectorPerformance"
import AddToWatchlist from "../components/AddToWatchlist"

export default function MarketPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Market Overview</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AddToWatchlist />
          <Card>
            <CardHeader>
              <CardTitle>All Stocks</CardTitle>
            </CardHeader>
            <CardContent>
              <StockList />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <MarketOverviewWidget />
          <TopGainersLosers />
          <SectorPerformance />
        </div>
      </div>
    </div>
  )
}

