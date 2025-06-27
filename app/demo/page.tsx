'use client'

import { SplineScene } from "@/components/ui/spline";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
 
export default function SplineDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Spline 3D Integration Demo</h1>
          <p className="text-muted-foreground">Interactive 3D robot animation with your onboarding questions</p>
        </div>

        <Card className="w-full h-[500px] bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 relative overflow-hidden">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          
          <div className="flex h-full">
            {/* Left content */}
            <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                Interactive 3D Robot
              </h2>
              <p className="mt-4 text-neutral-300 max-w-lg">
                This robot will watch and assist you as you answer the onboarding questions. 
                It provides a friendly, interactive experience while collecting your preferences.
              </p>
            </div>

            {/* Right content */}
            <div className="flex-1 relative">
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Interactive 3D robot animation</li>
              <li>• Smooth loading with Suspense</li>
              <li>• Responsive design</li>
              <li>• Spotlight lighting effects</li>
              <li>• Contextual messages per question</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">How it works</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Robot watches as you answer questions</li>
              <li>• Provides encouraging messages</li>
              <li>• Creates an engaging onboarding experience</li>
              <li>• Saves all data to Supabase</li>
              <li>• Seamless integration with your app</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
} 