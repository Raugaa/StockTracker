"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface PortfolioHolding {
  symbol: string
  shares: number
  averageCost: number
}

interface PortfolioContextType {
  portfolio: PortfolioHolding[]
  addToPortfolio: (symbol: string, shares: number, averageCost: number) => void
  removeFromPortfolio: (symbol: string) => void
  updateShares: (symbol: string, shares: number) => void
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolio, setPortfolio] = useState<PortfolioHolding[]>([])

  useEffect(() => {
    const savedPortfolio = localStorage.getItem("portfolio")
    if (savedPortfolio) {
      setPortfolio(JSON.parse(savedPortfolio))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("portfolio", JSON.stringify(portfolio))
  }, [portfolio])

  const addToPortfolio = (symbol: string, shares: number, averageCost: number) => {
    setPortfolio((prevPortfolio) => {
      const existingHolding = prevPortfolio.find((holding) => holding.symbol === symbol)
      if (existingHolding) {
        return prevPortfolio.map((holding) =>
          holding.symbol === symbol
            ? {
                ...holding,
                shares: holding.shares + shares,
                averageCost: (holding.averageCost * holding.shares + averageCost * shares) / (holding.shares + shares),
              }
            : holding,
        )
      } else {
        return [...prevPortfolio, { symbol, shares, averageCost }]
      }
    })
  }

  const removeFromPortfolio = (symbol: string) => {
    setPortfolio((prevPortfolio) => prevPortfolio.filter((holding) => holding.symbol !== symbol))
  }

  const updateShares = (symbol: string, shares: number) => {
    setPortfolio((prevPortfolio) =>
      prevPortfolio.map((holding) => (holding.symbol === symbol ? { ...holding, shares } : holding)),
    )
  }

  return (
    <PortfolioContext.Provider value={{ portfolio, addToPortfolio, removeFromPortfolio, updateShares }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider")
  }
  return context
}

