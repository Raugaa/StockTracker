"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface NewsItem {
  id: number
  title: string
  source: string
  url: string
}

export default function NewsWidget() {
  const [news, setNews] = useState<NewsItem[]>([])

  useEffect(() => {
    // Mock news data - replace with actual API call
    const mockNews: NewsItem[] = [
      { id: 1, title: "Stock Market Reaches All-Time High", source: "Financial Times", url: "#" },
      { id: 2, title: "Tech Stocks Surge Amid Positive Earnings Reports", source: "Bloomberg", url: "#" },
      { id: 3, title: "Oil Prices Stabilize Following OPEC Meeting", source: "Reuters", url: "#" },
      { id: 4, title: "Cryptocurrency Market Shows Signs of Recovery", source: "CoinDesk", url: "#" },
      { id: 5, title: "Global Economic Outlook Improves, Says IMF", source: "The Economist", url: "#" },
    ]
    setNews(mockNews)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest News</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {news.map((item) => (
            <li key={item.id}>
              <a href={item.url} className="block hover:bg-accent p-2 rounded-md transition-colors">
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.source}</p>
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

