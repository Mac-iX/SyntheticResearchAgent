"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, User, Menu, X, Plus, FolderOpen, Settings, Sparkles, FileText } from "lucide-react"
import Link from "next/link"
import { ExplainerModal } from "@/components/explainer-modal"

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showExplainer, setShowExplainer] = useState(false)

  // Load real artifacts from localStorage
  const [recentArtifacts, setRecentArtifacts] = useState<any[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('research_artifacts')
    if (stored) {
      const artifacts = JSON.parse(stored)
      setRecentArtifacts(Object.values(artifacts).slice(0, 3))
    }
  }, [])

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative z-40 w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-200 h-screen overflow-y-auto`}
      >
        <div className="p-6 space-y-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold">QCC</span>
          </Link>

          {/* Navigation */}
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/research/new">
                <Plus className="w-4 h-4 mr-2" />
                New Research
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/artifacts">
                <FolderOpen className="w-4 h-4 mr-2" />
                My Artifacts
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/settings">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
            </Button>
          </nav>

          {/* User Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-sidebar-border bg-sidebar">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">User Name</p>
                <p className="text-xs text-muted-foreground">Free Plan</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <header className="md:hidden border-b border-border bg-white sticky top-0 z-30 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </header>

        <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Welcome back, User</h1>
            <p className="text-muted-foreground">Start a new research project or continue where you left off.</p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-primary/20 hover:border-primary transition-colors cursor-pointer" asChild>
              <Link href="/research/new">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Start DARA Research</CardTitle>
                  <CardDescription>Generate audience insights through synthetic data modeling</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    New Research
                  </Button>
                </CardContent>
              </Link>
            </Card>

            <Card className="border-border hover:border-muted-foreground transition-colors cursor-pointer" asChild>
              <Link href="/artifacts">
                <CardHeader>
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-2">
                    <FolderOpen className="w-6 h-6 text-foreground" />
                  </div>
                  <CardTitle>View Past Research</CardTitle>
                  <CardDescription>Access your research artifacts and version history</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    Browse Artifacts
                  </Button>
                </CardContent>
              </Link>
            </Card>
          </div>

          {/* Recent Artifacts */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recent Artifacts</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/artifacts">View All</Link>
              </Button>
            </div>

            <div className="space-y-3">
              {recentArtifacts.map((artifact) => (
                <Card key={artifact.id} className="hover:border-primary/50 transition-colors cursor-pointer" asChild>
                  <Link href={`/research/${artifact.id}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-base">{artifact.topic}</CardTitle>
                          <CardDescription className="flex items-center gap-4 mt-1">
                            <span>{artifact.date}</span>
                            <span className="flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              {artifact.versions} {artifact.versions === 1 ? "version" : "versions"}
                            </span>
                          </CardDescription>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </CardHeader>
                  </Link>
                </Card>
              ))}
            </div>
          </div>

          {/* Help Card */}
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardHeader>
              <CardTitle>New to DARA & DIDI?</CardTitle>
              <CardDescription>Learn how our research platform works</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" onClick={() => setShowExplainer(true)}>
                Learn How It Works
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Explainer Modal */}
      <ExplainerModal open={showExplainer} onOpenChange={setShowExplainer} />
    </div>
  )
}
