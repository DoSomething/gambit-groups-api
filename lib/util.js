module.exports = {
  /**
   * Check if the given fields are all supplied in the container.
   * @param  {Array} fields     List of fields to verify.
   * @param  {Object} container Object to check against.
   * @return {boolean}          True if all fields are supplied in container.
   */
  validate: function(fields, container) {
    if (container == undefined || typeof container !== 'object') {
      return false;
    }

    for (field of fields) {
      if (!(field in container)) {
        return false;
      }
    }

    return true;
  },

  /**
   * Generate a key name for the given campaign id, run id & environment.
   * @param  {int|string} campaignId    The campaign ID.
   * @param  {int|string} campaignRunId The campaign run ID.
   * @param  {string}     environment   The environment this group is associated with.
   * @return {string}                   The unique keyname for this ID pairing.
   */
  keyGen: function(campaignId, campaignRunId, environment) {
    return `env=${environment}
            campaign_id=${campaignId}
            run_id=${campaignRunId}`;
  }
}
