"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Transaction {
  id: string
  date: string
  symbol: string
  type: "buy" | "sell"
  quantity: number
  price: number
}

export default function PortfolioTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    const mockTransactions: Transaction[] = [
      { id: "1", date: "2023-05-01", symbol: "RELIANCE", type: "buy", quantity: 5, price: 2000 },
      { id: "2", date: "2023-05-05", symbol: "TCS", type: "buy", quantity: 3, price: 3100 },
      { id: "3", date: "2023-05-10", symbol: "HDFCBANK", type: "buy", quantity: 10, price: 1400 },
      { id: "4", date: "2023-05-15", symbol: "RELIANCE", type: "buy", quantity: 5, price: 2100 },
      { id: "5", date: "2023-05-20", symbol: "TCS", type: "sell", quantity: 2, price: 3200 },
    ]
    setTransactions(mockTransactions)
  }, [])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Symbol</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Quantity</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.date}</TableCell>
            <TableCell className="font-medium">{transaction.symbol}</TableCell>
            <TableCell className={transaction.type === "buy" ? "text-green-500" : "text-red-500"}>
              {transaction.type.toUpperCase()}
            </TableCell>
            <TableCell className="text-right">{transaction.quantity}</TableCell>
            <TableCell className="text-right">₹{transaction.price.toFixed(2)}</TableCell>
            <TableCell className="text-right">₹{(transaction.quantity * transaction.price).toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

