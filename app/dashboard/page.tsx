"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Crown, Calendar, DollarSign, Package, Star, Shield, ExternalLink, Download } from "lucide-react"

export default function DashboardPage() {
  const { state } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!state.isAuthenticated && !state.isLoading) {
      router.push("/login")
    }
  }, [state.isAuthenticated, state.isLoading, router])

  if (state.isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-16 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    )
  }

  if (!state.user) {
    return null
  }

  const { user } = state

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={`${user.minecraftUsername} avatar`}
                className="w-16 h-16 rounded-lg"
              />
              <div>
                <h1 className="text-3xl font-bold text-white">{user.minecraftUsername}</h1>
                <p className="text-muted-foreground">Member since {new Date(user.joinDate).toLocaleDateString()}</p>
              </div>
            </div>
            <Badge className="gradient-primary text-white px-4 py-2">
              <Crown className="w-4 h-4 mr-2" />
              {user.currentRank} Rank
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Account Overview */}
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <User className="w-5 h-5 text-primary" />
                    <span>Account Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 rounded-lg bg-white/5">
                    <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">${user.totalSpent.toFixed(2)}</div>
                    <div className="text-muted-foreground text-sm">Total Spent</div>
                  </div>

                  <div className="text-center p-4 rounded-lg bg-white/5">
                    <Package className="w-8 h-8 text-secondary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{user.purchaseHistory.length}</div>
                    <div className="text-muted-foreground text-sm">Orders</div>
                  </div>

                  <div className="text-center p-4 rounded-lg bg-white/5">
                    <Calendar className="w-8 h-8 text-accent mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">
                      {Math.floor((Date.now() - new Date(user.joinDate).getTime()) / (1000 * 60 * 60 * 24))}
                    </div>
                    <div className="text-muted-foreground text-sm">Days Active</div>
                  </div>
                </CardContent>
              </Card>

              {/* Purchase History */}
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Package className="w-5 h-5 text-primary" />
                    <span>Purchase History</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user.purchaseHistory.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-white font-semibold mb-2">No purchases yet</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Start shopping to see your purchase history here
                      </p>
                      <Button onClick={() => router.push("/")} className="gradient-primary text-white hover-glow">
                        Browse Store
                      </Button>
                    </div>
                  ) : (
                    user.purchaseHistory.map((purchase) => (
                      <div key={purchase.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="text-white font-semibold">Order #{purchase.orderNumber}</h4>
                            <p className="text-muted-foreground text-sm">
                              {new Date(purchase.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-primary font-bold">${purchase.total.toFixed(2)}</div>
                            <Badge
                              className={
                                purchase.status === "completed"
                                  ? "bg-green-500/20 text-green-500"
                                  : purchase.status === "pending"
                                    ? "bg-yellow-500/20 text-yellow-500"
                                    : "bg-red-500/20 text-red-500"
                              }
                            >
                              {purchase.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {purchase.items.map((item, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                {item.quantity}x {item.title}
                              </span>
                              <span className="text-white">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center space-x-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            className="glass border-white/20 text-white hover:bg-white/20 bg-transparent"
                          >
                            <Download className="w-3 h-3 mr-2" />
                            Receipt
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="glass border-white/20 text-white hover:bg-white/20 bg-transparent"
                          >
                            <ExternalLink className="w-3 h-3 mr-2" />
                            Support
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Details */}
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <span>Account Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground text-sm">Email</Label>
                    <p className="text-white">{user.email}</p>
                  </div>

                  <div>
                    <Label className="text-muted-foreground text-sm">Minecraft Username</Label>
                    <p className="text-white">{user.minecraftUsername}</p>
                  </div>

                  {user.discordTag && (
                    <div>
                      <Label className="text-muted-foreground text-sm">Discord</Label>
                      <p className="text-white">{user.discordTag}</p>
                    </div>
                  )}

                  <div>
                    <Label className="text-muted-foreground text-sm">Current Rank</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Crown className="w-4 h-4 text-primary" />
                      <span className="text-white font-semibold">{user.currentRank}</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full glass border-white/20 text-white hover:bg-white/20 bg-transparent"
                  >
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Current Perks */}
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Star className="w-5 h-5 text-primary" />
                    <span>Current Perks</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {user.perks.map((perk, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 rounded-lg bg-white/5">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-white text-sm">{perk}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => router.push("/ranks")}
                    className="w-full mt-4 gradient-primary text-white hover-glow"
                  >
                    Upgrade Rank
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}
