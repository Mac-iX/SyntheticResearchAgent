/**
 * Agent Router
 * Determines which operational mode to use based on user input
 */

export class AgentRouter {
  constructor() {
    this.modes = {
      DARA: 'dara',
      DD10: 'dd10',
      CUSTOM: 'custom'
    };
  }

  /**
   * Determine the appropriate mode based on user input
   * @param {Object} input - User input containing mode, topic, region, etc.
   * @returns {string} - The selected mode
   */
  selectMode(input) {
    if (input.mode) {
      return input.mode.toLowerCase();
    }

    // Auto-detect mode based on input characteristics
    if (input.region && input.topic) {
      return this.modes.DARA;
    }

    if (input.researchType || input.modules) {
      return this.modes.DD10;
    }

    // Default to DARA
    return this.modes.DARA;
  }

  /**
   * Validate input for the selected mode
   * @param {string} mode - The operational mode
   * @param {Object} input - User input
   * @returns {Object} - Validation result with success flag and message
   */
  validateInput(mode, input) {
    switch (mode) {
      case this.modes.DARA:
        if (!input.topic) {
          return { success: false, message: 'DARA mode requires a topic' };
        }
        if (!input.region) {
          return { success: false, message: 'DARA mode requires a geographic region' };
        }
        return { success: true };

      case this.modes.DD10:
        if (!input.topic) {
          return { success: false, message: 'DD10 mode requires a topic' };
        }
        return { success: true };

      case this.modes.CUSTOM:
        if (!input.modules || input.modules.length === 0) {
          return { success: false, message: 'Custom mode requires at least one module' };
        }
        return { success: true };

      default:
        return { success: false, message: 'Invalid mode selected' };
    }
  }

  /**
   * Get the module sequence for the selected mode
   * @param {string} mode - The operational mode
   * @param {Object} input - User input (may contain custom module selection)
   * @returns {Array} - Array of module names to execute
   */
  getModuleSequence(mode, input) {
    switch (mode) {
      case this.modes.DARA:
        return [
          'foundational_research',
          'audience_segmentation',
          'persona_generation',
          'simulated_inquiry',
          'strategic_synthesis'
        ];

      case this.modes.DD10:
        // If specific modules requested, use those
        if (input.modules && input.modules.length > 0) {
          return input.modules;
        }
        // Otherwise, return all DD10 modules
        return [
          'deep_reasoning',
          'deep_interpretation',
          'deep_intelligence',
          'deep_storytelling',
          'deep_quality_review',
          'deep_looping',
          'deep_signal_detection',
          'deep_synthesis',
          'deep_structure',
          'deep_aesthetics'
        ];

      case this.modes.CUSTOM:
        return input.modules || [];

      default:
        return [];
    }
  }
}
