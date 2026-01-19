# 🧠 DARA & DIDI — Professional Synthetic Audience Research

Welcome to **DARA & DIDI**, a modular AI-powered research platform designed to deliver professional-grade audience insights through synthetic data modeling.

## 🎯 What This Does

**DARA (Deep Audience Research Agent)** generates comprehensive audience research through a 5-step workflow:
1. Foundational Research → Demographics & psychographics
2. Audience Segmentation → Distinct user groups
3. Persona Generation → Detailed synthetic personas
4. Simulated Inquiry → Survey responses from personas
5. Strategic Synthesis → Actionable recommendations

**DIDI (Deep Impact Data Illumination)** enhances DARA findings with specialized analysis modules:
- Quality Review → Identify biases and gaps
- Signal Detection → Uncover hidden opportunities
- Intelligence Gathering → Validate claims with external data
- Interpretation → Cultural and emotional context
- Synthesis → Cross-disciplinary insights
- Looping → Scenario planning

**Memory Protocol (MP)** manages research artifacts with version history for iterative research.

---

## 🚀 Quick Start

### Installation

```bash
git clone https://github.com/Mac-iX/DARA-DIDI.git
cd DARA-DIDI
npm install
```

### Configuration

```bash
cp .env.example .env
# Add your OPENAI_API_KEY to .env
```

### Run a Research Session

```bash
npm start
```

Follow the prompts to:
1. Choose your research mode (DARA, DIDI, or Custom)
2. Enter your research topic
3. Select enhancement modules (optional)
4. Review your research artifact

---

## 📁 Project Structure

```
DARA-DIDI/
├── core/                    # Core modules
│   ├── agent_router.js      # Routes requests to appropriate modules
│   ├── prompt_engine.js     # Loads and manages prompt templates
│   ├── executor.js          # Executes AI requests via OpenAI API
│   ├── response_parser.js   # Parses and formats AI responses
│   └── memory_protocol.js   # Manages research artifacts
├── interface/
│   └── cli.js               # Command-line interface
├── docs/                    # Documentation and prompt libraries
│   ├── DARA.md              # DARA prompt specifications
│   ├── DeepSpec_Prompt_Library.md  # DIDI prompt specifications
│   └── USAGE_GUIDE.md       # Detailed usage guide
├── legal/                   # Terms, privacy, ethical guidelines
├── tests/                   # Test scripts
└── package.json
```

---

## 🎨 Use Cases

- **Marketing Agencies:** Deliver client insights in days, not weeks
- **Independent Consultants:** Compete with big firms on research depth
- **Product Managers:** Validate features before building
- **Entrepreneurs:** Test ideas before investing in inventory
- **Researchers:** Supplement real user data with synthetic modeling

---

## 🔒 Ethical Use

This tool generates **synthetic data** based on real-world patterns. It is designed to:
- **Augment** human research, not replace it
- **Accelerate** decision-making with validated insights
- **Democratize** access to professional-grade research

See `legal/Ethical_Use_Disclaimer.md` for full guidelines.

---

## 📊 Pricing & Costs

This is an open-source tool. You only pay for:
- **OpenAI API usage:** ~$0.01-$0.05 per research session with GPT-4o-mini
- **Optional:** Supabase for cloud storage (free tier available)

---

## 🛠️ Development

### Run Tests

```bash
node tests/verify_setup.js
node tests/test_complete_agent.js
```

### Add Custom Modules

1. Add your prompt to `docs/DeepSpec_Prompt_Library.md`
2. Update `core/prompt_engine.js` to extract your module
3. Update `core/agent_router.js` to route to your module

---

## 📚 Documentation

- [DARA Framework](docs/DARA.md)
- [DIDI Modules](docs/DeepSpec_Prompt_Library.md)
- [Usage Guide](docs/USAGE_GUIDE.md)
- [Deployment Guide](docs/Vercel_Deployment_Plan.md)

---

## 🤝 Contributing

This is a personal project by Mac at Quality Creative Consulting, LLC. Contributions, feedback, and suggestions are welcome via GitHub issues.

---

## 📄 License

MIT License - See LICENSE file for details.

---

## 🙏 Acknowledgments

Built with insights from Vanderbilt's Deep Research AI course and expanded through extensive prompt engineering research.

---

**Built by Mac | Quality Creative Consulting, LLC**
