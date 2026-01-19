import { NextRequest, NextResponse } from 'next/server';
import { AgentRouter } from '../../../backend/core/agent_router';
import { PromptEngine } from '../../../backend/core/prompt_engine';
import { Executor } from '../../../backend/core/executor';
import { ResponseParser } from '../../../backend/core/response_parser';
import { MemoryProtocol } from '../../../backend/core/memory_protocol';

const router = new AgentRouter();
const promptEngine = new PromptEngine();
const executor = new Executor();
const parser = new ResponseParser();
const memory = new MemoryProtocol();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, region, mode = 'DARA', notes = '' } = body;

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    // Determine mode and modules
    const selectedMode = router.determineMode(mode);
    const modules = router.getModules(selectedMode);

    // Create artifact
    const artifactId = memory.createArtifact({
      topic,
      region: region || 'Not specified',
      mode: selectedMode,
      notes,
      timestamp: new Date().toISOString()
    });

    // Execute DARA workflow
    const results = [];
    for (const module of modules) {
      const prompt = promptEngine.loadPrompt(selectedMode, module);
      const enhancedPrompt = promptEngine.enhancePrompt(prompt, {
        topic,
        region,
        previousResults: results
      });

      const response = await executor.execute(enhancedPrompt);
      const parsed = parser.parse(response, module);
      
      results.push({
        module,
        content: parsed
      });

      // Update artifact
      memory.appendToArtifact(artifactId, module, parsed);
    }

    const artifact = memory.getArtifact(artifactId);

    return NextResponse.json({
      success: true,
      artifactId,
      artifact,
      results
    });

  } catch (error: any) {
    console.error('Research API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const artifactId = searchParams.get('id');

    if (!artifactId) {
      // Return all artifacts
      const allArtifacts = memory.getAllArtifacts();
      return NextResponse.json({ artifacts: allArtifacts });
    }

    const artifact = memory.getArtifact(artifactId);
    
    if (!artifact) {
      return NextResponse.json(
        { error: 'Artifact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ artifact });

  } catch (error: any) {
    console.error('Research GET error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
