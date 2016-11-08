module.exports = {
  /**
   * Generate a group key name for the given campaign id, run id & environment.
   * @param  {int|string} campaignId    The campaign ID.
   * @param  {int|string} campaignRunId The campaign run ID.
   * @param  {string}     environment   The environment this group is associated with.
   * @param  {string}     field         The field this key is for. (Either doing or completed).
   * @return {string}                   The unique keyname for this ID pairing.
   */
  groupKeyGen: function(campaignId, campaignRunId, environment, field) {
    return `campaign_id=${campaignId} run_id=${campaignRunId} field=${field} env=${environment}`;
  }
}
