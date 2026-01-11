#!/usr/bin/env node

/**
 * CLI Interface for Deep Diligent Agent
 */

import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { AgentRouter } from '../core/agent_router.js';
import { PromptEngine } from '../core/prompt_engine.js';
import { Executor } from '../core/executor.js';
import { ResponseParser } from '../core/response_parser.js';

class CLI {
  constructor() {
    this.router = new AgentRouter();
    this.promptEngine = new PromptEngine();
    this.executor = new Executor();
    this.parser = new ResponseParser();
  }

  async start() {
    console.log(chalk.cyan.bold('\n╔════════════════════════════════════════╗'));
    console.log(chalk.cyan.bold('║   Deep Diligent Agent (DD10/DARA)     ║'));
    console.log(chalk.cyan.bold('╚════════════════════════════════════════╝\n'));

    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          { name: '🔍 Run DARA Mode (Audience Research)', value: 'dara' },
          { name: '🧠 Run DD10 Mode (Deep Research)', value: 'dd10' },
          { name: '⚙️  Custom Mode (Select Modules)', value: 'custom' },
          { name: '❌ Exit', value: 'exit' }
        ]
      }
    ]);

    if (action === 'exit') {
      console.log(chalk.yellow('\nGoodbye!\n'));
      process.exit(0);
    }

    await this.handleMode(action);
  }

  async handleMode(mode) {
    let input = { mode };

    if (mode === 'dara') {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'topic',
          message: 'Enter your research topic/niche:',
          validate: (value) => value.length > 0 || 'Topic is required'
        },
        {
          type: 'input',
          name: 'region',
          message: 'Enter the geographic region:',
          validate: (value) => value.length > 0 || 'Region is required'
        }
      ]);
      input = { ...input, ...answers };
    } else if (mode === 'dd10') {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'topic',
          message: 'Enter your research topic:',
          validate: (value) => value.length > 0 || 'Topic is required'
        },
        {
          type: 'checkbox',
          name: 'modules',
          message: 'Select DD10 modules to run (or press Enter for all):',
          choices: [
            { name: 'Deep Reasoning', value: 'deep_reasoning' },
            { name: 'Deep Interpretation', value: 'deep_interpretation' },
            { name: 'Deep Intelligence', value: 'deep_intelligence' },
            { name: 'Deep Storytelling', value: 'deep_storytelling' },
            { name: 'Deep Quality Review', value: 'deep_quality_review' },
            { name: 'Deep Looping', value: 'deep_looping' },
            { name: 'Deep Signal Detection', value: 'deep_signal_detection' },
            { name: 'Deep Synthesis', value: 'deep_synthesis' },
            { name: 'Deep Structure', value: 'deep_structure' },
            { name: 'Deep Aesthetics', value: 'deep_aesthetics' }
          ]
        }
      ]);
      input = { ...input, ...answers };
    } else if (mode === 'custom') {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'topic',
          message: 'Enter your research topic:',
          validate: (value) => value.length > 0 || 'Topic is required'
        },
        {
          type: 'checkbox',
          name: 'modules',
          message: 'Select modules to run:',
          choices: [
            { name: 'DARA: Foundational Research', value: 'foundational_research' },
            { name: 'DARA: Audience Segmentation', value: 'audience_segmentation' },
            { name: 'DARA: Persona Generation', value: 'persona_generation' },
            { name: 'DARA: Simulated Inquiry', value: 'simulated_inquiry' },
            { name: 'DARA: Strategic Synthesis', value: 'strategic_synthesis' },
            new inquirer.Separator(),
            { name: 'DD10: Deep Reasoning', value: 'deep_reasoning' },
            { name: 'DD10: Deep Intelligence', value: 'deep_intelligence' },
            { name: 'DD10: Deep Synthesis', value: 'deep_synthesis' }
          ],
          validate: (value) => value.length > 0 || 'Select at least one module'
        }
      ]);
      input = { ...input, ...answers };
    }

    await this.executeResearch(input);
  }

  async executeResearch(input) {
    const spinner = ora('Initializing agent...').start();

    try {
      // Validate input
      const selectedMode = this.router.selectMode(input);
      const validation = this.router.validateInput(selectedMode, input);

      if (!validation.success) {
        spinner.fail(chalk.red(validation.message));
        return;
      }

      // Get module sequence
      const moduleSequence = this.router.getModuleSequence(selectedMode, input);
      spinner.text = `Executing ${moduleSequence.length} modules...`;

      // Execute the chain
      const results = await this.executor.executeChain(
        moduleSequence,
        this.promptEngine,
        selectedMode,
        input,
        {
          mode: selectedMode,
          topic: input.topic,
          region: input.region
        }
      );

      spinner.succeed(chalk.green('Research complete!'));

      // Display results
      console.log(chalk.cyan('\n' + '='.repeat(50)));
      console.log(chalk.cyan.bold('RESULTS'));
      console.log(chalk.cyan('='.repeat(50) + '\n'));

      for (const [moduleName, output] of Object.entries(results)) {
        console.log(chalk.yellow.bold(`\n📊 ${this.parser.formatModuleName(moduleName)}\n`));
        if (output.error) {
          console.log(chalk.red(`Error: ${output.error}`));
        } else {
          console.log(output.substring(0, 500) + '...\n');
        }
      }

      // Save to file
      const { saveFile } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'saveFile',
          message: 'Save full report to file?',
          default: true
        }
      ]);

      if (saveFile) {
        const filePath = this.parser.saveToFile(results, {
          mode: selectedMode,
          topic: input.topic,
          region: input.region
        }, 'markdown');
        console.log(chalk.green(`\n✓ Report saved to: ${filePath}\n`));
      }

      // Continue or exit
      const { continueSession } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'continueSession',
          message: 'Run another research session?',
          default: true
        }
      ]);

      if (continueSession) {
        await this.start();
      } else {
        console.log(chalk.yellow('\nGoodbye!\n'));
        process.exit(0);
      }

    } catch (error) {
      spinner.fail(chalk.red('Error: ' + error.message));
      console.error(error);
    }
  }
}

// Start CLI
const cli = new CLI();
cli.start();
