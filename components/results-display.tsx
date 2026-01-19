"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, RotateCcw, ChevronDown, ChevronUp } from "lucide-react"
import type { ResearchMode } from "./dashboard"

interface ResultsDisplayProps {
  mode: ResearchMode
  onNewResearch: () => void
}

export function ResultsDisplay({ mode, onNewResearch }: ResultsDisplayProps) {
  const [showFullReport, setShowFullReport] = useState(false)

  const handleDownload = (format: "pdf" | "markdown") => {
    console.log(`Downloading ${format}`)
    // In production, this would trigger actual file download
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Research Complete</CardTitle>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => handleDownload("markdown")}>
                  <FileText className="w-4 h-4 mr-2" />
                  Markdown
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDownload("pdf")}>
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Results Tabs */}
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="summary">Executive Summary</TabsTrigger>
            <TabsTrigger value="full">Full Report</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Executive Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    Your research identified 4 distinct audience segments in the Eastern North Carolina coastal market.
                    Each segment demonstrates unique purchasing behaviors and preferences that will inform your
                    franchise expansion strategy.
                  </p>

                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Key Findings</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      <strong className="text-foreground">Coastal Professionals (35%):</strong> High-income remote
                      workers seeking premium coffee experiences
                    </li>
                    <li>
                      <strong className="text-foreground">Tourist Demographics (30%):</strong> Seasonal visitors
                      prioritizing convenience and speed
                    </li>
                    <li>
                      <strong className="text-foreground">Local Families (25%):</strong> Community-focused regulars
                      valuing consistency and value
                    </li>
                    <li>
                      <strong className="text-foreground">College Students (10%):</strong> Price-sensitive demographic
                      seeking social spaces
                    </li>
                  </ul>

                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Strategic Recommendations</h3>
                  <ol className="space-y-2 text-muted-foreground">
                    <li>Prioritize locations in Wilmington and Outer Banks for initial franchise expansion</li>
                    <li>Develop seasonal menu adaptations to capture tourist traffic</li>
                    <li>Implement loyalty program targeting Local Families segment</li>
                    <li>Consider co-working space integration for Coastal Professionals</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="full" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Full Research Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Module 1 */}
                <div className="space-y-3 border-b border-border pb-6">
                  <h3 className="text-lg font-semibold text-primary">Module 1: Foundational Research</h3>
                  <div className="prose prose-invert max-w-none text-sm">
                    <p className="text-muted-foreground leading-relaxed">
                      Comprehensive market analysis of the Eastern North Carolina coastal region reveals a growing
                      coffee culture driven by increased remote work adoption and tourism growth. The market has shown
                      12% year-over-year growth in specialty coffee consumption since 2022.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-2">
                      Key demographic shifts include an aging population of affluent retirees and an influx of younger
                      remote workers seeking coastal lifestyle. This creates dual market opportunities for both premium
                      and convenience-focused offerings.
                    </p>
                  </div>
                </div>

                {/* Module 2 */}
                <div className="space-y-3 border-b border-border pb-6">
                  <h3 className="text-lg font-semibold text-primary">Module 2: Audience Segmentation</h3>
                  <div className="prose prose-invert max-w-none text-sm">
                    <p className="text-muted-foreground leading-relaxed">
                      Segmentation analysis identified four primary customer personas with distinct behaviors,
                      preferences, and value drivers. Each segment requires tailored marketing and product strategies.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-muted/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">Coastal Professionals</h4>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>Age: 28-45</li>
                          <li>Income: $80k-150k</li>
                          <li>Visit frequency: 4-5x/week</li>
                          <li>Avg. spend: $6-8 per visit</li>
                        </ul>
                      </div>
                      <div className="bg-muted/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">Tourist Demographics</h4>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>Age: 25-65</li>
                          <li>Seasonal: Peak May-Sept</li>
                          <li>Visit frequency: 1-2x/trip</li>
                          <li>Avg. spend: $10-15 per visit</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional modules would continue here */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-primary">Module 3: Persona Generation</h3>
                  <p className="text-sm text-muted-foreground">Detailed persona profiles with behavioral patterns...</p>
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => setShowFullReport(!showFullReport)}
                >
                  {showFullReport ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-2" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-2" />
                      Show All Modules
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="flex gap-4">
          <Button className="flex-1" onClick={onNewResearch}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Start New Research
          </Button>
        </div>
      </div>
    </div>
  )
}
