"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Loader2, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function ProcessingStatus() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  // DARA 5-step process
  const steps = [
    { name: "Foundational Research", description: "Analyzing market context and landscape" },
    { name: "Audience Segmentation", description: "Identifying demographic and psychographic patterns" },
    { name: "Persona Generation", description: "Creating synthetic audience models" },
    { name: "Simulated Inquiry", description: "Testing personas against real-world scenarios" },
    { name: "Strategic Synthesis", description: "Generating actionable recommendations" },
  ]

  useEffect(() => {
    const sessionId = window.location.pathname.split('/')[2]
    let pollCount = 0
    const maxPolls = 60 // 2 minutes max

    const pollResearch = setInterval(async () => {
      pollCount++
      
      try {
        const response = await fetch(`/api/research?sessionId=${sessionId}`)
        const data = await response.json()
        
        if (data.artifact && data.artifact.status === 'complete') {
          clearInterval(pollResearch)
          
          // Save to localStorage
          const stored = localStorage.getItem('research_artifacts') || '{}'
          const artifacts = JSON.parse(stored)
          artifacts[sessionId] = {
            id: sessionId,
            topic: data.artifact.metadata?.topic || 'Research',
            date: new Date().toISOString(),
            versions: 1,
            artifact: data.artifact
          }
          localStorage.setItem('research_artifacts', JSON.stringify(artifacts))
          
          router.push(`/research/${sessionId}`)
        } else {
          // Update progress based on completed modules
          const completed = data.artifact?.modules?.filter((m: any) => m.status === 'complete').length || 0
          setProgress((completed / 5) * 100)
          setCurrentStep(Math.min(completed, 4))
        }
      } catch (error) {
        console.error('Poll error:', error)
      }
      
      if (pollCount >= maxPolls) {
        clearInterval(pollResearch)
        alert('Research timed out. Please try again.')
        router.push('/dashboard')
      }
    }, 2000) // Poll every 2 seconds

    return () => clearInterval(pollResearch)
  }, [router])

  const estimatedTimeRemaining = Math.max(0, Math.ceil(((100 - progress) / 100) * 15)) // ~15 seconds total

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="bg-card border-border p-8 max-w-2xl w-full">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <h2 className="text-2xl font-bold">Research in Progress</h2>
            <p className="text-muted-foreground">DARA is running 5-step audience synthesis on your research topic</p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-muted-foreground flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />~{estimatedTimeRemaining}s remaining
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Steps List */}
          <div className="space-y-3">
            {steps.map((step, index) => {
              const isComplete = index < currentStep
              const isCurrent = index === currentStep
              const isPending = index > currentStep

              return (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-4 rounded-lg transition-colors ${
                    isCurrent ? "bg-primary/5 border border-primary/20" : "bg-muted/30"
                  }`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {isComplete ? (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    ) : isCurrent ? (
                      <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium ${
                        isComplete || isCurrent ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.name}
                    </p>
                    {isCurrent && <p className="text-xs text-muted-foreground mt-1">{step.description}</p>}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Cancel Button */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 bg-transparent" asChild>
              <Link href="/dashboard">Return to Dashboard</Link>
            </Button>
            <Button variant="ghost" className="flex-1" disabled>
              Cancel Research
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
