"use client"

import { useState, useRef, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, MessageSquare, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"

const DISCORD_INVITE_LINK = "https://discord.gg/frostnetwork"

// Easy to edit partner data - just modify this array
const partners = [
  {
    id: 1,
    name: "CraftMania Network",
    message:
      "CraftMania is our longest-standing partner, providing cross-server events and exclusive collaborative content for both communities.",
    discordLink: "https://discord.gg/craftmania",
    photos: [
      "/minecraft-server-logo-blue.png",
      "/minecraft-gameplay.png",
      "/minecraft-community-event.png",
      "/minecraft-server-spawn.png",
      "/minecraft-pvp-arena.png",
    ],
    badge: "Official Partner",
  },
  {
    id: 2,
    name: "BlockBuilders Inc",
    message:
      "BlockBuilders provides amazing build services and custom maps for our server. Their team has created some of our most iconic locations!",
    discordLink: "https://discord.gg/blockbuilders",
    photos: ["/minecraft-castle.png", "/minecraft-medieval-town.jpg", "/minecraft-fantasy-build.jpg"],
    badge: "Build Partner",
  },
  {
    id: 3,
    name: "PixelCraft Studios",
    message:
      "PixelCraft creates stunning resource packs and textures that enhance the visual experience on Frost Network.",
    discordLink: "https://discord.gg/pixelcraft",
    photos: [
      "/minecraft-texture-pack-preview.jpg",
      "/minecraft-shaders-screenshot.jpg",
      "/minecraft-resource-pack-comparison.jpg",
      "/minecraft-custom-textures.jpg",
    ],
    badge: "Content Partner",
  },
]

function PhotoCarousel({ photos }: { photos: string[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", checkScroll)
      return () => container.removeEventListener("scroll", checkScroll)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative group">
      {/* Scroll Buttons */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Photo Scroll Container - TikTok style horizontal scroll */}
      <div
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {photos.map((photo, index) => (
          <div key={index} className="flex-shrink-0 snap-center first:pl-0 last:pr-0">
            <img
              src={photo || "/placeholder.svg"}
              alt={`Partner photo ${index + 1}`}
              className="w-64 h-40 sm:w-72 sm:h-44 object-cover rounded-lg border border-white/10"
            />
          </div>
        ))}
      </div>

      {/* Scroll Indicator Dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {photos.map((_, index) => (
          <div key={index} className="w-1.5 h-1.5 rounded-full bg-white/30" />
        ))}
      </div>
    </div>
  )
}

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Our Partners</h1>
          </div>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Meet our amazing partners who help make Frost Network the best Minecraft experience possible.
          </p>
        </div>
      </section>

      {/* Partners List */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-8">
          {partners.map((partner) => (
            <Card key={partner.id} className="glass border-white/20 overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <CardTitle className="text-white text-xl sm:text-2xl">{partner.name}</CardTitle>
                  <Badge className="gradient-primary text-white w-fit text-xs sm:text-sm">{partner.badge}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Partner Message */}
                <div className="flex items-start space-x-3">
                  <MessageSquare className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{partner.message}</p>
                </div>

                {/* Photo Carousel - TikTok style horizontal scroll */}
                <PhotoCarousel photos={partner.photos} />

                {/* Discord Link */}
                <a href={partner.discordLink} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full sm:w-auto gradient-primary text-white hover-glow text-sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Join {partner.name} Discord
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Become a Partner CTA */}
        <Card className="glass border-white/20 mt-12">
          <CardContent className="p-6 sm:p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">Interested in Partnering?</h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-lg mx-auto">
              We're always looking for new partners to collaborate with. Join our Discord and reach out to our team to
              discuss partnership opportunities!
            </p>
            <a href={DISCORD_INVITE_LINK} target="_blank" rel="noopener noreferrer">
              <Button className="gradient-primary text-white hover-glow text-sm sm:text-base">
                Contact Us on Discord
              </Button>
            </a>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
