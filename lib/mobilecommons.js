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
      .then((res) => {
        // Parse through the insanity.
        const getResponse = res.response.groups[0];
        if (!getResponse.group) {
          throw new Error('Group not found');
        }

        const group = getResponse.group[0];
        const data = {
          id: Number(group['$'].id),
          name: group.name[0],
          status: group['$'].status,
          size: Number(group.size[0]),
        };
        logger.debug(`mobilecommons.getGroup success:${JSON.stringify(data)}`);

        return data;
      });
  },

  /**
   * Post a Mobile Commons Group.
   * @param  {string} groupName - Identifier for this group.
   * @return {Promise}
   */
  postGroup: function (groupName) {
    return executePost({ name: groupName }, 'create_group')
      .then((res) => {
        const postResponse = res.response.group[0]['$'];
        const data = {
          id: Number(postResponse.id),
          name: postResponse.name,
          status: 'active',
          size: 0,
        };
        logger.debug(`mobilecommons.postGroup success:${JSON.stringify(data)}`);

        return data;
      });
  },
}
