import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProductCard } from "@/components/product-card"
import { Leaderboard } from "@/components/leaderboard"
import { ScrollAnimation, SpotlightEffect } from "@/components/scroll-animations"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Zap, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const DISCORD_INVITE_LINK = "https://discord.gg/frostnetwork"

const featuredProducts = [
  {
    title: "Diamond Rank",
    price: "49.99",
    originalPrice: "69.99",
    image: "/minecraft-diamond-rank-badge.png",
    description: "Unlock exclusive perks, commands, and priority access to the server.",
    badge: "30% OFF",
    popular: true,
  },
  {
    title: "Legendary Crate Key",
    price: "24.99",
    image: "/minecraft-legendary-crate-key.png",
    description: "Open legendary crates for rare items, weapons, and exclusive cosmetics.",
    badge: "LIMITED",
  },
  {
    title: "Premium Unban",
    price: "19.99",
    image: "/minecraft-unban-service.png",
    description: "Get unbanned from the server with our premium unban service.",
  },
]

const allProducts = [
  ...featuredProducts,
  {
    title: "Emerald Rank",
    price: "29.99",
    image: "/minecraft-emerald-rank-badge.png",
    description: "Mid-tier rank with great perks and exclusive access to special areas.",
  },
  {
    title: "Epic Crate Key",
    price: "14.99",
    image: "/minecraft-epic-crate-key.png",
    description: "Open epic crates for valuable items and rare enchantments.",
  },
  {
    title: "Standard Unban",
    price: "9.99",
    image: "/minecraft-standard-unban.png",
    description: "Basic unban service to get back into the game quickly.",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <HeroSection />

      <main className="relative bg-black">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 sm:gap-8 xl:gap-12">
            {/* Main Content Area - 3 columns on XL screens */}
            <div className="xl:col-span-3 space-y-8 sm:space-y-12">
              {/* Featured Products */}
              <ScrollAnimation delay={200}>
                <section>
                  <div className="flex items-center space-x-2 mb-6 sm:mb-8">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">Featured Products</h2>
                    <Badge className="gradient-primary text-white text-xs sm:text-sm">Hot</Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {featuredProducts.map((product, index) => (
                      <ScrollAnimation key={index} delay={300 + index * 100}>
                        <SpotlightEffect>
                          <ProductCard {...product} />
                        </SpotlightEffect>
                      </ScrollAnimation>
                    ))}
                  </div>
                </section>
              </ScrollAnimation>

              {/* All Products */}
              <ScrollAnimation delay={400}>
                <section>
                  <div className="flex items-center space-x-2 mb-6 sm:mb-8">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">All Products</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {allProducts.map((product, index) => (
                      <ScrollAnimation key={index} delay={500 + index * 100}>
                        <SpotlightEffect>
                          <ProductCard {...product} />
                        </SpotlightEffect>
                      </ScrollAnimation>
                    ))}
                  </div>
                </section>
              </ScrollAnimation>
            </div>

            {/* Sidebar - 1 column on XL screens */}
            <div className="xl:col-span-1 xl:pl-4">
              <div className="sticky top-24 space-y-6 sm:space-y-8">
                {/* Top Selling Rank Highlight */}
                <ScrollAnimation delay={600} direction="right">
                  <SpotlightEffect>
                    <Card className="glass border-white/20 overflow-hidden">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-white flex items-center space-x-2 text-base sm:text-lg">
                          <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                          <span>Top Selling Rank</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="relative mb-4">
                            <img
                              src="/minecraft-diamond-rank-crown.png"
                              alt="Diamond Rank"
                              className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-lg shadow-lg"
                            />
                            <div className="absolute -top-2 -right-2">
                              <Badge className="gradient-primary text-white text-xs">30% OFF</Badge>
                            </div>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Diamond Rank</h3>
                          <p className="text-muted-foreground text-xs sm:text-sm mb-4 leading-relaxed">
                            The most popular rank with exclusive perks, god mode, and unlimited homes.
                          </p>
                          <div className="flex items-center justify-center space-x-2 mb-4">
                            <span className="text-xl sm:text-2xl font-bold text-primary">$49.99</span>
                            <span className="text-muted-foreground line-through text-base sm:text-lg">$69.99</span>
                          </div>
                          <a href={DISCORD_INVITE_LINK} target="_blank" rel="noopener noreferrer">
                            <Button className="w-full gradient-primary text-white hover-glow text-sm sm:text-base">
                              Get Now
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </SpotlightEffect>
                </ScrollAnimation>

                <ScrollAnimation delay={650} direction="right">
                  <SpotlightEffect>
                    <Link href="/ranks">
                      <Card className="glass border-white/20 cursor-pointer hover:border-primary/50 transition-all duration-300">
                        <CardContent className="p-4 sm:p-6 text-center">
                          <div className="mb-3">
                            <Shield className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-primary mb-2" />
                            <h3 className="text-base sm:text-lg font-bold text-white mb-1">Browse Ranks</h3>
                            <p className="text-muted-foreground text-xs sm:text-sm">
                              Explore all available server ranks
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            className="glass border-white/30 text-white hover:bg-white/20 bg-transparent text-sm"
                          >
                            View All Ranks
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  </SpotlightEffect>
                </ScrollAnimation>

                <ScrollAnimation delay={700} direction="right">
                  <SpotlightEffect>
                    <Link href="/keys">
                      <Card className="glass border-white/20 cursor-pointer hover:border-secondary/50 transition-all duration-300">
                        <CardContent className="p-4 sm:p-6 text-center">
                          <div className="mb-3">
                            <Zap className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-secondary mb-2" />
                            <h3 className="text-base sm:text-lg font-bold text-white mb-1">View Crate Keys</h3>
                            <p className="text-muted-foreground text-xs sm:text-sm">
                              Unlock amazing rewards from crates
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            className="glass border-white/30 text-white hover:bg-white/20 bg-transparent text-sm"
                          >
                            View All Keys
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  </SpotlightEffect>
                </ScrollAnimation>

                {/* Leaderboard */}
                <ScrollAnimation delay={750} direction="right">
                  <SpotlightEffect>
                    <Leaderboard />
                  </SpotlightEffect>
                </ScrollAnimation>

                <ScrollAnimation delay={800} direction="right">
                  <SpotlightEffect>
                    <Card className="glass border-white/20">
                      <CardContent className="p-4 sm:p-6 text-center">
                        <div className="mb-4">
                          <Badge className="gradient-primary text-white mb-2 text-xs sm:text-sm">Limited Time</Badge>
                          <h3 className="text-base sm:text-lg font-bold text-white mb-2">Weekend Sale</h3>
                          <p className="text-muted-foreground text-xs sm:text-sm">
                            Get 25% off all crate keys this weekend only!
                          </p>
                        </div>
                        <a href={DISCORD_INVITE_LINK} target="_blank" rel="noopener noreferrer">
                          <Button
                            variant="outline"
                            className="glass border-white/30 text-white hover:bg-white/20 bg-transparent text-sm"
                          >
                            View Deals
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  </SpotlightEffect>
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
