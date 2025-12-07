"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"

const DISCORD_INVITE_LINK = "https://discord.gg/frostnetwork"

interface ProductCardProps {
  title: string
  price: string
  originalPrice?: string
  image: string
  description: string
  badge?: string
  popular?: boolean
  category?: "rank" | "key" | "unban"
}

export function ProductCard({
  title,
  price,
  originalPrice,
  image,
  description,
  badge,
  popular = false,
  category = "rank",
}: ProductCardProps) {
  const { dispatch } = useCart()

  const handleAddToCart = () => {
    window.open(DISCORD_INVITE_LINK, "_blank")
  }

  return (
    <Card className="glass hover-glow border-white/20 overflow-hidden group relative h-full flex flex-col">
      {popular && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="gradient-primary text-white shadow-lg">Popular</Badge>
        </div>
      )}

      <CardHeader className="p-0 flex-shrink-0">
        <div className="relative h-52 overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {badge && <Badge className="absolute top-4 left-4 bg-secondary text-white shadow-lg">{badge}</Badge>}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </CardHeader>

      <CardContent className="p-6 flex-grow flex flex-col">
        <CardTitle className="text-white text-xl mb-3 line-clamp-2">{title}</CardTitle>
        <p className="text-muted-foreground text-sm mb-4 flex-grow leading-relaxed line-clamp-3">{description}</p>

        <div className="flex items-center space-x-2 mb-4">
          <span className="text-2xl font-bold text-primary">${price}</span>
          {originalPrice && <span className="text-muted-foreground line-through text-lg">${originalPrice}</span>}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 mt-auto">
        <Button
          onClick={handleAddToCart}
          className="w-full gradient-primary text-white hover-glow transition-all duration-300"
        >
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  )
}
