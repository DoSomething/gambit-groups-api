const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const util = require('./lib/util');

const apiKey = process.env.API_KEY;

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

  res.send('testse');
});

const port = process.env.PORT;
app.listen(port, function () {
  console.log(`Gambit Group API listening on port ${port}`);
});
