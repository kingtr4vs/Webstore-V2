import { Navbar } from "@/components/navbar"
import { ProductCard } from "@/components/product-card"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Clock, Zap, AlertTriangle, CheckCircle, Info } from "lucide-react"

const DISCORD_INVITE_LINK = "https://discord.gg/frostnetwork"

const unbanServices = [
  {
    title: "Standard Unban",
    price: "9.99",
    image: "/minecraft-standard-unban.png",
    description: "Basic unban service for minor infractions. Processing time: 24-48 hours.",
    badge: "BASIC",
    icon: <Shield className="w-5 h-5" />,
    features: ["Minor Infractions", "24-48h Processing", "Email Support", "One-time Use"],
    processingTime: "24-48 hours",
    coverage: ["Chat Violations", "Minor Griefing", "AFK Violations", "First Offenses"],
  },
  {
    title: "Premium Unban",
    price: "19.99",
    image: "/minecraft-unban-service.png",
    description: "Fast-track unban service for moderate violations. Processing time: 12-24 hours.",
    badge: "POPULAR",
    popular: true,
    icon: <Zap className="w-5 h-5" />,
    features: ["Moderate Violations", "12-24h Processing", "Priority Support", "Appeal Assistance"],
    processingTime: "12-24 hours",
    coverage: ["Moderate Griefing", "PvP Violations", "Building Violations", "Repeat Offenses"],
  },
  {
    title: "Express Unban",
    price: "34.99",
    image: "/minecraft-express-unban.png",
    description: "Immediate unban service for urgent cases. Processing time: 1-6 hours.",
    badge: "FAST",
    icon: <Clock className="w-5 h-5" />,
    features: ["Urgent Cases", "1-6h Processing", "Live Chat Support", "Guaranteed Review"],
    processingTime: "1-6 hours",
    coverage: ["Major Violations", "Hacking Accusations", "Serious Griefing", "Complex Cases"],
  },
  {
    title: "Ultimate Unban",
    price: "49.99",
    image: "/minecraft-ultimate-unban.png",
    description: "Premium unban service for severe violations with personal case manager.",
    badge: "PREMIUM",
    icon: <CheckCircle className="w-5 h-5" />,
    features: ["Severe Violations", "Instant Processing", "Personal Manager", "Full Documentation"],
    processingTime: "Instant",
    coverage: ["Permanent Bans", "IP Bans", "Hardware Bans", "All Violations"],
  },
]

const unbanPackages = [
  {
    title: "Unban Insurance",
    price: "14.99",
    image: "/minecraft-unban-insurance.png",
    description: "3-month protection plan covering up to 2 unbans for any violations.",
    badge: "PROTECTION",
  },
  {
    title: "Family Unban Pack",
    price: "39.99",
    originalPrice: "59.99",
    image: "/minecraft-family-unban.png",
    description: "Unban service for up to 3 accounts in your household.",
    badge: "FAMILY",
  },
  {
    title: "Guild Unban Service",
    price: "89.99",
    originalPrice: "149.99",
    image: "/minecraft-guild-unban.png",
    description: "Mass unban service for guild/clan members (up to 10 accounts).",
    badge: "BULK",
  },
]

export default function UnbansPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden min-h-[50vh] flex items-center">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 gradient-primary text-white px-4 py-2">Unban Services</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Get Back In The
            <span className="block bg-gradient-to-r from-[#1E90FF] to-[#663399] bg-clip-text text-transparent">
              Game
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Made a mistake? Our professional unban services help you return to the server quickly and fairly. Choose the
            service that matches your situation.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 bg-black">
        {/* Important Notice */}
        <div className="mb-12">
          <Card className="glass border-yellow-500/30 bg-yellow-500/5">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-semibold mb-2">Important Information</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Unban services are reviewed case-by-case. Not all bans are eligible for removal. Purchasing an unban
                    service does not guarantee unbanning - it guarantees a thorough review of your case.
                  </p>
                  <ul className="text-muted-foreground text-xs space-y-1">
                    <li>• Refunds available if unban is denied after review</li>
                    <li>• Provide accurate information for faster processing</li>
                    <li>• Multiple violations may require higher tier services</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Unban Services */}
        <section className="mb-16">
          <div className="flex items-center space-x-2 mb-8">
            <Shield className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold text-white">Unban Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {unbanServices.map((service, index) => (
              <Card key={index} className="glass hover-glow border-white/20 overflow-hidden group relative">
                {service.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="gradient-primary text-white">Popular</Badge>
                  </div>
                )}

                <CardHeader className="p-0">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-secondary text-white">{service.badge}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="text-primary">{service.icon}</div>
                    <CardTitle className="text-white text-lg">{service.title}</CardTitle>
                  </div>

                  <p className="text-muted-foreground text-xs mb-3">{service.description}</p>

                  <div className="text-xl font-bold text-primary mb-3">${service.price}</div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <h4 className="text-white font-semibold text-xs mb-1">Processing Time:</h4>
                      <p className="text-primary text-xs">{service.processingTime}</p>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold text-xs mb-1">Covers:</h4>
                      <ul className="space-y-1">
                        {service.coverage.slice(0, 2).map((item, itemIndex) => (
                          <li key={itemIndex} className="text-muted-foreground text-xs flex items-center space-x-2">
                            <div className="w-1 h-1 bg-primary rounded-full" />
                            <span>{item}</span>
                          </li>
                        ))}
                        <li className="text-primary text-xs">+{service.coverage.length - 2} more</li>
                      </ul>
                    </div>
                  </div>

                  <Button size="sm" className="w-full gradient-primary text-white hover-glow">
                    Request Unban
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Unban Packages */}
        <section className="mb-16">
          <div className="flex items-center space-x-2 mb-8">
            <CheckCircle className="w-6 h-6 text-secondary" />
            <h2 className="text-3xl font-bold text-white">Unban Packages</h2>
            <Badge className="bg-secondary text-white">Special Offers</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unbanPackages.map((package_, index) => (
              <ProductCard key={index} {...package_} />
            ))}
          </div>
        </section>

        {/* Process Information */}
        <section>
          <div className="glass rounded-xl p-8 border-white/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">How Our Unban Process Works</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our professional team reviews each case individually to ensure fair and thorough evaluation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
                  <Info className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-white font-semibold">1. Submit Request</h4>
                <p className="text-muted-foreground text-sm">
                  Purchase service and provide detailed information about your ban.
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mx-auto">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <h4 className="text-white font-semibold">2. Case Review</h4>
                <p className="text-muted-foreground text-sm">
                  Our team reviews your case, server logs, and violation history.
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <h4 className="text-white font-semibold">3. Decision</h4>
                <p className="text-muted-foreground text-sm">
                  We make a fair decision based on evidence and server policies.
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-white font-semibold">4. Resolution</h4>
                <p className="text-muted-foreground text-sm">
                  You're notified of the decision and can return to playing if approved.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
