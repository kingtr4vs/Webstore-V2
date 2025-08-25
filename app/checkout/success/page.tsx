import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, MessageCircle, Home } from "lucide-react"
import Link from "next/link"

export default function CheckoutSuccessPage() {
  const orderNumber = `MC-${Date.now().toString().slice(-6)}`

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Payment Successful!</h1>
            <p className="text-muted-foreground text-lg">Your order has been processed and items are being delivered</p>
          </div>

          <Card className="glass border-white/20 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>Order Confirmation</span>
                <Badge className="gradient-primary text-white">Completed</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">Order Details</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Order Number:</span>
                      <span className="text-white font-mono">{orderNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="text-white">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="text-green-500">Delivered</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Delivery Information</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Minecraft Account:</span>
                      <span className="text-white">YourUsername</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Time:</span>
                      <span className="text-white">Instant</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Server:</span>
                      <span className="text-white">CraftStore MC</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/20 pt-4">
                <h4 className="text-white font-semibold mb-3">What happens next?</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-white/5">
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <h5 className="text-white font-semibold text-sm mb-1">Items Delivered</h5>
                    <p className="text-muted-foreground text-xs">Your items have been added to your account</p>
                  </div>

                  <div className="text-center p-4 rounded-lg bg-white/5">
                    <MessageCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h5 className="text-white font-semibold text-sm mb-1">Join Server</h5>
                    <p className="text-muted-foreground text-xs">Log in to the server to use your new items</p>
                  </div>

                  <div className="text-center p-4 rounded-lg bg-white/5">
                    <Download className="w-8 h-8 text-secondary mx-auto mb-2" />
                    <h5 className="text-white font-semibold text-sm mb-1">Receipt Sent</h5>
                    <p className="text-muted-foreground text-xs">Check your email for the receipt</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="gradient-primary text-white hover-glow">
                <Home className="w-4 h-4 mr-2" />
                Back to Store
              </Button>
            </Link>

            <Button variant="outline" className="glass border-white/20 text-white hover:bg-white/20 bg-transparent">
              <MessageCircle className="w-4 h-4 mr-2" />
              Join Discord
            </Button>

            <Button variant="outline" className="glass border-white/20 text-white hover:bg-white/20 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              Need help? Contact our support team on Discord or email support@craftstore.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
