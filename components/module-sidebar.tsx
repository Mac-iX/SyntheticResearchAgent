"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Target, Settings2, History } from "lucide-react"
import type { ResearchMode } from "./dashboard"

interface ModuleSidebarProps {
  selectedMode: ResearchMode
  onSelectMode: (mode: ResearchMode) => void
}

export function ModuleSidebar({ selectedMode, onSelectMode }: ModuleSidebarProps) {
  const modules = [
    {
      id: "dd10" as const,
      icon: Brain,
      title: "DD10",
      subtitle: "Deep Research",
      description: "11-module due diligence with evidence-based analysis",
      color: "primary",
    },
    {
      id: "dara" as const,
      icon: Target,
      title: "DARA",
      subtitle: "Audience Intel",
      description: "5-step research with synthetic data simulation",
      color: "accent",
    },
    {
      id: "custom" as const,
      icon: Settings2,
      title: "Custom",
      subtitle: "Your Workflow",
      description: "Mix DD10 and DARA modules to fit your exact needs",
      color: "muted",
    },
  ]

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-1">
        <h2 className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">Modules</h2>
      </div>

      <div className="space-y-3">
        {modules.map((module) => {
          const Icon = module.icon
          const isSelected = selectedMode === module.id
          return (
            <Card
              key={module.id}
              className={`cursor-pointer transition-all ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-sidebar-border hover:border-sidebar-border/80 hover:bg-sidebar-accent"
              }`}
              onClick={() => onSelectMode(module.id)}
            >
              <CardHeader className="pb-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${
                    module.color === "primary"
                      ? "bg-primary/10"
                      : module.color === "accent"
                        ? "bg-accent/10"
                        : "bg-sidebar-foreground/10"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      module.color === "primary"
                        ? "text-primary"
                        : module.color === "accent"
                          ? "text-accent"
                          : "text-sidebar-foreground"
                    }`}
                  />
                </div>
                <CardTitle className="text-lg">{module.title}</CardTitle>
                <CardDescription className="text-sm">{module.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-xs text-sidebar-foreground/70 leading-relaxed mb-3">{module.description}</p>
                <Button
                  size="sm"
                  variant={isSelected ? "default" : "outline"}
                  className="w-full text-xs"
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectMode(module.id)
                  }}
                >
                  {isSelected ? "Selected" : `Select ${module.title}`}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* History Section */}
      <div className="pt-4 border-t border-sidebar-border">
        <Card className="border-sidebar-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-sidebar-foreground/70" />
              <CardTitle className="text-sm">History</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-sidebar-foreground/60">No recent research sessions</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
