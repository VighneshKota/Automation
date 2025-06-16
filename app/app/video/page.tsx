"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import DashboardHeader from "@/components/dashboard-header"
import VideoScriptEditor from "@/components/video-script-editor"
import VideoPreview from "@/components/video-preview"
import { useToast } from "@/hooks/use-toast"

export default function VideoPage() {
  const [platform, setPlatform] = useState("instagram")
  const [scriptContent, setScriptContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [duration, setDuration] = useState(30)
  const [generationSettings, setGenerationSettings] = useState({
    topic: "",
    tone: "professional",
    goal: "educate",
    additionalInstructions: "",
  })
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!generationSettings.topic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a topic for your video script.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2500))

    const scriptTemplate = `[HOOK - 0:00-0:05]
Are ${generationSettings.topic.toLowerCase()} challenges costing your business? 
You're not alone.

[PROBLEM - 0:05-0:10]
Most businesses struggle with ${generationSettings.topic.toLowerCase()} and lose opportunities daily.
That's revenue and growth you're missing out on.

[SOLUTION - 0:10-0:20]
Our approach to ${generationSettings.topic.toLowerCase()} helps you overcome these challenges through:
- Strategic implementation
- Proven methodologies
- Expert guidance

[PROOF - 0:20-0:25]
Our clients have seen an average 35% improvement in their ${generationSettings.topic.toLowerCase()} metrics within just 90 days.

[CALL TO ACTION - 0:25-0:30]
Visit the link in bio to book a free strategy session and transform your approach to ${generationSettings.topic.toLowerCase()}.`

    setScriptContent(scriptTemplate)
    setIsGenerating(false)

    toast({
      title: "Script generated",
      description: "Your video script has been created successfully.",
    })
  }

  const handleExportScript = () => {
    if (!scriptContent) {
      toast({
        title: "No script to export",
        description: "Please generate or write a script first.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Script exported",
      description: "Your script has been exported successfully.",
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />

      <main className="flex-1 container py-6">
        <h1 className="text-3xl font-bold mb-2">Video Content</h1>
        <p className="text-muted-foreground mb-8">Create scripts for Instagram Reels and YouTube Shorts</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">Platform Selection</Label>
                    <RadioGroup
                      defaultValue="instagram"
                      className="grid grid-cols-2 gap-4 mt-2"
                      onValueChange={setPlatform}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="instagram" id="instagram" />
                        <Label htmlFor="instagram" className="cursor-pointer">
                          Instagram Reels
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="youtube" id="youtube" />
                        <Label htmlFor="youtube" className="cursor-pointer">
                          YouTube Shorts
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="video-topic">Video Topic</Label>
                    <Input
                      id="video-topic"
                      placeholder="Enter a topic or key message for your video"
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
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="educational">Educational</SelectItem>
                          <SelectItem value="humorous">Humorous</SelectItem>
                          <SelectItem value="inspirational">Inspirational</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="goal">Video Goal</Label>
                      <Select
                        value={generationSettings.goal}
                        onValueChange={(value) => setGenerationSettings({ ...generationSettings, goal: value })}
                      >
                        <SelectTrigger id="goal" className="mt-1">
                          <SelectValue placeholder="Select goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="educate">Educate Audience</SelectItem>
                          <SelectItem value="sell">Sell Product/Service</SelectItem>
                          <SelectItem value="awareness">Raise Awareness</SelectItem>
                          <SelectItem value="entertain">Entertain</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between">
                      <Label>Video Duration</Label>
                      <span className="text-sm text-muted-foreground">{duration} seconds</span>
                    </div>
                    <Slider
                      value={[duration]}
                      min={15}
                      max={60}
                      step={5}
                      className="mt-2"
                      onValueChange={(value) => setDuration(value[0])}
                    />
                  </div>

                  <div>
                    <Label htmlFor="additional-instructions">Additional Instructions (Optional)</Label>
                    <Textarea
                      id="additional-instructions"
                      placeholder="Any specific points you want to include in the video script"
                      className="mt-1"
                      value={generationSettings.additionalInstructions}
                      onChange={(e) =>
                        setGenerationSettings({ ...generationSettings, additionalInstructions: e.target.value })
                      }
                    />
                  </div>

                  <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
                    {isGenerating ? "Generating Video Script..." : "Generate Video Script"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <VideoScriptEditor content={scriptContent} onChange={setScriptContent} platform={platform} />
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Video Preview</h3>
                <VideoPreview script={scriptContent} platform={platform} />

                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-base">Visual Style</Label>
                    <Select defaultValue="minimal">
                      <SelectTrigger>
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="bold">Bold</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base">Background Music</Label>
                    <Select defaultValue="none">
                      <SelectTrigger>
                        <SelectValue placeholder="Select music" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="upbeat">Upbeat</SelectItem>
                        <SelectItem value="corporate">Corporate</SelectItem>
                        <SelectItem value="inspirational">Inspirational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={handleExportScript} className="w-full">
                    Export Script
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
