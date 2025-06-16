import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Linkedin, Video, ArrowRight } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import DashboardMetrics from "@/components/dashboard-metrics"
import RecentActivity from "@/components/recent-activity"

export const metadata: Metadata = {
  title: "Dashboard | AI Content Team",
  description: "Manage your AI content generation across multiple platforms",
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />

      <main className="flex-1 container py-6">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Alex</h1>
        <p className="text-muted-foreground mb-8">Your AI content team is ready to create</p>

        <DashboardMetrics />

        <h2 className="text-2xl font-semibold mt-12 mb-6">Generate Content</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Blog Generator Card */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Blog Generator</CardTitle>
              <CardDescription>Create full-length blog content tailored to your brand voice</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="bg-primary/10 p-1 rounded-full mr-2">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  SEO-optimized articles
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/10 p-1 rounded-full mr-2">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  Custom subdomain publishing
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/10 p-1 rounded-full mr-2">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  Rich formatting and media
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/app/blog">
                  Create Blog Content
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* LinkedIn Generator Card */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Linkedin className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>LinkedIn Post Generator</CardTitle>
              <CardDescription>Create engaging posts optimized for LinkedIn's algorithm</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="bg-primary/10 p-1 rounded-full mr-2">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  Engagement-focused hooks
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/10 p-1 rounded-full mr-2">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  Smart hashtag recommendations
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/10 p-1 rounded-full mr-2">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  Direct publishing integration
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/app/linkedin">
                  Create LinkedIn Content
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Video Generator Card */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Video Generator</CardTitle>
              <CardDescription>Create scripts for Instagram Reels and YouTube Shorts</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="bg-primary/10 p-1 rounded-full mr-2">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  Platform-optimized scripts
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/10 p-1 rounded-full mr-2">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  Hook and storytelling structure
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/10 p-1 rounded-full mr-2">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  Visual direction suggestions
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/app/video">
                  Create Video Content
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <RecentActivity />
      </main>
    </div>
  )
}

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
