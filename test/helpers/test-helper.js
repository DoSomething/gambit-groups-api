'use strict';

const util = require('../../lib/util');

module.exports = {

  getCampaignId() {
    return 7;
  },

  getEnvironmentName() {
    return 'thor';
  },

  getExistingCampaignRunId() {
    return 211;
  },

  getExistingCompletedGroupId() {
    return 811920;
  },

  getExistingCompletedGroupName() {
    return this.getGroupName(this.getExistingCampaignRunId(), 'completed');
  },

  getExistingDoingGroupId() {
    return 811919;
  },

  getExistingDoingGroupName() {
    return this.getGroupName(this.getExistingCampaignRunId(), 'doing');
  },

  getFieldName() {
    return 'doing';
  },

  getGroupName(campaignRunId, fieldName) {
    const name = util.groupKeyGen(this.getCampaignId(),
                                  campaignRunId,
                                  fieldName,
                                  this.getEnvironmentName());

    return name;
  },

  getNewCampaignRunId() {
    return 311;
  },

  getNewGroupId() {
    return 22211919;
  },

  getNonExistingGroupName() {
    return 'pupp3t sl0th';
  },

};
