"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import type { ResearchMode } from "./dashboard"
import { Send } from "lucide-react"
import { ProcessingStatus } from "./processing-status"
import { ResultsDisplay } from "./results-display"

interface ChatInterfaceProps {
  selectedMode: ResearchMode
  onSelectMode: (mode: ResearchMode) => void
}

type SessionState = "idle" | "input" | "processing" | "results"

export function ChatInterface({ selectedMode, onSelectMode }: ChatInterfaceProps) {
  const [sessionState, setSessionState] = useState<SessionState>("idle")
  const [messages, setMessages] = useState<Array<{ role: "user" | "agent"; content: string }>>([])

  // Form states
  const [daraForm, setDaraForm] = useState({
    topic: "",
    region: "",
    notes: "",
  })

  const [dd10Form, setDd10Form] = useState({
    topic: "",
    modules: {
      complete: true,
      reasoning: false,
      intelligence: false,
      synthesis: false,
      analysis: false,
      validation: false,
      research: false,
      strategic: false,
      tactical: false,
      operational: false,
      executive: false,
    },
  })

  const handleStartResearch = () => {
    if (!selectedMode) return

    setSessionState("processing")
    setMessages([
      ...messages,
      {
        role: "user",
        content: `Starting ${selectedMode.toUpperCase()} research${selectedMode === "dara" ? ` on ${daraForm.topic} in ${daraForm.region}` : selectedMode === "dd10" ? ` on ${dd10Form.topic}` : ""}`,
      },
    ])

    // Simulate processing
    setTimeout(() => {
      setSessionState("results")
    }, 5000)
  }

  // Idle state - no mode selected
  if (!selectedMode && sessionState === "idle") {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="max-w-md text-center space-y-4">
          <h2 className="text-2xl font-semibold">Ready to research</h2>
          <p className="text-muted-foreground">Select a research mode from the sidebar to get started.</p>
        </div>
      </div>
    )
  }

  // Processing state
  if (sessionState === "processing") {
    return <ProcessingStatus mode={selectedMode!} />
  }

  // Results state
  if (sessionState === "results") {
    return <ResultsDisplay mode={selectedMode!} onNewResearch={() => setSessionState("idle")} />
  }

  // Input state - show form based on selected mode
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Welcome Message */}
        {messages.length === 0 && (
          <Card className="bg-card border-border p-6 max-w-2xl">
            <div className="space-y-2">
              <p className="text-lg font-medium">Agent: Ready to research.</p>
              <p className="text-muted-foreground">What would you like to investigate?</p>
            </div>
          </Card>
        )}

        {/* Messages */}
        {messages.map((message, index) => (
          <Card
            key={index}
            className={`p-4 max-w-2xl ${message.role === "user" ? "ml-auto bg-primary/5 border-primary/20" : "bg-card border-border"}`}
          >
            <p className="text-sm">
              <span className="font-medium">{message.role === "user" ? "You: " : "Agent: "}</span>
              {message.content}
            </p>
          </Card>
        ))}

        {/* Research Form */}
        {selectedMode === "dara" && (
          <Card className="bg-card border-border p-6 max-w-2xl">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">DARA: Audience Research</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dara-topic">Who you are / Business / Topic</Label>
                <Input
                  id="dara-topic"
                  placeholder="Coffee shop owner looking to franchise in coastal regions"
                  value={daraForm.topic}
                  onChange={(e) => setDaraForm({ ...daraForm, topic: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dara-region">Region</Label>
                <Input
                  id="dara-region"
                  placeholder="Eastern North Carolina"
                  value={daraForm.region}
                  onChange={(e) => setDaraForm({ ...daraForm, region: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dara-notes">Additional Notes (optional)</Label>
                <Textarea
                  id="dara-notes"
                  placeholder="Any specific requirements or context..."
                  value={daraForm.notes}
                  onChange={(e) => setDaraForm({ ...daraForm, notes: e.target.value })}
                  rows={3}
                />
              </div>

              <Button className="w-full" onClick={handleStartResearch} disabled={!daraForm.topic || !daraForm.region}>
                Run DARA Research
              </Button>
            </div>
          </Card>
        )}

        {selectedMode === "dd10" && (
          <Card className="bg-card border-border p-6 max-w-2xl">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">DD10: Deep Research</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dd10-topic">Research Topic</Label>
                <Input
                  id="dd10-topic"
                  placeholder="AI in healthcare diagnostics"
                  value={dd10Form.topic}
                  onChange={(e) => setDd10Form({ ...dd10Form, topic: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <Label>Modules to Run</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="module-complete"
                      checked={dd10Form.modules.complete}
                      onCheckedChange={(checked) =>
                        setDd10Form({
                          ...dd10Form,
                          modules: { ...dd10Form.modules, complete: checked as boolean },
                        })
                      }
                    />
                    <Label htmlFor="module-complete" className="font-medium">
                      Complete Deep Research Agent (All-in-One)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="module-reasoning"
                      checked={dd10Form.modules.reasoning}
                      onCheckedChange={(checked) =>
                        setDd10Form({
                          ...dd10Form,
                          modules: { ...dd10Form.modules, reasoning: checked as boolean },
                        })
                      }
                    />
                    <Label htmlFor="module-reasoning">Deep Reasoning</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="module-intelligence"
                      checked={dd10Form.modules.intelligence}
                      onCheckedChange={(checked) =>
                        setDd10Form({
                          ...dd10Form,
                          modules: { ...dd10Form.modules, intelligence: checked as boolean },
                        })
                      }
                    />
                    <Label htmlFor="module-intelligence">Deep Intelligence</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="module-synthesis"
                      checked={dd10Form.modules.synthesis}
                      onCheckedChange={(checked) =>
                        setDd10Form({
                          ...dd10Form,
                          modules: { ...dd10Form.modules, synthesis: checked as boolean },
                        })
                      }
                    />
                    <Label htmlFor="module-synthesis">Deep Synthesis</Label>
                  </div>
                </div>
              </div>

              <Button className="w-full" onClick={handleStartResearch} disabled={!dd10Form.topic}>
                Run DD10 Research
              </Button>
            </div>
          </Card>
        )}

        {selectedMode === "custom" && (
          <Card className="bg-card border-border p-6 max-w-2xl">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Custom: Build Your Workflow</h3>
                <p className="text-sm text-muted-foreground">
                  Combine modules from DD10 and DARA to create a custom research workflow.
                </p>
              </div>

              <div className="text-center py-8">
                <p className="text-muted-foreground">Custom workflow builder coming soon.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  For now, use DD10 or DARA for complete research workflows.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4">
        <div className="max-w-2xl mx-auto flex gap-2">
          <Input placeholder="Ask a follow-up question..." className="flex-1" disabled={sessionState !== "idle"} />
          <Button size="icon" disabled={sessionState !== "idle"}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
