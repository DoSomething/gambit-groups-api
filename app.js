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

  // Check if it exists already in DB

  mobilecommons.createGroup(util.keyGen(campaignId, campaignRunId))
  .then(mc => {
    console.log(mc);
    res.send(mc);
  })
});

const port = process.env.PORT;
app.listen(port, function () {
  console.log(`Gambit Group API listening on port ${port}`);
});
