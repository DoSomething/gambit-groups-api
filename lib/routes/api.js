'use strict';

const logger = require('winston');
const util = require('../util');
const mobilecommons = require('../mobilecommons');

const Group = require('../group');

function formatApiResponse(groupDoc) {
  return {
    id: groupDoc._id,
    campaign_id: groupDoc.campaign_id,
    campaign_run_id: groupDoc.campaign_run_id,
    mobilecommons_groups: groupDoc.mobilecommons_groups,
  };
}

module.exports = router => {

  // API key check
  router.use((req, res, next) => {
    if (req.headers['x-messaging-group-api-key'] !== process.env.API_KEY) {
      const msg = 'Invalid API key';
      logger.warn(msg);
      return res.status(403).send(msg);
    }

    return next();
  });

  router.get('/', function (req, res) {
    res.json({'success': true});
  });

  router.get('/group/:campaignId/:campaignRunId', function (req, res) {
    // Validate request
    if (!util.validate(['campaignId', 'campaignRunId'], req.params)) {
      const msg = 'Missing parameters';
      logger.warn(msg);
      res.send(msg).status(400);

      return;
    }

    const campaignId = req.params.campaignId;
    const campaignRunId = req.params.campaignRunId;
    const logMsg = `GET campaign:${campaignId} run:${campaignRunId}`;
    logger.debug(logMsg);

    // Check if we already have an entry for this campaign run.
    Group.findOne({campaign_id: campaignId, campaign_run_id: campaignRunId}, (err, group) => {
      if (err) {
        logger.error(err);
        res.status(500).send('DB error');
        return;
      }

      if (!group) {
        logger.debug(`${logMsg} not found`);
        res.status(404).send('No group for this campaign id & run id exists.');
        return;
      }
      const response = formatApiResponse(group);
      logger.debug(`${logMsg} found:${JSON.stringify(response)}`);

      res.json(response);
    });
  });

  router.post('/group', function (req, res) {
    // Validate request
    if (!util.validate(['campaign_id', 'campaign_run_id'], req.body)) {
      res.status(400).send('Missing parameters');
      return;
    }

    const campaignId = req.body.campaign_id;
    const campaignRunId = req.body.campaign_run_id;
    const logMsg = `POST campaign:${campaignId} run:${campaignRunId}`;
    logger.info(logMsg);

    // Check if we already have an entry for this campaign run.
    Group.find({campaign_id: campaignId, campaign_run_id: campaignRunId}, (err, groups) => {
      if (err) {
        logger.error(err);
        res.status(500).send('DB error');
        return;
      }

      if (groups.length > 0) {
        const msg = 'A group document for this campaign id & run id exists already.';
        logger.warn(`${logMsg} error:${msg}`);
        res.status(400).send(msg);
        return;
      }

      // Create a new group with campaign id's.
      const group = new Group({campaign_id: campaignId, campaign_run_id: campaignRunId});

      /**
       * Update this requests group with given mobile commons data.
       * @param  {object} res   Parsed mobile commons response.
       * @param  {string} env   The environment this is targetting.
       * @param  {string} field The field this data is for.
       */
      function updateGroupData(res, env, field) {
        if (!res || !res.response.group) {
          return;
        }

        const mcGroup = res.response.group;
        const id = mcGroup[0]['$'].id;
        group.mobilecommons_groups[env][field] = id;
      }

      // There is probably a dynamic way of doing this, but this works for now.
      // For each environment, create a group in mobile commons & save the ID.
      mobilecommons.createGroup(util.groupKeyGen(campaignId, campaignRunId, 'local', 'doing'))
      .then(mcRes => updateGroupData(mcRes, 'local', 'doing'))
      .then(() => mobilecommons.createGroup(util.groupKeyGen(campaignId, campaignRunId, 'local', 'completed')))
      .then(mcRes => updateGroupData(mcRes, 'local', 'completed'))
      .then(() => mobilecommons.createGroup(util.groupKeyGen(campaignId, campaignRunId, 'thor', 'doing')))
      .then(mcRes => updateGroupData(mcRes, 'thor', 'doing'))
      .then(() => mobilecommons.createGroup(util.groupKeyGen(campaignId, campaignRunId, 'thor', 'completed')))
      .then(mcRes => updateGroupData(mcRes, 'thor', 'completed'))
      .then(() => mobilecommons.createGroup(util.groupKeyGen(campaignId, campaignRunId, 'production', 'doing')))
      .then(mcRes => updateGroupData(mcRes, 'production', 'doing'))
      .then(() => mobilecommons.createGroup(util.groupKeyGen(campaignId, campaignRunId, 'production', 'completed')))
      .then(mcRes => updateGroupData(mcRes, 'production', 'completed'))
      .then(() => {
        // Save the group & return it in the response.
        group.save();
        const response = formatApiResponse(group);
        logger.info(JSON.stringify(response));
        res.json(response);
      })
      .catch(err => {
        logger.error(err);
        res.status(500).send('Server error');
      });
    });
  });

}
