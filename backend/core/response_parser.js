/**
 * Response Parser
 * Formats and exports AI responses
 */

import fs from 'fs';
import path from 'path';

export class ResponseParser {
  /**
   * Format results as markdown
   * @param {Object} results - Module execution results
   * @param {Object} metadata - Session metadata
   * @returns {string} - Formatted markdown
   */
  formatAsMarkdown(results, metadata) {
    let markdown = `# Deep Diligent Agent Report\n\n`;
    markdown += `**Mode:** ${metadata.mode || 'Unknown'}\n`;
    markdown += `**Topic:** ${metadata.topic || 'N/A'}\n`;
    markdown += `**Region:** ${metadata.region || 'N/A'}\n`;
    markdown += `**Generated:** ${new Date().toLocaleString()}\n\n`;
    markdown += `---\n\n`;

    for (const [moduleName, output] of Object.entries(results)) {
      markdown += `## ${this.formatModuleName(moduleName)}\n\n`;
      
      if (output.error) {
        markdown += `**Error:** ${output.error}\n\n`;
      } else {
        markdown += `${output}\n\n`;
      }
      
      markdown += `---\n\n`;
    }

    return markdown;
  }

  /**
   * Format results as JSON
   * @param {Object} results - Module execution results
   * @param {Object} metadata - Session metadata
   * @returns {string} - Formatted JSON
   */
  formatAsJSON(results, metadata) {
    return JSON.stringify({
      metadata: {
        ...metadata,
        timestamp: new Date().toISOString()
      },
      results
    }, null, 2);
  }

  /**
   * Save results to file
   * @param {Object} results - Module execution results
   * @param {Object} metadata - Session metadata
   * @param {string} format - Output format (markdown or json)
   * @param {string} outputPath - Optional custom output path
   * @returns {string} - Path to saved file
   */
  saveToFile(results, metadata, format = 'markdown', outputPath = null) {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const extension = format === 'json' ? 'json' : 'md';
    
    const fileName = outputPath || path.join(
      process.cwd(),
      'logs',
      `report_${timestamp}.${extension}`
    );

    const content = format === 'json' 
      ? this.formatAsJSON(results, metadata)
      : this.formatAsMarkdown(results, metadata);

    const dir = path.dirname(fileName);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(fileName, content);
    return fileName;
  }

  /**
   * Format module name for display
   * @param {string} moduleName - Raw module name
   * @returns {string} - Formatted name
   */
  formatModuleName(moduleName) {
    return moduleName
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Extract key insights from results
   * @param {Object} results - Module execution results
   * @returns {Array} - Array of key insights
   */
  extractKeyInsights(results) {
    const insights = [];

    for (const [moduleName, output] of Object.entries(results)) {
      if (output.error) continue;

      // Look for common insight markers
      const lines = output.split('\n');
      for (const line of lines) {
        if (
          line.includes('Key Finding') ||
          line.includes('Insight:') ||
          line.includes('Recommendation:') ||
          line.startsWith('- **')
        ) {
          insights.push({
            module: moduleName,
            insight: line.trim()
          });
        }
      }
    }

    return insights;
  }
}
