# DARA & DIDI Deployment Guide

## Quick Start (Local Development)

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Add your OPENAI_API_KEY to .env
   ```

3. **Run development server:**
   ```bash
   pnpm dev
   ```

4. **Open browser:**
   Navigate to http://localhost:3000

## Deploy to Vercel

### Option 1: Deploy via GitHub (Recommended)

1. **Push to GitHub:**
   ```bash
   git add -A
   git commit -m "Add Next.js frontend and API routes"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Add environment variable:**
   - In Vercel dashboard → Settings → Environment Variables
   - Add `OPENAI_API_KEY` with your API key
   - Redeploy

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login and deploy:**
   ```bash
   vercel login
   vercel --prod
   ```

3. **Add environment variable:**
   ```bash
   vercel env add OPENAI_API_KEY
   ```

## Project Structure

```
DD10-DARA/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── research/      # DARA workflow endpoint
│   │   └── enhance/       # DIDI enhancement endpoint
│   ├── dashboard/         # Dashboard page
│   ├── research/          # Research pages
│   └── layout.tsx         # Root layout
├── backend/               # Backend modules
│   ├── core/             # Core logic (router, executor, etc.)
│   ├── interface/        # CLI interface (legacy)
│   └── tests/            # Test files
├── components/           # React components
├── docs/                 # Documentation
├── legal/                # Legal documents
└── public/               # Static assets
```

## API Endpoints

### POST /api/research
Create new research session (DARA workflow)

**Request:**
```json
{
  "topic": "Coffee shop market analysis",
  "region": "Charlotte, NC",
  "mode": "DARA",
  "notes": "Focus on specialty coffee"
}
```

**Response:**
```json
{
  "success": true,
  "artifactId": "uuid",
  "artifact": { ... },
  "results": [ ... ]
}
```

### POST /api/enhance
Enhance existing research with DIDI modules

**Request:**
```json
{
  "artifactId": "uuid",
  "modules": ["Quality Review", "Signal Detection"]
}
```

**Response:**
```json
{
  "success": true,
  "artifactId": "uuid",
  "artifact": { ... },
  "enhancements": [ ... ]
}
```

### GET /api/research?id={artifactId}
Retrieve research artifact

## Troubleshooting

### Build fails on Vercel
- Ensure all dependencies are in `package.json`
- Check that `pnpm build` works locally
- Verify environment variables are set

### API routes return 500
- Check Vercel logs: `vercel logs`
- Verify OPENAI_API_KEY is set
- Ensure backend modules are properly exported

### Frontend can't connect to API
- Check `NEXT_PUBLIC_APP_URL` in environment variables
- Verify API routes are accessible at `/api/*`

## Cost Optimization

- Default model: `gpt-4o-mini` (10x cheaper than GPT-4)
- Estimated cost per research session: $0.005-0.015
- Monitor usage in OpenAI dashboard

## Support

For issues or questions:
- GitHub Issues: https://github.com/Mac-iX/DD10-DARA/issues
- Email: [your email]
