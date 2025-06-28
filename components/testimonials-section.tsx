import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Founder, TechStartup",
      avatar: "/placeholder.svg?height=60&width=60",
      content:
        "This AI assistant has completely transformed how I approach content marketing. I went from spending 10 hours a week on content to just 1 hour, and my engagement has tripled!",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "CEO, GrowthLab",
      avatar: "/placeholder.svg?height=60&width=60",
      content:
        "The Content DNA feature is incredible. The AI actually captures my voice and style perfectly. My LinkedIn posts now consistently get 5x more engagement than before.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "Founder, InnovateCo",
      avatar: "/placeholder.svg?height=60&width=60",
      content:
        "As a non-native English speaker, this platform has been a game-changer. The AI helps me create professional, engaging content that resonates with my audience.",
      rating: 5,
    },
    {
      name: "David Kim",
      role: "Startup Founder",
      avatar: "/placeholder.svg?height=60&width=60",
      content:
        "I was skeptical about AI-generated content, but this platform proved me wrong. The quality is outstanding, and it saves me countless hours every week.",
      rating: 5,
    },
    {
      name: "Lisa Thompson",
      role: "SaaS Founder",
      avatar: "/placeholder.svg?height=60&width=60",
      content:
        "The video script generator is phenomenal. My Instagram Reels now consistently hit 10K+ views, and I've gained 5,000 new followers in just 2 months.",
      rating: 5,
    },
    {
      name: "Alex Johnson",
      role: "E-commerce Founder",
      avatar: "/placeholder.svg?height=60&width=60",
      content:
        "This platform has helped me build a consistent content strategy across all platforms. My blog traffic has increased by 300% since I started using it.",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 bg-gray-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Success Stories from Real Founders</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how entrepreneurs like you are scaling their content and growing their businesses with AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback className="bg-gray-800 text-white">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
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
