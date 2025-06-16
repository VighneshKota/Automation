"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Check, Smartphone, Monitor } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ThemeCustomizer() {
  const [activeTab, setActiveTab] = useState("theme")
  const [previewMode, setPreviewMode] = useState("desktop")
  const [selectedTheme, setSelectedTheme] = useState("minimal")
  const [selectedLayout, setSelectedLayout] = useState("standard")
  const [selectedColor, setSelectedColor] = useState("blue")
  const [selectedFont, setSelectedFont] = useState("inter")
  const { toast } = useToast()

  const themes = [
    { id: "minimal", name: "Minimal" },
    { id: "modern", name: "Modern" },
    { id: "bold", name: "Bold" },
    { id: "classic", name: "Classic" },
  ]

  const layouts = [
    { id: "standard", name: "Standard" },
    { id: "sidebar", name: "With Sidebar" },
    { id: "magazine", name: "Magazine" },
  ]

  const colors = [
    { id: "blue", name: "Blue", value: "#3b82f6" },
    { id: "purple", name: "Purple", value: "#8b5cf6" },
    { id: "green", name: "Green", value: "#10b981" },
    { id: "red", name: "Red", value: "#ef4444" },
    { id: "orange", name: "Orange", value: "#f97316" },
    { id: "custom", name: "Custom", value: "#000000" },
  ]

  const handleSaveChanges = () => {
    toast({
      title: "Theme updated",
      description: "Your blog theme has been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Blog Appearance</h3>
            <div className="flex items-center space-x-2 border rounded-md">
              <Button
                variant={previewMode === "desktop" ? "secondary" : "ghost"}
                size="sm"
                className="rounded-r-none"
                onClick={() => setPreviewMode("desktop")}
              >
                <Monitor className="h-4 w-4 mr-2" />
                Desktop
              </Button>
              <Button
                variant={previewMode === "mobile" ? "secondary" : "ghost"}
                size="sm"
                className="rounded-l-none"
                onClick={() => setPreviewMode("mobile")}
              >
                <Smartphone className="h-4 w-4 mr-2" />
                Mobile
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="theme">Theme</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
              <TabsTrigger value="colors">Colors</TabsTrigger>
            </TabsList>

            <TabsContent value="theme" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {themes.map((theme) => (
                  <div key={theme.id} className="space-y-2">
                    <div
                      className={`relative aspect-video rounded-md overflow-hidden border-2 hover:border-primary cursor-pointer ${
                        selectedTheme === theme.id ? "border-primary" : "border-muted"
                      }`}
                      onClick={() => setSelectedTheme(theme.id)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200"></div>
                      {selectedTheme === theme.id && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                          <Check className="h-6 w-6 text-white bg-primary rounded-full p-1" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium text-center">{theme.name}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="layout" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {layouts.map((layout) => (
                  <div key={layout.id} className="space-y-2">
                    <div
                      className={`relative aspect-video rounded-md overflow-hidden border-2 hover:border-primary cursor-pointer ${
                        selectedLayout === layout.id ? "border-primary" : "border-muted"
                      }`}
                      onClick={() => setSelectedLayout(layout.id)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200"></div>
                      {selectedLayout === layout.id && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                          <Check className="h-6 w-6 text-white bg-primary rounded-full p-1" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium text-center">{layout.name}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="colors" className="space-y-4 mt-4">
              <div>
                <Label className="mb-2 block">Primary Color</Label>
                <RadioGroup
                  value={selectedColor}
                  onValueChange={setSelectedColor}
                  className="grid grid-cols-3 md:grid-cols-6 gap-2"
                >
                  {colors.map((color) => (
                    <div key={color.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={color.id} id={`color-${color.id}`} className="sr-only" />
                      <Label
                        htmlFor={`color-${color.id}`}
                        className="flex items-center space-x-2 cursor-pointer rounded-md border p-2 hover:bg-muted"
                      >
                        <div className="w-5 h-5 rounded-full" style={{ backgroundColor: color.value }} />
                        <span>{color.name}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="mb-2 block">Font Family</Label>
                <RadioGroup
                  value={selectedFont}
                  onValueChange={setSelectedFont}
                  className="grid grid-cols-2 md:grid-cols-3 gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inter" id="font-inter" />
                    <Label htmlFor="font-inter" className="cursor-pointer">
                      Inter
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="georgia" id="font-georgia" />
                    <Label htmlFor="font-georgia" className="cursor-pointer">
                      Georgia
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="font-system" />
                    <Label htmlFor="font-system" className="cursor-pointer">
                      System
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className={`mx-auto ${previewMode === "mobile" ? "max-w-sm" : "max-w-4xl"}`}>
            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Blog preview will appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
