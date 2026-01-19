"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

interface DidiEnhancementModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  moduleName: string
  researchId: string
}

export function DidiEnhancementModal({ open, onOpenChange, moduleName, researchId }: DidiEnhancementModalProps) {
  const router = useRouter()
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = async () => {
    setIsRunning(true)
    // Simulate processing
    setTimeout(() => {
      setIsRunning(false)
      onOpenChange(false)
      // Show success message and refresh
      router.refresh()
    }, 3000)
  }

  const moduleDescriptions: Record<string, string> = {
    "Quality Review":
      "Validates data quality, identifies potential biases, and assesses confidence levels in persona generation and insights.",
    "Signal Detection":
      "Identifies weak signals and emerging patterns that may indicate future trends or opportunities in your audience data.",
    "Intelligence Gathering":
      "Conducts deep dive into competitive intelligence, market dynamics, and strategic positioning relative to your audience.",
    Interpretation: "Provides advanced analysis of persona behaviors, motivations, and decision-making frameworks.",
    Synthesis:
      "Cross-references insights across all personas to identify patterns, contradictions, and strategic opportunities.",
    Looping: "Initiates additional research cycles to refine and deepen findings through iterative inquiry.",
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="w-5 h-5 text-secondary" />
            {moduleName}
          </DialogTitle>
          <DialogDescription className="text-base pt-2 leading-relaxed">
            {moduleDescriptions[moduleName] || "Enhance your research with this DIDI module."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Cost & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Estimated Cost</p>
              <p className="text-2xl font-bold">$0.02</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Estimated Time</p>
              <p className="text-2xl font-bold">2 min</p>
            </div>
          </div>

          {/* Info */}
          <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              This enhancement will append results to your artifact and create a new version. Your current version will
              remain accessible in version history.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => onOpenChange(false)}
              disabled={isRunning}
            >
              Cancel
            </Button>
            <Button className="flex-1 bg-secondary hover:bg-secondary/90" onClick={handleRun} disabled={isRunning}>
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Running...
                </>
              ) : (
                <>Run Enhancement</>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
