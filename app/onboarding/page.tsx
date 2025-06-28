"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, testDatabaseConnection } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, CheckCircle } from 'lucide-react'

const questions = [
  {
    id: 1,
    question: "What's your primary social media platform?",
    type: "select",
    options: ["LinkedIn", "Twitter/X", "Instagram", "Facebook", "YouTube", "TikTok", "Other"]
  },
  {
    id: 2,
    question: "What type of content do you create?",
    type: "select",
    options: ["Business/Professional", "Personal Brand", "Educational", "Entertainment", "News/Media", "Other"]
  },
  {
    id: 3,
    question: "How often do you post content?",
    type: "select",
    options: ["Daily", "2-3 times per week", "Weekly", "Monthly", "Occasionally"]
  },
  {
    id: 4,
    question: "What's your main goal with social media?",
    type: "textarea",
    placeholder: "e.g., Build my personal brand, generate leads, share knowledge..."
  },
  {
    id: 5,
    question: "What's your biggest challenge with content creation?",
    type: "textarea",
    placeholder: "e.g., Finding time to create content, coming up with ideas, maintaining consistency..."
  }
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)

  // Test database connection on component mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('Testing Supabase connection...')
        const result = await testDatabaseConnection()
        console.log('Database connection test result:', result)
        
        // Check if user has already completed onboarding
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          try {
            const { data: onboarding } = await supabase
              .from('onboarding')
              .select('completed')
              .eq('user_id', user.id)
              .single()
            
            if (onboarding?.completed) {
              console.log('User has already completed onboarding, redirecting to dashboard')
              router.push('/dashboard')
            }
          } catch (error) {
            console.log('No onboarding data found, user needs to complete onboarding')
          }
        }
      } catch (err) {
        console.error('Database connection test error:', err)
      }
    }
    
    testConnection()
  }, [router])

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    try {
      console.log('Starting onboarding submission...')
      
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError) {
        console.error('User error:', userError)
        setError('Authentication error: ' + userError.message)
        setIsLoading(false)
        return
      }
      
      if (!user) {
        console.error('No user found')
        setError('User not found. Please sign in again.')
        setIsLoading(false)
        return
      }

      console.log('User ID:', user.id)
      console.log('Answers:', answers)

      // Check if all questions are answered
      const unansweredQuestions = questions.filter(q => !answers[q.id])
      if (unansweredQuestions.length > 0) {
        console.error('Unanswered questions:', unansweredQuestions)
        setError('Please answer all questions before proceeding.')
        setIsLoading(false)
        return
      }

      const onboardingData = {
        user_id: user.id,
        question1: answers[1] || '',
        question2: answers[2] || '',
        question3: answers[3] || '',
        question4: answers[4] || '',
        question5: answers[5] || '',
        completed: true
      }

      console.log('Saving onboarding data:', onboardingData)

      // Try different approaches to save data
      let saveResult = null
      let saveError = null

      // Approach 1: Try upsert
      try {
        const { data, error } = await supabase
          .from('onboarding')
          .upsert(onboardingData, { onConflict: 'user_id' })
        
        saveResult = data
        saveError = error
        console.log('Upsert result:', { data, error })
      } catch (err) {
        console.error('Upsert failed:', err)
        saveError = err
      }

      // Approach 2: If upsert fails, try insert
      if (saveError) {
        try {
          console.log('Trying insert instead...')
          const { data, error } = await supabase
            .from('onboarding')
            .insert(onboardingData)
          
          saveResult = data
          saveError = error
          console.log('Insert result:', { data, error })
        } catch (err) {
          console.error('Insert failed:', err)
          saveError = err
        }
      }

      if (saveError) {
        console.error('All save attempts failed:', saveError)
        const errorMessage = saveError instanceof Error ? saveError.message : String(saveError)
        setError('Failed to save onboarding data: ' + errorMessage)
        setIsLoading(false)
        return
      }

      console.log('Onboarding saved successfully!')
      setIsCompleted(true)
      
      // Remove the timeout and redirect immediately
      router.push('/dashboard')
    } catch (error) {
      console.error('Onboarding submit error:', error)
      setError('An unexpected error occurred: ' + (error instanceof Error ? error.message : 'Unknown error'))
      setIsLoading(false)
    }
  }

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <CardTitle className="text-2xl font-bold">Onboarding Complete!</CardTitle>
            <CardDescription>
              Thank you for completing the onboarding. Redirecting to your dashboard...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome! Let's get to know you</CardTitle>
          <CardDescription className="text-center">
            Please answer a few questions to personalize your experience
          </CardDescription>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{currentQ.question}</h3>
            {currentQ.type === 'select' ? (
              <Select 
                value={answers[currentQ.id] || ''} 
                onValueChange={(value) => handleAnswer(currentQ.id, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {currentQ.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Textarea
                placeholder={currentQ.placeholder}
                value={answers[currentQ.id] || ''}
                onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                rows={4}
              />
            )}
          </div>
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentQuestion === 0 || isLoading}
            >
              Back
            </Button>
            <div className="flex gap-2">
              <Button
                onClick={handleNext}
                disabled={!answers[currentQ.id] || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : currentQuestion === questions.length - 1 ? (
                  'Complete Setup'
                ) : (
                  'Next'
                )}
              </Button>
              {currentQuestion === questions.length - 1 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    console.log('Current answers:', answers)
                    console.log('All questions answered:', questions.every(q => answers[q.id]))
                  }}
                >
                  Debug
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
