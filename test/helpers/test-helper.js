'use strict';

const nock = require('nock');

const mcApi = nock('https://secure.mcommons.com/api');

module.exports = {

  getExistingGroup(groupName) {
    const group = {
      status: 'active',
      size: Math.random() * 5000,
      name: groupName,
      id: (Math.random() * 500) + 1,
    };

    return group;
  },

  getExistingGroupXml(group) {
    return '<response success="true"><groups>' +
      `  <group id="${group.id}" type="UploadedGroup" status="${group.status}">` +
      `    <name>${group.name}</name>` +
      `    <size>${group.size}</size>` +
      '  </group>' +
      '</groups></response>';
  },

  nockGetExistingGroup(group) {
    mcApi
      .get(`/groups?group_name=${encodeURIComponent(group.name)}`)
      .reply(200, this.getExistingGroupXml(group));
  },

  nockGetNotFoundGroup(groupName) {
    mcApi
      .get(`/groups?group_name=${encodeURIComponent(groupName)}`)
      .reply(200, '<response success="true"><groups></groups></response>');
  },

};
