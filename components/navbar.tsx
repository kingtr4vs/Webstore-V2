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

const DISCORD_INVITE_LINK = "https://discord.gg/yT2s7Bavx7"

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
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/favicon.jpg" alt="Frost Network" className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg" />
            <span className="text-white font-bold text-lg sm:text-xl">Frost Network</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/" className="text-white hover:text-primary transition-colors text-sm lg:text-base">
              Home
            </Link>
            <Link href="/ranks" className="text-white hover:text-primary transition-colors text-sm lg:text-base">
              Ranks
            </Link>
            <Link href="/keys" className="text-white hover:text-primary transition-colors text-sm lg:text-base">
              Keys
            </Link>
            <Link href="/unbans" className="text-white hover:text-primary transition-colors text-sm lg:text-base">
              Unbans
            </Link>
            <Link href="/partners" className="text-white hover:text-primary transition-colors text-sm lg:text-base">
              Partners
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <a href={DISCORD_INVITE_LINK} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex glass border-white/30 text-white hover:bg-white/20 bg-transparent text-xs sm:text-sm"
              >
                Discord
              </Button>
            </a>

            <CartSidebar />

            {/* User Authentication */}
            {state.isAuthenticated && state.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-1 sm:space-x-2 text-white hover:bg-white/20 px-2 sm:px-3"
                  >
                    <img
                      src={state.user.avatar || "/placeholder.svg"}
                      alt={`${state.user.minecraftUsername} avatar`}
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded"
                    />
                    <span className="hidden sm:inline text-sm">{state.user.minecraftUsername}</span>
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
                    <Link href="/settings" className="flex items-center space-x-2 text-white hover:bg-white/20">
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
                <Button size="sm" className="gradient-primary text-white hover-glow text-xs sm:text-sm px-3 sm:px-4">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white p-2"
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
              <Link
                href="/"
                className="text-white hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/ranks"
                className="text-white hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Ranks
              </Link>
              <Link
                href="/keys"
                className="text-white hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Keys
              </Link>
              <Link
                href="/unbans"
                className="text-white hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Unbans
              </Link>
              <Link
                href="/partners"
                className="text-white hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Partners
              </Link>
              <a href={DISCORD_INVITE_LINK} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="sm"
                  className="glass border-white/30 text-white hover:bg-white/20 w-fit bg-transparent"
                >
                  Discord
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
