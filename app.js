require('newrelic'); // eslint-disable-line strict

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
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
require('./lib/routes/api')(apiRouter);

app.use('/api/v1', apiRouter);

app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

const port = process.env.PORT;
app.listen(port, () => {
  logger.info(`Messaging Groups API listening on port:${port}...`);
});

module.exports = app;
