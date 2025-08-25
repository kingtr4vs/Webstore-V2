"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Search, Crown, DollarSign, Calendar, MessageCircle } from "lucide-react"

interface Player {
  id: string
  minecraftUsername: string
  email: string
  discordTag?: string
  joinDate: string
  currentRank: string
  totalSpent: number
  totalOrders: number
  lastPurchase: string
  status: "active" | "inactive" | "banned"
}

const mockPlayers: Player[] = [
  {
    id: "1",
    minecraftUsername: "CraftMaster2024",
    email: "player1@example.com",
    discordTag: "CraftMaster#1234",
    joinDate: "2024-01-15",
    currentRank: "Diamond",
    totalSpent: 127.96,
    totalOrders: 3,
    lastPurchase: "2024-12-20",
    status: "active",
  },
  {
    id: "2",
    minecraftUsername: "BlockBuilder",
    email: "player2@example.com",
    joinDate: "2024-02-10",
    currentRank: "Premium",
    totalSpent: 89.97,
    totalOrders: 2,
    lastPurchase: "2024-12-18",
    status: "active",
  },
  {
    id: "3",
    minecraftUsername: "EnderSlayer",
    email: "player3@example.com",
    discordTag: "EnderSlayer#5678",
    joinDate: "2024-03-05",
    currentRank: "Elite",
    totalSpent: 234.95,
    totalOrders: 5,
    lastPurchase: "2024-12-19",
    status: "active",
  },
  {
    id: "4",
    minecraftUsername: "RedstoneWiz",
    email: "player4@example.com",
    joinDate: "2024-04-20",
    currentRank: "VIP",
    totalSpent: 45.98,
    totalOrders: 1,
    lastPurchase: "2024-11-15",
    status: "inactive",
  },
  {
    id: "5",
    minecraftUsername: "GrieferKid",
    email: "player5@example.com",
    joinDate: "2024-05-12",
    currentRank: "Member",
    totalSpent: 0,
    totalOrders: 0,
    lastPurchase: "Never",
    status: "banned",
  },
]

export default function AdminPlayersPage() {
  const { state } = useAuth()
  const router = useRouter()
  const [players, setPlayers] = useState<Player[]>(mockPlayers)
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>(mockPlayers)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (!state.isAuthenticated && !state.isLoading) {
      router.push("/login")
    } else if (state.isAuthenticated && state.user?.role !== "admin") {
      router.push("/dashboard")
    }
  }, [state.isAuthenticated, state.isLoading, state.user?.role, router])

  useEffect(() => {
    if (searchTerm) {
      const filtered = players.filter(
        (player) =>
          player.minecraftUsername.toLowerCase().includes(searchTerm.toLowerCase()) ||
          player.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          player.currentRank.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredPlayers(filtered)
    } else {
      setFilteredPlayers(players)
    }
  }, [players, searchTerm])

  if (!state.user || state.user.role !== "admin") {
    return null
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-500"
      case "inactive":
        return "bg-yellow-500/20 text-yellow-500"
      case "banned":
        return "bg-red-500/20 text-red-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  const getRankColor = (rank: string) => {
    switch (rank.toLowerCase()) {
      case "diamond":
        return "bg-cyan-500/20 text-cyan-500"
      case "elite":
        return "bg-purple-500/20 text-purple-500"
      case "premium":
        return "bg-blue-500/20 text-blue-500"
      case "vip":
        return "bg-green-500/20 text-green-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  const totalRevenue = players.reduce((sum, player) => sum + player.totalSpent, 0)
  const activeUsers = players.filter((p) => p.status === "active").length
  const totalOrders = players.reduce((sum, player) => sum + player.totalOrders, 0)

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Player Insights</h1>
              <p className="text-muted-foreground">View player statistics and purchase history</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Players</p>
                    <p className="text-2xl font-bold text-white">{players.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Active Players</p>
                    <p className="text-2xl font-bold text-green-500">{activeUsers}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold text-primary">${totalRevenue.toFixed(2)}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Avg. Spent</p>
                    <p className="text-2xl font-bold text-secondary">
                      ${players.length > 0 ? (totalRevenue / players.length).toFixed(2) : "0.00"}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-secondary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <Card className="glass border-white/20 mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by username, email, or rank..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="glass border-white/20 text-white placeholder:text-muted-foreground bg-transparent pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Players Table */}
          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span>All Players ({filteredPlayers.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/20">
                    <TableHead className="text-white">Player</TableHead>
                    <TableHead className="text-white">Rank</TableHead>
                    <TableHead className="text-white">Total Spent</TableHead>
                    <TableHead className="text-white">Orders</TableHead>
                    <TableHead className="text-white">Last Purchase</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlayers.map((player) => (
                    <TableRow key={player.id} className="border-white/20">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src="/minecraft-player-avatar.png"
                            alt={`${player.minecraftUsername} avatar`}
                            className="w-10 h-10 rounded-lg"
                          />
                          <div>
                            <p className="text-white font-semibold">{player.minecraftUsername}</p>
                            <p className="text-muted-foreground text-sm">{player.email}</p>
                            {player.discordTag && <p className="text-muted-foreground text-xs">{player.discordTag}</p>}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRankColor(player.currentRank)}>
                          <Crown className="w-3 h-3 mr-1" />
                          {player.currentRank}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white font-bold">${player.totalSpent.toFixed(2)}</TableCell>
                      <TableCell className="text-white">{player.totalOrders}</TableCell>
                      <TableCell className="text-white">
                        {player.lastPurchase === "Never" ? "Never" : new Date(player.lastPurchase).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(player.status)}>{player.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                            <Calendar className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
