"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export default function VideoScriptEditor({ content, onChange, platform }) {
  const [activeSection, setActiveSection] = useState(null)
  const { toast } = useToast()

  // Parse script sections if content exists
  const sections = content ? parseScriptSections(content) : []

  function parseScriptSections(text) {
    const sectionRegex = /\[(.*?)\s*-\s*(.*?)\]/g
    const sections = []
    let match
    const textCopy = text

    while ((match = sectionRegex.exec(textCopy)) !== null) {
      const sectionName = match[1]
      const timing = match[2]
      const startIndex = match.index

      // Get content until the next section or end
      const remainingText = textCopy.slice(match.index + match[0].length)
      const nextMatchIndex = remainingText.search(/\[(.*?)\s*-\s*(.*?)\]/)
      const endIndex = nextMatchIndex !== -1 ? match.index + match[0].length + nextMatchIndex : textCopy.length

      const sectionContent = textCopy.substring(startIndex + match[0].length, endIndex).trim()

      sections.push({
        name: sectionName,
        timing,
        content: sectionContent,
      })
    }

    return sections
  }

  const handleSectionClick = (index) => {
    setActiveSection(activeSection === index ? null : index)
  }

  const handleSectionChange = (index, newContent) => {
    const updatedSections = [...sections]
    updatedSections[index].content = newContent

    // Rebuild the full script
    const newScript = updatedSections
      .map((section) => `[${section.name} - ${section.timing}]\n${section.content}`)
      .join("\n\n")

    onChange(newScript)
  }

  const handleSaveTemplate = () => {
    if (!content) {
      toast({
        title: "No content to save",
        description: "Please generate or write a script first.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Template saved",
      description: "Your script template has been saved successfully.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Video Script</span>
          <Badge variant="outline">{platform === "instagram" ? "Instagram Reels" : "YouTube Shorts"}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {content ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sections.map((section, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all ${activeSection === index ? "ring-2 ring-primary" : ""}`}
                  onClick={() => handleSectionClick(index)}
                >
                  <CardHeader className="py-3">
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary">{section.name}</Badge>
                      <span className="text-xs text-muted-foreground">{section.timing}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="py-2">
                    {activeSection === index ? (
                      <Textarea
                        value={section.content}
                        onChange={(e) => handleSectionChange(index, e.target.value)}
                        className="min-h-[100px]"
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <p className="text-sm line-clamp-3">{section.content}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleSaveTemplate}>
                Save as Template
              </Button>
              <Button>Export Script</Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Generate a script to see it here, or write your own</p>
            <Textarea
              placeholder="Write your script here..."
              className="min-h-[200px]"
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
