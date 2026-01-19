/**
 * Simple verification script to test the agent setup
 */

import { AgentRouter } from '../core/agent_router.js';
import { PromptEngine } from '../core/prompt_engine.js';
import { ResponseParser } from '../core/response_parser.js';

console.log('🔍 Verifying DIDI/DARA Agent Setup...\n');

// Test 1: Router
console.log('✓ Testing AgentRouter...');
const router = new AgentRouter();
const testInput = { mode: 'dara', topic: 'Test', region: 'Test Region' };
const mode = router.selectMode(testInput);
const validation = router.validateInput(mode, testInput);
console.log(`  Mode selected: ${mode}`);
console.log(`  Validation: ${validation.success ? 'PASS' : 'FAIL'}`);

// Test 2: Prompt Engine
console.log('\n✓ Testing PromptEngine...');
const promptEngine = new PromptEngine();
try {
  const moduleSequence = router.getModuleSequence('dara', testInput);
  console.log(`  DARA modules: ${moduleSequence.length} found`);
  const firstModule = promptEngine.loadPromptTemplate(moduleSequence[0], 'dara');
  console.log(`  First module loaded: ${firstModule ? 'PASS' : 'FAIL'}`);
} catch (error) {
  console.log(`  ERROR: ${error.message}`);
}

// Test 3: Response Parser
console.log('\n✓ Testing ResponseParser...');
const parser = new ResponseParser();
const mockResults = { test_module: 'Test output' };
const markdown = parser.formatAsMarkdown(mockResults, { mode: 'test' });
console.log(`  Markdown formatting: ${markdown.length > 0 ? 'PASS' : 'FAIL'}`);

console.log('\n✅ Setup verification complete!\n');
console.log('To run the full agent, use: npm start\n');
