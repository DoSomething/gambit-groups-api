const util = require('../util');
const mobilecommons = require('../mobilecommons');

const Group = require('../group');

const apiKey = process.env.API_KEY;
const environments = ['local', 'thor', 'production'];

module.exports = router => {

  // API key check
  // app.use()

  router.get('/group', function (req, res) {
    if (!util.validate(['campaign_id', 'campaign_run_id'], req.body)) {
      res.send('Missing parameters').status(400);
      return;
    }

    res.send('fdsfdsfds')
  });

  router.post('/group', function (req, res) {
    // Validate request
    if (!util.validate(['campaign_id', 'campaign_run_id'], req.body)) {
      res.send('Missing parameters').status(400);
      return;
    }

    const campaignId = req.body.campaign_id;
    const campaignRunId = req.body.campaign_run_id;

    // Check if we already have an entry for this campaign run.
    Group.find({campaign_id: campaignId, campaign_run_id: campaignRunId}, (err, groups) => {
      if (err) {
        res.send('Group exists already').status(400);
        return;
      }

      // Create a new group with campaign id's.
      const group = new Group({campaign_id: campaignId, campaign_run_id: campaignRunId});

      /**
       * Update this requests group with given mobile commons data.
       * @param  {object} res Parsed mobile commons response.
       * @param  {string} env The environment this is targetting.
       */
      function updateGroupData(res, env) {
        if (!res || !res.response.group) {
          return;
        }

        const mcGroup = res.response.group;
        const id = mcGroup[0]['$'].id;
        group.mobilecommons_groups[env] = id;
      }

      // There is probably a dynamic way of doing this, but this works for now.
      // For each environment, create a group in mobile commons & save the ID.
      mobilecommons.createGroup(util.groupKeyGen(campaignId, campaignRunId, 'local'))
      .then(mcRes => updateGroupData(mcRes, 'local'))
      .then(() => mobilecommons.createGroup(util.groupKeyGen(campaignId, campaignRunId, 'thor')))
      .then(mcRes => updateGroupData(mcRes, 'thor'))
      .then(() => mobilecommons.createGroup(util.groupKeyGen(campaignId, campaignRunId, 'production')))
      .then(mcRes => updateGroupData(mcRes, 'production'))
      .then(() => {
        // Save the group & return it in the response.
        group.save();
        res.json(group);
      })
      .catch(err => console.error(err));
    });
  });

}
