import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ThumbsUp, MessageSquare, Repeat2, Send } from "lucide-react"

export default function LinkedInPreview({ content, hashtags = [] }) {
  // Format the content with line breaks
  const formattedContent = content ? (
    content.split("\n").map((line, i) => (
      <p key={i} className={i > 0 ? "mt-2" : ""}>
        {line}
      </p>
    ))
  ) : (
    <p className="text-muted-foreground">Your LinkedIn post will appear here...</p>
  )

  return (
    <div className="border rounded-md overflow-hidden bg-white">
      {/* Post header */}
      <div className="p-4 flex items-start">
        <Avatar className="h-12 w-12 mr-3">
          <AvatarFallback>AJ</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">Alex Johnson</p>
          <p className="text-xs text-gray-500">Founder at TechSolutions</p>
          <p className="text-xs text-gray-500">1h • 🌎</p>
        </div>
      </div>

      {/* Post content */}
      <div className="px-4 pb-2 text-sm">
        {formattedContent}

        {/* Hashtags */}
        {hashtags.length > 0 && (
          <div className="mt-2">
            {hashtags.map((tag) => (
              <span key={tag} className="text-blue-600 mr-1">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Post engagement */}
      <div className="px-4 py-1 border-t text-xs text-gray-500">
        <span>42 reactions • 7 comments</span>
      </div>

      {/* Action buttons */}
      <div className="px-2 py-1 border-t flex justify-between">
        <button className="flex items-center justify-center p-2 rounded-md hover:bg-gray-100 text-gray-500 text-sm">
          <ThumbsUp className="h-4 w-4 mr-1" />
          Like
        </button>
        <button className="flex items-center justify-center p-2 rounded-md hover:bg-gray-100 text-gray-500 text-sm">
          <MessageSquare className="h-4 w-4 mr-1" />
          Comment
        </button>
        <button className="flex items-center justify-center p-2 rounded-md hover:bg-gray-100 text-gray-500 text-sm">
          <Repeat2 className="h-4 w-4 mr-1" />
          Repost
        </button>
        <button className="flex items-center justify-center p-2 rounded-md hover:bg-gray-100 text-gray-500 text-sm">
          <Send className="h-4 w-4 mr-1" />
          Send
        </button>
      </div>
    </div>
  )
}
