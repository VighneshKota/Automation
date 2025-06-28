export default function SocialProof() {
  const companies = [
    { name: "TechCorp", logo: "/placeholder.svg?height=40&width=120" },
    { name: "StartupXYZ", logo: "/placeholder.svg?height=40&width=120" },
    { name: "InnovateCo", logo: "/placeholder.svg?height=40&width=120" },
    { name: "GrowthLab", logo: "/placeholder.svg?height=40&width=120" },
    { name: "ScaleUp", logo: "/placeholder.svg?height=40&width=120" },
  ]

  const stats = [
    { number: "10K+", label: "Content Pieces Created" },
    { number: "500+", label: "Happy Founders" },
    { number: "95%", label: "Time Saved" },
    { number: "3x", label: "Engagement Boost" },
  ]

  return (
    <section className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trusted by Forward-Thinking Founders</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Join hundreds of successful entrepreneurs who've transformed their content strategy with AI
          </p>
        </div>

        {/* Company Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-16 opacity-60">
          {companies.map((company, index) => (
            <img
              key={index}
              src={company.logo || "/placeholder.svg"}
              alt={company.name}
              className="h-8 grayscale hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
