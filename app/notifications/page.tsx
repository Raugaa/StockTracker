import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function NotificationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="price-alerts">Price Alerts</Label>
              <Switch id="price-alerts" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="news-updates">News Updates</Label>
              <Switch id="news-updates" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="market-summaries">Market Summaries</Label>
              <Switch id="market-summaries" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="watchlist-updates">Watchlist Updates</Label>
              <Switch id="watchlist-updates" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

