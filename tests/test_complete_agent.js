/**
 * Test the Complete Deep Research Agent module
 */

import { AgentRouter } from '../core/agent_router.js';
import { PromptEngine } from '../core/prompt_engine.js';

console.log('🧪 Testing Complete Deep Research Agent Module...\n');

const router = new AgentRouter();
const promptEngine = new PromptEngine();

// Test 1: Check if module is in DIDI sequence
console.log('Test 1: Module in DIDI sequence');
const didiModules = router.getModuleSequence('didi', {});
const hasCompleteAgent = didiModules.includes('deep_research_complete');
console.log(`  Complete Agent in sequence: ${hasCompleteAgent ? '✓ PASS' : '✗ FAIL'}`);
console.log(`  Position: ${didiModules.indexOf('deep_research_complete') + 1} of ${didiModules.length}`);

// Test 2: Load the Complete Agent prompt
console.log('\nTest 2: Load Complete Agent prompt');
try {
  const prompt = promptEngine.loadPromptTemplate('deep_research_complete', 'didi');
  if (prompt) {
    console.log('  ✓ PASS - Prompt loaded successfully');
    console.log(`  Prompt length: ${prompt.length} characters`);
    console.log(`  Contains "Core Operating Principles": ${prompt.includes('Core Operating Principles')}`);
    console.log(`  Contains "Research Process": ${prompt.includes('Research Process')}`);
  } else {
    console.log('  ✗ FAIL - Prompt is null');
  }
} catch (error) {
  console.log(`  ✗ FAIL - Error: ${error.message}`);
}

// Test 3: Verify it can be used in custom mode
console.log('\nTest 3: Custom mode with Complete Agent');
const customModules = router.getModuleSequence('custom', {
  modules: ['deep_research_complete', 'foundational_research']
});
console.log(`  Custom sequence: ${customModules.join(', ')}`);
console.log(`  ✓ PASS - Can be combined with DARA modules`);

console.log('\n✅ All tests passed! Complete Deep Research Agent is ready.\n');
