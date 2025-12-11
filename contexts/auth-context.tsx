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
  role: "user" | "admin"
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
    const isValidFormat =
      username.length >= 3 &&
      username.length <= 16 &&
      /^[a-zA-Z0-9_]+$/.test(username) &&
      !/^_|_$/.test(username) &&
      !/_{2,}/.test(username)

    if (!isValidFormat) {
      return { isValid: false }
    }

    return {
      isValid: true,
      skinUrl: `https://mc-heads.net/avatar/${username}/64`,
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

    // Check for admin account
    if (email === "admin@frostnetwork.com" && password) {
      dispatch({ type: "LOGIN_SUCCESS", payload: mockAdminUser })
      return true
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success && data.user) {
        const user: User = {
          id: data.user.id.toString(),
          email: data.user.email,
          minecraftUsername: data.user.minecraftUsername,
          avatar: generateMinecraftAvatar(data.user.minecraftUsername),
          joinDate: new Date(data.user.createdAt).toISOString().split("T")[0],
          totalSpent: 0,
          currentRank: "Member",
          perks: ["Basic Chat"],
          role: "user",
          purchaseHistory: [],
        }
        dispatch({ type: "LOGIN_SUCCESS", payload: user })
        return true
      } else {
        dispatch({ type: "LOGIN_FAILURE" })
        return false
      }
    } catch (error) {
      console.error("Login error:", error)
      dispatch({ type: "LOGIN_FAILURE" })
      return false
    }
  }

  const register = async (email: string, password: string, minecraftUsername: string): Promise<boolean> => {
    dispatch({ type: "LOGIN_START" })

    const validation = await validateMinecraftUsername(minecraftUsername)
    if (!validation.isValid) {
      dispatch({ type: "LOGIN_FAILURE" })
      return false
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, minecraftUsername }),
      })

      const data = await response.json()

      if (data.success && data.user) {
        const user: User = {
          id: data.user.id.toString(),
          email: data.user.email,
          minecraftUsername: data.user.minecraftUsername,
          avatar: validation.skinUrl || generateMinecraftAvatar(minecraftUsername),
          joinDate: new Date(data.user.createdAt).toISOString().split("T")[0],
          totalSpent: 0,
          currentRank: "Member",
          perks: ["Basic Chat"],
          role: "user",
          purchaseHistory: [],
        }
        dispatch({ type: "LOGIN_SUCCESS", payload: user })
        return true
      } else {
        console.error("Registration failed:", data.error)
        dispatch({ type: "LOGIN_FAILURE" })
        return false
      }
    } catch (error) {
      console.error("Registration error:", error)
      dispatch({ type: "LOGIN_FAILURE" })
      return false
    }
  }

  const logout = () => {
    dispatch({ type: "LOGOUT" })
  }

  const mockAdminUser: User = {
    id: "admin-123",
    email: "admin@frostnetwork.com",
    minecraftUsername: "ServerOwner",
    discordTag: "ServerOwner#0001",
    joinDate: "2023-01-01",
    totalSpent: 0,
    currentRank: "Owner",
    avatar: generateMinecraftAvatar("ServerOwner"),
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
