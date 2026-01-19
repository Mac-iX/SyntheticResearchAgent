"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Brain, Sparkles, ArrowRight } from "lucide-react"

interface ExplainerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExplainerModal({ open, onOpenChange }: ExplainerModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">How DARA & DIDI Work</DialogTitle>
          <DialogDescription className="text-base leading-relaxed pt-2">
            Professional-grade audience insights through synthetic data modeling and iterative enhancement.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Visual Workflow Diagram */}
          <div className="bg-muted/30 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <p className="text-sm font-medium">Enter Topic</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1 text-center">
                <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center mb-2">
                  <Brain className="w-8 h-8 text-primary-foreground" />
                </div>
                <p className="text-sm font-medium">DARA Synthesis</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1 text-center">
                <div className="w-16 h-16 mx-auto bg-secondary rounded-full flex items-center justify-center mb-2">
                  <Sparkles className="w-8 h-8 text-secondary-foreground" />
                </div>
                <p className="text-sm font-medium">DIDI Enhancement</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1 text-center">
                <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-accent">✓</span>
                </div>
                <p className="text-sm font-medium">Export</p>
              </div>
            </div>
          </div>

          {/* DARA Explanation */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">DARA: Deep Audience Research & Analysis</h3>
            </div>
            <ul className="space-y-2 pl-13 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Foundational research identifies market context and audience landscape</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Audience segmentation breaks down demographics and psychographics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Persona generation creates detailed synthetic audience models</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Simulated inquiry tests personas against real-world scenarios</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Strategic synthesis delivers actionable recommendations</span>
              </li>
            </ul>
          </div>

          {/* DIDI Explanation */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="text-xl font-bold">DIDI: Deep Impact Data Illumination</h3>
            </div>
            <p className="pl-13 text-muted-foreground">
              Optional enhancement modules that validate and deepen DARA findings. Run individually or in sequence to
              refine your research.
            </p>
            <div className="pl-13 grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span>Quality Review</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span>Signal Detection</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span>Intelligence Gathering</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span>Interpretation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span>Synthesis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span>Looping</span>
              </div>
            </div>
          </div>

          {/* Key Points */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-2">
            <p className="font-bold text-foreground">You aim to utilize synthetic data for strategic advantage.</p>
            <p className="text-sm text-muted-foreground">
              This research will segment your audience into actionable personas validated through simulated inquiry and
              optional deep enhancement.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
