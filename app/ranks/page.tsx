"use client"

import { Navbar } from "@/components/navbar"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown, Star, Zap, Shield, Gem, Award } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"

const ranks = [
  {
    title: "VIP Rank",
    price: "9.99",
    image: "/minecraft-vip-rank.png",
    description: "Basic VIP perks including colored chat, priority join, and exclusive areas.",
    badge: "STARTER",
    icon: <Star className="w-6 h-6" />,
    perks: ["Colored Chat", "Priority Join", "VIP Areas", "Daily Rewards"],
  },
  {
    title: "Premium Rank",
    price: "19.99",
    image: "/minecraft-premium-rank.png",
    description: "Enhanced gameplay with fly permissions, extra homes, and premium commands.",
    badge: "POPULAR",
    icon: <Zap className="w-6 h-6" />,
    perks: ["All VIP Perks", "Fly Permission", "5 Extra Homes", "Premium Commands"],
  },
  {
    title: "Elite Rank",
    price: "34.99",
    image: "/minecraft-elite-rank.png",
    description: "Advanced rank with creative mode access, world edit, and exclusive kits.",
    badge: "ADVANCED",
    icon: <Shield className="w-6 h-6" />,
    perks: ["All Premium Perks", "Creative Mode", "WorldEdit", "Elite Kits", "Custom Prefix"],
  },
  {
    title: "Diamond Rank",
    price: "49.99",
    originalPrice: "69.99",
    image: "/minecraft-diamond-rank-badge.png",
    description: "Top-tier rank with god mode, unlimited homes, and diamond exclusive perks.",
    badge: "30% OFF",
    popular: true,
    icon: <Gem className="w-6 h-6" />,
    perks: ["All Elite Perks", "God Mode", "Unlimited Homes", "Diamond Kits", "Custom Commands"],
  },
  {
    title: "Legendary Rank",
    price: "79.99",
    image: "/minecraft-legendary-rank.png",
    description: "Ultimate rank with server operator privileges and legendary exclusive content.",
    badge: "ULTIMATE",
    icon: <Crown className="w-6 h-6" />,
    perks: ["All Diamond Perks", "OP Privileges", "Legendary Kits", "Custom Worlds", "Staff Chat"],
  },
  {
    title: "Mythic Rank",
    price: "99.99",
    image: "/minecraft-mythic-rank.png",
    description: "The highest achievable rank with mythic powers and exclusive server privileges.",
    badge: "EXCLUSIVE",
    icon: <Award className="w-6 h-6" />,
    perks: ["All Legendary Perks", "Mythic Powers", "Server Events", "Custom Plugins", "VIP Support"],
  },
]

const rankUpgrades = [
  {
    title: "VIP → Premium Upgrade",
    price: "12.99",
    originalPrice: "19.99",
    image: "/minecraft-rank-upgrade.png",
    description: "Upgrade from VIP to Premium rank and keep all your progress.",
    badge: "UPGRADE",
  },
  {
    title: "Premium → Elite Upgrade",
    price: "18.99",
    originalPrice: "34.99",
    image: "/minecraft-rank-upgrade.png",
    description: "Upgrade from Premium to Elite rank with exclusive benefits.",
    badge: "UPGRADE",
  },
  {
    title: "Elite → Diamond Upgrade",
    price: "22.99",
    originalPrice: "49.99",
    image: "/minecraft-rank-upgrade.png",
    description: "Upgrade to Diamond rank and unlock premium features.",
    badge: "UPGRADE",
  },
]

export default function RanksPage() {
  const { dispatch } = useCart()
  const { state: authState } = useAuth()

  const handleAddToCart = (rank: (typeof ranks)[0]) => {
    if (!authState.isAuthenticated) {
      toast.error("Please login or register first to add items to your cart", {
        description: "You need an account to make purchases",
        action: {
          label: "Login",
          onClick: () => (window.location.href = "/login"),
        },
      })
      return
    }

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: `rank-${rank.title.toLowerCase().replace(/\s+/g, "-")}`,
        title: rank.title,
        price: Number.parseFloat(rank.price),
        originalPrice: rank.originalPrice ? Number.parseFloat(rank.originalPrice) : undefined,
        image: rank.image,
        category: "rank",
      },
    })

    dispatch({ type: "OPEN_CART" })
    toast.success(`${rank.title} added to cart!`)
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden min-h-[50vh] flex items-center">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 gradient-primary text-white px-4 py-2">Server Ranks</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Choose Your
            <span className="block bg-gradient-to-r from-[#1E90FF] to-[#663399] bg-clip-text text-transparent">
              Rank
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Unlock exclusive perks, commands, and privileges with our premium server ranks. Each rank builds upon the
            previous one.
          </p>
        </div>
      </section>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 bg-black">
        {/* All Ranks */}
        <section className="mb-16">
          <div className="flex items-center space-x-2 mb-8">
            <Crown className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold text-white">All Ranks</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ranks.map((rank, index) => (
              <Card key={index} className="glass hover-glow border-white/20 overflow-hidden group relative">
                {rank.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="gradient-primary text-white">Popular</Badge>
                  </div>
                )}

                <CardHeader className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={rank.image || "/placeholder.svg"}
                      alt={rank.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-secondary text-white">{rank.badge}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="text-primary">{rank.icon}</div>
                    <CardTitle className="text-white text-xl">{rank.title}</CardTitle>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4">{rank.description}</p>

                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-2xl font-bold text-primary">${rank.price}</span>
                    {rank.originalPrice && (
                      <span className="text-muted-foreground line-through">${rank.originalPrice}</span>
                    )}
                  </div>

                  <div className="space-y-2 mb-6">
                    <h4 className="text-white font-semibold text-sm">Included Perks:</h4>
                    <ul className="space-y-1">
                      {rank.perks.slice(0, 3).map((perk, perkIndex) => (
                        <li key={perkIndex} className="text-muted-foreground text-xs flex items-center space-x-2">
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          <span>{perk}</span>
                        </li>
                      ))}
                      {rank.perks.length > 3 && (
                        <li className="text-primary text-xs">+{rank.perks.length - 3} more perks</li>
                      )}
                    </ul>
                  </div>

                  <Button
                    onClick={() => handleAddToCart(rank)}
                    className="w-full gradient-primary text-white hover-glow"
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Rank Upgrades */}
        <section>
          <div className="flex items-center space-x-2 mb-8">
            <Zap className="w-6 h-6 text-secondary" />
            <h2 className="text-3xl font-bold text-white">Rank Upgrades</h2>
            <Badge className="bg-secondary text-white">Save Money</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rankUpgrades.map((upgrade, index) => (
              <ProductCard key={index} {...upgrade} category="rank" />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
