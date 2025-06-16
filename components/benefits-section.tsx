import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Zap, BarChart, Globe } from "lucide-react"

export default function BenefitsSection() {
  const benefits = [
    {
      title: "AI-Powered Content Creation",
      description: "Generate high-quality content tailored to your brand voice across multiple platforms",
      icon: <Brain className="h-10 w-10 text-primary" />,
    },
    {
      title: "Save 10+ Hours Weekly",
      description: "Automate your content creation process and focus on what matters most for your business",
      icon: <Zap className="h-10 w-10 text-primary" />,
    },
    {
      title: "Data-Driven Insights",
      description: "Get actionable analytics to understand what content performs best with your audience",
      icon: <BarChart className="h-10 w-10 text-primary" />,
    },
    {
      title: "Multi-Platform Publishing",
      description: "Seamlessly publish to blogs, LinkedIn, Instagram, and more from a single dashboard",
      icon: <Globe className="h-10 w-10 text-primary" />,
    },
  ]

  return (
    <section id="benefits" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform helps founders and marketers create engaging content without the hassle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="mb-4">{benefit.icon}</div>
                <CardTitle>{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{benefit.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
