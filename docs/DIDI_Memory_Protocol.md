# DIDI Memory Protocol (Adapted from Apex)

**Version:** 1.0
**Author:** Mac & Manus AI

## Core Concept

This protocol adapts the Apex Memory Synthesis framework for the DARA & DIDI ecosystem. It provides a mechanism for creating, storing, and iteratively enhancing research "artifacts"—persistent documents that evolve as the user applies different analytical lenses.

## Rebranding: DIDI is now DIDI

- **Name:** DIDI (Deep Impact Data Illumination)
- **Purpose:** A suite of enhancement modules used to validate, deepen, and extract further insights from a core DARA report.
- **Modules:**
  - Complete Deep Research Agent (pre-research only)
  - Deep Quality Review
  - Deep Signal Detection
  - Deep Reasoning
  - Deep Synthesis

## The Artifact: The Core of DIDI Memory

An "artifact" is a structured JSON object that represents a single research session. It contains the initial DARA report and all subsequent DIDI enhancements.

### Artifact Structure (JSON)

```json
{
  "artifactId": "uuid-v4-string",
  "title": "Research on Coffee Shop Franchising in Eastern NC",
  "createdAt": "2026-01-15T10:30:00Z",
  "daraReport": {
    "version": "1.0",
    "timestamp": "2026-01-15T10:35:00Z",
    "modulesUsed": ["dara_foundational", "dara_segmentation", "dara_persona_generation", "dara_simulated_inquiry", "dara_strategic_synthesis"],
    "content": {
      "summary": "...",
      "segments": [...],
      "personas": [...],
      "simulatedResponses": [...],
      "strategicRecommendations": {...}
    },
    "embedding": [0.123, ...]
  },
  "didiEnhancements": [
    {
      "enhancementId": "uuid-v4-string",
      "version": "1.1",
      "timestamp": "2026-01-15T10:40:00Z",
      "moduleUsed": "didi_quality_review",
      "summary": "Identified two potential biases in persona generation.",
      "content": {
        "findings": [...],
        "recommendations": [...]
      },
      "embedding": [0.456, ...]
    }
  ]
}
```

### Key Changes from Apex

- **No Database Trigger:** Instead of firing on every user entry, this is triggered by explicit user actions (e.g., "Run DIDI Enhancement").
- **Artifact-Level Embeddings:** We generate a vector embedding for the DARA report and each DIDI enhancement. This allows for semantic search across research artifacts (e.g., "Find all research related to franchising").
- **Simplified Schema:** The Zod schema is adapted for research artifacts, not personal memory nodes.

## Backend Implementation (Supabase Edge Function)

This function will be triggered by API calls from the frontend.

### `POST /api/research` (Start New DARA Research)

1. **Input:** `{ topic, region, hasExistingData, runPreResearch }`
2. **Action:**
   - If `runPreResearch`, execute the "Complete Deep Research Agent" prompt.
   - Run the 5-step DARA workflow.
   - Generate an embedding for the entire DARA report.
   - Create a new artifact in the `research_artifacts` table.
3. **Output:** `{ artifactId, status }`

### `POST /api/enhancements/:artifactId` (Run DIDI Enhancement)

1. **Input:** `{ module, artifactId }`
2. **Action:**
   - Retrieve the specified artifact from the database.
   - Load the DARA report content as context.
   - Execute the selected DIDI module prompt.
   - Generate an embedding for the enhancement report.
   - Append the enhancement to the `didiEnhancements` array in the artifact.
3. **Output:** `{ artifactId, version, enhancement }`

## Frontend Integration

- The frontend will make API calls to these endpoints.
- It will use the `artifactId` to poll for results and display the evolving report.
- The UI will present the DARA report first, with DIDI enhancements shown as appended sections.

## Cost Analysis (Updated)

- **DARA Core Workflow:** ~2,500 tokens ($0.0125 with GPT-4o-mini)
- **DIDI Enhancement (avg):** ~1,500 tokens ($0.0075 with GPT-4o-mini)
- **Total for DARA + 2 DIDI enhancements:** ~$0.0275 per session.

**Verdict:** Still extremely affordable. The value is in the iterative deepening, which this architecture fully supports.
