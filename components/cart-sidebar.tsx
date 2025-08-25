"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react"
import Link from "next/link"

export function CartSidebar() {
  const { state, dispatch } = useCart()

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  return (
    <Sheet open={state.isOpen} onOpenChange={(open) => dispatch({ type: open ? "OPEN_CART" : "CLOSE_CART" })}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative text-white hover:bg-white/20">
          <ShoppingCart className="w-5 h-5" />
          {state.itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-primary text-white text-xs min-w-5 h-5 flex items-center justify-center">
              {state.itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="glass border-white/20 bg-black/90 backdrop-blur-xl w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-white flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <span>Shopping Cart ({state.itemCount})</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {state.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground text-sm mb-4">Add some items to get started!</p>
                <Button
                  onClick={() => dispatch({ type: "CLOSE_CART" })}
                  className="gradient-primary text-white hover-glow"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-6 space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="glass rounded-lg p-4 border-white/10">
                    <div className="flex items-start space-x-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold text-sm truncate">{item.title}</h4>
                        <p className="text-muted-foreground text-xs capitalize">{item.category}</p>

                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-primary font-bold">${item.price.toFixed(2)}</span>
                          {item.originalPrice && (
                            <span className="text-muted-foreground line-through text-xs">
                              ${item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 p-0 glass border-white/20 text-white hover:bg-white/20"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>

                        <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 p-0 glass border-white/20 text-white hover:bg-white/20"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="text-white font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/20 pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-primary">${state.total.toFixed(2)}</span>
                </div>

                <div className="space-y-2">
                  <Link href="/checkout" onClick={() => dispatch({ type: "CLOSE_CART" })}>
                    <Button className="w-full gradient-primary text-white hover-glow">Proceed to Checkout</Button>
                  </Link>

                  <Button
                    variant="outline"
                    onClick={() => dispatch({ type: "CLOSE_CART" })}
                    className="w-full glass border-white/20 text-white hover:bg-white/20 bg-transparent"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
