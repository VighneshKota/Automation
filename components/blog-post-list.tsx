"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Search, Plus } from "lucide-react"

export default function BlogPostList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const posts = [
    {
      id: 1,
      title: "10 Ways AI is Transforming Medical Billing in 2023",
      status: "published",
      date: "Jun 10, 2023",
    },
    {
      id: 2,
      title: "How to Reduce Claim Rejections with Smart Technology",
      status: "draft",
      date: "Jun 5, 2023",
    },
    {
      id: 3,
      title: "The Future of Healthcare Administration",
      status: "scheduled",
      date: "Jun 15, 2023",
    },
  ]

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (activeTab === "all" || post.status === activeTab.replace("s", "")),
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Blog Posts</h3>
        <Button size="sm" variant="outline" className="h-8 gap-1">
          <Plus className="h-3.5 w-3.5" />
          New
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search posts..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-2 mt-2">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="flex items-center p-2 hover:bg-muted rounded-md cursor-pointer">
                <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{post.title}</p>
                  <p className="text-xs text-muted-foreground">{post.date}</p>
                </div>
                <div>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
                      post.status === "published"
                        ? "bg-green-100 text-green-800"
                        : post.status === "scheduled"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground py-2">No posts found</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
