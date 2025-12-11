import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const leaderboard = await sql`
      SELECT 
        u.id,
        u.minecraft_username,
        COALESCE(SUM(p.amount), 0)::numeric as total_spent,
        COUNT(p.id)::integer as total_purchases
      FROM users u
      LEFT JOIN purchases p ON u.id = p.user_id AND p.status = 'completed'
      GROUP BY u.id, u.minecraft_username
      HAVING COALESCE(SUM(p.amount), 0) > 0
      ORDER BY total_spent DESC
      LIMIT 10
    `

    return NextResponse.json({
      success: true,
      leaderboard: leaderboard.map((entry, index) => ({
        rank: index + 1,
        id: entry.id,
        minecraftUsername: entry.minecraft_username,
        totalSpent: Number.parseFloat(entry.total_spent),
        totalPurchases: entry.total_purchases,
      })),
    })
  } catch (error) {
    console.error("Leaderboard error:", error)
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 })
  }
}
