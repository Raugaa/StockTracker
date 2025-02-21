import StockList from "./components/StockList"
import MarketOverviewWidget from "./components/MarketOverviewWidget"
import TopGainersLosers from "./components/TopGainersLosers"
import NewsWidget from "./components/NewsWidget"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Bombay Stock Exchange</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Listed Companies</h2>
          <StockList />
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

