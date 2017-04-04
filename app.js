require('newrelic');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const logger = require('winston');
logger.configure({
  transports: [
    new (logger.transports.Console)({
      prettyPrint: true,
      colorize: true,
      level: process.env.LOGGING_LEVEL || 'info',
      timestamp: true,
    }),
  ],
});

const apiRouter = express.Router();
const api = require('./lib/routes/api')(apiRouter);
app.use('/api/v1', apiRouter);

app.get('/', function (req, res) {
  res.json({ status: 'ok' });
});

const port = process.env.PORT;
app.listen(port, function () {
  logger.info(`Messaging Groups API listening on port ${port}`);
});

module.exports = app;
