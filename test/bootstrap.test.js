'use strict';

/**
 * Imports.
 */
const helper = require('./helpers/test-helper');
const nock = require('nock');

/**
 * Setup.
 */
const mcApi = nock('https://secure.mcommons.com/api');
const existingCompletedGroupName = helper.getExistingCompletedGroupName('completed');
const existingDoingGroupName = helper.getExistingDoingGroupName('doing');
/* eslint-disable max-len */
const existingDoingGroupXml = '<response success="true"><groups>' +
                          `  <group id="${helper.getExistingDoingGroupId()}" type="UploadedGroup" status="active">` +
                          `    <name>${existingDoingGroupName}</name>` +
                          '    <size>0</size>' +
                          '  </group>' +
                          '</groups></response>';

/* eslint-enable max-len */
mcApi
  .get(`/groups?group_name=${encodeURIComponent(existingDoingGroupName)}`)
  .reply(200, existingDoingGroupXml);
mcApi
  .get(`/groups?group_name=${encodeURIComponent(existingCompletedGroupName)}`)
  .reply(200, existingDoingGroupXml);
mcApi
  .get(`/groups?group_name=${encodeURIComponent(helper.getNonExistingGroupName())}`)
  .reply(200, '<response success="true"><groups></groups></response>');

// mcApi
//   .get(`/api/groups?group_name=${existingDoingGroupName}`)
//   .reply(200, existingDoingGroupXml);
// mcApi
//   .get(`/api/groups?group_name=${existingCompletedGroupName}`)
//   .reply(200, existingDoingGroupXml);

/**
 * Run tests.
 */
// require('./lib/api.test');
require('./lib/mobilecommons.test');
require('./lib/util.test');
