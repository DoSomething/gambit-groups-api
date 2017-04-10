'use strict';

const nock = require('nock');

const mcApi = nock('https://secure.mcommons.com/api');

function randomInteger() {
  return Math.floor((Math.random() * 500) + 1);
}

module.exports = {

  getGroup(groupName) {
    const group = {
      status: 'active',
      size: randomInteger(),
      name: groupName,
      id: randomInteger(),
    };

    return group;
  },

  getGroupsResponse(group) {
    return '<response success="true"><groups>' +
      `  <group id="${group.id}" type="UploadedGroup" status="${group.status}">` +
      `    <name>${group.name}</name>` +
      `    <size>${group.size}</size>` +
      '  </group>' +
      '</groups></response>';
  },

  nockGetGroupSuccess(group, ignoreQuery) {
    let path;
    if (ignoreQuery === true) {
      path = /groups/;
    } else {
      path = `/groups?group_name=${encodeURIComponent(group.name)}`;
    }
    mcApi
      .get(path)
      .reply(200, this.getGroupsResponse(group));
  },

  nockGetGroupNotFound(groupName) {
    mcApi
      .get(`/groups?group_name=${encodeURIComponent(groupName)}`)
      .reply(200, '<response success="true"><groups></groups></response>');
  },

  nockPostGroupSuccess(groupName) {
    const response = '<response success="true">' +
       `  <group name="${groupName}" id="${randomInteger()}" type="UploadedGroup"></group>` +
       '</response>';

    mcApi
      .post('/create_group')
      .reply(200, response);
  },

  nockPostGroupError() {
    const response = '<response success="false"><error id="18" message="Invalid name"/></response>';

    // Mobile Commons sends a 200 code back if invalid name is posted.
    mcApi
      .post('/create_group')
      .reply(200, response);
  },

};
