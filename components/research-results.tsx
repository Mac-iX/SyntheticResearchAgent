"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DidiEnhancementModal } from "@/components/didi-enhancement-modal"
import {
  Brain,
  Download,
  Share2,
  Trash2,
  ArrowLeft,
  Sparkles,
  User,
  TrendingUp,
  FileJson,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import Link from "next/link"

interface ResearchResultsProps {
  id: string
}

export function ResearchResults({ id }: ResearchResultsProps) {
  const [showDidiModal, setShowDidiModal] = useState(false)
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [showRawData, setShowRawData] = useState(false)

  // Mock data
  const research = {
    topic: "Coffee shop franchise in Austin, Texas",
    region: "Austin, TX",
    date: "January 15, 2026",
    versions: 1,
  }

  const personas = [
    {
      name: "Tech Professional Taylor",
      age: "28-35",
      occupation: "Software Engineer",
      income: "$90K-130K",
      motivations: "Seeks quality coffee, reliable WiFi, and quiet work environment",
      painPoints: "Frustrated by inconsistent coffee quality and crowded spaces",
    },
    {
      name: "Creative Freelancer Chris",
      age: "25-32",
      occupation: "Graphic Designer",
      income: "$50K-75K",
      motivations: "Values unique atmosphere, community, and Instagram-worthy aesthetics",
      painPoints: "Dislikes corporate chains, seeks authentic local experience",
    },
    {
      name: "Remote Manager Morgan",
      age: "35-45",
      occupation: "Product Manager",
      income: "$110K-150K",
      motivations: "Needs professional meeting space, power outlets, consistent service",
      painPoints: "Limited availability of private spaces for calls and meetings",
    },
  ]

  const didiModules = [
    {
      id: "quality-review",
      name: "Quality Review",
      description: "Validate data quality and identify potential biases",
      icon: "🔍",
      category: "essential",
    },
    {
      id: "signal-detection",
      name: "Signal Detection",
      description: "Identify weak signals and emerging patterns",
      icon: "📡",
      category: "high-value",
    },
    {
      id: "intelligence",
      name: "Intelligence Gathering",
      description: "Deep dive into competitive and market intelligence",
      icon: "🎯",
      category: "high-value",
    },
    {
      id: "interpretation",
      name: "Interpretation",
      description: "Advanced analysis of persona behaviors and motivations",
      icon: "🧠",
      category: "essential",
    },
    {
      id: "synthesis",
      name: "Synthesis",
      description: "Cross-reference insights for strategic clarity",
      icon: "⚡",
      category: "essential",
    },
    {
      id: "looping",
      name: "Looping",
      description: "Iterative refinement through additional research cycles",
      icon: "🔄",
      category: "high-value",
    },
  ]

  const handleRunModule = (moduleId: string, moduleName: string) => {
    setSelectedModule(moduleName)
    setShowDidiModal(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </Button>
              <div>
                <h1 className="text-lg font-bold text-balance">{research.topic}</h1>
                <p className="text-sm text-muted-foreground">
                  {research.date} • Version {research.versions}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Results Area */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="personas">Personas</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
                <TabsTrigger value="raw-data">Raw Data</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Executive Summary</CardTitle>
                    <CardDescription>Key findings from DARA synthesis</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="prose prose-sm max-w-none">
                      <p className="text-muted-foreground leading-relaxed">
                        Analysis of the Austin coffee shop market reveals three distinct audience segments with
                        different needs, preferences, and spending patterns. The tech professional segment
                        (approximately 40% of potential customers) prioritizes workspace functionality, while creative
                        freelancers (30%) value atmosphere and authenticity. Remote managers (30%) require hybrid
                        social-professional spaces.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Market positioning should emphasize reliable WiFi infrastructure, varied seating arrangements,
                        and aesthetic differentiation from corporate chains. Premium pricing ($5-7 per drink) is
                        acceptable when paired with workspace amenities and consistent quality.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Strategic Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        "Prioritize robust WiFi and power outlet infrastructure",
                        "Create distinct zones for solo work, collaboration, and meetings",
                        "Develop visual identity that distances from corporate chain aesthetics",
                        "Implement mobile ordering to reduce wait times for professionals",
                        "Consider membership model for dedicated workspace access",
                      ].map((rec, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-primary">{i + 1}</span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Personas Tab */}
              <TabsContent value="personas" className="space-y-4">
                {personas.map((persona, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5 text-primary" />
                            {persona.name}
                          </CardTitle>
                          <CardDescription className="mt-2">
                            {persona.age} • {persona.occupation} • {persona.income}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Motivations</h4>
                        <p className="text-sm text-muted-foreground">{persona.motivations}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Pain Points</h4>
                        <p className="text-sm text-muted-foreground">{persona.painPoints}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Insights Tab */}
              <TabsContent value="insights" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-secondary" />
                      Key Takeaways
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      {
                        title: "Price Sensitivity",
                        insight: "Target audience accepts premium pricing ($5-7) for quality and amenities",
                      },
                      {
                        title: "Workspace Priority",
                        insight: "70% of potential customers view coffee shop as workspace, not just retail",
                      },
                      {
                        title: "Brand Differentiation",
                        insight: "Strong preference for local authenticity over corporate chain consistency",
                      },
                      {
                        title: "Technology Expectations",
                        insight: "Fast WiFi and mobile ordering are minimum requirements, not differentiators",
                      },
                    ].map((item, i) => (
                      <div key={i} className="border-l-4 border-primary pl-4">
                        <h4 className="font-semibold text-sm">{item.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{item.insight}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Raw Data Tab */}
              <TabsContent value="raw-data">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <FileJson className="w-5 h-5" />
                          Full Artifact JSON
                        </CardTitle>
                        <CardDescription>Complete research data structure</CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowRawData(!showRawData)}
                        className="bg-transparent"
                      >
                        {showRawData ? (
                          <>
                            <ChevronUp className="w-4 h-4 mr-2" />
                            Collapse
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4 mr-2" />
                            Expand
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  {showRawData && (
                    <CardContent>
                      <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto font-mono">
                        {JSON.stringify(
                          {
                            id: id,
                            topic: research.topic,
                            region: research.region,
                            personas: personas,
                            metadata: {
                              created: research.date,
                              version: research.versions,
                              modules_run: ["DARA-1", "DARA-2", "DARA-3", "DARA-4", "DARA-5"],
                            },
                          },
                          null,
                          2,
                        )}
                      </pre>
                    </CardContent>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* DIDI Enhancement Sidebar */}
          <div className="space-y-6">
            <Card className="border-secondary/20 bg-secondary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  Enhance with DIDI
                </CardTitle>
                <CardDescription>Run validation and enhancement modules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {didiModules.map((module) => (
                  <Card key={module.id} className="border-border hover:border-secondary transition-colors">
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-2">
                            <span className="text-2xl">{module.icon}</span>
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm">{module.name}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{module.description}</p>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full bg-transparent"
                          onClick={() => handleRunModule(module.id, module.name)}
                        >
                          Run Module
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Version History */}
            <Card>
              <CardHeader>
                <CardTitle>Version History</CardTitle>
                <CardDescription>Research evolution timeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Brain className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">Initial DARA Research</p>
                      <p className="text-xs text-muted-foreground">January 15, 2026 • v1.0</p>
                      <Badge variant="secondary" className="mt-1">
                        Current
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* DIDI Enhancement Modal */}
      <DidiEnhancementModal
        open={showDidiModal}
        onOpenChange={setShowDidiModal}
        moduleName={selectedModule || ""}
        researchId={id}
      />
    </div>
  )
}
