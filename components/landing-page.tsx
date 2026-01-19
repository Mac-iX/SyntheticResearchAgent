"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExplainerModal } from "@/components/explainer-modal"
import { Brain, Sparkles, Database, ArrowRight } from "lucide-react"
import Link from "next/link"

export function LandingPage() {
  const [showExplainer, setShowExplainer] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">Quality Creative Consulting</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition">
              How It Works
            </Link>
            <Button size="sm" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section with gradient */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background" />
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance text-foreground">
              You are here for <span className="text-primary">deep research</span>.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
              DARA & DIDI deliver professional-grade audience insights through synthetic data modeling.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="text-base px-8" asChild>
                <Link href="/dashboard">
                  Start Research <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 bg-transparent"
                onClick={() => setShowExplainer(true)}
              >
                See How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Updated for DARA, DIDI, Memory Protocol */}
      <section id="features" className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* DARA Card */}
          <Card className="bg-card border-border hover:border-primary transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">DARA</CardTitle>
              <CardDescription className="text-base">5-step audience synthesis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Foundational research, segmentation, persona generation, simulated inquiry, and strategic synthesis.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Foundational Research</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Audience Segmentation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Persona Generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Simulated Inquiry</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Strategic Synthesis</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DIDI Card */}
          <Card className="bg-card border-border hover:border-secondary transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle className="text-2xl">DIDI</CardTitle>
              <CardDescription className="text-base">10 enhancement modules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Deep Impact Data Illumination validates and enhances DARA findings with specialized analysis modules.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-secondary" />
                  <span>Quality Review</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-secondary" />
                  <span>Signal Detection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-secondary" />
                  <span>Intelligence</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-secondary" />
                  <span>Interpretation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-secondary" />
                  <span>Synthesis</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-secondary" />
                  <span>Looping</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Memory Protocol Card */}
          <Card className="bg-card border-border hover:border-accent transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-2xl">Memory Protocol</CardTitle>
              <CardDescription className="text-base">Iterative research artifacts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Track research evolution through versioned artifacts. Each DIDI enhancement creates a new version.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>Version history</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>Research lineage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>Export at any stage</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">How It Works</h2>

          <div className="grid md:grid-cols-4 gap-6 text-left">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-bold text-foreground">Enter your topic</h3>
              <p className="text-sm text-muted-foreground">Describe your business or research focus</p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-bold text-foreground">DARA generates personas</h3>
              <p className="text-sm text-muted-foreground">5-step synthesis creates audience models</p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-bold text-foreground">Enhance with DIDI</h3>
              <p className="text-sm text-muted-foreground">Run validation and enhancement modules</p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">
                4
              </div>
              <h3 className="font-bold text-foreground">Export your research</h3>
              <p className="text-sm text-muted-foreground">Download as PDF or view detailed insights</p>
            </div>
          </div>

          <Button size="lg" asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-24 bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; 2026 Quality Creative Consulting, LLC</p>
            <nav className="flex items-center gap-6">
              <Link href="/legal/terms" className="hover:text-foreground transition">
                Terms
              </Link>
              <Link href="/legal/privacy" className="hover:text-foreground transition">
                Privacy
              </Link>
              <Link href="/legal/ethical-use" className="hover:text-foreground transition">
                Ethical Use
              </Link>
            </nav>
          </div>
        </div>
      </footer>

      {/* Explainer Modal */}
      <ExplainerModal open={showExplainer} onOpenChange={setShowExplainer} />
    </div>
  )
}
