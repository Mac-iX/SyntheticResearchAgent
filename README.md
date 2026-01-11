# 🧠 DD10 & DARA — The Apex Research Agent

Welcome to **DD10 & DARA**, a modular AI-powered research framework designed to perform **elite-level audience and market research** through two powerful modes:

- 🔍 **DARA**: *Deep Audience Research Agent* — used for synthetic data augmentation, persona modeling, psychographic segmentation, and communication strategy.
- 📊 **DD10**: *Deep Dive Agent* — 10-Specs (deep research prompt frameworks) built for niche discovery, competitive analysis, and strategic market research.

Together, they form the foundation of **Deep Diligent Agent**, a professional-grade system that combines research automation with strategic synthesis — tailored for brand builders, marketers, founders, and executives.

---

## 🧩 System Overview

### Modes

| Mode | Purpose |
|------|---------|
| 🎯 DARA | Deep audience understanding: demographics, psychographics, personas, messaging |
| 🧠 DD10 | Strategic market and business intelligence: niche trends, SWOT, positioning |
| 🔀 Hybrid | Combines both DARA + DD10 for full-stack research & synthesis |

### Powered By:
- OpenAI Codex + GPT-4
- Modular prompt architecture (DeepSpec + DARA)
- GitHub Actions or Vercel for deployment (optional)
- Supports local CLI or front-end interfaces (via V0 or React)

---

## 📁 Project Structure

```bash
/apex-agent
├── /prompts
│   ├── deepSpec/         # 11 Deep Research modules
│   └── dara/             # ~17 audience research modules
│
├── /src
│   ├── index.js          # Entry point
│   ├── agentCore.js      # Mode logic (DARA, DD10, Hybrid)
│   ├── promptHandler.js  # Prompt loading & injection
│   ├── synthesisEngine.js# Insight merging & report generation
│   └── outputFormatter.js# Clean markdown or JSON output
│
├── /outputs              # Research output files (Markdown, JSON)
├── /config               # Model settings, constants, toggles
├── .env                  # Secure API keys
└── README.md
