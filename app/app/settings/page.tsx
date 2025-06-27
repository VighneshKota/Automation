"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import DashboardHeader from "@/components/dashboard-header"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import type { User } from '@supabase/supabase-js'

type AccountSettings = {
  name: string
  email: string
  notifications: {
    email: boolean
    push: boolean
    contentSuggestions: boolean
  }
}

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [contentDna, setContentDna] = useState({
    product: "AI-powered medical billing software",
    audience: "Independent medical practices with 1-5 doctors",
    problem: "Reducing claim rejections and payment delays",
    style: "Professional with occasional humor",
  })

  const [accountSettings, setAccountSettings] = useState<AccountSettings>({
    name: "",
    email: "",
    notifications: {
      email: true,
      push: true,
      contentSuggestions: true,
    },
  })

  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(session.user)
        
        // Get user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        
        setUserProfile(profile)
        
        // Update account settings with real data
        setAccountSettings({
          name: profile?.full_name || "",
          email: session.user.email || "",
          notifications: {
            email: true,
            push: true,
            contentSuggestions: true,
          },
        })
      } else {
        router.push('/auth')
      }
      setIsLoading(false)
    }

    getCurrentUser()
  }, [router])

  const handleContentDnaChange = (field: string, value: string) => {
    setContentDna({
      ...contentDna,
      [field]: value,
    })
  }

  const handleAccountChange = (field: string, value: string | boolean) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      if (parent === "notifications") {
        setAccountSettings(prev => ({
          ...prev,
          notifications: {
            ...prev.notifications,
            [child]: value as boolean,
          },
        }))
      }
    } else {
      setAccountSettings(prev => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const handleSaveContentDna = async () => {
    setIsSaving(true)
    setError(null)
    
    try {
      // Simulate API call for now - you can extend this to save to a content_dna table
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      toast({
        title: "Content DNA saved",
        description: "Your content DNA has been updated successfully.",
      })
    } catch (error) {
      setError('Failed to save content DNA')
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveAccount = async () => {
    setIsSaving(true)
    setError(null)
    
    try {
      if (!user) {
        throw new Error('No user found')
      }

      // Update profile in Supabase
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: accountSettings.name,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

      if (profileError) {
        throw profileError
      }

      // Update user email if changed
      if (accountSettings.email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: accountSettings.email
        })
        
        if (emailError) {
          throw emailError
        }
      }

      toast({
        title: "Account settings saved",
        description: "Your account settings have been updated successfully.",
      })
    } catch (error: any) {
      setError(error.message || 'Failed to save account settings')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 container py-6">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />

      <main className="flex-1 container py-6">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground mb-8">Manage your profile and preferences</p>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="content-dna" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="content-dna">Content DNA</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="content-dna">
            <Card>
              <CardHeader>
                <CardTitle>Content DNA</CardTitle>
                <CardDescription>
                  Your Content DNA helps our AI understand your brand and generate more relevant content.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="product">What is your product/service?</Label>
                  <Textarea
                    id="product"
                    value={contentDna.product}
                    onChange={(e) => handleContentDnaChange("product", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audience">Who are your ideal customers?</Label>
                  <Textarea
                    id="audience"
                    value={contentDna.audience}
                    onChange={(e) => handleContentDnaChange("audience", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="problem">What problem do you solve?</Label>
                  <Textarea
                    id="problem"
                    value={contentDna.problem}
                    onChange={(e) => handleContentDnaChange("problem", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="style">What's your unique style?</Label>
                  <Textarea
                    id="style"
                    value={contentDna.style}
                    onChange={(e) => handleContentDnaChange("style", e.target.value)}
                  />
                </div>

                <Button onClick={handleSaveContentDna} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Content DNA"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account details and preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={accountSettings.name}
                    onChange={(e) => handleAccountChange("name", e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={accountSettings.email}
                    onChange={(e) => handleAccountChange("email", e.target.value)}
                    placeholder="Enter your email address"
                  />
                  <p className="text-sm text-muted-foreground">
                    You'll need to verify your email if you change it.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive email updates about your content.</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={accountSettings.notifications.email}
                      onCheckedChange={(checked) => handleAccountChange("notifications.email", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications in your browser.</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={accountSettings.notifications.push}
                      onCheckedChange={(checked) => handleAccountChange("notifications.push", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="content-suggestions">Content Suggestions</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive AI-generated content ideas based on trends.
                      </p>
                    </div>
                    <Switch
                      id="content-suggestions"
                      checked={accountSettings.notifications.contentSuggestions}
                      onCheckedChange={(checked) => handleAccountChange("notifications.contentSuggestions", checked)}
                    />
                  </div>
                </div>

                <Button onClick={handleSaveAccount} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Account Settings"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
