"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Brain, Upload, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function NewResearch() {
  const router = useRouter()
  const [hasExistingData, setHasExistingData] = useState(false)
  const [formData, setFormData] = useState({
    topic: "",
    region: "",
    context: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In real app, this would create a research session
    const mockId = "demo-" + Date.now()
    router.push(`/research/${mockId}/processing`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">New Research</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="space-y-6">
          {/* Intro */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Start DARA Research</h1>
            <p className="text-muted-foreground leading-relaxed">
              Provide your topic and any relevant context. DARA will conduct 5-step audience synthesis to generate
              detailed personas and strategic insights.
            </p>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Research Setup</CardTitle>
              <CardDescription>Describe what you're researching</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Topic */}
                <div className="space-y-2">
                  <Label htmlFor="topic" className="text-base font-medium">
                    Topic / Business *
                  </Label>
                  <Textarea
                    id="topic"
                    placeholder="e.g., Coffee shop franchise in Austin, Texas"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    required
                    className="min-h-24 resize-none"
                  />
                  <p className="text-sm text-muted-foreground">Describe what you're researching</p>
                </div>

                {/* Region */}
                <div className="space-y-2">
                  <Label htmlFor="region" className="text-base font-medium">
                    Region
                  </Label>
                  <Input
                    id="region"
                    type="text"
                    placeholder="e.g., Charlotte, NC"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  />
                  <p className="text-sm text-muted-foreground">Geographic focus (optional)</p>
                </div>

                {/* Additional Context */}
                <div className="space-y-2">
                  <Label htmlFor="context" className="text-base font-medium">
                    Additional Context
                  </Label>
                  <Textarea
                    id="context"
                    placeholder="Any specific questions or constraints?"
                    value={formData.context}
                    onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                    className="min-h-24 resize-none"
                  />
                  <p className="text-sm text-muted-foreground">Optional: Add specific requirements or questions</p>
                </div>

                {/* Existing Data Upload */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="existing-data"
                      checked={hasExistingData}
                      onCheckedChange={(checked) => setHasExistingData(checked as boolean)}
                    />
                    <Label htmlFor="existing-data" className="text-sm font-medium cursor-pointer">
                      I have existing research data to upload
                    </Label>
                  </div>

                  {hasExistingData && (
                    <div className="pl-6 space-y-2">
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm font-medium">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, CSV, or TXT (Max 10MB)</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" asChild className="flex-1 bg-transparent">
                    <Link href="/dashboard">Cancel</Link>
                  </Button>
                  <Button type="submit" className="flex-1" disabled={!formData.topic.trim()}>
                    Start DARA Research
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">What happens next:</strong> DARA will run 5 synthesis modules
                (Foundational Research, Audience Segmentation, Persona Generation, Simulated Inquiry, Strategic
                Synthesis). This typically takes 3-5 minutes. You can then optionally enhance with DIDI modules.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
