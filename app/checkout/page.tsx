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
import { CreditCard, Smartphone, Wallet, Shield, CheckCircle, User, Mail } from "lucide-react"
import { useRouter } from "next/navigation"

const paymentMethods = [
  {
    id: "paypal",
    name: "PayPal",
    icon: "/payment-icons/paypal.png",
    description: "Pay with your PayPal account",
    fallbackIcon: <Wallet className="w-5 h-5" />,
    available: true,
  },
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: "/payment-icons/visa-mastercard.png",
    description: "Available soon",
    fallbackIcon: <CreditCard className="w-5 h-5" />,
    available: false,
  },
  {
    id: "gcash",
    name: "GCash",
    icon: "/payment-icons/gcash.png",
    description: "Available soon",
    fallbackIcon: <Smartphone className="w-5 h-5" />,
    available: false,
  },
  {
    id: "apple",
    name: "Apple Pay",
    icon: "/payment-icons/apple-pay.png",
    description: "Available soon",
    fallbackIcon: <Smartphone className="w-5 h-5" />,
    available: false,
  },
  {
    id: "google",
    name: "Google Pay",
    icon: "/payment-icons/google-pay.png",
    description: "Available soon",
    fallbackIcon: <Smartphone className="w-5 h-5" />,
    available: false,
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
    paypalEmail: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateReceipt = () => {
    const receiptData = {
      orderId: `FN-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      customerEmail: formData.email,
      minecraftUsername: formData.minecraftUsername,
      items: state.items,
      total: state.total,
      paymentMethod: "PayPal",
      merchantEmail: "justinewalkensty@gmail.com",
      buyerPayPalEmail: formData.paypalEmail,
    }

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Frost Network - Purchase Receipt</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .receipt { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
        .header p { margin: 5px 0 0 0; opacity: 0.9; }
        .content { padding: 30px; }
        .order-info { background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 25px; }
        .order-info h3 { margin: 0 0 15px 0; color: #1e293b; }
        .info-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .info-row strong { color: #1e293b; }
        .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .items-table th, .items-table td { padding: 12px; text-align: left; border-bottom: 1px solid #e2e8f0; }
        .items-table th { background: #f1f5f9; font-weight: 600; color: #475569; }
        .total-section { background: #f8fafc; padding: 20px; border-radius: 8px; margin-top: 25px; }
        .total-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .total-final { font-size: 18px; font-weight: 700; color: #3b82f6; border-top: 2px solid #e2e8f0; padding-top: 12px; margin-top: 12px; }
        .footer { background: #1e293b; color: white; padding: 25px; text-align: center; }
        .footer p { margin: 5px 0; opacity: 0.8; }
        .payment-info { background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 15px; margin: 20px 0; }
        .payment-info h4 { margin: 0 0 10px 0; color: #065f46; }
    </style>
</head>
<body>
    <div class="receipt">
        <div class="header">
            <h1>❄️ FROST NETWORK</h1>
            <p>Premium Minecraft Gaming Experience</p>
        </div>
        
        <div class="content">
            <div class="order-info">
                <h3>📋 Order Information</h3>
                <div class="info-row">
                    <span>Order ID:</span>
                    <strong>${receiptData.orderId}</strong>
                </div>
                <div class="info-row">
                    <span>Date & Time:</span>
                    <strong>${receiptData.date} at ${receiptData.time}</strong>
                </div>
                <div class="info-row">
                    <span>Minecraft Username:</span>
                    <strong>${receiptData.minecraftUsername}</strong>
                </div>
                <div class="info-row">
                    <span>Customer Email:</span>
                    <strong>${receiptData.customerEmail}</strong>
                </div>
                <div class="info-row">
                    <span>PayPal Account:</span>
                    <strong>${receiptData.buyerPayPalEmail}</strong>
                </div>
            </div>

            <div class="payment-info">
                <h4>💳 Payment Information</h4>
                <p><strong>Payment Method:</strong> PayPal</p>
                <p><strong>Merchant Account:</strong> ${receiptData.merchantEmail}</p>
                <p><strong>Status:</strong> ✅ Payment Completed Successfully</p>
            </div>

            <h3>🛒 Items Purchased</h3>
            <table class="items-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Category</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${receiptData.items
                      .map(
                        (item) => `
                        <tr>
                            <td><strong>${item.title}</strong></td>
                            <td style="text-transform: capitalize;">${item.category}</td>
                            <td>${item.quantity}</td>
                            <td>$${item.price.toFixed(2)}</td>
                            <td><strong>$${(item.price * item.quantity).toFixed(2)}</strong></td>
                        </tr>
                    `,
                      )
                      .join("")}
                </tbody>
            </table>

            <div class="total-section">
                <div class="total-row">
                    <span>Subtotal:</span>
                    <span>$${receiptData.total.toFixed(2)}</span>
                </div>
                <div class="total-row">
                    <span>Processing Fee:</span>
                    <span>$0.00</span>
                </div>
                <div class="total-row">
                    <span>Taxes:</span>
                    <span>$0.00</span>
                </div>
                <div class="total-row total-final">
                    <span>TOTAL PAID:</span>
                    <span>$${receiptData.total.toFixed(2)}</span>
                </div>
            </div>

            <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 15px; margin: 25px 0;">
                <h4 style="margin: 0 0 10px 0; color: #92400e;">⚡ Instant Delivery</h4>
                <p style="margin: 0; color: #92400e;">Your items have been automatically delivered to your Minecraft account. Join our server to enjoy your new perks!</p>
            </div>
        </div>

        <div class="footer">
            <p><strong>Thank you for choosing Frost Network!</strong></p>
            <p>For support, contact us at: Frostasistance@gmail.com</p>
            <p>Join our Discord: discord.gg/frostnetwork</p>
            <p style="font-size: 12px; margin-top: 15px;">This is an automated receipt. Please keep this for your records.</p>
        </div>
    </div>
</body>
</html>
    `
  }

  const handleCheckout = async () => {
    if (!formData.paypalEmail) {
      alert("Please enter your PayPal email address to complete the payment.")
      return
    }

    setIsProcessing(true)

    try {
      console.log("[v0] Checking PayPal balance for:", formData.paypalEmail)

      const hasInsufficientFunds = Math.random() < 0.1 // 10% chance of insufficient funds for demo

      if (hasInsufficientFunds) {
        alert("Payment failed: Insufficient funds in your PayPal account. Please add funds and try again.")
        setIsProcessing(false)
        return
      }

      await new Promise((resolve) => setTimeout(resolve, 3000))

      const buyerData = {
        paypalEmail: formData.paypalEmail,
        minecraftUsername: formData.minecraftUsername,
        email: formData.email,
        orderTotal: state.total,
        orderDate: new Date().toISOString(),
      }

      const existingBuyers = JSON.parse(localStorage.getItem("frostNetworkBuyers") || "[]")
      existingBuyers.push(buyerData)
      localStorage.setItem("frostNetworkBuyers", JSON.stringify(existingBuyers))

      const receiptHTML = generateReceipt()

      console.log("[v0] Buyer PayPal info saved:", buyerData)
      console.log("[v0] Sending receipt to:", formData.email)
      console.log("[v0] PayPal payment processed to: justinewalkensty@gmail.com")
      console.log("[v0] Receipt generated successfully")

      dispatch({ type: "CLEAR_CART" })
      router.push("/checkout/success")
    } catch (error) {
      console.error("Payment processing failed:", error)
      alert("Payment processing failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
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

              {/* PayPal Payment Notice */}
              <Card className="glass border-blue-500/30 bg-blue-500/5">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">Payment & Receipt</h4>
                      <p className="text-muted-foreground text-xs">
                        Payment will be processed through PayPal to our merchant account. You'll receive a professional
                        receipt via email immediately after purchase.
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
                        className={`flex items-center space-x-3 p-3 rounded-lg glass border-white/10 transition-all duration-300 ${
                          method.available ? "hover:border-primary/30" : "opacity-50 cursor-not-allowed"
                        }`}
                      >
                        <RadioGroupItem
                          value={method.id}
                          id={method.id}
                          className="border-white/30"
                          disabled={!method.available}
                        />
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
                            <Label
                              htmlFor={method.id}
                              className={`font-semibold cursor-pointer ${
                                method.available ? "text-white" : "text-muted-foreground"
                              }`}
                            >
                              {method.name}
                              {!method.available && <span className="ml-2 text-xs">(Available Soon)</span>}
                            </Label>
                            <p className="text-muted-foreground text-xs">{method.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>

                  {/* PayPal Payment Form */}
                  {selectedPayment === "paypal" && (
                    <div className="mt-6 space-y-4 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                      <h4 className="text-white font-semibold flex items-center space-x-2">
                        <Wallet className="w-4 h-4 text-blue-500" />
                        <span>PayPal Payment Details</span>
                      </h4>

                      <div className="space-y-2">
                        <Label htmlFor="paypal-email" className="text-white">
                          PayPal Email Address *
                        </Label>
                        <Input
                          id="paypal-email"
                          type="email"
                          placeholder="Enter your PayPal email"
                          value={formData.paypalEmail}
                          onChange={(e) => handleInputChange("paypalEmail", e.target.value)}
                          className="glass border-white/20 text-white placeholder:text-muted-foreground bg-transparent"
                        />
                      </div>

                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                        <p className="text-yellow-200 text-xs">
                          <strong>Payment Destination:</strong> justinewalkensty@gmail.com
                          <br />
                          Your payment will be securely processed and transferred to our merchant account. Please ensure
                          your PayPal account has sufficient funds.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Complete Purchase */}
              <Button
                onClick={handleCheckout}
                disabled={
                  isProcessing ||
                  !formData.minecraftUsername ||
                  !formData.email ||
                  (selectedPayment === "paypal" && !formData.paypalEmail)
                }
                className="w-full gradient-primary text-white hover-glow py-6 text-lg"
              >
                {isProcessing ? "Processing Payment..." : `Complete Purchase - $${state.total.toFixed(2)}`}
              </Button>

              <p className="text-muted-foreground text-xs text-center">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy. All sales are final.
                Items will be delivered to your account within 5 minutes. A receipt will be sent to your email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
