import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient spotlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <Badge className="mb-6 gradient-primary text-white px-4 py-2">#1 Minecraft Server Store</Badge>

        <h1 className="text-5xl md:text-7xl font-bold gradient-primary bg-clip-text text-transparent mb-6 leading-tight">
          FrostSurvival
        </h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Unlock exclusive ranks, rare crate keys, and second chances with our premium Minecraft server store. Join
          thousands of players who've enhanced their gameplay.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="gradient-primary text-white hover-glow px-8 py-4 text-lg">
            Browse Ranks
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="glass border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg bg-transparent"
          >
            View Crate Keys
          </Button>
        </div>

        <div className="mt-12 flex items-center justify-center space-x-8 text-muted-foreground">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">10,000+</div>
            <div className="text-sm">Happy Players</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">50+</div>
            <div className="text-sm">Unique Ranks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-sm">Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}
