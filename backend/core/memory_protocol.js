/**
 * Memory Protocol (MP)
 * Manages research artifacts across DARA and DIDI workflows
 * 
 * Each research session creates a persistent artifact that grows with enhancements.
 * Artifacts are stored with version history to enable iterative research.
 */

class MemoryProtocol {
  constructor() {
    this.artifacts = new Map();
  }

  /**
   * Create a new research artifact
   * @param {string} sessionId - Unique identifier for the research session
   * @param {Object} metadata - Session metadata (topic, user, timestamp)
   * @returns {Object} - New artifact object
   */
  createArtifact(sessionId, metadata) {
    const artifact = {
      id: sessionId,
      created: new Date().toISOString(),
      metadata: metadata,
      versions: [],
      currentVersion: 0,
      status: 'active'
    };

    this.artifacts.set(sessionId, artifact);
    return artifact;
  }

  /**
   * Add a new version to an existing artifact
   * @param {string} sessionId - Session identifier
   * @param {string} moduleName - Name of the module that generated this version
   * @param {Object} data - Research data/findings from the module
   * @returns {Object} - Updated artifact
   */
  addVersion(sessionId, moduleName, data) {
    const artifact = this.artifacts.get(sessionId);
    
    if (!artifact) {
      throw new Error(`Artifact not found: ${sessionId}`);
    }

    const version = {
      versionNumber: artifact.versions.length + 1,
      module: moduleName,
      timestamp: new Date().toISOString(),
      data: data
    };

    artifact.versions.push(version);
    artifact.currentVersion = version.versionNumber;
    artifact.lastModified = version.timestamp;

    this.artifacts.set(sessionId, artifact);
    return artifact;
  }

  /**
   * Retrieve an artifact by session ID
   * @param {string} sessionId - Session identifier
   * @returns {Object|null} - Artifact object or null if not found
   */
  getArtifact(sessionId) {
    return this.artifacts.get(sessionId) || null;
  }

  /**
   * Get a specific version of an artifact
   * @param {string} sessionId - Session identifier
   * @param {number} versionNumber - Version number (1-indexed)
   * @returns {Object|null} - Version object or null if not found
   */
  getVersion(sessionId, versionNumber) {
    const artifact = this.artifacts.get(sessionId);
    
    if (!artifact) {
      return null;
    }

    return artifact.versions.find(v => v.versionNumber === versionNumber) || null;
  }

  /**
   * Get all versions of an artifact
   * @param {string} sessionId - Session identifier
   * @returns {Array} - Array of version objects
   */
  getAllVersions(sessionId) {
    const artifact = this.artifacts.get(sessionId);
    return artifact ? artifact.versions : [];
  }

  /**
   * Export artifact as JSON
   * @param {string} sessionId - Session identifier
   * @returns {string} - JSON string of the artifact
   */
  exportArtifact(sessionId) {
    const artifact = this.artifacts.get(sessionId);
    
    if (!artifact) {
      throw new Error(`Artifact not found: ${sessionId}`);
    }

    return JSON.stringify(artifact, null, 2);
  }

  /**
   * Import artifact from JSON
   * @param {string} jsonString - JSON string of an artifact
   * @returns {Object} - Imported artifact
   */
  importArtifact(jsonString) {
    const artifact = JSON.parse(jsonString);
    this.artifacts.set(artifact.id, artifact);
    return artifact;
  }

  /**
   * Delete an artifact
   * @param {string} sessionId - Session identifier
   * @returns {boolean} - True if deleted, false if not found
   */
  deleteArtifact(sessionId) {
    return this.artifacts.delete(sessionId);
  }

  /**
   * List all active artifacts
   * @returns {Array} - Array of artifact metadata
   */
  listArtifacts() {
    return Array.from(this.artifacts.values()).map(a => ({
      id: a.id,
      created: a.created,
      lastModified: a.lastModified,
      versions: a.versions.length,
      status: a.status,
      metadata: a.metadata
    }));
  }

  /**
   * Get artifact summary for display
   * @param {string} sessionId - Session identifier
   * @returns {Object} - Summary object
   */
  getSummary(sessionId) {
    const artifact = this.artifacts.get(sessionId);
    
    if (!artifact) {
      return null;
    }

    return {
      id: artifact.id,
      topic: artifact.metadata.topic,
      created: artifact.created,
      lastModified: artifact.lastModified,
      totalVersions: artifact.versions.length,
      modules: artifact.versions.map(v => v.module),
      status: artifact.status
    };
  }
}

// Export for use in other modules
module.exports = MemoryProtocol;
