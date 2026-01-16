# Simple Deployment Guide for DARA & DIDI

## What You Need to Know

You have three tools working together:
1. **v0.dev** - Builds your frontend (the UI users see)
2. **GitHub** - Stores your code
3. **Vercel** - Hosts your website and runs your backend

Think of it like this: v0 is your designer, GitHub is your filing cabinet, and Vercel is your storefront.

---

## The Workflow (Step by Step)

### Step 1: Build Frontend in v0

1. Go to [v0.dev](https://v0.dev)
2. Paste the UI/UX spec I'll give you (separate document)
3. v0 generates React components
4. Download the code or copy it

### Step 2: Add Frontend to GitHub

1. Create a new folder in your DD10-DARA repo: `/frontend`
2. Paste the v0 code into `/frontend`
3. Commit and push to GitHub:

```bash
cd DD10-DARA
git add frontend/
git commit -m "Add v0 frontend"
git push origin main
```

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your `DD10-DARA` GitHub repo
4. Vercel automatically detects it's a Next.js app
5. Add your environment variable:
   - Key: `OPENAI_API_KEY`
   - Value: Your OpenAI API key
6. Click "Deploy"

**That's it.** Vercel builds and hosts your app. You get a live URL like `dara-didi.vercel.app`.

---

## When to Add Supabase

**Not yet.** For MVP, we're using localStorage (saves data in the user's browser).

**Add Supabase when:**
- You have paying customers
- Users need to access their research from multiple devices
- You want to offer team accounts

**How to add it:**
1. Sign up at [supabase.com](https://supabase.com) (free tier)
2. Create a new project
3. Get your API keys
4. Add them to Vercel environment variables
5. I'll help you update the Memory Protocol to use Supabase instead of localStorage

---

## How the Three Tools Work Together

```
User → v0 Frontend (on Vercel) → API Routes (on Vercel) → Your Backend Code (on Vercel) → OpenAI
                                                                ↓
                                                           Memory Protocol
                                                                ↓
                                                           localStorage (MVP)
                                                           or Supabase (later)
```

**v0** builds the pretty interface.
**Vercel** runs everything (frontend + backend).
**GitHub** stores the code so Vercel can deploy it.

---

## Monetization Strategy (First Principles)

### Goal: Cash Flow ASAP

**Phase 1: Free Beta (Now)**
- Launch with localStorage (no database costs)
- Collect emails for waitlist
- Get user feedback
- Cost: $0/month (just your OpenAI API usage)

**Phase 2: Paid MVP (Month 2)**
- Add Supabase for user accounts
- Charge $29/month for unlimited research
- Target: 10 paying customers = $290/month
- Cost: ~$25/month (Supabase Pro + OpenAI usage)
- Profit: $265/month

**Phase 3: Scale (Month 3-6)**
- Add team accounts ($99/month)
- Add API access for agencies ($299/month)
- Target: 50 users = $1,450/month
- Cost: ~$100/month
- Profit: $1,350/month

### Pricing Tiers (When You're Ready)

| Tier | Price | Features |
|------|-------|----------|
| **Free** | $0 | 1 research session, no saving |
| **Pro** | $29/mo | Unlimited research, save artifacts, export |
| **Team** | $99/mo | 5 seats, shared artifacts, priority support |
| **Agency** | $299/mo | API access, white-label, custom modules |

---

## What I'll Give You Next

1. **v0 UI/UX Spec** - Paste this into v0.dev to generate your frontend
2. **API Routes Code** - Add these files to your repo for backend functionality
3. **Deployment Checklist** - Step-by-step tasks to go live

---

## Questions?

- **"Do I need to know how to code?"** - No. v0 generates the code. You just copy/paste.
- **"What if something breaks?"** - I'll help you debug. Vercel shows error logs.
- **"How do I update the app?"** - Change code in GitHub, push, Vercel auto-deploys.
- **"When do I start charging?"** - After 10-20 beta users give feedback (2-4 weeks).

---

**Next Steps:**
1. I'll create the v0 UI/UX spec
2. You paste it into v0 and generate the frontend
3. We deploy to Vercel together
4. You launch beta and collect feedback

Let's build this thing.
