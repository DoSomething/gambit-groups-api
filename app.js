const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const util = require('./lib/util');
const mobilecommons = require('./lib/mobilecommons');

const apiKey = process.env.API_KEY;
const environments = ['local', 'thor', 'production'];

// API key check
// app.use()

app.get('/api/v1/group', function (req, res) {
  if (!util.validate(['campaign_id', 'campaign_run_id'], req.body)) {
    res.send('Missing parameters').status(400);
    return;
  }

  res.send('fdsfdsfds')
});

app.post('/api/v1/group', function (req, res) {
  if (!util.validate(['campaign_id', 'campaign_run_id'], req.body)) {
    res.send('Missing parameters').status(400);
    return;
  }

  const campaignId = req.body.campaign_id;
  const campaignRunId = req.body.campaign_run_id;

  // Check if it exists already in db
  // If it doesn't...

  const keys = environments.map(env => util.groupKeyGen(campaignId, campaignRunId, env));
  const groupData = {local: '', thor: '', production: ''};

  function updateGroupData(res, env) {
    if (!res || !res.response.group) {
      return;
    }

    const group = res.response.group;
    const id = group[0]['$'].id;
    groupData[env] = id;
  }

  // There is probably a dynamic way of doing this, but this works for now.
  mobilecommons.createGroup(keys[environments.indexOf('local')])
  .then(mcRes => updateGroupData(mcRes, 'local'))
  .then(() => mobilecommons.createGroup(keys[environments.indexOf('thor')]))
  .then(mcRes => updateGroupData(mcRes, 'thor'))
  .then(() => mobilecommons.createGroup(keys[environments.indexOf('production')]))
  .then(mcRes => updateGroupData(mcRes, 'production'))
  .then(() => {
    // Save to db
    res.json(groupData);
  })
});

const port = process.env.PORT;
app.listen(port, function () {
  console.log(`Gambit Group API listening on port ${port}`);
});
