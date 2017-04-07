'use strict';

const logger = require('winston');

module.exports = {
  /**
   * Check if the given fields are all supplied in the container.
   * @param {array} fields - List of fields to verify.
   * @param {object} container - Object to check against.
   * @return {boolean} - True if all fields are supplied in container.
   */
  validate: (fields, container) => {
    if (container === undefined || typeof container !== 'object') {
      return false;
    }
    const missingFields = fields.some(field => (!(field in container)));

    return !missingFields;
  },

  /**
   * Generate a group key name for the given campaign id, run id & environment.
   * @param {number} campaignId
   * @param {number} campaignRunId
   * @param {string} envName - The environment this group is associated with.
   * @param {string} field - The field this key is for, expected values: 'doing' | 'completed'
   * @return {string} - The unique keyname for this ID pairing.
   */
  groupKeyGen: (campaignId, campaignRunId, envName, field) => {
    const key = `campaign_id=${campaignId} run_id=${campaignRunId} field=${field} env=${envName}`;
    logger.debug(encodeURIComponent(key));

    return key;
  },
};
