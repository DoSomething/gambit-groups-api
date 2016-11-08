const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const apiRouter = express.Router();
const api = require('./lib/routes/api')(apiRouter);
app.use('/api/v1', apiRouter);

const port = process.env.PORT;
app.listen(port, function () {
  console.log(`Gambit Group API listening on port ${port}`);
});

module.exports = app;
