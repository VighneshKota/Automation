import { Card, CardContent } from "@/components/ui/card"
import { PenTool, Linkedin, Video, Brain, Clock, Target, Zap, Users } from "lucide-react"

export default function BenefitsSection() {
  const benefits = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Advanced AI Intelligence",
      description:
        "Our sophisticated AI assistant learns your unique voice, style, and brand personality to create authentic content across all platforms.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      title: "Blog Content Mastery",
      description:
        "Generate comprehensive, SEO-optimized blog posts that establish thought leadership and drive organic traffic.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Linkedin className="w-8 h-8" />,
      title: "LinkedIn Engagement",
      description:
        "Create scroll-stopping LinkedIn posts that build your professional network and generate quality leads.",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Video Script Creation",
      description:
        "Craft compelling scripts for Instagram Reels and YouTube Shorts with proven hooks and storytelling frameworks.",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "10x Faster Creation",
      description:
        "Reduce content creation time from hours to minutes while maintaining quality and consistency across platforms.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Audience-Focused",
      description:
        "Every piece of content is tailored to your specific audience, ensuring maximum relevance and engagement.",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Multi-Platform Sync",
      description:
        "Seamlessly adapt content across different platforms while maintaining your brand voice and message consistency.",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaboration",
      description:
        "Work with your team to review, edit, and approve content before publishing across all your channels.",
      color: "from-indigo-500 to-indigo-600",
    },
  ]

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Founders Choose Our AI Assistant</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stop struggling with content creation. Let our sophisticated AI assistant handle the heavy lifting while you
            focus on building your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div
                  className={`w-16 h-16 rounded-lg bg-gradient-to-r ${benefit.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="text-white">{benefit.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
