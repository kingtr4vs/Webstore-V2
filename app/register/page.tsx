"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { UserPlus, Mail, Lock, User, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const { register, state } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    minecraftUsername: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.email || !formData.password || !formData.minecraftUsername) {
      setError("Please fill in all required fields")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    const success = await register(formData.email, formData.password, formData.minecraftUsername)
    if (success) {
      router.push("/dashboard")
    } else {
      setError("Registration failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-md mx-auto px-4">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Join CraftStore</h1>
            <p className="text-muted-foreground">Create your account and start your journey</p>
          </div>

          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-center">Create Account</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="minecraft-username" className="text-white">
                    Minecraft Username *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="minecraft-username"
                      placeholder="Enter your Minecraft username"
                      value={formData.minecraftUsername}
                      onChange={(e) => handleInputChange("minecraftUsername", e.target.value)}
                      className="glass border-white/20 text-white placeholder:text-muted-foreground bg-transparent pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email Address *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="glass border-white/20 text-white placeholder:text-muted-foreground bg-transparent pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="glass border-white/20 text-white placeholder:text-muted-foreground bg-transparent pl-10 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-muted-foreground hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-white">
                    Confirm Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="glass border-white/20 text-white placeholder:text-muted-foreground bg-transparent pl-10"
                    />
                  </div>
                </div>

                {error && (
                  <div className="text-destructive text-sm text-center bg-destructive/10 p-2 rounded-lg">{error}</div>
                )}

                <Button
                  type="submit"
                  disabled={state.isLoading}
                  className="w-full gradient-primary text-white hover-glow"
                >
                  {state.isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <Separator className="bg-white/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-black px-2 text-muted-foreground text-sm">or</span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-muted-foreground text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-xs">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
