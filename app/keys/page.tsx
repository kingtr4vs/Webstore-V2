import { Navbar } from "@/components/navbar"
import { ProductCard } from "@/components/product-card"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Key, Gift, Sparkles, Gem, Crown, Star } from "lucide-react"

const crateKeys = [
  {
    title: "Common Crate Key",
    price: "2.99",
    image: "/minecraft-common-crate-key.png",
    description: "Open common crates for basic items, materials, and small rewards.",
    badge: "STARTER",
    icon: <Key className="w-5 h-5" />,
    rewards: ["Basic Materials", "Common Tools", "Small Coin Rewards", "Food Items"],
  },
  {
    title: "Rare Crate Key",
    price: "7.99",
    image: "/minecraft-rare-crate-key.png",
    description: "Unlock rare crates containing valuable items and enchanted gear.",
    badge: "POPULAR",
    popular: true,
    icon: <Star className="w-5 h-5" />,
    rewards: ["Enchanted Tools", "Rare Materials", "Medium Coin Rewards", "Armor Sets"],
  },
  {
    title: "Epic Crate Key",
    price: "14.99",
    image: "/minecraft-epic-crate-key.png",
    description: "Access epic crates with powerful weapons and exclusive cosmetics.",
    badge: "ADVANCED",
    icon: <Sparkles className="w-5 h-5" />,
    rewards: ["Epic Weapons", "Exclusive Cosmetics", "Large Coin Rewards", "Special Blocks"],
  },
  {
    title: "Legendary Crate Key",
    price: "24.99",
    image: "/minecraft-legendary-crate-key.png",
    description: "Open legendary crates for the rarest items and mythic equipment.",
    badge: "PREMIUM",
    icon: <Gem className="w-5 h-5" />,
    rewards: ["Mythic Equipment", "Legendary Items", "Huge Coin Rewards", "Custom Skins"],
  },
  {
    title: "Mythic Crate Key",
    price: "39.99",
    image: "/minecraft-mythic-crate-key.png",
    description: "The ultimate crate key for the most exclusive and powerful items.",
    badge: "ULTIMATE",
    icon: <Crown className="w-5 h-5" />,
    rewards: ["Godlike Items", "Exclusive Titles", "Massive Rewards", "Server Perks"],
  },
]

const keyBundles = [
  {
    title: "Starter Key Bundle",
    price: "19.99",
    originalPrice: "29.99",
    image: "/minecraft-key-bundle-starter.png",
    description: "5x Common Keys + 2x Rare Keys + 1x Epic Key",
    badge: "BUNDLE",
  },
  {
    title: "Premium Key Bundle",
    price: "49.99",
    originalPrice: "74.99",
    image: "/minecraft-key-bundle-premium.png",
    description: "3x Rare Keys + 3x Epic Keys + 2x Legendary Keys",
    badge: "BEST VALUE",
    popular: true,
  },
  {
    title: "Ultimate Key Bundle",
    price: "89.99",
    originalPrice: "129.99",
    image: "/minecraft-key-bundle-ultimate.png",
    description: "5x Epic Keys + 3x Legendary Keys + 2x Mythic Keys",
    badge: "ULTIMATE",
  },
]

export default function KeysPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/10" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 gradient-primary text-white px-4 py-2">Crate Keys</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Unlock Amazing
            <span className="block gradient-primary bg-clip-text text-transparent">Rewards</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Open crates to discover rare items, powerful weapons, exclusive cosmetics, and valuable rewards. Each key
            tier offers better chances for epic loot.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Individual Keys */}
        <section className="mb-16">
          <div className="flex items-center space-x-2 mb-8">
            <Key className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold text-white">Individual Keys</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {crateKeys.map((key, index) => (
              <Card key={index} className="glass hover-glow border-white/20 overflow-hidden group relative">
                {key.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="gradient-primary text-white">Popular</Badge>
                  </div>
                )}

                <CardHeader className="p-0">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={key.image || "/placeholder.svg"}
                      alt={key.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-secondary text-white">{key.badge}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="text-primary">{key.icon}</div>
                    <CardTitle className="text-white text-lg">{key.title}</CardTitle>
                  </div>

                  <p className="text-muted-foreground text-xs mb-3">{key.description}</p>

                  <div className="text-xl font-bold text-primary mb-3">${key.price}</div>

                  <div className="space-y-2 mb-4">
                    <h4 className="text-white font-semibold text-xs">Possible Rewards:</h4>
                    <ul className="space-y-1">
                      {key.rewards.slice(0, 2).map((reward, rewardIndex) => (
                        <li key={rewardIndex} className="text-muted-foreground text-xs flex items-center space-x-2">
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          <span>{reward}</span>
                        </li>
                      ))}
                      <li className="text-primary text-xs">+{key.rewards.length - 2} more types</li>
                    </ul>
                  </div>

                  <Button size="sm" className="w-full gradient-primary text-white hover-glow">
                    Buy Key
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Key Bundles */}
        <section>
          <div className="flex items-center space-x-2 mb-8">
            <Gift className="w-6 h-6 text-secondary" />
            <h2 className="text-3xl font-bold text-white">Key Bundles</h2>
            <Badge className="bg-secondary text-white">Best Value</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyBundles.map((bundle, index) => (
              <ProductCard key={index} {...bundle} />
            ))}
          </div>
        </section>

        {/* Crate Preview */}
        <section className="mt-16">
          <div className="glass rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">How Crates Work</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Purchase keys to open crates and receive random rewards. Higher tier keys have better chances for rare and
              valuable items. All items are delivered instantly to your in-game inventory.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
                  <Key className="w-6 h-6 text-primary" />
                </div>
                <p className="text-white font-semibold text-sm">Buy Key</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mx-auto">
                  <Gift className="w-6 h-6 text-secondary" />
                </div>
                <p className="text-white font-semibold text-sm">Open Crate</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <p className="text-white font-semibold text-sm">Get Rewards</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
                  <Crown className="w-6 h-6 text-primary" />
                </div>
                <p className="text-white font-semibold text-sm">Enjoy Items</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
