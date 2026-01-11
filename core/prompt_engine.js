/**
 * Prompt Engine
 * Loads prompt templates and assembles the prompt chain
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class PromptEngine {
  constructor() {
    this.docsPath = path.join(__dirname, '..', 'docs');
    this.promptCache = {};
  }

  /**
   * Load a prompt template from the docs folder
   * @param {string} moduleName - Name of the module
   * @param {string} mode - DARA or DD10
   * @returns {string} - The prompt template
   */
  loadPromptTemplate(moduleName, mode) {
    const cacheKey = `${mode}_${moduleName}`;
    
    if (this.promptCache[cacheKey]) {
      return this.promptCache[cacheKey];
    }

    try {
      const fileName = mode === 'dara' ? 'DARA.md' : 'DeepSpec_Prompt_Library.md';
      const filePath = path.join(this.docsPath, fileName);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Extract the specific module section
      const modulePrompt = this.extractModulePrompt(content, moduleName, mode);
      this.promptCache[cacheKey] = modulePrompt;
      
      return modulePrompt;
    } catch (error) {
      console.error(`Error loading prompt template for ${moduleName}:`, error.message);
      return null;
    }
  }

  /**
   * Extract a specific module's prompt from the documentation
   * @param {string} content - Full document content
   * @param {string} moduleName - Name of the module to extract
   * @param {string} mode - DARA or DD10
   * @returns {string} - Extracted prompt
   */
  extractModulePrompt(content, moduleName, mode) {
    if (mode === 'dara') {
      return this.extractDARAModule(content, moduleName);
    } else {
      return this.extractDD10Module(content, moduleName);
    }
  }

  /**
   * Extract DARA module prompt
   */
  extractDARAModule(content, moduleName) {
    const moduleMap = {
      'foundational_research': 'Module 1: Foundational Research',
      'audience_segmentation': 'Module 2: Audience Segmentation',
      'persona_generation': 'Module 3: Persona Generation',
      'simulated_inquiry': 'Module 4: Simulated Inquiry',
      'strategic_synthesis': 'Module 5: Strategic Synthesis'
    };

    const moduleHeader = moduleMap[moduleName];
    if (!moduleHeader) return null;

    // Find the section between this module and the next
    const startIndex = content.indexOf(`## ${moduleHeader}`);
    if (startIndex === -1) return null;

    const nextModuleIndex = content.indexOf('## Module', startIndex + 1);
    const endIndex = nextModuleIndex === -1 ? content.length : nextModuleIndex;

    return content.substring(startIndex, endIndex).trim();
  }

  /**
   * Extract DD10 module prompt
   */
  extractDD10Module(content, moduleName) {
    const moduleMap = {
      'deep_reasoning': 'Deep Reasoning',
      'deep_interpretation': 'Deep Interpretation',
      'deep_intelligence': 'Deep Intelligence',
      'deep_storytelling': 'Deep Storytelling',
      'deep_quality_review': 'Deep Quality Review',
      'deep_looping': 'Deep Looping',
      'deep_signal_detection': 'Deep Signal Detection',
      'deep_synthesis': 'Deep Synthesis',
      'deep_structure': 'Deep Structure',
      'deep_aesthetics': 'Deep Aesthetics'
    };

    const moduleHeader = moduleMap[moduleName];
    if (!moduleHeader) return null;

    // Find the section for this module
    const startIndex = content.indexOf(`### ${moduleHeader}`);
    if (startIndex === -1) return null;

    const nextModuleIndex = content.indexOf('###', startIndex + 1);
    const endIndex = nextModuleIndex === -1 ? content.length : nextModuleIndex;

    return content.substring(startIndex, endIndex).trim();
  }

  /**
   * Build the complete prompt chain for a sequence of modules
   * @param {Array} moduleSequence - Array of module names
   * @param {string} mode - DARA or DD10
   * @param {Object} input - User input to inject into prompts
   * @param {string} previousOutput - Output from previous module (for chaining)
   * @returns {string} - Complete assembled prompt
   */
  buildPromptChain(moduleSequence, mode, input, previousOutput = null) {
    let fullPrompt = '';

    for (const moduleName of moduleSequence) {
      const template = this.loadPromptTemplate(moduleName, mode);
      if (!template) {
        console.warn(`Warning: Could not load template for ${moduleName}`);
        continue;
      }

      // Inject user input into the template
      let processedPrompt = this.injectVariables(template, input, previousOutput);
      fullPrompt += processedPrompt + '\n\n---\n\n';
    }

    return fullPrompt.trim();
  }

  /**
   * Inject variables into the prompt template
   * @param {string} template - Prompt template
   * @param {Object} input - User input
   * @param {string} previousOutput - Previous module output
   * @returns {string} - Processed prompt
   */
  injectVariables(template, input, previousOutput) {
    let processed = template;

    // Replace common placeholders
    if (input.topic) {
      processed = processed.replace(/\[Topic\/Niche\]/g, input.topic);
      processed = processed.replace(/\[Your Topic\]/g, input.topic);
    }

    if (input.region) {
      processed = processed.replace(/\[Geographic Region\]/g, input.region);
      processed = processed.replace(/\[Region\]/g, input.region);
    }

    if (previousOutput) {
      processed = processed.replace(/\[Previous Output\]/g, previousOutput);
      processed = processed.replace(/\[Foundational Research Report\]/g, previousOutput);
      processed = processed.replace(/\[Audience Segments\]/g, previousOutput);
      processed = processed.replace(/\[Persona Profiles\]/g, previousOutput);
      processed = processed.replace(/\[Simulated Persona Responses\]/g, previousOutput);
    }

    return processed;
  }
}
