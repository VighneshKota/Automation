"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { SplineSceneBasic } from "@/components/spline-scene-basic"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-black">
      {/* 3D Spline Scene at the top */}
      <div className="max-w-6xl mx-auto mb-16">
        <SplineSceneBasic />
      </div>

      <div className="container mx-auto px-4 py-20">
        {/* Content below */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-6 h-6 text-blue-400 mr-2" />
            <span className="text-blue-300 font-medium">AI-Powered Content Creation</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Transform Your
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              Content Strategy
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Create compelling blogs, viral LinkedIn posts, and engaging video scripts tailored to your unique brand
            voice and business goals with the power of artificial intelligence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              variant="outline"
              size="lg"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-4 text-lg bg-transparent"
              asChild
            >
              <Link href="/auth">
                Get Started
              </Link>
            </Button>
            <Button variant="ghost" size="lg" className="text-blue-400 hover:text-blue-300 px-8 py-4 text-lg">
              Learn More
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
          <div>
            <div className="text-3xl font-bold text-white mb-2">1</div>
            <div className="text-gray-400">AI Assistant</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">3</div>
            <div className="text-gray-400">Content Platforms</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">10x</div>
            <div className="text-gray-400">Faster Creation</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-gray-400">AI Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}
