"use client"

import { useState } from "react"
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
  const [currentIndex, setCurrentIndex] = useState(0)

  // Only show up to 5 photos max
  const displayPhotos = photos.slice(0, 5)
  const totalPhotos = displayPhotos.length

  // Don't show carousel if no photos
  if (totalPhotos === 0) return null

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPhotos)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos)
  }

  const goToIndex = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative group">
      {/* Single Photo Display */}
      <div className="relative w-full aspect-video max-w-md mx-auto overflow-hidden rounded-lg border border-white/10">
        <img
          src={displayPhotos[currentIndex] || "/placeholder.svg"}
          alt={`Partner photo ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* Navigation Buttons - only show if more than 1 photo */}
        {totalPhotos > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Photo Counter */}
        {totalPhotos > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            {currentIndex + 1} / {totalPhotos}
          </div>
        )}
      </div>

      {/* Dots Indicator - only show if more than 1 photo, shows exact number of photos */}
      {totalPhotos > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {displayPhotos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                index === currentIndex ? "bg-primary scale-125" : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to photo ${index + 1}`}
            />
          ))}
        </div>
      )}
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
