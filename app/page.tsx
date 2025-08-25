import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProductCard } from "@/components/product-card"
import { Leaderboard } from "@/components/leaderboard"
import { ScrollAnimation, SpotlightEffect } from "@/components/scroll-animations"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Zap, Shield } from "lucide-react"

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
    <div className="min-h-screen">
      <Navbar />

      <HeroSection />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Featured Products */}
            <ScrollAnimation delay={200}>
              <section>
                <div className="flex items-center space-x-2 mb-8">
                  <Star className="w-6 h-6 text-primary" />
                  <h2 className="text-3xl font-bold text-white">Featured Products</h2>
                  <Badge className="gradient-primary text-white">Hot</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                <div className="flex items-center space-x-2 mb-8">
                  <Zap className="w-6 h-6 text-secondary" />
                  <h2 className="text-3xl font-bold text-white">All Products</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Top Selling Rank Highlight */}
            <ScrollAnimation delay={600} direction="right">
              <SpotlightEffect>
                <Card className="glass border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-primary" />
                      <span>Top Selling Rank</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <img
                        src="/minecraft-diamond-rank-crown.png"
                        alt="Diamond Rank"
                        className="w-20 h-20 mx-auto mb-4 rounded-lg"
                      />
                      <h3 className="text-xl font-bold text-white mb-2">Diamond Rank</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        The most popular rank with exclusive perks and commands.
                      </p>
                      <div className="flex items-center justify-center space-x-2 mb-4">
                        <span className="text-2xl font-bold text-primary">$49.99</span>
                        <span className="text-muted-foreground line-through">$69.99</span>
                      </div>
                      <Badge className="gradient-primary text-white mb-4">30% OFF</Badge>
                    </div>
                  </CardContent>
                </Card>
              </SpotlightEffect>
            </ScrollAnimation>

            {/* Leaderboard */}
            <ScrollAnimation delay={700} direction="right">
              <SpotlightEffect>
                <Leaderboard />
              </SpotlightEffect>
            </ScrollAnimation>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/20 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">MC</span>
                </div>
                <span className="text-white font-bold text-xl">CraftStore</span>
              </div>
              <p className="text-muted-foreground mb-4">
                The premier destination for Minecraft server enhancements. Level up your gameplay with our exclusive
                ranks, crate keys, and services.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Discord
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Payment Methods</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="glass p-2 rounded text-center text-xs text-white">PayPal</div>
                <div className="glass p-2 rounded text-center text-xs text-white">Visa</div>
                <div className="glass p-2 rounded text-center text-xs text-white">MC</div>
                <div className="glass p-2 rounded text-center text-xs text-white">GCash</div>
                <div className="glass p-2 rounded text-center text-xs text-white">Apple</div>
                <div className="glass p-2 rounded text-center text-xs text-white">Google</div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-muted-foreground">© 2025 CraftStore — Built with love by Max67 ❤️</p>
          </div>
        </div>

        {/* Bottom gradient glow */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-primary/20 to-transparent blur-3xl pointer-events-none" />
      </footer>
    </div>
  )
}
