"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Smartphone, Wallet, Shield, CheckCircle, User } from "lucide-react"
import { useRouter } from "next/navigation"

const paymentMethods = [
  {
    id: "paypal",
    name: "PayPal",
    icon: "/payment-icons/paypal.png",
    description: "Pay with your PayPal account",
    fallbackIcon: <Wallet className="w-5 h-5" />,
  },
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: "/payment-icons/visa-mastercard.png",
    description: "Visa, MasterCard, American Express",
    fallbackIcon: <CreditCard className="w-5 h-5" />,
  },
  {
    id: "gcash",
    name: "GCash",
    icon: "/payment-icons/gcash.png",
    description: "Pay with GCash mobile wallet",
    fallbackIcon: <Smartphone className="w-5 h-5" />,
  },
  {
    id: "apple",
    name: "Apple Pay",
    icon: "/payment-icons/apple-pay.png",
    description: "Pay with Touch ID or Face ID",
    fallbackIcon: <Smartphone className="w-5 h-5" />,
  },
  {
    id: "google",
    name: "Google Pay",
    icon: "/payment-icons/google-pay.png",
    description: "Pay with Google Pay",
    fallbackIcon: <Smartphone className="w-5 h-5" />,
  },
]

export default function CheckoutPage() {
  const { state, dispatch } = useCart()
  const router = useRouter()
  const [selectedPayment, setSelectedPayment] = useState("paypal")
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    minecraftUsername: "",
    email: "",
    discordTag: "",
    specialInstructions: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCheckout = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Clear cart and redirect to success page
    dispatch({ type: "CLEAR_CART" })
    router.push("/checkout/success")
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Add some items to your cart before checking out.</p>
            <Button onClick={() => router.push("/")} className="gradient-primary text-white hover-glow">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Checkout</h1>
            <p className="text-muted-foreground">Complete your purchase and get your items instantly</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Order Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                        <p className="text-muted-foreground text-xs capitalize">
                          {item.category} • Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-primary font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}

                  <Separator className="bg-white/20" />

                  <div className="space-y-2">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal:</span>
                      <span>${state.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Processing Fee:</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between text-white font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-primary">${state.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Notice */}
              <Card className="glass border-green-500/30 bg-green-500/5">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">Secure Checkout</h4>
                      <p className="text-muted-foreground text-xs">
                        Your payment information is encrypted and secure. Items are delivered instantly to your account.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Checkout Form */}
            <div className="space-y-6">
              {/* Account Information */}
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <User className="w-5 h-5 text-primary" />
                    <span>Account Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="minecraft-username" className="text-white">
                      Minecraft Username *
                    </Label>
                    <Input
                      id="minecraft-username"
                      placeholder="Enter your Minecraft username"
                      value={formData.minecraftUsername}
                      onChange={(e) => handleInputChange("minecraftUsername", e.target.value)}
                      className="glass border-white/20 text-white placeholder:text-muted-foreground bg-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="glass border-white/20 text-white placeholder:text-muted-foreground bg-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discord-tag" className="text-white">
                      Discord Tag (Optional)
                    </Label>
                    <Input
                      id="discord-tag"
                      placeholder="username#1234"
                      value={formData.discordTag}
                      onChange={(e) => handleInputChange("discordTag", e.target.value)}
                      className="glass border-white/20 text-white placeholder:text-muted-foreground bg-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="special-instructions" className="text-white">
                      Special Instructions (Optional)
                    </Label>
                    <Textarea
                      id="special-instructions"
                      placeholder="Any special requests or notes..."
                      value={formData.specialInstructions}
                      onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                      className="glass border-white/20 text-white placeholder:text-muted-foreground bg-transparent resize-none"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <span>Payment Method</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center space-x-3 p-3 rounded-lg glass border-white/10 hover:border-primary/30 transition-all duration-300"
                      >
                        <RadioGroupItem value={method.id} id={method.id} className="border-white/30" />
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="text-primary w-8 h-8 flex items-center justify-center">
                            <img
                              src={method.icon || "/placeholder.svg"}
                              alt={method.name}
                              className="w-6 h-6 object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.display = "none"
                                target.nextElementSibling?.classList.remove("hidden")
                              }}
                            />
                            <div className="hidden">{method.fallbackIcon}</div>
                          </div>
                          <div>
                            <Label htmlFor={method.id} className="text-white font-semibold cursor-pointer">
                              {method.name}
                            </Label>
                            <p className="text-muted-foreground text-xs">{method.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Complete Purchase */}
              <Button
                onClick={handleCheckout}
                disabled={isProcessing || !formData.minecraftUsername || !formData.email}
                className="w-full gradient-primary text-white hover-glow py-6 text-lg"
              >
                {isProcessing ? "Processing..." : `Complete Purchase - $${state.total.toFixed(2)}`}
              </Button>

              <p className="text-muted-foreground text-xs text-center">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy. All sales are final.
                Items will be delivered to your account within 5 minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
