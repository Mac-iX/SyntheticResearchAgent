import { NextRequest, NextResponse } from 'next/server';
import { PromptEngine } from '../../../backend/core/prompt_engine';
import { Executor } from '../../../backend/core/executor';
import { ResponseParser } from '../../../backend/core/response_parser';
import { MemoryProtocol } from '../../../backend/core/memory_protocol';

const promptEngine = new PromptEngine();
const executor = new Executor();
const parser = new ResponseParser();
const memory = new MemoryProtocol();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { artifactId, modules } = body;

    if (!artifactId || !modules || !Array.isArray(modules)) {
      return NextResponse.json(
        { error: 'Artifact ID and modules array are required' },
        { status: 400 }
      );
    }

    const artifact = memory.getArtifact(artifactId);
    
    if (!artifact) {
      return NextResponse.json(
        { error: 'Artifact not found' },
        { status: 404 }
      );
    }

    // Execute DIDI enhancement modules
    const enhancements = [];
    for (const moduleName of modules) {
      const prompt = promptEngine.loadPrompt('DIDI', moduleName);
      const enhancedPrompt = promptEngine.enhancePrompt(prompt, {
        artifact: artifact.content,
        previousEnhancements: enhancements
      });

      const response = await executor.execute(enhancedPrompt);
      const parsed = parser.parse(response, moduleName);
      
      enhancements.push({
        module: moduleName,
        content: parsed
      });

      // Append enhancement to artifact
      memory.appendToArtifact(artifactId, `DIDI_${moduleName}`, parsed);
    }

    const updatedArtifact = memory.getArtifact(artifactId);

    return NextResponse.json({
      success: true,
      artifactId,
      artifact: updatedArtifact,
      enhancements
    });

  } catch (error: any) {
    console.error('Enhance API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
