'use strict';

const util = require('../../lib/util');

module.exports = {

  getCampaignId() {
    return 7;
  },

  getEnvironmentName() {
    return 'name';
  },

  getExistingCampaignRunId() {
    return 211;
  },

  getExistingGroupId() {
    return 811919;
  },

  getFieldName() {
    return 'doing';
  },

  getGroupName(campaignId) {
    const name = util.groupKeyGen(campaignId,
                                  this.getExistingCampaignRunId(),
                                  this.getFieldName(),
                                  this.getEnvironmentName(),
                                  );
    return name;
  },

  getNewCampaignRunId() {
    return 311;
  },

  getNewGroupId() {
    return 22211919;
  },

};
