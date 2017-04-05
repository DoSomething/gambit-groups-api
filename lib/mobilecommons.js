'use strict';

const xml2js = require('xml2js-es6-promise');
const request = require('superagent');
require('superagent-as-promised')(request);
const logger = require('winston');

const uri = 'https://secure.mcommons.com/api';
const auth = {
  user: process.env.MOBILECOMMONS_AUTH_EMAIL,
  password: process.env.MOBILECOMMONS_AUTH_PASS,
};

/**
 * Executes a GET request to the Mobile Commons API.
 * @param  {string} path - API path to hit.
 * @param  {object} query - Data to pass to Mobile Commons.
 * @return {object|null}
 */
function executeGet(path, query) {
  logger.debug(`mobilecommons.executeGet:${JSON.stringify(query)}`);

  return request
    .get(`${uri}/${path}`)
    .query(query)
    .auth(auth.user, auth.password)
    .buffer()
    .accept('xml')
    .then(res => res.text)
    .then(res => xml2js(res))
    .catch(err => logger.error(err));
}

/**
 * Executes a POST request to the Mobile Commons API.
 * Handles generic tasks such as URL formation & auth.
 * @param  {object} data - Data to pass to Mobile Commons.
 * @param  {string} path - API path to hit.
 * @return {object|null}
 */
function executePost(data, path) {
  logger.debug(`mobilecommons.executePost:${path}`);
  logger.debug(data);

  return request
    .post(`${uri}/${path}`)
    .auth(auth.user, auth.password)
    .send(data)
    .buffer()
    .accept('xml')
    .then(res => res.text)
    .then(res => xml2js(res))
    .catch(err => logger.error(err));
}

function parseGroupsResponse(res) {
  // Parse through the insanity.
  const group = res.response.groups[0].group[0];

  return {
    id: group['$'].id,
    status: group['$'].status,
    name: group.name[0],
    size: Number(group.size[0]),
  };
}

module.exports = {
  /**
   * Create a Mobile Commons Group.
   * @param  {string} groupName - Identifier for this group.
   * @return {Promise}
   */
  createGroup: function (groupName) {
    return executePost({ name: groupName }, 'create_group');
  },

  /**
   * Get a Mobile Commons Group.
   * @param  {string} groupName - Identifier for this group.
   * @return {Promise}
   */
  getGroup: function (groupName) {
    return executeGet('groups', { group_name: groupName })
      .then(res => parseGroupsResponse(res))
      .catch(err => err);
  }
}
