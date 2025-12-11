import { sql } from "@/lib/db"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { email, password, minecraftUsername } = await request.json()

    // Validate input
    if (!email || !password || !minecraftUsername) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    if (existingUser.length > 0) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create user
    const result = await sql`
      INSERT INTO users (email, password_hash, minecraft_username)
      VALUES (${email}, ${passwordHash}, ${minecraftUsername})
      RETURNING id, email, minecraft_username, created_at
    `

    const user = result[0]

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        minecraftUsername: user.minecraft_username,
        createdAt: user.created_at,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 })
  }
}
