# Quick Start Guide — DARA & DIDI

## Test the Agent Locally (Without API Key)

1. **Install dependencies:**
```bash
npm install
```

2. **Review the code structure:**
```bash
ls -R core/ interface/ docs/ legal/
```

3. **Check the prompt templates:**
```bash
cat docs/DARA.md | head -50
cat docs/DeepSpec_Prompt_Library.md | head -50
```

---

## Test with OpenAI API

### Step 1: Set up your environment

```bash
cp .env.example .env
nano .env  # Add your OPENAI_API_KEY
```

### Step 2: Run the CLI

```bash
npm start
```

### Step 3: Try DARA Mode

When prompted:
- Select: "Run DARA Mode"
- Topic: "Coffee shop franchise market analysis"
- Region: "Austin, Texas"

The agent will execute all 5 DARA modules and generate a complete research artifact with synthetic personas.

### Step 4: Enhance with DIDI

After DARA completes, you can run DIDI enhancement modules:
- Quality Review
- Signal Detection
- Intelligence Gathering
- Interpretation
- Synthesis
- Looping

Each enhancement appends to your research artifact with version history.

### Step 5: Check the output

```bash
ls -lh logs/
cat logs/artifact_*.json
```

---

## Understanding the Flow

1. **CLI** (`interface/cli.js`) - User interaction
2. **Router** (`core/agent_router.js`) - Determines DARA vs DIDI mode
3. **Prompt Engine** (`core/prompt_engine.js`) - Loads prompts from docs
4. **Executor** (`core/executor.js`) - Sends prompts to OpenAI
5. **Parser** (`core/response_parser.js`) - Formats results
6. **Memory Protocol** (`core/memory_protocol.js`) - Manages artifacts with version history

---

## Troubleshooting

### "Cannot find module"
Run `npm install` to install all dependencies.

### "API key not found"
Make sure you created `.env` and added your `OPENAI_API_KEY`.

### "Module prompt not found"
The prompt engine looks for specific headers in the docs. Make sure `docs/DARA.md` and `docs/DeepSpec_Prompt_Library.md` are present.

---

## Next Steps

- Review the [Simple Deployment Guide](docs/SIMPLE_DEPLOYMENT_GUIDE.md) for v0 → Vercel workflow
- Customize prompts in `docs/` folder
- Build your frontend using the [v0 UI/UX Spec](docs/V0_UIUX_SPEC.md)
- Read the [DARA/DIDI Architecture](docs/DARA_DIDI_Final_Architecture.md) for full details

---

**Built by Mac | Quality Creative Consulting, LLC**
