"use client"

import { useState, useEffect } from "react"
import { X, Megaphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const DISCORD_INVITE_LINK = "https://discord.gg/frostnetwork"

export function AnnouncementPopup() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has dismissed the popup in this session
    const dismissed = sessionStorage.getItem("announcement-dismissed")
    if (!dismissed) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    sessionStorage.setItem("announcement-dismissed", "true")
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <Card className="glass border-white/20 max-w-md w-full relative animate-in fade-in zoom-in duration-300">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 text-white/70 hover:text-white hover:bg-white/10 p-1 h-8 w-8"
          onClick={handleClose}
        >
          <X className="w-4 h-4" />
        </Button>
        <CardHeader className="pb-2">
          <CardTitle className="text-white flex items-center space-x-2 text-lg sm:text-xl">
            <Megaphone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <span>Welcome to Frost Network!</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Thank you for visiting our store! We have exciting new ranks and crate keys available. Join our Discord
            community for exclusive deals and updates!
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={DISCORD_INVITE_LINK} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button className="w-full gradient-primary text-white hover-glow text-sm">Join Discord</Button>
            </a>
            <Button
              variant="outline"
              className="flex-1 glass border-white/30 text-white hover:bg-white/20 bg-transparent text-sm"
              onClick={handleClose}
            >
              Maybe Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
