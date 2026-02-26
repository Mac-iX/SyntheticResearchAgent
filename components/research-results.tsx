"use client"

import { useState, useEffect } from "react"
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
  const [artifact, setArtifact] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load artifact from localStorage
    const stored = localStorage.getItem('research_artifacts')
    if (stored) {
      const artifacts = JSON.parse(stored)
      if (artifacts[id]) {
        setArtifact(artifacts[id].artifact)
      }
    }
    setLoading(false)
  }, [id])

  const handleDownload = (format: 'json' | 'md') => {
    if (!artifact) return
    
    const content = format === 'json' 
      ? JSON.stringify(artifact, null, 2)
      : generateMarkdown(artifact)
    
    const blob = new Blob([content], { type: format === 'json' ? 'application/json' : 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `research-${id}.${format}`
    a.click()
  }

  const generateMarkdown = (artifact: any) => {
    let md = `# ${artifact.metadata?.topic || 'Research Report'}\n\n`
    md += `**Date:** ${new Date(artifact.metadata?.timestamp || Date.now()).toLocaleDateString()}\n\n`
    
    artifact.modules?.forEach((module: any) => {
      md += `## ${module.name}\n\n`
      md += `${module.output || 'No output'}\n\n`
    })
    
    return md
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!artifact) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <CardHeader>
            <CardTitle>Research Not Found</CardTitle>
            <CardDescription>This research session does not exist or has been deleted.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/dashboard">Return to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
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
                <h1 className="text-lg font-bold">{artifact.metadata?.topic || 'Research Results'}</h1>
                <p className="text-sm text-muted-foreground">
                  {new Date(artifact.metadata?.timestamp || Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => handleDownload('md')}>
                <Download className="w-4 h-4 mr-2" />
                Markdown
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDownload('json')}>
                <FileJson className="w-4 h-4 mr-2" />
                JSON
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>DARA Research Results</CardTitle>
                    <CardDescription>5-step audience synthesis complete</CardDescription>
                  </div>
                  <Badge variant="secondary">Version {artifact.version || 1}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {artifact.modules?.map((module: any, index: number) => (
                  <div key={index} className="border-b pb-6 last:border-0">
                    <h3 className="text-lg font-semibold mb-2">{module.name}</h3>
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap bg-muted p-4 rounded text-sm">
                        {module.output || 'No output'}
                      </pre>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Raw Data */}
            <Card>
              <CardHeader>
                <Button
                  variant="ghost"
                  className="w-full justify-between"
                  onClick={() => setShowRawData(!showRawData)}
                >
                  <span className="font-semibold">Raw Research Data</span>
                  {showRawData ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </CardHeader>
              {showRawData && (
                <CardContent>
                  <pre className="bg-muted p-4 rounded text-xs overflow-auto max-h-96">
                    {JSON.stringify(artifact, null, 2)}
                  </pre>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Enhance with DIDI</CardTitle>
                <CardDescription className="text-sm">Run additional analysis modules</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setShowDidiModal(true)}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Start Enhancement
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Research Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <Badge className="ml-2" variant="secondary">{artifact.status || 'complete'}</Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Modules:</span>
                  <span className="ml-2 font-medium">{artifact.modules?.length || 0} completed</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Version:</span>
                  <span className="ml-2 font-medium">{artifact.version || 1}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <DidiEnhancementModal
        open={showDidiModal}
        onClose={() => setShowDidiModal(false)}
        onSelectModule={(module) => {
          setSelectedModule(module)
          setShowDidiModal(false)
        }}
      />
    </div>
  )
}
