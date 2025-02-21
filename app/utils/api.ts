const API_KEY = process.env.ALPHA_VANTAGE_API_KEY
const BASE_URL = "https://www.alphavantage.co/query"

export interface GlobalQuote {
  symbol: string
  open: string
  high: string
  low: string
  price: string
  volume: string
  latest_trading_day: string
  previous_close: string
  change: string
  change_percent: string
}

export interface TimeSeriesData {
  [date: string]: {
    "1. open": string
    "2. high": string
    "3. low": string
    "4. close": string
    "5. volume": string
  }
}

function generateMockQuote(symbol: string): GlobalQuote {
  const price = (Math.random() * 1000 + 100).toFixed(2)
  const change = (Math.random() * 10 - 5).toFixed(2)
  const changePercent = ((Number.parseFloat(change) / Number.parseFloat(price)) * 100).toFixed(2)

  return {
    symbol,
    open: (Number.parseFloat(price) - Math.random() * 10).toFixed(2),
    high: (Number.parseFloat(price) + Math.random() * 5).toFixed(2),
    low: (Number.parseFloat(price) - Math.random() * 5).toFixed(2),
    price,
    volume: Math.floor(Math.random() * 1000000).toString(),
    latest_trading_day: new Date().toISOString().split("T")[0],
    previous_close: (Number.parseFloat(price) - Number.parseFloat(change)).toFixed(2),
    change,
    change_percent: changePercent,
  }
}

function generateMockTimeSeries(symbol: string, days: number): TimeSeriesData {
  const data: TimeSeriesData = {}
  const today = new Date()

  for (let i = 0; i < days; i++) {
    const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
    const open = (Math.random() * 1000 + 100).toFixed(2)
    const close = (Math.random() * 1000 + 100).toFixed(2)
    data[date] = {
      "1. open": open,
      "2. high": (Math.max(Number.parseFloat(open), Number.parseFloat(close)) + Math.random() * 10).toFixed(2),
      "3. low": (Math.min(Number.parseFloat(open), Number.parseFloat(close)) - Math.random() * 10).toFixed(2),
      "4. close": close,
      "5. volume": Math.floor(Math.random() * 1000000).toString(),
    }
  }

  return data
}

export async function fetchStockQuote(symbol: string): Promise<GlobalQuote> {
  try {
    const response = await fetch(`${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`)
    if (!response.ok) {
      throw new Error("Failed to fetch stock quote")
    }
    const data = await response.json()
    if (data["Global Quote"] && Object.keys(data["Global Quote"]).length > 0) {
      return data["Global Quote"]
    } else {
      console.warn("API returned empty data, using mock data instead")
      return generateMockQuote(symbol)
    }
  } catch (error) {
    console.error("Error fetching stock quote:", error)
    return generateMockQuote(symbol)
  }
}

export async function fetchStockTimeSeries(
  symbol: string,
  interval: "daily" | "weekly" | "monthly" = "daily",
): Promise<TimeSeriesData> {
  try {
    const response = await fetch(
      `${BASE_URL}?function=TIME_SERIES_${interval.toUpperCase()}&symbol=${symbol}&apikey=${API_KEY}`,
    )
    if (!response.ok) {
      throw new Error("Failed to fetch time series data")
    }
    const data = await response.json()
    const timeSeriesKey = `Time Series (${interval.charAt(0).toUpperCase() + interval.slice(1)})`
    if (data[timeSeriesKey] && Object.keys(data[timeSeriesKey]).length > 0) {
      return data[timeSeriesKey]
    } else {
      console.warn("API returned empty data, using mock data instead")
      return generateMockTimeSeries(symbol, 30) // Generate 30 days of mock data
    }
  } catch (error) {
    console.error("Error fetching time series data:", error)
    return generateMockTimeSeries(symbol, 30) // Generate 30 days of mock data
  }
}

export async function searchStocks(keywords: string) {
  try {
    const response = await fetch(`${BASE_URL}?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${API_KEY}`)
    if (!response.ok) {
      throw new Error("Failed to search stocks")
    }
    const data = await response.json()
    return data.bestMatches || []
  } catch (error) {
    console.error("Error searching stocks:", error)
    return []
  }
}

export async function fetchCompanyOverview(symbol: string) {
  try {
    const response = await fetch(`${BASE_URL}?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`)
    if (!response.ok) {
      throw new Error("Failed to fetch company overview")
    }
    const data = await response.json()
    if (Object.keys(data).length > 0) {
      return data
    } else {
      console.warn("API returned empty data for company overview, using mock data instead")
      return {
        Symbol: symbol,
        Name: `${symbol} Corporation`,
        Description: `This is a mock description for ${symbol} Corporation.`,
        Sector: "Technology",
        Industry: "Software",
      }
    }
  } catch (error) {
    console.error("Error fetching company overview:", error)
    return {
      Symbol: symbol,
      Name: `${symbol} Corporation`,
      Description: `This is a mock description for ${symbol} Corporation.`,
      Sector: "Technology",
      Industry: "Software",
    }
  }
}

