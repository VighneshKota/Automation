import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function CTASection() {
  const features = [
    "Advanced AI Content Assistant",
    "Content DNA Personalization",
    "Multi-Platform Publishing",
    "Unlimited Content Generation",
    "Team Collaboration Tools",
    "Analytics & Performance Tracking",
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-blue-900/20 via-black to-cyan-900/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Ready to Transform Your Content Strategy?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of successful founders who've already revolutionized their content creation process with AI.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-2xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center text-left">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-4 text-xl font-semibold"
              asChild
            >
              <Link href="/auth">
                Start Your Free Trial
                <ArrowRight className="ml-2 w-6 h-6" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-4 text-lg"
            >
              Watch Demo
            </Button>
          </div>

          <p className="text-gray-400 text-sm">No credit card required • 7-day free trial • Cancel anytime</p>
        </div>
      </div>
    </section>
  )
}
