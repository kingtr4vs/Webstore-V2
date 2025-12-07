import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { FileText } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: January 2025</p>
          </div>

          <Card className="glass border-white/20">
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using Frost Network's services, you agree to be bound by these Terms of Service. If
                  you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Products and Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All products purchased through our store are digital items for use on our Minecraft server. Products
                  are delivered instantly upon successful payment. All sales are final unless otherwise stated.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Refund Policy</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Refunds may be issued under the following circumstances:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Product was not delivered due to technical issues</li>
                  <li>Duplicate purchase made in error</li>
                  <li>Unban request denied after review</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Refund requests must be submitted within 7 days of purchase through our Discord server.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. User Conduct</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Users must not engage in fraudulent activities, chargebacks, or abuse of our services. Violation of
                  these terms may result in permanent ban from our services without refund.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Frost Network shall not be liable for any indirect, incidental, special, or consequential damages
                  resulting from the use or inability to use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time. Continued use of our services after changes
                  constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions regarding these Terms of Service, please contact us through our Discord server or email
                  us at Frostasistance@gmail.com.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
