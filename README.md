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

## 🚀 Installation

### Prerequisites

- Node.js 18+
- OpenAI API key

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Mac-iX/DD10-DARA.git
cd DD10-DARA
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Add your OpenAI API key to `.env`:
```
OPENAI_API_KEY=your_key_here
```

## 💻 Usage

### Start the CLI

```bash
npm start
```

The interactive CLI will guide you through:
- Selecting a mode (DARA, DD10, or Custom)
- Providing your research topic and parameters
- Executing the research chain
- Saving results to file

### Example: DARA Mode

```
Topic: "Coffee shop market analysis"
Region: "Austin, Texas"
```

The agent executes 5 modules:
1. Foundational Research
2. Audience Segmentation
3. Persona Generation
4. Simulated Inquiry
5. Strategic Synthesis

### Example: DD10 Mode

```
Topic: "AI in healthcare"
Modules: Select specific modules or use all 10
```

## 📁 Project Structure

```bash
DD10-DARA/
├── core/
│   ├── agent_router.js       # Mode selection logic
│   ├── prompt_engine.js      # Prompt template management
│   ├── executor.js           # AI model execution
│   └── response_parser.js    # Output formatting
├── interface/
│   └── cli.js                # Command-line interface
├── docs/
│   ├── DARA.md               # DARA prompt specifications
│   ├── DeepSpec_Prompt_Library.md  # DD10 module specs
│   └── MasterLevel_DeepSpecFramework_Explained.md
├── tests/
│   └── agent_test_cases.md   # Test scenarios
├── logs/                     # Session logs and reports
├── package.json
├── .env.example
└── README.md
