export type ResearchMode = "dara" | "didi" | "dd10" | "custom" | null;

export interface ResearchArtifact {
  id: string;
  metadata: {
    topic: string;
    region: string;
    mode: string;
    timestamp: string;
    notes?: string;
  };
  results: Record<string, string>;
  versions: number;
}

export interface ResearchHistory {
  id: string;
  timestamp: string;
  mode: ResearchMode;
  artifact: ResearchArtifact;
}
