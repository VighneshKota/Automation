"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Bold, Italic, List, ListOrdered, LinkIcon, ImageIcon, Save, Calendar, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function BlogEditor({ title, content, onTitleChange, onContentChange }) {
  const [activeTab, setActiveTab] = useState("write")
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const { toast } = useToast()

  const handleFormatting = (format) => {
    const textarea = document.querySelector('textarea[name="content"]')
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    let newText = content

    switch (format) {
      case "bold":
        newText = content.substring(0, start) + `**${selectedText}**` + content.substring(end)
        break
      case "italic":
        newText = content.substring(0, start) + `*${selectedText}*` + content.substring(end)
        break
      case "list":
        newText = content.substring(0, start) + `\n- ${selectedText}` + content.substring(end)
        break
      case "ordered-list":
        newText = content.substring(0, start) + `\n1. ${selectedText}` + content.substring(end)
        break
      case "link":
        newText = content.substring(0, start) + `[${selectedText}](url)` + content.substring(end)
        break
      case "image":
        newText = content.substring(0, start) + `![${selectedText}](image-url)` + content.substring(end)
        break
    }

    onContentChange(newText)
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    toast({
      title: "Draft saved",
      description: "Your blog post has been saved as a draft.",
    })
  }

  const handleSchedule = async () => {
    // Simulate scheduling
    toast({
      title: "Post scheduled",
      description: "Your blog post has been scheduled for publication.",
    })
  }

  const handlePublish = async () => {
    setIsPublishing(true)
    // Simulate publish
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsPublishing(false)
    toast({
      title: "Post published",
      description: "Your blog post is now live!",
    })
  }

  const renderPreview = () => {
    if (!content) return <p className="text-muted-foreground">Preview will appear here...</p>

    // Simple markdown-like rendering
    const html = content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/^- (.+)$/gm, "<li>$1</li>")
      .replace(/^1\. (.+)$/gm, "<li>$1</li>")
      .replace(/\n/g, "<br />")

    return <div dangerouslySetInnerHTML={{ __html: html }} />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blog Editor</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <Input
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Enter your blog title..."
              className="text-xl font-bold"
            />
          </div>

          <div className="border rounded-md">
            <div className="flex items-center gap-1 p-1 border-b bg-muted/50">
              <Button variant="ghost" size="sm" onClick={() => handleFormatting("bold")}>
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleFormatting("italic")}>
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleFormatting("list")}>
                <List className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleFormatting("ordered-list")}>
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleFormatting("link")}>
                <LinkIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleFormatting("image")}>
                <ImageIcon className="h-4 w-4" />
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="px-4 py-2 border-b bg-muted/50">
                <TabsList className="grid w-40 grid-cols-2">
                  <TabsTrigger value="write">Write</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="write" className="p-0">
                <Textarea
                  name="content"
                  value={content}
                  onChange={(e) => onContentChange(e.target.value)}
                  placeholder="Write your blog content here..."
                  className="w-full min-h-[400px] p-4 font-mono text-sm resize-none focus:outline-none border-0"
                />
              </TabsContent>

              <TabsContent value="preview" className="markdown-preview p-4 min-h-[400px]">
                {renderPreview()}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleSave} disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save Draft"}
        </Button>
        <div className="space-x-2">
          <Button variant="outline" onClick={handleSchedule}>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button onClick={handlePublish} disabled={isPublishing}>
            <Send className="mr-2 h-4 w-4" />
            {isPublishing ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
