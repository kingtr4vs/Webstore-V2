import { Separator } from "@/components/ui/separator"
import { MessageCircle, Mail, FileText, Shield } from "lucide-react"

export function Footer() {
  const paymentMethods = [
    { name: "PayPal", icon: "/payment-icons/paypal.png" },
    { name: "Visa", icon: "/payment-icons/visa.png" },
    { name: "MasterCard", icon: "/payment-icons/mastercard.png" },
    { name: "Apple Pay", icon: "/payment-icons/apple-pay.png" },
    { name: "Google Pay", icon: "/payment-icons/google-pay.png" },
    { name: "GCash", icon: "/payment-icons/gcash.png" },
  ]

  return (
    <footer className="relative bg-black/50 border-t border-white/10 mt-20">
      {/* Radial gradient glow at bottom */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-32 bg-gradient-radial from-primary/20 via-purple-500/10 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Frost Network</h3>
            <p className="text-muted-foreground text-sm">
              Premium Minecraft server store with instant delivery and secure payments.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <a href="/ranks" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Ranks
              </a>
              <a href="/keys" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Crate Keys
              </a>
              <a href="/unbans" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Unbans
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Legal</h4>
            <div className="space-y-2">
              <a
                href="/privacy"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <Shield className="w-4 h-4" />
                <span>Privacy Policy</span>
              </a>
              <a
                href="/terms"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <FileText className="w-4 h-4" />
                <span>Terms of Service</span>
              </a>
              <a
                href="/contact"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </a>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Community</h4>
            <div className="space-y-2">
              <a
                href="https://discord.gg/minecraft"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Discord Server</span>
              </a>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10 mb-8" />

        {/* Payment Methods */}
        <div className="mb-8">
          <h4 className="text-white font-semibold mb-4 text-center">Accepted Payment Methods</h4>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className="glass p-2 rounded-lg border-white/10 hover:border-primary/30 transition-all duration-300"
              >
                <img
                  src={method.icon || "/placeholder.svg"}
                  alt={method.name}
                  className="w-8 h-8 object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Frost Network. Built with love by{" "}
            <span className="text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text font-semibold">
              Max67
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
