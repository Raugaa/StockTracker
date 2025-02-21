"use client"

import { useState, useEffect } from "react"

export interface Stock {
  symbol: string
  name: string
  logo: string
}

// This is a more comprehensive list of BSE companies
const bseCompanies: Stock[] = [
  { symbol: "RELIANCE", name: "Reliance Industries Ltd.", logo: "https://logo.clearbit.com/ril.com" },
  { symbol: "TCS", name: "Tata Consultancy Services Ltd.", logo: "https://logo.clearbit.com/tcs.com" },
  { symbol: "HDFCBANK", name: "HDFC Bank Ltd.", logo: "https://logo.clearbit.com/hdfcbank.com" },
  { symbol: "INFY", name: "Infosys Ltd.", logo: "https://logo.clearbit.com/infosys.com" },
  { symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd.", logo: "https://logo.clearbit.com/hul.co.in" },
  { symbol: "ICICIBANK", name: "ICICI Bank Ltd.", logo: "https://logo.clearbit.com/icicibank.com" },
  { symbol: "SBIN", name: "State Bank of India", logo: "https://logo.clearbit.com/sbi.co.in" },
  { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd.", logo: "https://logo.clearbit.com/airtel.in" },
  { symbol: "ITC", name: "ITC Ltd.", logo: "https://logo.clearbit.com/itcportal.com" },
  { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank Ltd.", logo: "https://logo.clearbit.com/kotak.com" },
  { symbol: "HCLTECH", name: "HCL Technologies Ltd.", logo: "https://logo.clearbit.com/hcltech.com" },
  { symbol: "LT", name: "Larsen & Toubro Ltd.", logo: "https://logo.clearbit.com/larsentoubro.com" },
  { symbol: "ASIANPAINT", name: "Asian Paints Ltd.", logo: "https://logo.clearbit.com/asianpaints.com" },
  { symbol: "AXISBANK", name: "Axis Bank Ltd.", logo: "https://logo.clearbit.com/axisbank.com" },
  { symbol: "MARUTI", name: "Maruti Suzuki India Ltd.", logo: "https://logo.clearbit.com/marutisuzuki.com" },
  { symbol: "WIPRO", name: "Wipro Ltd.", logo: "https://logo.clearbit.com/wipro.com" },
  { symbol: "BAJFINANCE", name: "Bajaj Finance Ltd.", logo: "https://logo.clearbit.com/bajajfinserv.in" },
  { symbol: "TATAMOTORS", name: "Tata Motors Ltd.", logo: "https://logo.clearbit.com/tatamotors.com" },
  { symbol: "TITAN", name: "Titan Company Ltd.", logo: "https://logo.clearbit.com/titancompany.in" },
  { symbol: "ULTRACEMCO", name: "UltraTech Cement Ltd.", logo: "https://logo.clearbit.com/ultratechcement.com" },
  { symbol: "SUNPHARMA", name: "Sun Pharmaceutical Industries Ltd.", logo: "https://logo.clearbit.com/sunpharma.com" },
  { symbol: "BAJAJFINSV", name: "Bajaj Finserv Ltd.", logo: "https://logo.clearbit.com/bajajfinserv.in" },
  { symbol: "NESTLEIND", name: "Nestle India Ltd.", logo: "https://logo.clearbit.com/nestle.in" },
  { symbol: "TATASTEEL", name: "Tata Steel Ltd.", logo: "https://logo.clearbit.com/tatasteel.com" },
  { symbol: "TECHM", name: "Tech Mahindra Ltd.", logo: "https://logo.clearbit.com/techmahindra.com" },
  {
    symbol: "ADANIPORTS",
    name: "Adani Ports and Special Economic Zone Ltd.",
    logo: "https://logo.clearbit.com/adaniports.com",
  },
  {
    symbol: "POWERGRID",
    name: "Power Grid Corporation of India Ltd.",
    logo: "https://logo.clearbit.com/powergridindia.com",
  },
  { symbol: "HDFCLIFE", name: "HDFC Life Insurance Company Ltd.", logo: "https://logo.clearbit.com/hdfclife.com" },
  { symbol: "GRASIM", name: "Grasim Industries Ltd.", logo: "https://logo.clearbit.com/grasim.com" },
  { symbol: "DRREDDY", name: "Dr. Reddy's Laboratories Ltd.", logo: "https://logo.clearbit.com/drreddys.com" },
  { symbol: "SBILIFE", name: "SBI Life Insurance Company Ltd.", logo: "https://logo.clearbit.com/sbilife.co.in" },
  { symbol: "DIVISLAB", name: "Divi's Laboratories Ltd.", logo: "https://logo.clearbit.com/divislabs.com" },
  { symbol: "BRITANNIA", name: "Britannia Industries Ltd.", logo: "https://logo.clearbit.com/britannia.co.in" },
  { symbol: "HINDALCO", name: "Hindalco Industries Ltd.", logo: "https://logo.clearbit.com/hindalco.com" },
  { symbol: "CIPLA", name: "Cipla Ltd.", logo: "https://logo.clearbit.com/cipla.com" },
  { symbol: "ONGC", name: "Oil and Natural Gas Corporation Ltd.", logo: "https://logo.clearbit.com/ongcindia.com" },
  { symbol: "COALINDIA", name: "Coal India Ltd.", logo: "https://logo.clearbit.com/coalindia.in" },
  { symbol: "IOC", name: "Indian Oil Corporation Ltd.", logo: "https://logo.clearbit.com/iocl.com" },
  { symbol: "NTPC", name: "NTPC Ltd.", logo: "https://logo.clearbit.com/ntpc.co.in" },
  { symbol: "BAJAJ-AUTO", name: "Bajaj Auto Ltd.", logo: "https://logo.clearbit.com/bajajauto.com" },
]

export function useStockSearch(query: string) {
  const [results, setResults] = useState<Stock[]>([])

  useEffect(() => {
    if (query.length > 1) {
      const filteredResults = bseCompanies.filter(
        (company) =>
          company.symbol.toLowerCase().includes(query.toLowerCase()) ||
          company.name.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filteredResults)
    } else {
      setResults([])
    }
  }, [query])

  return results
}

export function getStockBySymbol(symbol: string): Stock | undefined {
  return bseCompanies.find((company) => company.symbol === symbol)
}

export const getTopStocks = (count = 20): Stock[] => {
  return bseCompanies.slice(0, count)
}

