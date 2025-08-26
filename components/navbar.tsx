"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Menu, X, LogOut, Settings, ShoppingBag, Shield } from "lucide-react"
import { CartSidebar } from "@/components/cart-sidebar"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { state, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <nav className="relative top-0 left-0 right-0 z-50 glass border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1E90FF] to-[#663399]"></div>
              <span className="relative text-white font-bold text-sm z-10">FS</span>
            </div>
            <span className="text-white font-bold text-xl">Frost Network</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/ranks" className="text-white hover:text-primary transition-colors">
              Ranks
            </Link>
            <Link href="/keys" className="text-white hover:text-primary transition-colors">
              Keys
            </Link>
            <Link href="/unbans" className="text-white hover:text-primary transition-colors">
              Unbans
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex glass border-white/30 text-white hover:bg-white/20 bg-transparent"
            >
              Discord
            </Button>

            <CartSidebar />

            {/* User Authentication */}
            {state.isAuthenticated && state.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 text-white hover:bg-white/20"
                  >
                    <img
                      src={state.user.avatar || "/placeholder.svg"}
                      alt={`${state.user.minecraftUsername} avatar`}
                      className="w-6 h-6 rounded"
                    />
                    <span className="hidden sm:inline">{state.user.minecraftUsername}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="glass border-white/20 bg-black/90 backdrop-blur-xl">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center space-x-2 text-white hover:bg-white/20">
                      <User className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center space-x-2 text-white hover:bg-white/20">
                      <ShoppingBag className="w-4 h-4" />
                      <span>Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  {state.user.role === "admin" && (
                    <>
                      <DropdownMenuSeparator className="bg-white/20" />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center space-x-2 text-white hover:bg-white/20">
                          <Shield className="w-4 h-4" />
                          <span>Admin Panel</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center space-x-2 text-white hover:bg-white/20">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/20" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-white hover:bg-white/20 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button size="sm" className="gradient-primary text-white hover-glow">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-white hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/ranks" className="text-white hover:text-primary transition-colors">
                Ranks
              </Link>
              <Link href="/keys" className="text-white hover:text-primary transition-colors">
                Keys
              </Link>
              <Link href="/unbans" className="text-white hover:text-primary transition-colors">
                Unbans
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="glass border-white/30 text-white hover:bg-white/20 w-fit bg-transparent"
              >
                Discord
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
