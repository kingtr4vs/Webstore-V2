"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"

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
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: `${category}-${title.toLowerCase().replace(/\s+/g, "-")}`,
        title,
        price: Number.parseFloat(price),
        originalPrice: originalPrice ? Number.parseFloat(originalPrice) : undefined,
        image,
        category,
      },
    })

    // Open cart sidebar to show the added item
    dispatch({ type: "OPEN_CART" })
  }

  return (
    <Card className="glass hover-glow border-white/20 overflow-hidden group">
      {popular && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="gradient-primary text-white">Popular</Badge>
        </div>
      )}

      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {badge && <Badge className="absolute top-4 left-4 bg-secondary text-white">{badge}</Badge>}
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <CardTitle className="text-white text-xl mb-2">{title}</CardTitle>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>

        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">${price}</span>
          {originalPrice && <span className="text-muted-foreground line-through">${originalPrice}</span>}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button onClick={handleAddToCart} className="w-full gradient-primary text-white hover-glow">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
