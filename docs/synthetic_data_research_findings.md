# Synthetic Data Research Findings

## Key Sources

1. **Bain & Company** - "How Synthetic Customers Bring Companies Closer to the Real Ones"
2. **Research Live** - "Preview of 2026: Synthetic data"
3. **Qualtrics** - "Synthetic Panels in Market Research"
4. **Solomon Partners** - "Synthetic Data is Transforming Market Research"

## Core Findings

### What Synthetic Data Actually Is

Synthetic customers/data are **AI-generated proxies that emulate human behavior, preferences, and decision making**. They are built from:
- Internal company data (transactional, behavioral, demographic)
- Voice-of-customer research
- External sources (product reviews, market analysis)

### Current Accuracy & Validation

**Stanford/Google DeepMind Study:**
- 85% accuracy matching human survey responses
- 98% correlation mimicking social behavior

**Bain & Company Experience:**
- Tests take **half the time**
- Cost **one-third as much** as traditional methods
- Requires high-quality training data

### Five Primary Use Cases (Industry Standard)

1. **Value Proposition Design** - Test features, pricing, bundles before launch
2. **Persona Development & Segmentation** - Build nuanced, data-rich personas
3. **Marketing & Ad Testing** - Rapidly test campaigns, especially for hard-to-reach audiences
4. **Predictive NPS Modeling** - Model how changes affect customer sentiment
5. **Frontline Training** - Train sales/support teams with realistic scenarios

### Critical Workflow Pattern

**The industry consensus is clear: Synthetic data SUPPLEMENTS real data, it does NOT replace it.**

**Best Practice Workflow:**
1. Gather real-world baseline data (surveys, interviews, transactions)
2. Build synthetic personas from that data
3. Use synthetic personas for rapid iteration/testing
4. Validate findings with real customers before major decisions

### Limitations & Warnings

**From Bain:**
- "AI can introduce bias or miss nuance"
- "Bots can be overly positive and agreeable"
- "Use synthetic research to augment, not replace, critical insights"
- "These models are only as strong as the training data"

**From Research Live:**
- Synthetic data works best when grounded in real-world data
- Not suitable as the ONLY source of truth
- Requires careful scenario design

### Where Mac's Concept Aligns

✅ **DARA as the foundation** - Aligns perfectly. The workflow should be:
   1. Gather real demographic/psychographic data (DARA Module 1)
   2. Segment audiences (DARA Module 2)
   3. Generate synthetic personas (DARA Module 3)
   4. Simulate inquiry/testing (DARA Module 4)
   5. Synthesize strategic recommendations (DARA Module 5)

✅ **DIDI as enhancement layer** - Aligns with "layering insights" approach Bain describes

✅ **Iterative deepening** - Industry uses synthetic data for rapid iteration before final validation

### Where Mac's Concept Needs Adjustment

⚠️ **DIDI positioning** - Current setup treats DIDI as separate "deep research" mode. Better approach:
   - DIDI modules should be **quality checks** and **enhancement tools**
   - Run BEFORE DARA (to gather baseline data)
   - Run AFTER DARA (to validate/deepen findings)
   - NOT a separate workflow

⚠️ **Redundancy risk** - Some DIDI modules (Deep Intelligence, Deep Synthesis) overlap with DARA's core functions

⚠️ **User confusion** - Having 16 separate modules is overwhelming. Industry tools focus on **workflows**, not individual modules.

## Recommended Architecture

### Simplified User Experience

**User sees:** "DARA - Synthetic Audience Research"

**Behind the scenes:**
1. **Pre-Research Phase** (Optional, user-triggered)
   - Run DIDI "Complete Deep Research Agent" to gather baseline market data
   - Or user provides their own baseline data

2. **DARA Core Workflow** (Always runs)
   - Module 1: Foundational Research (demographics/psychographics)
   - Module 2: Audience Segmentation
   - Module 3: Persona Generation (synthetic data)
   - Module 4: Simulated Inquiry
   - Module 5: Strategic Synthesis

3. **Post-Research Enhancement** (Optional, user-selects specific modules)
   - DIDI: Deep Quality Review (validate findings)
   - DIDI: Deep Signal Detection (identify patterns)
   - DIDI: Deep Reasoning (test assumptions)
   - DIDI: Deep Synthesis (cross-domain insights)

### Memory/Artifact System

**Critical for iterative research:**
- Each DARA report becomes an "artifact"
- User can run DIDI modules ON the artifact
- Results are appended to the artifact
- User builds a comprehensive research document over time

This matches how professionals actually work: Start broad → Generate personas → Test assumptions → Deepen insights → Validate findings.

## Bottom Line

Mac's instinct is correct: **DARA should be the star, DIDI should be the supporting cast.**

The future of synthetic data is about **augmented workflows**, not module selection. Users want to say "research this audience" and get a comprehensive report, with the option to go deeper if needed.
