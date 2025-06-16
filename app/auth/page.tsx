"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FcGoogle } from "react-icons/fc"
import { FaLinkedin } from "react-icons/fa"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/onboarding"
    }, 1500)
  }

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true)

    // Simulate social authentication
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/onboarding"
    }, 1500)
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Image and Testimonial */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative">
        <div className="absolute inset-0 bg-black/30 z-10" />
        {/* Replace Image with a div background for reliability */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "linear-gradient(to bottom right, #4f46e5, #7c3aed)" }}
        />
        <div className="relative z-20 flex flex-col justify-end p-12 text-white">
          <blockquote className="text-2xl font-light mb-6">
            "This platform completely transformed how I create content. What used to take days now takes minutes."
          </blockquote>
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-white/20 mr-4" />
            <div>
              <p className="font-medium">Sarah Johnson</p>
              <p className="text-sm opacity-80">Founder, TechSolutions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Welcome</h1>
            <p className="text-muted-foreground mt-2">Sign in to meet your AI content team</p>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="name@example.com" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="#" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" type="text" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" type="email" placeholder="name@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin("google")}
                  disabled={isLoading}
                  className="w-full"
                >
                  <FcGoogle className="mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin("linkedin")}
                  disabled={isLoading}
                  className="w-full"
                >
                  <FaLinkedin className="mr-2 h-4 w-4 text-[#0077B5]" />
                  LinkedIn
                </Button>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
