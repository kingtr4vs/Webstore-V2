"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Settings, User, Mail, MessageCircle, Save, ExternalLink } from "lucide-react"

const DISCORD_INVITE_LINK = "https://discord.gg/frostnetwork"

export default function SettingsPage() {
  const { state, dispatch } = useAuth()
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [discordMessage, setDiscordMessage] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    if (!state.isAuthenticated && !state.isLoading) {
      router.push("/login")
    }
    if (state.user) {
      setUsername(state.user.minecraftUsername)
      setEmail(state.user.email)
    }
  }, [state.isAuthenticated, state.isLoading, state.user, router])

  const handleSaveProfile = async () => {
    setIsSaving(true)
    setSaveSuccess(false)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (state.user) {
      dispatch({
        type: "UPDATE_PROFILE",
        payload: {
          minecraftUsername: username,
          email: email,
          avatar: `https://mc-heads.net/avatar/${username}/64`,
        },
      })
      setSaveSuccess(true)
    }

    setIsSaving(false)

    // Reset success message after 3 seconds
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleContactAdmin = () => {
    // Open Discord in new tab
    window.open(DISCORD_INVITE_LINK, "_blank")
  }

  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-black">
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

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <Settings className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-white">Settings</h1>
            </div>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile Settings */}
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <User className="w-5 h-5 text-primary" />
                  <span>Profile Settings</span>
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Update your username and account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white">
                    Minecraft Username
                  </Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="glass border-white/20 text-white bg-white/5"
                    placeholder="Enter your Minecraft username"
                  />
                  <p className="text-xs text-muted-foreground">
                    Your profile picture will update based on your Minecraft skin
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glass border-white/20 text-white bg-white/5"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <Button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="gradient-primary text-white hover-glow"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                  {saveSuccess && <span className="text-green-500 text-sm">Changes saved successfully!</span>}
                </div>
              </CardContent>
            </Card>

            {/* Contact Admin */}
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <span>Contact Admin</span>
                </CardTitle>
                <CardDescription className="text-muted-foreground">Message our admins through Discord</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">
                    Your Message
                  </Label>
                  <Textarea
                    id="message"
                    value={discordMessage}
                    onChange={(e) => setDiscordMessage(e.target.value)}
                    className="glass border-white/20 text-white bg-white/5 min-h-[120px]"
                    placeholder="Type your message here before joining Discord..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Write your message here, then click below to join our Discord and send it to an admin
                  </p>
                </div>

                <Button onClick={handleContactAdmin} className="w-full gradient-primary text-white hover-glow">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Discord to Contact Admin
                </Button>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-white font-semibold mb-2 text-sm">Need Help?</h4>
                  <p className="text-muted-foreground text-xs">
                    Join our Discord server to get support from our admin team. They can help with:
                  </p>
                  <ul className="mt-2 space-y-1 text-muted-foreground text-xs">
                    <li>• Order issues and refunds</li>
                    <li>• Account problems</li>
                    <li>• Technical support</li>
                    <li>• General questions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Account Info */}
            <Card className="glass border-white/20 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>Account Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-lg bg-white/5">
                    <p className="text-muted-foreground text-sm">Current Rank</p>
                    <p className="text-white font-semibold">{state.user.currentRank}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5">
                    <p className="text-muted-foreground text-sm">Total Spent</p>
                    <p className="text-white font-semibold">${state.user.totalSpent.toFixed(2)}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5">
                    <p className="text-muted-foreground text-sm">Member Since</p>
                    <p className="text-white font-semibold">{new Date(state.user.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
