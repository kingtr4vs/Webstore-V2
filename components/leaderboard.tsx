"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, Trophy, Medal, Loader2 } from "lucide-react"

interface LeaderboardEntry {
  rank: number
  id: number
  minecraftUsername: string
  totalSpent: number
  totalPurchases: number
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-5 h-5 text-yellow-400" />
    case 2:
      return <Trophy className="w-5 h-5 text-gray-300" />
    case 3:
      return <Medal className="w-5 h-5 text-amber-600" />
    default:
      return <span className="w-5 h-5 flex items-center justify-center text-muted-foreground font-bold">#{rank}</span>
  }
}

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/leaderboard")
        const data = await response.json()

        if (data.success) {
          setLeaderboard(data.leaderboard)
        } else {
          setError("Failed to load leaderboard")
        }
      } catch (err) {
        console.error("Leaderboard fetch error:", err)
        setError("Failed to load leaderboard")
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  return (
    <Card className="glass border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-primary" />
          <span>Top Spenders</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm">{error}</p>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center py-8">
            <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">No purchases yet</p>
            <p className="text-muted-foreground text-xs mt-1">Be the first to make a purchase!</p>
          </div>
        ) : (
          leaderboard.map((player) => (
            <div
              key={player.id}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="flex-shrink-0">{getRankIcon(player.rank)}</div>
              <img
                src={`https://mc-heads.net/avatar/${player.minecraftUsername}/32`}
                alt={`${player.minecraftUsername} avatar`}
                className="w-8 h-8 rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{player.minecraftUsername}</p>
                <p className="text-muted-foreground text-sm">${player.totalSpent.toFixed(2)} spent</p>
              </div>
              {player.rank <= 3 && (
                <Badge variant="outline" className="border-primary/50 text-primary">
                  VIP
                </Badge>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
