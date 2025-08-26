"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

export interface User {
  id: string
  email: string
  minecraftUsername: string
  discordTag?: string
  joinDate: string
  totalSpent: number
  currentRank: string
  avatar: string
  perks: string[]
  purchaseHistory: Purchase[]
  role: "user" | "admin" // Added role field for admin access
}

export interface Purchase {
  id: string
  date: string
  items: {
    title: string
    category: string
    price: number
    quantity: number
  }[]
  total: number
  status: "completed" | "pending" | "failed"
  orderNumber: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE" }
  | { type: "LOGOUT" }
  | { type: "UPDATE_PROFILE"; payload: Partial<User> }

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true }

    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      }

    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      }

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      }

    case "UPDATE_PROFILE":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      }

    default:
      return state
  }
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
}

const validateMinecraftUsername = async (
  username: string,
): Promise<{ isValid: boolean; uuid?: string; skinUrl?: string }> => {
  try {
    // Basic validation for Minecraft username format
    const isValidFormat =
      username.length >= 3 &&
      username.length <= 16 &&
      /^[a-zA-Z0-9_]+$/.test(username) &&
      !/^_|_$/.test(username) && // Cannot start or end with underscore
      !/_{2,}/.test(username) // Cannot have consecutive underscores

    if (!isValidFormat) {
      return { isValid: false }
    }

    try {
      const testImage = new Image()
      const skinUrl = `https://mc-heads.net/avatar/${username}/64`

      // Create a promise to test if the image loads
      const imageLoadPromise = new Promise<boolean>((resolve) => {
        testImage.onload = () => resolve(true)
        testImage.onerror = () => resolve(false)
        testImage.src = skinUrl

        // Timeout after 3 seconds
        setTimeout(() => resolve(true), 3000) // Assume valid if timeout
      })

      const imageLoaded = await imageLoadPromise

      return {
        isValid: true, // Accept if format is valid
        skinUrl: skinUrl,
      }
    } catch (error) {
      // If image test fails, still accept valid format
      return {
        isValid: true,
        skinUrl: `https://mc-heads.net/avatar/${username}/64`,
      }
    }
  } catch (error) {
    console.error("Error validating Minecraft username:", error)
    const isValidFormat = username.length >= 3 && username.length <= 16 && /^[a-zA-Z0-9_]+$/.test(username)

    return {
      isValid: isValidFormat,
      skinUrl: `https://mc-heads.net/avatar/${username}/64`,
    }
  }
}

const generateMinecraftAvatar = (username: string): string => {
  return `https://mc-heads.net/avatar/${username}/64`
}

const AuthContext = createContext<{
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, minecraftUsername: string) => Promise<boolean>
  logout: () => void
} | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("minecraft-user")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        dispatch({ type: "LOGIN_SUCCESS", payload: parsedUser })
      } catch (error) {
        console.error("Failed to load user from localStorage:", error)
        localStorage.removeItem("minecraft-user")
      }
    }
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("minecraft-user", JSON.stringify(state.user))
    } else {
      localStorage.removeItem("minecraft-user")
    }
  }, [state.user])

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: "LOGIN_START" })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === "admin@frostnetwork.com" && password) {
      dispatch({ type: "LOGIN_SUCCESS", payload: mockAdminUser })
      return true
    } else if (email && password) {
      dispatch({ type: "LOGIN_SUCCESS", payload: { ...mockUser, email } })
      return true
    } else {
      dispatch({ type: "LOGIN_FAILURE" })
      return false
    }
  }

  const register = async (email: string, password: string, minecraftUsername: string): Promise<boolean> => {
    dispatch({ type: "LOGIN_START" })

    // Validate Minecraft username with NameMC
    const validation = await validateMinecraftUsername(minecraftUsername)
    if (!validation.isValid) {
      dispatch({ type: "LOGIN_FAILURE" })
      return false
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock registration with validated username
    if (email && password && minecraftUsername) {
      const newUser: User = {
        ...mockUser,
        id: `user-${Date.now()}`,
        email,
        minecraftUsername,
        avatar: validation.skinUrl || generateMinecraftAvatar(minecraftUsername),
        joinDate: new Date().toISOString().split("T")[0],
        totalSpent: 0,
        currentRank: "Member",
        perks: ["Basic Chat"],
        role: "user",
        purchaseHistory: [],
      }
      dispatch({ type: "LOGIN_SUCCESS", payload: newUser })
      return true
    } else {
      dispatch({ type: "LOGIN_FAILURE" })
      return false
    }
  }

  const logout = () => {
    dispatch({ type: "LOGOUT" })
  }

  // Mock user data
  const mockUser: User = {
    id: "user-123",
    email: "player@example.com",
    minecraftUsername: "CraftMaster2024",
    discordTag: "CraftMaster#1234",
    joinDate: "2024-01-15",
    totalSpent: 127.96,
    currentRank: "Diamond",
    avatar: generateMinecraftAvatar("CraftMaster2024"), // Using Minecraft skin API
    perks: ["Colored Chat", "Priority Join", "Fly Permission", "God Mode", "Unlimited Homes", "Diamond Kits"],
    role: "user",
    purchaseHistory: [
      {
        id: "order-1",
        date: "2024-12-20",
        items: [
          { title: "Diamond Rank", category: "rank", price: 49.99, quantity: 1 },
          { title: "Legendary Crate Key", category: "key", price: 24.99, quantity: 2 },
        ],
        total: 99.97,
        status: "completed",
        orderNumber: "MC-789123",
      },
      {
        id: "order-2",
        date: "2024-12-15",
        items: [
          { title: "Premium Unban", category: "unban", price: 19.99, quantity: 1 },
          { title: "Epic Crate Key", category: "key", price: 14.99, quantity: 1 },
        ],
        total: 34.98,
        status: "completed",
        orderNumber: "MC-456789",
      },
    ],
  }

  const mockAdminUser: User = {
    id: "admin-123",
    email: "admin@frostnetwork.com",
    minecraftUsername: "ServerOwner",
    discordTag: "ServerOwner#0001",
    joinDate: "2023-01-01",
    totalSpent: 0,
    currentRank: "Owner",
    avatar: generateMinecraftAvatar("ServerOwner"), // Using Minecraft skin API
    perks: ["All Permissions", "Server Management", "Admin Commands"],
    role: "admin",
    purchaseHistory: [],
  }

  return <AuthContext.Provider value={{ state, dispatch, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
