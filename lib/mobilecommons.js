const xml2js = require('xml2js-es6-promise');
const request = require('superagent');
require('superagent-as-promised')(request);

const uri = 'https://secure.mcommons.com/api';
const auth = {
  user: process.env.MOBILECOMMONS_AUTH_EMAIL,
  password: process.env.MOBILECOMMONS_AUTH_PASS,
};

/**
 * Make a request to the mobile commons API.
 * Handles generic tasks such as URL formation & auth.
 * @param  {object} data Data to pass to Mobile Commons.
 * @param  {string} path API path to hit.
 * @return {object|null}
 */
function makeMobileCommonsPostRequest(data, path) {
  return request
  .post(`${uri}/${path}`)
  .auth(auth.user, auth.password)
  .send(data)
  .buffer()
  .accept('xml')
  .then(res => res.text)
  .then(res => xml2js(res))
  .catch(err => console.error(err))
}

module.exports = {
  /**
   * Create a mobile commons group.
   * @param  {string} groupName Identifier for this group.
   * @return {Promise}
   */
  createGroup: function(groupName) {
    return makeMobileCommonsPostRequest({form: {name: groupName}}, 'create_group');
  }
}
