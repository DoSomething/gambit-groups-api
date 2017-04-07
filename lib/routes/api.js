'use strict';

const logger = require('winston');
const util = require('../util');
const mobilecommons = require('../mobilecommons');

/**
 * Returns a Mobile Commons Group for given groupName, creating it if it doesn't exist.
 * @param {string} groupName - The name of the Mobile Commons Group.
 * @returns {Promise}
 */
function findOrCreateGroup(groupName) {
  logger.debug(`findOrCreateGroup:'${groupName}'`);

  return mobilecommons
    .getGroup(groupName)
    .then(res => res)
    .catch((err) => {
      if (err.message === 'Group not found') {
        logger.info(`findOrCreateGroup did not find group with name:'${groupName}'. Creating...`);
        return mobilecommons.postGroup(groupName);
      }

      return err;
    });
}

module.exports = (router) => {
  // API key check
  router.use((req, res, next) => {
    if (req.headers['x-messaging-group-api-key'] !== process.env.API_KEY) {
      const msg = 'Invalid API key';
      logger.warn(msg);
      return res.status(403).send(msg);
    }

    return next();
  });

  /**
   * Gets/posts to the Mobile Commons API to find/create the Mobile Commons groups for query params.
   */
  router.get('/mobilecommons-groups/', (req, res) => {
    if (!util.validate(['campaign_id', 'campaign_run_id', 'environment'], req.query)) {
      const status = 422;
      const msg = 'Missing required query parameters.';
      logger.warn(msg);

      return res.status(status).send({
        error: {
          code: status,
          message: msg,
        },
      });
    }

    const campaignId = req.query.campaign_id;
    const campaignRunId = req.query.campaign_run_id;
    const environment = req.query.environment;
    const fields = ['doing', 'completed'];
    const promises = [];

    fields.forEach((fieldName) => {
      const groupName = util.groupKeyGen(campaignId, campaignRunId, environment, fieldName);
      promises.push(findOrCreateGroup(groupName));
    });

    return Promise.all(promises)
      .then((groups) => {
        const data = {};
        fields.forEach((fieldName, index) => (data[fieldName] = groups[index]));

        return res.send({ data });
      })
      .catch(err => res.status(500).send(err.message));
  });
};
