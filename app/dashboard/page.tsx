import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import StockList from "../components/StockList"
import MarketOverviewWidget from "../components/MarketOverviewWidget"
import TopGainersLosers from "../components/TopGainersLosers"
import NewsWidget from "../components/NewsWidget"
import WatchlistWidget from "../components/WatchlistWidget"
import PortfolioSummary from "../components/PortfolioSummary"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PortfolioSummary />
          <Card>
            <CardHeader>
              <CardTitle>Watchlist</CardTitle>
            </CardHeader>
            <CardContent>
              <WatchlistWidget />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Market Movers</CardTitle>
            </CardHeader>
            <CardContent>
              <StockList limit={5} />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <MarketOverviewWidget />
          <TopGainersLosers />
          <NewsWidget />
        </div>
      </div>
    </div>
  )
}

