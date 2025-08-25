import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, Trophy, Medal } from "lucide-react"

const topSpenders = [
  { rank: 1, username: "DiamondKing", totalSpent: 2450, avatar: "/minecraft-player-avatar.png" },
  { rank: 2, username: "CraftMaster", totalSpent: 1890, avatar: "/minecraft-player-avatar.png" },
  { rank: 3, username: "BlockBuilder", totalSpent: 1650, avatar: "/minecraft-player-avatar.png" },
  { rank: 4, username: "RedstoneWiz", totalSpent: 1420, avatar: "/minecraft-player-avatar.png" },
  { rank: 5, username: "EnderSlayer", totalSpent: 1200, avatar: "/minecraft-player-avatar.png" },
]

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
  return (
    <Card className="glass border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-primary" />
          <span>Top Spenders</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topSpenders.map((player) => (
          <div
            key={player.username}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className="flex-shrink-0">{getRankIcon(player.rank)}</div>
            <img
              src={player.avatar || "/placeholder.svg"}
              alt={`${player.username} avatar`}
              className="w-8 h-8 rounded-lg"
            />
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{player.username}</p>
              <p className="text-muted-foreground text-sm">${player.totalSpent} spent</p>
            </div>
            {player.rank <= 3 && (
              <Badge variant="outline" className="border-primary/50 text-primary">
                VIP
              </Badge>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
