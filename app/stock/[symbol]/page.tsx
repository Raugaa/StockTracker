import StockDetail from "../../components/StockDetail"

export default function StockPage({ params }: { params: { symbol: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <StockDetail symbol={params.symbol} />
    </div>
  )
}

