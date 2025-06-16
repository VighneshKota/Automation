"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import DashboardHeader from "@/components/dashboard-header"
import BlogEditor from "@/components/blog-editor"
import BlogPostList from "@/components/blog-post-list"
import ThemeCustomizer from "@/components/theme-customizer"
import { useToast } from "@/hooks/use-toast"

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState("content")
  const [blogTitle, setBlogTitle] = useState("")
  const [blogContent, setBlogContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [subdomain, setSubdomain] = useState("mybrand")
  const [isCheckingDomain, setIsCheckingDomain] = useState(false)
  const [domainAvailable, setDomainAvailable] = useState(null)
  const [generationSettings, setGenerationSettings] = useState({
    topic: "",
    tone: "professional",
    length: "medium",
    instructions: "",
  })
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!generationSettings.topic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a topic for your blog post.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate AI generation with realistic delay
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setBlogTitle(`${generationSettings.topic}: A Comprehensive Guide`)
    setBlogContent(`# ${generationSettings.topic}: A Comprehensive Guide

## Introduction

In today's rapidly evolving digital landscape, understanding ${generationSettings.topic.toLowerCase()} has become crucial for businesses and individuals alike. This comprehensive guide will walk you through everything you need to know.

## Why ${generationSettings.topic} Matters

The importance of ${generationSettings.topic.toLowerCase()} cannot be overstated. Here are the key reasons:

- **Efficiency**: Streamlines processes and reduces manual work
- **Cost-effectiveness**: Saves money in the long run
- **Scalability**: Grows with your business needs
- **Competitive advantage**: Keeps you ahead of the competition

## Getting Started

To begin your journey with ${generationSettings.topic.toLowerCase()}, follow these essential steps:

1. **Assessment**: Evaluate your current situation
2. **Planning**: Create a detailed implementation plan
3. **Execution**: Put your plan into action
4. **Monitoring**: Track progress and make adjustments

## Best Practices

Here are some proven strategies for success:

- Start small and scale gradually
- Focus on user experience
- Measure and analyze results
- Stay updated with latest trends

## Common Challenges and Solutions

While implementing ${generationSettings.topic.toLowerCase()}, you might face these challenges:

### Challenge 1: Resource Constraints
**Solution**: Prioritize high-impact activities and consider outsourcing non-core tasks.

### Challenge 2: Technical Complexity
**Solution**: Invest in training and consider working with experienced professionals.

## Conclusion

${generationSettings.topic} represents a significant opportunity for growth and improvement. By following the strategies outlined in this guide, you'll be well-positioned to achieve success.

Remember, the key is to start with a solid foundation and build upon it systematically. With patience and persistence, you'll see remarkable results.`)

    setIsGenerating(false)
    toast({
      title: "Blog post generated",
      description: "Your AI-generated blog post is ready for editing.",
    })
  }

  const handleCheckDomain = async () => {
    setIsCheckingDomain(true)
    // Simulate domain check
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setDomainAvailable(Math.random() > 0.5)
    setIsCheckingDomain(false)
  }

  const handleVisitBlog = () => {
    window.open(`https://${subdomain}.platform.com`, "_blank")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />

      <main className="flex-1 container py-6">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Blog Management</h1>
            <p className="text-muted-foreground">Create and manage your blog content</p>
          </div>

          <div className="mt-4 lg:mt-0 flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">yourblog.platform.com</span>
              <Input
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value)}
                className="w-40"
                placeholder="subdomain"
              />
              {domainAvailable !== null && (
                <Badge variant={domainAvailable ? "default" : "destructive"}>
                  {domainAvailable ? "Available" : "Taken"}
                </Badge>
              )}
            </div>
            <Button variant="outline" onClick={handleCheckDomain} disabled={isCheckingDomain}>
              {isCheckingDomain ? "Checking..." : "Check"}
            </Button>
            <Button variant="secondary" onClick={handleVisitBlog}>
              Visit Blog
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1">
            <CardContent className="p-4">
              <BlogPostList />
            </CardContent>
          </Card>

          <div className="lg:col-span-3 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-6 mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="blog-topic">Blog Topic</Label>
                        <Input
                          id="blog-topic"
                          placeholder="Enter a topic or keywords for your blog post"
                          className="mt-1"
                          value={generationSettings.topic}
                          onChange={(e) => setGenerationSettings({ ...generationSettings, topic: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="tone">Tone</Label>
                          <Select
                            value={generationSettings.tone}
                            onValueChange={(value) => setGenerationSettings({ ...generationSettings, tone: value })}
                          >
                            <SelectTrigger id="tone" className="mt-1">
                              <SelectValue placeholder="Select tone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="professional">Professional</SelectItem>
                              <SelectItem value="conversational">Conversational</SelectItem>
                              <SelectItem value="educational">Educational</SelectItem>
                              <SelectItem value="humorous">Humorous</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="length">Length</Label>
                          <Select
                            value={generationSettings.length}
                            onValueChange={(value) => setGenerationSettings({ ...generationSettings, length: value })}
                          >
                            <SelectTrigger id="length" className="mt-1">
                              <SelectValue placeholder="Select length" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="short">Short (~500 words)</SelectItem>
                              <SelectItem value="medium">Medium (~1000 words)</SelectItem>
                              <SelectItem value="long">Long (~2000 words)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="additional-instructions">Additional Instructions (Optional)</Label>
                        <Textarea
                          id="additional-instructions"
                          placeholder="Any specific points you want to include in the blog post"
                          className="mt-1"
                          value={generationSettings.instructions}
                          onChange={(e) =>
                            setGenerationSettings({ ...generationSettings, instructions: e.target.value })
                          }
                        />
                      </div>

                      <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
                        {isGenerating ? "Generating Blog Post..." : "Generate Blog Post"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <BlogEditor
                  title={blogTitle}
                  content={blogContent}
                  onTitleChange={setBlogTitle}
                  onContentChange={setBlogContent}
                />
              </TabsContent>

              <TabsContent value="appearance" className="mt-6">
                <ThemeCustomizer />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
