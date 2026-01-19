# DARA & DIDI: Vercel Deployment Plan

**Version:** 1.0
**Author:** Mac & Manus AI

## 1. Core Concept: Serverless Functions

We will use Vercel's Serverless Functions to host our backend logic. This means our Node.js code will run in a scalable, on-demand environment without us needing to manage servers.

Each API endpoint will be a separate serverless function, which keeps the application modular and efficient.

## 2. API Routes Structure (Next.js)

We will create a `/pages/api` directory in our Next.js project. Each file in this directory will correspond to an API endpoint.

```
/pages
  /api
    /research
      index.js       # POST /api/research (starts new DARA research)
    /artifacts
      [id].js        # GET /api/artifacts/:id (retrieves an artifact)
    /enhancements
      [id].js        # POST /api/enhancements/:id (runs a DIDI enhancement)
```

### `POST /api/research`

- **File:** `/pages/api/research/index.js`
- **Purpose:** To start a new DARA research session.
- **Request Body:** `{ topic, region, hasExistingData, runPreResearch }`
- **Logic:**
  1. Imports and runs the `dara_agent.js`.
  2. Creates a new research artifact.
  3. Saves the artifact using the `artifact_manager.js`.
  4. Returns `{ artifactId, status }`.

### `GET /api/artifacts/:id`

- **File:** `/pages/api/artifacts/[id].js`
- **Purpose:** To retrieve the current state of a research artifact.
- **Query Parameter:** `id` (the artifact ID)
- **Logic:**
  1. Imports the `artifact_manager.js`.
  2. Retrieves the artifact from storage (localStorage for MVP).
  3. Returns the full artifact JSON.

### `POST /api/enhancements/:id`

- **File:** `/pages/api/enhancements/[id].js`
- **Purpose:** To run a DIDI enhancement on an existing artifact.
- **Query Parameter:** `id` (the artifact ID)
- **Request Body:** `{ module }`
- **Logic:**
  1. Imports the `didi_agent.js` and `artifact_manager.js`.
  2. Retrieves the artifact.
  3. Runs the specified DIDI enhancement module.
  4. Appends the enhancement to the artifact.
  5. Saves the updated artifact.
  6. Returns `{ artifactId, version, enhancement }`.

## 3. Backend Module Integration

Our existing `/core` modules will be refactored into a `/backend` directory that can be imported by the serverless functions.

```
/backend
  /agents
    dara_agent.js
    didi_agent.js
  /modules
    /dara
      ...
    /didi
      ...
  /lib
    artifact_manager.js
    openai.js
```

This structure keeps the core logic separate from the API layer, making it easy to maintain and test.

## 4. Artifact Management (MVP)

For the MVP, we will use the browser's `localStorage` to store research artifacts. This is simple, fast, and requires no database setup.

### `artifact_manager.js`

This module will provide a simple interface for managing artifacts in `localStorage`.

```javascript
// /backend/lib/artifact_manager.js

const saveArtifact = (artifact) => {
  localStorage.setItem(artifact.artifactId, JSON.stringify(artifact));
};

const getArtifact = (artifactId) => {
  const artifact = localStorage.getItem(artifactId);
  return artifact ? JSON.parse(artifact) : null;
};

const updateArtifact = (artifactId, enhancement) => {
  const artifact = getArtifact(artifactId);
  if (artifact) {
    artifact.didiEnhancements.push(enhancement);
    artifact.version = `1.${artifact.didiEnhancements.length}`;
    saveArtifact(artifact);
    return artifact;
  }
  return null;
};

export { saveArtifact, getArtifact, updateArtifact };
```

### Future Migration to Supabase

When you are ready for user accounts and cross-device persistence, we can migrate to Supabase. The `artifact_manager.js` will be updated to use the Supabase client instead of `localStorage`.

```javascript
// Future version of /backend/lib/artifact_manager.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const saveArtifact = async (artifact) => {
  await supabase.from('research_artifacts').insert([artifact]);
};

// ... and so on
```

This approach allows us to build a fully functional MVP without the complexity of a database, while providing a clear path for future scalability.

## 5. Deployment Configuration

### `vercel.json`

We will create a `vercel.json` file in the root of our project to configure the deployment.

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ]
}
```

This configuration tells Vercel to use the Node.js runtime and maps all API requests to the `/api` directory.

### Environment Variables

We will use Vercel's environment variable management to store our OpenAI API key.

1.  Go to your project settings on Vercel.
2.  Navigate to the "Environment Variables" section.
3.  Add a new variable:
    *   **Name:** `OPENAI_API_KEY`
    *   **Value:** `sk-proj-...`

Our serverless functions will automatically have access to this variable via `process.env.OPENAI_API_KEY`.

## 6. Deployment Process

1.  **Connect to GitHub:** Connect your Vercel account to your GitHub repository.
2.  **Import Project:** Import the `DIDI-DARA` repository into Vercel.
3.  **Configure Build:** Vercel will automatically detect the Next.js framework and configure the build settings.
4.  **Deploy:** Click "Deploy". Vercel will build and deploy your application.

Any subsequent pushes to the `main` branch will automatically trigger a new deployment.

## 7. Testing Strategy

### Local Development

- Use `vercel dev` to run a local instance of the Vercel environment.
- This allows us to test the serverless functions locally before deploying.

### Staging Environment

- Vercel automatically creates a unique preview URL for every pull request.
- We will use these preview deployments as our staging environment to test changes before merging to `main`.

### Production Testing

- After deploying to production, we will run a series of end-to-end tests to ensure everything is working as expected.

## 8. Deployment Checklist

- [ ] Create `/pages/api` directory and API route files.
- [ ] Refactor `/core` modules into `/backend` directory.
- [ ] Create `artifact_manager.js` for localStorage.
- [ ] Create `vercel.json` configuration file.
- [ ] Set `OPENAI_API_KEY` in Vercel environment variables.
- [ ] Connect Vercel to GitHub repository.
- [ ] Deploy to production.
- [ ] Run end-to-end tests.
