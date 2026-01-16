# v0 UI/UX Specification for DARA & DIDI

## Overview
Build a professional research platform with a clean, dashboard-style interface. The app guides users through synthetic audience research with DARA, then offers optional DIDI enhancements.

---

## Design System

### Colors
- **Primary:** #1E3A8A (Deep Blue)
- **Secondary:** #10B981 (Emerald Green)
- **Accent:** #F59E0B (Amber)
- **Background:** #F9FAFB (Light Gray)
- **Text:** #111827 (Near Black)
- **Border:** #E5E7EB (Light Gray)

### Typography
- **Headings:** Inter, Bold
- **Body:** Inter, Regular
- **Code/Data:** JetBrains Mono

### Spacing
- Use Tailwind's spacing scale (4px increments)
- Consistent padding: p-6 for cards, p-4 for smaller elements

---

## Pages & Components

### 1. Landing Page (`/`)

**Hero Section:**
- Headline: "You are here for deep research."
- Subheadline: "DARA & DIDI deliver professional-grade audience insights through synthetic data modeling."
- CTA Button: "Start Research" (links to `/dashboard`)
- Background: Subtle gradient (blue to emerald)

**Features Section:**
Three cards in a grid:
1. **DARA** - "5-step audience synthesis"
2. **DIDI** - "10 enhancement modules"
3. **Memory Protocol** - "Iterative research artifacts"

**How It Works:**
Step-by-step visual:
1. Enter your topic
2. DARA generates personas
3. Enhance with DIDI
4. Export your research

**CTA:** "Get Started" button

**Footer:**
- Links: Terms, Privacy, Ethical Use
- Copyright: Quality Creative Consulting, LLC

---

### 2. Dashboard (`/dashboard`)

**Layout:**
- **Sidebar (left, 20% width):**
  - Logo at top
  - Navigation:
    - New Research
    - My Artifacts
    - Settings
  - User info at bottom (name, plan)

- **Main Area (right, 80% width):**
  - Header: "Welcome back, [User]"
  - Quick Actions:
    - "Start DARA Research" button (primary)
    - "View Past Research" button (secondary)
  - Recent Artifacts (list of 5 most recent)

---

### 3. New Research Page (`/research/new`)

**Step 1: Initial Setup**

Form with 3 fields:
1. **Topic/Business** (textarea)
   - Placeholder: "e.g., Coffee shop franchise in Austin, Texas"
   - Help text: "Describe what you're researching"

2. **Region** (text input)
   - Placeholder: "e.g., Charlotte, NC"
   - Help text: "Geographic focus (optional)"

3. **Additional Context** (textarea, optional)
   - Placeholder: "Any specific questions or constraints?"

**Checkbox:**
- [ ] "I have existing research data to upload"
  - If checked, show file upload field

**Buttons:**
- "Start DARA Research" (primary)
- "Cancel" (secondary)

---

### 4. Research In Progress (`/research/[id]/processing`)

**Layout:**
- Progress indicator (5 steps for DARA)
- Current step highlighted
- Animated spinner
- Status text: "Running Module 2: Audience Segmentation..."
- Estimated time remaining: "~3 minutes"

**Steps:**
1. Foundational Research
2. Audience Segmentation
3. Persona Generation
4. Simulated Inquiry
5. Strategic Synthesis

---

### 5. Research Results (`/research/[id]`)

**Header:**
- Research title (from topic)
- Date created
- Buttons:
  - "Export PDF"
  - "Share"
  - "Delete"

**Tabs:**
1. **Overview** - Summary of findings
2. **Personas** - Detailed persona cards
3. **Insights** - Key takeaways
4. **Raw Data** - Full artifact JSON (collapsible)

**Sidebar (right):**
- **Enhance with DIDI**
  - Grid of 6 module cards (essential + high-value)
  - Each card shows:
    - Icon
    - Module name
    - One-sentence description
    - "Run Module" button
  - Modules:
    1. Quality Review
    2. Signal Detection
    3. Intelligence Gathering
    4. Interpretation
    5. Synthesis
    6. Looping

**Version History:**
- List of enhancements applied
- Click to view specific version

---

### 6. DIDI Enhancement Modal

**Triggered when user clicks "Run Module"**

**Modal content:**
- Module name (heading)
- Description (2-3 sentences)
- Estimated cost: "$0.02"
- Estimated time: "2 minutes"
- Buttons:
  - "Run Enhancement" (primary)
  - "Cancel" (secondary)

**After running:**
- Show progress spinner
- Append results to artifact
- Update version history
- Show success message

---

### 7. My Artifacts (`/artifacts`)

**Layout:**
- Grid of artifact cards (3 per row)
- Each card shows:
  - Topic
  - Date created
  - Number of versions
  - Preview of first persona
  - "View" button

**Filters:**
- Sort by: Date, Topic, Versions
- Search bar

---

### 8. Settings (`/settings`)

**Tabs:**
1. **Account** - Name, email, password
2. **Billing** - Plan, payment method, usage
3. **API** - API key for programmatic access (future)
4. **Preferences** - Default region, export format

---

## Key Interactions

### Explainer Modal (First Visit)

**Triggered on first dashboard visit**

**Content:**
- "How DARA & DIDI Work"
- Visual diagram of workflow
- 3-4 bullet points
- "Got it" button

**Checkbox:**
- [ ] "Don't show this again"

---

### Module Selection (Custom Mode)

**If user clicks "Custom Research"**

**Show:**
- Checklist of all DARA + DIDI modules
- User selects which to run
- Option: "Let the agent choose additional modules" (checkbox)
- "Run Custom Research" button

---

## Copywriting Tone

**Direct. Confident. Professional.**

Examples:
- "You aim to utilize synthetic data for strategic advantage."
- "This research will segment your audience into actionable personas."
- "Deep Impact Data Illumination validates your findings."

**Avoid:**
- Fluff ("amazing", "incredible")
- Passive voice
- Overly technical jargon

---

## Mobile Responsiveness

- Sidebar collapses to hamburger menu
- Cards stack vertically
- Forms remain single-column
- Module cards: 1 per row on mobile

---

## Accessibility

- All buttons have aria-labels
- Form inputs have labels
- Color contrast meets WCAG AA
- Keyboard navigation supported

---

## Next Steps for v0

1. Paste this spec into v0.dev
2. Generate the landing page first
3. Iterate on dashboard layout
4. Build research flow pages
5. Add DIDI enhancement modal
6. Test on mobile

---

**Note:** v0 will generate the React/Next.js code. You'll get components like:
- `LandingPage.tsx`
- `Dashboard.tsx`
- `NewResearch.tsx`
- `ResearchResults.tsx`
- etc.

Copy these into your `/frontend` folder and deploy to Vercel.
