"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"

const steps = [
  {
    id: 1,
    title: "What is your product/service?",
    description: "Describe what you offer to your customers.",
    placeholder: "Example: AI-powered medical billing software",
    type: "textarea",
  },
  {
    id: 2,
    title: "Who are your ideal customers?",
    description: "Describe your target audience.",
    placeholder: "Example: Independent medical practices with 1-5 doctors",
    type: "textarea",
  },
  {
    id: 3,
    title: "What problem do you solve?",
    description: "Explain the main pain point your product addresses.",
    placeholder: "Example: Reducing claim rejections and payment delays",
    type: "textarea",
  },
  {
    id: 4,
    title: "What's your unique style?",
    description: "How would you describe your brand voice?",
    placeholder: "Example: Professional with occasional humor",
    type: "textarea",
  },
  {
    id: 5,
    title: "Where do you want to post?",
    description: "Select the platforms you want to create content for.",
    type: "checkbox",
    options: [
      { id: "linkedin", label: "LinkedIn" },
      { id: "blog", label: "Blog" },
      { id: "instagram", label: "Instagram" },
      { id: "youtube", label: "YouTube" },
      { id: "twitter", label: "Twitter" },
    ],
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({
    platforms: [],
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    setIsLoading(true)

    // Simulate saving data
    setTimeout(() => {
      setIsLoading(false)
      router.push("/app/dashboard")
    }, 2000)
  }

  const handleInputChange = (value: string) => {
    setAnswers({
      ...answers,
      [steps[currentStep].id]: value,
    })
  }

  const handleCheckboxChange = (id: string, checked: boolean) => {
    const platforms = [...(answers.platforms || [])]

    if (checked) {
      platforms.push(id)
    } else {
      const index = platforms.indexOf(id)
      if (index > -1) {
        platforms.splice(index, 1)
      }
    }

    setAnswers({
      ...answers,
      platforms,
    })
  }

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="pt-6">
          <div className="mb-8">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>
                Step {currentStep + 1} of {steps.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
              <p className="text-muted-foreground">{currentStepData.description}</p>
            </div>

            {currentStepData.type === "textarea" && (
              <div className="space-y-2">
                <Textarea
                  placeholder={currentStepData.placeholder}
                  className="min-h-[120px]"
                  value={answers[currentStepData.id] || ""}
                  onChange={(e) => handleInputChange(e.target.value)}
                />
              </div>
            )}

            {currentStepData.type === "checkbox" && (
              <div className="space-y-4">
                {currentStepData.options?.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={answers.platforms.includes(option.id)}
                      onCheckedChange={(checked) => handleCheckboxChange(option.id, checked as boolean)}
                    />
                    <Label htmlFor={option.id}>{option.label}</Label>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={
                  (currentStepData.type === "textarea" && !answers[currentStepData.id]) ||
                  (currentStepData.type === "checkbox" && answers.platforms.length === 0) ||
                  isLoading
                }
              >
                {currentStep === steps.length - 1 ? (
                  isLoading ? (
                    "Creating your profile..."
                  ) : (
                    <>
                      Complete <Check className="ml-2 h-4 w-4" />
                    </>
                  )
                ) : (
                  <>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
