"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

export default function VideoPreview({ script, platform }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [sections, setSections] = useState([])

  useEffect(() => {
    if (!script) {
      setSections([])
      return
    }

    // Parse script sections
    const sectionRegex = /\[(.*?)\s*-\s*(.*?)\]/g
    const parsedSections = []
    let match
    const scriptCopy = script

    while ((match = sectionRegex.exec(scriptCopy)) !== null) {
      const sectionName = match[1]
      const timing = match[2]
      const startIndex = match.index

      // Get content until the next section or end
      const remainingScript = scriptCopy.slice(match.index + match[0].length)
      const nextMatchIndex = remainingScript.search(/\[(.*?)\s*-\s*(.*?)\]/)
      const endIndex = nextMatchIndex !== -1 ? match.index + match[0].length + nextMatchIndex : scriptCopy.length

      const sectionContent = scriptCopy.substring(startIndex + match[0].length, endIndex).trim()

      parsedSections.push({
        name: sectionName,
        timing,
        content: sectionContent,
      })
    }

    setSections(parsedSections)
  }, [script])

  useEffect(() => {
    if (sections.length === 0) return

    // Auto-cycle through sections for preview
    const interval = setInterval(() => {
      setCurrentSection((prev) => (prev + 1) % sections.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [sections])

  if (!script || sections.length === 0) {
    return (
      <div className="aspect-[9/16] bg-muted rounded-md flex items-center justify-center">
        <p className="text-muted-foreground text-center p-4">Generate a script to see a preview</p>
      </div>
    )
  }

  const currentSectionData = sections[currentSection]

  return (
    <div className="space-y-4">
      <div className="aspect-[9/16] bg-gradient-to-b from-primary/20 to-primary/5 rounded-md relative overflow-hidden">
        {/* Platform UI frame */}
        <div className="absolute inset-x-0 top-0 h-12 bg-black/10 flex items-center justify-between px-4">
          <div className="w-6 h-6 rounded-full bg-white/20"></div>
          <div className="w-20 h-6 rounded-full bg-white/20"></div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-black/40 p-4 rounded-lg backdrop-blur-sm">
            <p className="font-bold text-white text-lg mb-2">{currentSectionData.name}</p>
            <p className="text-white text-sm">{currentSectionData.content}</p>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute top-4 inset-x-4 flex space-x-1">
          {sections.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full ${index === currentSection ? "bg-white" : "bg-white/30"}`}
            ></div>
          ))}
        </div>
      </div>

      <Card className="p-3">
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium">{currentSectionData.name}</span>
          <span className="text-muted-foreground">{currentSectionData.timing}</span>
        </div>
        <p className="text-xs mt-1 text-muted-foreground">
          {currentSection + 1} of {sections.length} sections
        </p>
      </Card>
    </div>
  )
}
