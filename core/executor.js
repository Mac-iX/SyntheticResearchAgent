/**
 * Executor
 * Sends prompt chains to AI models and handles responses
 */

import OpenAI from 'openai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

export class Executor {
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    this.model = process.env.OPENAI_MODEL || 'gpt-4';
    this.logSessions = process.env.LOG_SESSIONS === 'true';
  }

  /**
   * Execute a prompt chain
   * @param {string} prompt - The complete prompt to send
   * @param {Object} metadata - Session metadata for logging
   * @returns {Promise<string>} - AI response
   */
  async execute(prompt, metadata = {}) {
    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are the Deep Diligent Agent, a professional-grade AI research assistant. You provide executive-level insights with calm wisdom, sharp analysis, and deep empathy. Your responses are structured, actionable, and grounded in evidence.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      });

      const result = response.choices[0].message.content;

      // Log session if enabled
      if (this.logSessions) {
        this.logSession(prompt, result, metadata);
      }

      return result;
    } catch (error) {
      console.error('Error executing prompt:', error.message);
      throw error;
    }
  }

  /**
   * Execute a multi-stage prompt chain with intermediate outputs
   * @param {Array} moduleSequence - Array of module names
   * @param {PromptEngine} promptEngine - Instance of PromptEngine
   * @param {string} mode - DARA or DD10
   * @param {Object} input - User input
   * @param {Object} metadata - Session metadata
   * @returns {Promise<Object>} - Object containing all module outputs
   */
  async executeChain(moduleSequence, promptEngine, mode, input, metadata = {}) {
    const results = {};
    let previousOutput = null;

    for (const moduleName of moduleSequence) {
      console.log(`\nExecuting module: ${moduleName}...`);
      
      const prompt = promptEngine.buildPromptChain([moduleName], mode, input, previousOutput);
      
      try {
        const output = await this.execute(prompt, {
          ...metadata,
          module: moduleName,
          mode: mode
        });

        results[moduleName] = output;
        previousOutput = output;

        console.log(`✓ Module ${moduleName} completed`);
      } catch (error) {
        console.error(`✗ Module ${moduleName} failed:`, error.message);
        results[moduleName] = { error: error.message };
      }
    }

    return results;
  }

  /**
   * Log session to file
   * @param {string} prompt - The prompt sent
   * @param {string} response - The AI response
   * @param {Object} metadata - Session metadata
   */
  logSession(prompt, response, metadata) {
    try {
      const timestamp = new Date().toISOString();
      const logDir = path.join(process.cwd(), 'logs');
      
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }

      const logFile = path.join(logDir, `session_${timestamp.replace(/:/g, '-')}.json`);
      
      const logData = {
        timestamp,
        model: this.model,
        metadata,
        prompt,
        response
      };

      fs.writeFileSync(logFile, JSON.stringify(logData, null, 2));
    } catch (error) {
      console.error('Error logging session:', error.message);
    }
  }

  /**
   * Switch AI model
   * @param {string} modelName - Name of the model to use
   */
  setModel(modelName) {
    this.model = modelName;
  }
}
