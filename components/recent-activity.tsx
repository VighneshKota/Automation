import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FileText, Linkedin, Video } from "lucide-react"

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "blog",
      title: "10 Ways AI is Transforming Medical Billing in 2023",
      date: "2 hours ago",
      status: "Published",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: 2,
      type: "linkedin",
      title: "Exciting news about our latest feature release!",
      date: "Yesterday",
      status: "Scheduled",
      icon: <Linkedin className="h-4 w-4" />,
    },
    {
      id: 3,
      type: "video",
      title: "How to reduce claim rejections with AI",
      date: "3 days ago",
      status: "Draft",
      icon: <Video className="h-4 w-4" />,
    },
  ]

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest content creation activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center">
              <div className="mr-4">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/10 text-primary">{activity.icon}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.date}</p>
              </div>
              <div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    activity.status === "Published"
                      ? "bg-green-100 text-green-800"
                      : activity.status === "Scheduled"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {activity.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
