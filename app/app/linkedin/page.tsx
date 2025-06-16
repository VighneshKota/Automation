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
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import DashboardHeader from "@/components/dashboard-header"
import LinkedInPreview from "@/components/linkedin-preview"
import { X, Calendar, Send, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LinkedInPage() {
  const [postContent, setPostContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [hashtags, setHashtags] = useState([])
  const [newHashtag, setNewHashtag] = useState("")
  const [activeTab, setActiveTab] = useState("content")
  const [generationSettings, setGenerationSettings] = useState({
    topic: "",
    postType: "text",
    tone: "professional",
    length: "medium",
    instructions: "",
  })
  const [enhanceSettings, setEnhanceSettings] = useState({
    engagement: [50],
    formality: [70],
    includeEmoji: true,
    includeCta: true,
  })
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!generationSettings.topic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a topic for your LinkedIn post.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const emojiMap = {
      professional: "💼",
      conversational: "💬",
      thoughtLeadership: "🧠",
      storytelling: "📖",
    }

    const emoji = enhanceSettings.includeEmoji ? emojiMap[generationSettings.tone] || "🎉" : ""

    let generatedContent = ""

    if (generationSettings.tone === "storytelling") {
      generatedContent = `Just had an incredible experience that I had to share ${emoji}

Last week, I was working with a client on ${generationSettings.topic.toLowerCase()}, and something amazing happened...

The challenge seemed impossible at first. But here's what we learned:

✅ Sometimes the best solutions come from unexpected places
✅ Collaboration always beats working in isolation  
✅ Small changes can have massive impact

The result? We exceeded our goals by 150%.

${enhanceSettings.includeCta ? `What's been your biggest breakthrough with ${generationSettings.topic.toLowerCase()} recently? Share in the comments! 👇` : ""}`
    } else if (generationSettings.tone === "thoughtLeadership") {
      generatedContent = `The future of ${generationSettings.topic.toLowerCase()} is here, and it's not what you think ${emoji}

After analyzing industry trends and working with dozens of companies, I've identified 3 key shifts happening right now:

🔍 Shift 1: Traditional approaches are becoming obsolete
⚡ Shift 2: Speed and agility now matter more than perfection  
🎯 Shift 3: Customer-centricity is the new competitive advantage

Companies that adapt to these changes will thrive. Those that don't will struggle to keep up.

${enhanceSettings.includeCta ? `What trends are you seeing in your industry? Let's discuss in the comments.` : ""}`
    } else {
      generatedContent = `Excited to share insights about ${generationSettings.topic} ${emoji}

Here's what I've learned from working in this space:

• The landscape is evolving rapidly
• Success requires both strategy and execution
• The best results come from focusing on fundamentals
• Continuous learning is essential

${enhanceSettings.includeCta ? `What's your experience with ${generationSettings.topic.toLowerCase()}? Would love to hear your thoughts!` : ""}`
    }

    setPostContent(generatedContent)
    setHashtags(["Innovation", "Growth", "Leadership"])
    setIsGenerating(false)

    toast({
      title: "LinkedIn post generated",
      description: "Your AI-generated post is ready for review.",
    })
  }

  const addHashtag = () => {
    if (newHashtag && !hashtags.includes(newHashtag) && hashtags.length < 10) {
      setHashtags([...hashtags, newHashtag])
      setNewHashtag("")
    }
  }

  const removeHashtag = (tag) => {
    setHashtags(hashtags.filter((t) => t !== tag))
  }

  const handleEnhance = async () => {
    if (!postContent.trim()) {
      toast({
        title: "No content to enhance",
        description: "Please generate or write some content first.",
        variant: "destructive",
      })
      return
    }

    // Simulate enhancement
    let enhancedContent = postContent

    if (enhanceSettings.engagement[0] > 70) {
      enhancedContent = enhancedContent.replace(/\./g, "! 🚀")
    }

    if (enhanceSettings.formality[0] < 30) {
      enhancedContent = enhancedContent.replace(/However,/g, "But hey,")
      enhancedContent = enhancedContent.replace(/Therefore,/g, "So,")
    }

    setPostContent(enhancedContent)
    toast({
      title: "Post enhanced",
      description: "Your post has been optimized based on your settings.",
    })
  }

  const handleSchedule = () => {
    toast({
      title: "Post scheduled",
      description: "Your LinkedIn post has been scheduled for publication.",
    })
  }

  const handleSaveDraft = () => {
    toast({
      title: "Draft saved",
      description: "Your LinkedIn post has been saved as a draft.",
    })
  }

  const handlePublish = () => {
    toast({
      title: "Post published",
      description: "Your LinkedIn post is now live!",
    })
  }

  const suggestedHashtags = [
    "HealthTech",
    "AIinHealthcare",
    "MedicalPractice",
    "HealthcareInnovation",
    "DigitalHealth",
    "MedTech",
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />

      <main className="flex-1 container py-6">
        <h1 className="text-3xl font-bold mb-2">LinkedIn Content</h1>
        <p className="text-muted-foreground mb-8">Create engaging LinkedIn posts for your audience</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="post-type">Post Type</Label>
                    <Select
                      value={generationSettings.postType}
                      onValueChange={(value) => setGenerationSettings({ ...generationSettings, postType: value })}
                    >
                      <SelectTrigger id="post-type" className="mt-1">
                        <SelectValue placeholder="Select post type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text Post</SelectItem>
                        <SelectItem value="image">Image Post</SelectItem>
                        <SelectItem value="carousel">Carousel Post</SelectItem>
                        <SelectItem value="poll">Poll</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="post-topic">Post Topic</Label>
                    <Input
                      id="post-topic"
                      placeholder="Enter a topic or key message for your post"
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
                          <SelectItem value="thoughtLeadership">Thought Leadership</SelectItem>
                          <SelectItem value="storytelling">Storytelling</SelectItem>
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
                          <SelectItem value="short">Short (1-2 paragraphs)</SelectItem>
                          <SelectItem value="medium">Medium (3-4 paragraphs)</SelectItem>
                          <SelectItem value="long">Long (5+ paragraphs)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="additional-instructions">Additional Instructions (Optional)</Label>
                    <Textarea
                      id="additional-instructions"
                      placeholder="Any specific points you want to include in the post"
                      className="mt-1"
                      value={generationSettings.instructions}
                      onChange={(e) => setGenerationSettings({ ...generationSettings, instructions: e.target.value })}
                    />
                  </div>

                  <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
                    {isGenerating ? "Generating LinkedIn Post..." : "Generate LinkedIn Post"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="hashtags">Hashtags</TabsTrigger>
                    <TabsTrigger value="enhance">Enhance</TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-4">
                    <Textarea
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      placeholder="Your LinkedIn post content will appear here"
                      className="min-h-[200px]"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{postContent.length} characters</span>
                      <span className={postContent.length > 3000 ? "text-red-500" : ""}>
                        {postContent.length}/3000 (LinkedIn limit)
                      </span>
                    </div>
                  </TabsContent>

                  <TabsContent value="hashtags" className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        value={newHashtag}
                        onChange={(e) => setNewHashtag(e.target.value)}
                        placeholder="Add a hashtag (without #)"
                        className="flex-1"
                        onKeyPress={(e) => e.key === "Enter" && addHashtag()}
                      />
                      <Button onClick={addHashtag} variant="secondary">
                        Add
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {hashtags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          #{tag}
                          <button onClick={() => removeHashtag(tag)} className="ml-1 hover:text-destructive">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      {hashtags.length === 0 && <p className="text-sm text-muted-foreground">No hashtags added yet</p>}
                    </div>

                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-2">Recommended Hashtags</h3>
                      <div className="flex flex-wrap gap-2">
                        {suggestedHashtags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="cursor-pointer hover:bg-secondary"
                            onClick={() =>
                              !hashtags.includes(tag) && hashtags.length < 10 && setHashtags([...hashtags, tag])
                            }
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="enhance" className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="engagement-level">Engagement Focus</Label>
                        <span className="text-sm text-muted-foreground">
                          {enhanceSettings.engagement[0] < 30
                            ? "Low"
                            : enhanceSettings.engagement[0] < 70
                              ? "Medium"
                              : "High"}
                        </span>
                      </div>
                      <Slider
                        value={enhanceSettings.engagement}
                        onValueChange={(value) => setEnhanceSettings({ ...enhanceSettings, engagement: value })}
                        max={100}
                        step={1}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="formality-level">Formality</Label>
                        <span className="text-sm text-muted-foreground">
                          {enhanceSettings.formality[0] < 30
                            ? "Casual"
                            : enhanceSettings.formality[0] < 70
                              ? "Professional"
                              : "Formal"}
                        </span>
                      </div>
                      <Slider
                        value={enhanceSettings.formality}
                        onValueChange={(value) => setEnhanceSettings({ ...enhanceSettings, formality: value })}
                        max={100}
                        step={1}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="include-emoji">Include Emojis</Label>
                        <p className="text-sm text-muted-foreground">Add relevant emojis to increase engagement</p>
                      </div>
                      <Switch
                        id="include-emoji"
                        checked={enhanceSettings.includeEmoji}
                        onCheckedChange={(checked) => setEnhanceSettings({ ...enhanceSettings, includeEmoji: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="include-cta">Include Call-to-Action</Label>
                        <p className="text-sm text-muted-foreground">Add a clear next step for your audience</p>
                      </div>
                      <Switch
                        id="include-cta"
                        checked={enhanceSettings.includeCta}
                        onCheckedChange={(checked) => setEnhanceSettings({ ...enhanceSettings, includeCta: checked })}
                      />
                    </div>

                    <Button onClick={handleEnhance} className="w-full">
                      Enhance Post
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">LinkedIn Preview</h3>
                <LinkedInPreview content={postContent} hashtags={hashtags} />

                <div className="mt-6 space-y-4">
                  <Button onClick={handleSchedule} className="w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Post
                  </Button>
                  <Button onClick={handleSaveDraft} variant="secondary" className="w-full">
                    <Save className="mr-2 h-4 w-4" />
                    Save as Draft
                  </Button>
                  <Button onClick={handlePublish} variant="outline" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Publish Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
