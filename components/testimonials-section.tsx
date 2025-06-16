import { Card, CardContent } from "@/components/ui/card"
import { QuoteIcon } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "This platform has completely transformed our content strategy. We're now publishing 3x more content with half the team.",
      author: "Sarah Johnson",
      title: "CEO, TechSolutions",
    },
    {
      quote:
        "The AI agents understand our brand voice perfectly. The content they create is indistinguishable from what our team writes.",
      author: "Michael Chen",
      title: "Marketing Director, InnovateCorp",
    },
    {
      quote:
        "We've seen a 40% increase in engagement since using this platform. The multi-platform approach is game-changing.",
      author: "Priya Patel",
      title: "Founder, GrowthLabs",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied founders and marketers who have transformed their content strategy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="p-6">
                <QuoteIcon className="h-8 w-8 text-primary/40 mb-4" />
                <p className="mb-6 text-lg">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      {testimonial.author.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
