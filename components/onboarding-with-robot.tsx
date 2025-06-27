'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { SplineScene } from "@/components/ui/spline"
import { Spotlight } from "@/components/ui/spotlight"

const questions = [
  {
    id: 'question1',
    label: 'What is your primary social media platform?',
    placeholder: 'e.g., LinkedIn, Instagram, YouTube'
  },
  {
    id: 'question2',
    label: 'What type of content do you create most often?',
    placeholder: 'e.g., Blog posts, Videos, Social media posts'
  },
  {
    id: 'question3',
    label: 'What is your target audience?',
    placeholder: 'e.g., Tech professionals, Entrepreneurs, Students'
  },
  {
    id: 'question4',
    label: 'How often do you post content?',
    placeholder: 'e.g., Daily, Weekly, Monthly'
  },
  {
    id: 'question5',
    label: 'What are your main content creation goals?',
    placeholder: 'e.g., Brand awareness, Lead generation, Community building'
  }
]

export default function OnboardingWithRobot() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/auth')
        return
      }
      setUserId(session.user.id)
      
      // Check if onboarding is already completed
      const { data: existingOnboarding } = await supabase
        .from('onboarding')
        .select('*')
        .eq('user_id', session.user.id)
        .single()
      
      if (existingOnboarding?.completed) {
        router.push('/app/dashboard')
      }
    }
    
    checkAuth()
  }, [router])

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      if (!userId) {
        throw new Error('No user ID found')
      }

      console.log('Saving onboarding data for user:', userId)
      console.log('Answers:', answers)

      // First, check if onboarding record already exists
      const { data: existingRecord } = await supabase
        .from('onboarding')
        .select('id')
        .eq('user_id', userId)
        .single()

      let result
      if (existingRecord) {
        // Update existing record
        result = await supabase
          .from('onboarding')
          .update({
            ...answers,
            completed: true,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId)
      } else {
        // Insert new record
        result = await supabase
          .from('onboarding')
          .insert({
            user_id: userId,
            ...answers,
            completed: true
          })
      }

      if (result.error) {
        console.error('Database error:', result.error)
        throw new Error(`Database error: ${result.error.message}`)
      }

      console.log('Onboarding data saved successfully:', result.data)
      
      // Redirect to dashboard
      router.push('/app/dashboard')
    } catch (error: any) {
      console.error('Error saving onboarding data:', error)
      setError(error.message || 'Failed to save onboarding data')
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-background p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Questions Section */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Let's get to know you better</CardTitle>
            <CardDescription className="text-center">
              Step {currentStep + 1} of {questions.length}
            </CardDescription>
            <Progress value={progress} className="h-2 mt-4" />
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-4">
              <Label htmlFor={currentQuestion.id} className="text-lg">
                {currentQuestion.label}
              </Label>
              <Input
                id={currentQuestion.id}
                value={answers[currentQuestion.id as keyof typeof answers]}
                onChange={(e) =>
                  setAnswers((prev) => ({
                    ...prev,
                    [currentQuestion.id]: e.target.value
                  }))
                }
                placeholder={currentQuestion.placeholder}
                className="w-full text-lg py-6"
              />
            </div>

            <div className="flex justify-between pt-4">
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                variant="outline"
                className="w-24"
              >
                Previous
              </Button>
              {currentStep === questions.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !answers[currentQuestion.id as keyof typeof answers]}
                  className="w-24 bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? 'Saving...' : 'Complete'}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!answers[currentQuestion.id as keyof typeof answers]}
                  className="w-24 bg-primary hover:bg-primary/90"
                >
                  Next
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Robot Animation Section */}
        <div className="relative w-full h-[500px]">
          {/* 3D Robot Scene - Clean, no background */}
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  )
} 