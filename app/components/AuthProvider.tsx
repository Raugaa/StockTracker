"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  updateUser: (userData: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Set a default user
    const defaultUser: User = {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      avatar: "/placeholder-user.jpg",
    }
    setUser(defaultUser)
  }, [])

  const updateUser = async (userData: Partial<User>) => {
    // In a real application, you would send this data to your backend
    // For now, we'll just update the local state
    setUser((prevUser) => {
      if (prevUser) {
        return { ...prevUser, ...userData }
      }
      return prevUser
    })
  }

  return <AuthContext.Provider value={{ user, updateUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

